// ---------------------------------------------------------------------------
// TheOneCrawl — POST /v1/scrape (Firecrawl-compatible synchronous scrape)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { consumeCredit, checkCredits } from '../billing/credits.js';
import { crawlWebsite } from '../engine/crawler.js';
import { toMarkdown } from '../engine/markdown-converter.js';
import { isPrivateHost } from '../shared/ssrf.js';
import type { ScrapeResponse, ScrapeFormat } from '../engine/types.js';

const scrapeSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  formats: z.array(z.enum(['markdown', 'html', 'rawHtml', 'screenshot', 'links', 'extract', 'cms_blocks']))
    .optional()
    .default(['markdown']),
  onlyMainContent: z.boolean().optional().default(true),
  includeTags: z.array(z.string()).optional(),
  excludeTags: z.array(z.string()).optional(),
  waitFor: z.number().int().min(0).max(30000).optional(),
  timeout: z.number().int().min(5000).max(120000).optional().default(30000),
  actions: z.array(z.unknown()).optional(),
  extract: z.object({
    schema: z.record(z.unknown()).optional(),
    prompt: z.string().optional(),
  }).optional(),
});

const app = new Hono();

app.post('/', authMiddleware, async (c) => {
  const auth = getAuth(c);

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = scrapeSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { url, formats, onlyMainContent, timeout } = parsed.data;

  // SSRF check
  try {
    const parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return c.json({ success: false, error: 'URL must use http or https protocol' }, 400);
    }
    if (isPrivateHost(parsedUrl.hostname)) {
      return c.json({ success: false, error: 'Cannot scrape private or internal addresses' }, 400);
    }
  } catch {
    return c.json({ success: false, error: 'Invalid URL' }, 400);
  }

  // Check credits
  const credits = checkCredits(auth.accountId);
  if (credits.remaining <= 0) {
    return c.json({
      success: false,
      error: 'Insufficient credits',
      credits,
    }, 402);
  }

  // Consume credit
  const consumed = consumeCredit(auth.accountId);
  if (!consumed) {
    return c.json({ success: false, error: 'Insufficient credits' }, 402);
  }

  try {
    const result = await crawlWebsite(url, {
      maxPages: 1,
      maxDepth: 0,
      extractMedia: false,
      convertToBlocks: formats.includes('cms_blocks'),
      waitForJs: true,
      viewport: { width: 1440, height: 900 },
      timeout,
      respectRobotsTxt: true,
      userAgent: 'TheOneCrawl/1.0 (+https://theonecrawl.app/bot; compatible)',
      onlyMainContent,
      formats: formats as ScrapeFormat[],
    });

    const page = result.pages[0];
    if (!page) {
      return c.json({ success: false, error: 'Failed to scrape page' }, 500);
    }

    // Build response based on requested formats
    const data: ScrapeResponse['data'] = {
      metadata: {
        title: page.title,
        description: page.description,
        language: result.siteMetadata.language,
        ogImage: result.siteMetadata.ogImage || undefined,
        favicon: result.siteMetadata.favicon || undefined,
        statusCode: page.statusCode,
        sourceURL: page.url,
      },
    };

    if (formats.includes('markdown')) {
      data.markdown = toMarkdown(page.extractedContent, { onlyMainContent });
    }
    if (formats.includes('html')) {
      data.html = page.html;
    }
    if (formats.includes('rawHtml')) {
      data.rawHtml = page.html;
    }
    if (formats.includes('screenshot') && page.screenshot) {
      data.screenshot = page.screenshot;
    }
    if (formats.includes('links')) {
      data.links = page.extractedContent.links;
    }
    if (formats.includes('cms_blocks') && page.cmsBlocks) {
      data.cms_blocks = page.cmsBlocks;
      data.designSystem = result.themeSuggestion;
    }

    return c.json({ success: true, data } satisfies ScrapeResponse);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Scrape failed';
    return c.json({ success: false, error: message }, 500);
  }
});

export { app as scrapeRoutes };
