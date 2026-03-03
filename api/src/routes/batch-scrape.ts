// ---------------------------------------------------------------------------
// TheOneCrawl — POST /v1/batch/scrape (batch scraping endpoint)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { checkCredits, consumeCredits, recordUsageEvent, ensureHydrated, refundCredits } from '../billing/credits.js';
import { enqueueBatch, getBatch } from '../engine/queue.js';
import { validateUrlNotPrivate } from '../shared/ssrf.js';
import { logger } from '../shared/logger.js';
import { DEFAULT_CRAWL_OPTIONS } from '../engine/types.js';
import { trackCreditConsumption } from '../auth/abuse-detection.js';
import type { ScrapeFormat } from '../engine/types.js';

const batchScrapeSchema = z.object({
  urls: z.array(z.string().url('Each URL must be valid').max(2048)).min(1).max(100),
  formats: z
    .array(z.enum(['markdown', 'html', 'rawHtml', 'screenshot', 'links', 'cms_blocks']))
    .optional()
    .default(['markdown']),
  onlyMainContent: z.boolean().optional().default(true),
  includeTags: z.array(z.string().max(200)).max(20).optional(),
  excludeTags: z.array(z.string().max(200)).max(20).optional(),
  webhook: z.string().url().max(2048).optional(),
  webhookSecret: z.string().max(256).optional(),
});

const app = new Hono();

// POST /v1/batch/scrape — Start batch scrape
app.post('/', authMiddleware, async (c) => {
  const auth = getAuth(c);

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = batchScrapeSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { urls, formats, onlyMainContent, includeTags, excludeTags, webhook, webhookSecret } = parsed.data;

  // SSRF check all URLs
  for (const url of urls) {
    const ssrfCheck = await validateUrlNotPrivate(url);
    if (!ssrfCheck.valid) {
      return c.json({ success: false, error: `${ssrfCheck.error}: ${url}` }, 400);
    }
  }

  // Webhook SSRF check
  if (webhook) {
    const webhookCheck = await validateUrlNotPrivate(webhook);
    if (!webhookCheck.valid) {
      return c.json({ success: false, error: webhookCheck.error ?? 'Invalid webhook URL' }, 400);
    }
  }

  // Ensure credits are loaded from Cosmos
  await ensureHydrated(auth.accountId);

  // Check credits (1 per URL)
  const credits = checkCredits(auth.accountId);
  if (credits.remaining < urls.length) {
    return c.json({
      success: false,
      error: `Insufficient credits. Need ${urls.length}, have ${credits.remaining}.`,
      credits,
    }, 402);
  }

  // Consume credits upfront
  const consumed = consumeCredits(auth.accountId, urls.length);
  if (consumed < urls.length) {
    return c.json({ success: false, error: 'Insufficient credits' }, 402);
  }
  recordUsageEvent(auth.accountId, 'scrape', urls.length, 'batch');
  void trackCreditConsumption(auth.accountId, urls.length, credits.total);

  try {
    const batchId = await enqueueBatch(
      auth.accountId,
      urls,
      {
        ...DEFAULT_CRAWL_OPTIONS,
        maxPages: 1,
        maxDepth: 0,
        convertToBlocks: formats.includes('cms_blocks'),
        onlyMainContent,
        formats: formats as ScrapeFormat[],
        includeTags,
        excludeTags,
      },
      webhook,
      webhookSecret,
    );

    return c.json({
      success: true,
      id: batchId,
      url: `https://api.theonecrawl.app/v1/batch/scrape/${batchId}`,
    }, 201);
  } catch (err) {
    // Refund credits consumed upfront since batch couldn't be enqueued
    refundCredits(auth.accountId, urls.length);
    logger.error('Batch scrape start failed', { error: err instanceof Error ? err.message : String(err) });
    return c.json({ success: false, error: 'Failed to start batch scrape' }, 503);
  }
});

// GET /v1/batch/scrape/:id — Poll batch status
app.get('/:id', authMiddleware, async (c) => {
  const auth = getAuth(c);
  const batchId = c.req.param('id');
  const batch = getBatch(batchId);

  if (!batch) {
    return c.json({ success: false, error: 'Batch job not found' }, 404);
  }

  if (batch.accountId !== auth.accountId) {
    return c.json({ success: false, error: 'Batch job not found' }, 404);
  }

  // Cap HTML in results to prevent oversized responses
  const data = batch.results.map((r) => ({
    ...r,
    html: r.html && r.html.length > 100_000
      ? r.html.slice(0, 100_000) + '<!-- truncated -->'
      : r.html,
  }));

  return c.json({
    success: true,
    status: batch.status,
    total: batch.urls.length,
    completed: batch.completedCount,
    creditsUsed: batch.completedCount,
    data,
    expiresAt: batch.completedAt
      ? new Date(new Date(batch.completedAt).getTime() + 60 * 60 * 1000).toISOString()
      : undefined,
  });
});

export { app as batchScrapeRoutes };
