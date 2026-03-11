// ---------------------------------------------------------------------------
// TheOneCrawl — /v1/monitors routes (web change detection)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { ensureHydrated, checkCredits } from '../billing/credits.js';
import { validateUrlNotPrivate } from '../shared/ssrf.js';
import {
  saveMonitor,
  getMonitor,
  listMonitors,
  deleteMonitor,
  countMonitors,
  getMonitorHistory,
} from '../shared/monitor-store.js';
import { PLAN_MONITOR_LIMITS } from '../shared/constants.js';
import { logger } from '../shared/logger.js';
import type { Monitor } from '../engine/types.js';

const app = new Hono();

// ---------------------------------------------------------------------------
// Validation schemas
// ---------------------------------------------------------------------------

const createMonitorSchema = z.object({
  url: z.string().url('Must be a valid URL').max(2048),
  name: z.string().max(200).optional(),
  frequency: z.enum(['hourly', 'daily', 'weekly']).default('daily'),
  changeType: z.enum(['any_change', 'significant_change', 'keyword_alert']).default('any_change'),
  keywords: z.array(z.string().max(200)).max(50).optional(),
  webhookUrl: z.string().url().max(2048).optional(),
  webhookSecret: z.string().max(256).optional(),
}).refine(
  (data) => data.changeType !== 'keyword_alert' || (data.keywords && data.keywords.length > 0),
  { message: 'keywords are required when changeType is keyword_alert', path: ['keywords'] },
);

const updateMonitorSchema = z.object({
  name: z.string().max(200).optional(),
  frequency: z.enum(['hourly', 'daily', 'weekly']).optional(),
  changeType: z.enum(['any_change', 'significant_change', 'keyword_alert']).optional(),
  keywords: z.array(z.string().max(200)).max(50).optional(),
  webhookUrl: z.string().url().max(2048).optional().nullable(),
  webhookSecret: z.string().max(256).optional().nullable(),
  status: z.enum(['active', 'paused']).optional(),
});

// ---------------------------------------------------------------------------
// POST /v1/monitors — Create a monitor
// ---------------------------------------------------------------------------

app.post('/', authMiddleware, async (c) => {
  const auth = getAuth(c);

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = createMonitorSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { url, name, frequency, changeType, keywords, webhookUrl, webhookSecret } = parsed.data;

  // SSRF check on target URL
  const ssrfCheck = await validateUrlNotPrivate(url);
  if (!ssrfCheck.valid) {
    return c.json({ success: false, error: ssrfCheck.error ?? 'Cannot monitor this URL' }, 400);
  }

  // SSRF check on webhook URL if provided
  if (webhookUrl) {
    const webhookSsrf = await validateUrlNotPrivate(webhookUrl);
    if (!webhookSsrf.valid) {
      return c.json({ success: false, error: webhookSsrf.error ?? 'Invalid webhook URL' }, 400);
    }
  }

  // Check monitor limit for plan
  await ensureHydrated(auth.accountId);
  const credits = checkCredits(auth.accountId);
  const monitorLimit = PLAN_MONITOR_LIMITS[credits.plan] ?? PLAN_MONITOR_LIMITS['free']!;

  const currentCount = await countMonitors(auth.accountId);
  if (currentCount >= monitorLimit) {
    return c.json({
      success: false,
      error: `Monitor limit reached for ${credits.plan} plan (${monitorLimit} monitors). Upgrade to add more.`,
    }, 402);
  }

  const now = new Date().toISOString();
  const monitor: Monitor = {
    id: `mon_${nanoid()}`,
    accountId: auth.accountId,
    url,
    name,
    frequency,
    changeType,
    keywords,
    webhookUrl,
    webhookSecret,
    status: 'active',
    // Schedule first check immediately (nextCheckAt = now) so it runs soon
    nextCheckAt: now,
    errorCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await saveMonitor(monitor);
    return c.json({ success: true, data: sanitizeMonitor(monitor) }, 201);
  } catch (err) {
    logger.error('Failed to create monitor', { error: err instanceof Error ? err.message : String(err) });
    return c.json({ success: false, error: 'Failed to create monitor' }, 500);
  }
});

// ---------------------------------------------------------------------------
// GET /v1/monitors — List monitors
// ---------------------------------------------------------------------------

app.get('/', authMiddleware, async (c) => {
  const auth = getAuth(c);

  try {
    const monitors = await listMonitors(auth.accountId);
    return c.json({
      success: true,
      data: monitors.map(sanitizeMonitor),
      total: monitors.length,
    });
  } catch (err) {
    logger.error('Failed to list monitors', { error: err instanceof Error ? err.message : String(err) });
    return c.json({ success: false, error: 'Failed to list monitors' }, 500);
  }
});

// ---------------------------------------------------------------------------
// GET /v1/monitors/:id — Get monitor detail
// ---------------------------------------------------------------------------

