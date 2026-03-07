// ---------------------------------------------------------------------------
// TheOneCrawl — /v1/crawl routes (Firecrawl-compatible async crawl)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { checkCredits, ensureHydrated } from '../billing/credits.js';
import { enqueue, getJob, deleteJob } from '../engine/queue.js';
import { toMarkdown } from '../engine/markdown-converter.js';
import { validateUrlNotPrivate } from '../shared/ssrf.js';
import { browserActionSchema } from '../engine/actions.js';
import { logger } from '../shared/logger.js';
import { DEFAULT_CRAWL_OPTIONS } from '../engine/types.js';
import type { CrawlStatusResponse, ScrapeFormat } from '../engine/types.js';

const headerValueSchema = z.string().max(4096).refine(
  (v) => !/[\r\n]/.test(v),
  'Header value must not contain newlines',
);

const crawlSchema = z.object({
  url: z.string().url('Must be a valid URL').max(2048),
  limit: z.number().int().min(1).max(100).optional().default(10),
  maxDepth: z.number().int().min(0).max(5).optional().default(2),
  includePaths: z.array(z.string().max(200)).max(20).optional(),
  excludePaths: z.array(z.string().max(200)).max(20).optional(),
  scrapeOptions: z.object({
    formats: z.array(z.enum(['markdown', 'html', 'rawHtml', 'screenshot', 'links', 'cms_blocks']))
      .optional()
      .default(['markdown']),
    onlyMainContent: z.boolean().optional().default(true),
    actions: z.array(browserActionSchema).max(20).optional(),
    headers: z.record(z.string().max(200), headerValueSchema)
      .optional()
      .refine(
        (obj) => !obj || Object.keys(obj).length <= 20,
        'Maximum 20 headers allowed',
      ),
    mobile: z.boolean().optional(),
  }).optional(),
  webhook: z.string().url().max(2048).optional(),
  webhookSecret: z.string().max(256).optional(),
  allowBackwardLinks: z.boolean().optional().default(false),
  ignoreSitemap: z.boolean().optional().default(false),
});

const app = new Hono();

