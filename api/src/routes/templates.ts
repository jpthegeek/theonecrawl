// ---------------------------------------------------------------------------
// TheOneCrawl — /v1/templates routes
//
// Pre-built monitor configurations for common MSP vendor security advisory pages.
// Static data — no Cosmos needed for reads.
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { ensureHydrated, checkCredits } from '../billing/credits.js';
import { validateUrlNotPrivate } from '../shared/ssrf.js';
import { saveMonitor, countMonitors } from '../shared/monitor-store.js';
import { PLAN_MONITOR_LIMITS } from '../shared/constants.js';
import { logger } from '../shared/logger.js';
import { VENDOR_TEMPLATES } from '../data/vendor-templates.js';
import type { Monitor } from '../engine/types.js';

const app = new Hono();

// ---------------------------------------------------------------------------
// GET /v1/templates — List all templates (optional ?category=&tags=)
// ---------------------------------------------------------------------------

app.get('/', async (c) => {
  const categoryFilter = c.req.query('category');
  const tagsFilter = c.req.query('tags');

  let results = VENDOR_TEMPLATES;

  if (categoryFilter) {
    results = results.filter((t) => t.category === categoryFilter);
  }

  if (tagsFilter) {
    const requestedTags = tagsFilter.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);
    if (requestedTags.length > 0) {
      results = results.filter((t) =>
        requestedTags.some((rt) => t.tags.includes(rt)),
      );
    }
  }

  return c.json({
    success: true,
    data: results,
    total: results.length,
  });
});

// ---------------------------------------------------------------------------
// GET /v1/templates/:id — Get a single template
// ---------------------------------------------------------------------------

app.get('/:id', (c) => {
  const id = c.req.param('id')!;
  const template = VENDOR_TEMPLATES.find((t) => t.id === id);

  if (!template) {
    return c.json({ success: false, error: 'Template not found' }, 404);
  }

  return c.json({ success: true, data: template });
});

// ---------------------------------------------------------------------------
// POST /v1/templates/:id/deploy — Create a monitor from a template
// ---------------------------------------------------------------------------

const deploySchema = z.object({
  webhookUrl: z.string().url().max(2048).optional(),
  webhookSecret: z.string().max(256).optional(),
  name: z.string().max(200).optional(),
  frequency: z.enum(['hourly', 'daily', 'weekly']).optional(),
});

app.post('/:id/deploy', authMiddleware, async (c) => {
  const templateId = c.req.param('id')!;
  const template = VENDOR_TEMPLATES.find((t) => t.id === templateId);

  if (!template) {
    return c.json({ success: false, error: 'Template not found' }, 404);
  }

  const auth = getAuth(c);

  const body = await c.req.json().catch(() => ({}));
  const parsed = deploySchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const overrides = parsed.data;

  // SSRF check on template URL
  const ssrfCheck = await validateUrlNotPrivate(template.url);
  if (!ssrfCheck.valid) {
    return c.json({ success: false, error: ssrfCheck.error ?? 'Template URL is not accessible' }, 400);
  }

  // SSRF check on webhook URL if provided
  if (overrides.webhookUrl) {
    const webhookSsrf = await validateUrlNotPrivate(overrides.webhookUrl);
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
    url: template.url,
    name: overrides.name ?? `${template.vendor} — ${template.name}`,
    frequency: overrides.frequency ?? template.frequency,
    changeType: template.changeType,
    keywords: template.keywords,
    webhookUrl: overrides.webhookUrl,
    webhookSecret: overrides.webhookSecret,
    status: 'active',
    // Schedule first check immediately
    nextCheckAt: now,
    errorCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await saveMonitor(monitor);

    // Strip sensitive fields from response
    const { webhookSecret: _ws, lastMarkdown: _lm, ...safeMonitor } = monitor;
    return c.json({ success: true, data: safeMonitor, template: templateId }, 201);
  } catch (err) {
    logger.error('Failed to deploy template monitor', {
      templateId,
      error: err instanceof Error ? err.message : String(err),
    });
    return c.json({ success: false, error: 'Failed to create monitor' }, 500);
  }
});

export { app as templateRoutes };