app.get('/:id', authMiddleware, async (c) => {
  const auth = getAuth(c);
  const monitorId = c.req.param('id')!;

  const monitor = await getMonitor(monitorId, auth.accountId);
  if (!monitor) {
    return c.json({ success: false, error: 'Monitor not found' }, 404);
  }

  return c.json({ success: true, data: sanitizeMonitor(monitor) });
});

// ---------------------------------------------------------------------------
// GET /v1/monitors/:id/history — Get check history
// ---------------------------------------------------------------------------

app.get('/:id/history', authMiddleware, async (c) => {
  const auth = getAuth(c);
  const monitorId = c.req.param('id')!;

  // Verify ownership
  const monitor = await getMonitor(monitorId, auth.accountId);
  if (!monitor) {
    return c.json({ success: false, error: 'Monitor not found' }, 404);
  }

  try {
    const history = await getMonitorHistory(monitorId, auth.accountId, 30);
    return c.json({ success: true, data: history });
  } catch (err) {
    logger.error('Failed to get monitor history', { monitorId, error: err instanceof Error ? err.message : String(err) });
    return c.json({ success: false, error: 'Failed to get monitor history' }, 500);
  }
});

// ---------------------------------------------------------------------------
// PATCH /v1/monitors/:id — Update monitor
// ---------------------------------------------------------------------------

app.patch('/:id', authMiddleware, async (c) => {
  const auth = getAuth(c);
  const monitorId = c.req.param('id')!;

  const monitor = await getMonitor(monitorId, auth.accountId);
  if (!monitor) {
    return c.json({ success: false, error: 'Monitor not found' }, 404);
  }

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = updateMonitorSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const updates = parsed.data;

  // Validate keyword_alert requirement
  const newChangeType = updates.changeType ?? monitor.changeType;
  const newKeywords = updates.keywords ?? monitor.keywords;
  if (newChangeType === 'keyword_alert' && (!newKeywords || newKeywords.length === 0)) {
    return c.json({ success: false, error: 'keywords are required when changeType is keyword_alert' }, 400);
  }

  // SSRF check on new webhook URL
  if (updates.webhookUrl) {
    const webhookSsrf = await validateUrlNotPrivate(updates.webhookUrl);
    if (!webhookSsrf.valid) {
      return c.json({ success: false, error: webhookSsrf.error ?? 'Invalid webhook URL' }, 400);
    }
  }

  const now = new Date().toISOString();
  const updatedMonitor: Monitor = {
    ...monitor,
    ...(updates.name !== undefined ? { name: updates.name } : {}),
    ...(updates.frequency !== undefined ? { frequency: updates.frequency } : {}),
    ...(updates.changeType !== undefined ? { changeType: updates.changeType } : {}),
    ...(updates.keywords !== undefined ? { keywords: updates.keywords } : {}),
    ...(updates.webhookUrl !== undefined ? { webhookUrl: updates.webhookUrl ?? undefined } : {}),
    ...(updates.webhookSecret !== undefined ? { webhookSecret: updates.webhookSecret ?? undefined } : {}),
    ...(updates.status !== undefined ? { status: updates.status } : {}),
    updatedAt: now,
  };

  // If re-activating, reset error count and schedule a check soon
  if (updates.status === 'active' && monitor.status !== 'active') {
    updatedMonitor.errorCount = 0;
    updatedMonitor.lastError = undefined;
    updatedMonitor.nextCheckAt = now;
  }

  try {
    await saveMonitor(updatedMonitor);
    return c.json({ success: true, data: sanitizeMonitor(updatedMonitor) });
  } catch (err) {
    logger.error('Failed to update monitor', { monitorId, error: err instanceof Error ? err.message : String(err) });
    return c.json({ success: false, error: 'Failed to update monitor' }, 500);
  }
});

// ---------------------------------------------------------------------------
// DELETE /v1/monitors/:id — Delete monitor
// ---------------------------------------------------------------------------

app.delete('/:id', authMiddleware, async (c) => {
  const auth = getAuth(c);
  const monitorId = c.req.param('id')!;

  const monitor = await getMonitor(monitorId, auth.accountId);
  if (!monitor) {
    return c.json({ success: false, error: 'Monitor not found' }, 404);
  }

  try {
    await deleteMonitor(monitorId, auth.accountId);
    return c.json({ success: true });
  } catch (err) {
    logger.error('Failed to delete monitor', { monitorId, error: err instanceof Error ? err.message : String(err) });
    return c.json({ success: false, error: 'Failed to delete monitor' }, 500);
  }
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Strip sensitive fields (webhookSecret, lastMarkdown) from API responses */
function sanitizeMonitor(monitor: Monitor): Omit<Monitor, 'webhookSecret' | 'lastMarkdown'> {
  const { webhookSecret: _ws, lastMarkdown: _lm, ...safe } = monitor;
  return safe;
}

export { app as monitorRoutes };