// POST /v1/crawl — Start async crawl
app.post('/', authMiddleware, async (c) => {
  const auth = getAuth(c);

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = crawlSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { url, limit, maxDepth, includePaths, excludePaths, scrapeOptions, webhook, webhookSecret } = parsed.data;

  // SSRF check (includes DNS rebinding protection)
  const ssrfCheck = await validateUrlNotPrivate(url);
  if (!ssrfCheck.valid) {
    return c.json({ success: false, error: ssrfCheck.error ?? 'Cannot crawl this URL' }, 400);
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

  // Check credits
  const credits = checkCredits(auth.accountId);
  if (credits.remaining <= 0) {
    return c.json({ success: false, error: 'Insufficient credits', credits }, 402);
  }

  const formats = (scrapeOptions?.formats ?? ['markdown']) as ScrapeFormat[];

  try {
    const jobId = await enqueue(auth.accountId, url, {
      ...DEFAULT_CRAWL_OPTIONS,
      maxPages: limit,
      maxDepth,
      convertToBlocks: formats.includes('cms_blocks'),
      onlyMainContent: scrapeOptions?.onlyMainContent ?? true,
      formats,
      allowedPatterns: includePaths,
      blockedPatterns: excludePaths,
      actions: scrapeOptions?.actions,
      headers: scrapeOptions?.headers,
      mobile: scrapeOptions?.mobile,
    }, webhook, webhookSecret);

    return c.json({
      success: true,
      id: jobId,
      url: `https://api.theonecrawl.app/v1/crawl/${jobId}`,
    }, 201);
  } catch (err) {
    logger.error('Crawl start failed', { error: err instanceof Error ? err.message : String(err) });
    return c.json({ success: false, error: 'Failed to start crawl' }, 503);
  }
});

// GET /v1/crawl/:id — Poll crawl status
app.get('/:id', authMiddleware, async (c) => {
  const auth = getAuth(c);
  const jobId = c.req.param('id')!;
  const job = getJob(jobId);

  if (!job) {
    return c.json({ success: false, error: 'Crawl job not found' }, 404);
  }

  // Verify ownership
  if (job.accountId !== auth.accountId) {
    return c.json({ success: false, error: 'Crawl job not found' }, 404);
  }

  // Map internal status to Firecrawl status
  const statusMap: Record<string, string> = {
    queued: 'scraping',
    crawling: 'scraping',
    extracting: 'scraping',
    converting: 'scraping',
    complete: 'completed',
    failed: 'failed',
  };

  const response: CrawlStatusResponse = {
    success: true,
    status: (statusMap[job.status] ?? 'scraping') as CrawlStatusResponse['status'],
    total: job.progress?.pagesQueued ?? 0,
    completed: job.progress?.pagesCompleted ?? 0,
    creditsUsed: job.progress?.pagesCompleted ?? 0,
    data: [],
  };

  if (job.result) {
    response.data = job.result.pages.map((page) => ({
      markdown: page.markdown ?? toMarkdown(page.extractedContent, {
        onlyMainContent: job.options.onlyMainContent,
      }),
      html: page.html,
      metadata: {
        title: page.title,
        description: page.description,
        sourceURL: page.url,
        statusCode: page.statusCode,
      },
      links: page.extractedContent.links,
      cms_blocks: page.cmsBlocks,
    }));
  }

  return c.json(response);
});

// DELETE /v1/crawl/:id — Cancel crawl
app.delete('/:id', authMiddleware, async (c) => {
  const auth = getAuth(c);
  const jobId = c.req.param('id')!;
  const job = getJob(jobId);

  if (!job || job.accountId !== auth.accountId) {
    return c.json({ success: false, error: 'Crawl job not found' }, 404);
  }

  deleteJob(jobId);
  return c.json({ success: true, status: 'cancelled' });
});

// GET /v1/crawl/:id/cms-blocks — TheOneCrawl exclusive: CMS blocks per page
app.get('/:id/cms-blocks', authMiddleware, async (c) => {
  const auth = getAuth(c);
  const jobId = c.req.param('id')!;
  const pageIndex = Math.max(0, parseInt(c.req.query('page') || '0', 10) || 0);
  const job = getJob(jobId);

  if (!job || job.accountId !== auth.accountId) {
    return c.json({ success: false, error: 'Crawl job not found' }, 404);
  }

  if (job.status !== 'complete' || !job.result) {
    return c.json({
      success: false,
      error: job.status === 'failed' ? `Job failed: ${job.error}` : 'Job still processing',
    }, job.status === 'failed' ? 422 : 202);
  }

  const page = job.result.pages[pageIndex];
  if (!page) {
    return c.json({ success: false, error: `Page ${pageIndex} not found. Total: ${job.result.pages.length}` }, 404);
  }

  return c.json({
    success: true,
    data: {
      jobId: job.id,
      url: page.url,
      blocks: page.cmsBlocks || [],
      headerBlock: job.result.headerBlock,
      footerBlock: job.result.footerBlock,
      themeSuggestion: job.result.themeSuggestion,
      pageIndex,
      totalPages: job.result.pages.length,
    },
  });
});

// GET /v1/crawl/:id/design-system — TheOneCrawl exclusive
app.get('/:id/design-system', authMiddleware, async (c) => {
  const auth = getAuth(c);
  const jobId = c.req.param('id')!;
  const job = getJob(jobId);

  if (!job || job.accountId !== auth.accountId) {
    return c.json({ success: false, error: 'Crawl job not found' }, 404);
  }

  if (job.status !== 'complete' || !job.result) {
    return c.json({
      success: false,
      error: job.status === 'failed' ? `Job failed: ${job.error}` : 'Job still processing',
    }, job.status === 'failed' ? 422 : 202);
  }

  return c.json({
    success: true,
    data: {
      siteMetadata: job.result.siteMetadata,
      themeSuggestion: job.result.themeSuggestion,
      colorPalette: job.result.siteMetadata.colorPalette,
      fonts: {
        primary: job.result.siteMetadata.primaryFont,
        secondary: job.result.siteMetadata.secondaryFont,
      },
      technology: job.result.siteMetadata.technology,
    },
  });
});

export { app as crawlRoutes };
