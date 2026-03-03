// ---------------------------------------------------------------------------
// TheOneCrawl — POST /v1/scrape (Firecrawl-compatible synchronous scrape)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { consumeCredit, consumeCredits, checkCredits, recordUsageEvent, ensureHydrated, refundCredit, refundCredits } from '../billing/credits.js';
import { CREDIT_COSTS } from '../shared/constants.js';
import { crawlWebsite } from '../engine/crawler.js';
import { toMarkdown } from '../engine/markdown-converter.js';
import { validateUrlNotPrivate } from '../shared/ssrf.js';
import { browserActionSchema } from '../engine/actions.js';
import { getAnthropicClient } from '../shared/anthropic.js';
import { logger } from '../shared/logger.js';
import { trackCreditConsumption } from '../auth/abuse-detection.js';
import type { ScrapeResponse, ScrapeFormat } from '../engine/types.js';

const headerValueSchema = z.string().max(4096).refine(
  (v) => !/[\r\n]/.test(v),
  'Header value must not contain newlines',
);

const scrapeSchema = z.object({
  url: z.string().url('Must be a valid URL').max(2048),
  formats: z.array(z.enum(['markdown', 'html', 'rawHtml', 'screenshot', 'links', 'extract', 'cms_blocks']))
    .optional()
    .default(['markdown']),
  onlyMainContent: z.boolean().optional().default(true),
  includeTags: z.array(z.string().max(200)).max(20).optional(),
  excludeTags: z.array(z.string().max(200)).max(20).optional(),
  waitFor: z.union([
    z.number().int().min(0).max(30000),
    z.string().max(200),
  ]).optional(),
  timeout: z.number().int().min(5000).max(60000).optional().default(30000),
  actions: z.array(browserActionSchema).max(20).optional(),
  headers: z.record(z.string().max(200), headerValueSchema)
    .optional()
    .refine(
      (obj) => !obj || Object.keys(obj).length <= 20,
      'Maximum 20 headers allowed',
    ),
  mobile: z.boolean().optional(),
  extract: z.object({
    schema: z.record(z.unknown()).optional().refine(
      (s) => !s || JSON.stringify(s).length <= 10240,
      'Extract schema must not exceed 10 KB',
    ),
    prompt: z.string().max(10000).optional(),
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

  const { url, formats, onlyMainContent, timeout, waitFor, actions, headers, mobile, includeTags, excludeTags } = parsed.data;

  // SSRF check (includes DNS rebinding protection)
  const ssrfCheck = await validateUrlNotPrivate(url);
  if (!ssrfCheck.valid) {
    return c.json({ success: false, error: ssrfCheck.error ?? 'Cannot scrape this URL' }, 400);
  }

  // Ensure credits are loaded from Cosmos
  await ensureHydrated(auth.accountId);

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
  recordUsageEvent(auth.accountId, 'scrape', 1, url);
  void trackCreditConsumption(auth.accountId, 1, credits.total);

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
      waitFor,
      actions,
      headers,
      mobile,
      includeTags,
      excludeTags,
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
    if (page.actionResults && page.actionResults.length > 0) {
      data.actions = page.actionResults;
    }

    // Inline extraction: if formats includes 'extract' and extract config provided
    if (formats.includes('extract') && parsed.data.extract) {
      const { extract } = parsed.data;
      if (extract.schema || extract.prompt) {
        const extractCredits = checkCredits(auth.accountId);
        if (extractCredits.remaining >= CREDIT_COSTS.ai_extract) {
          // Consume credits before LLM call to prevent free usage on crash
          const extractConsumed = consumeCredits(auth.accountId, CREDIT_COSTS.ai_extract);
          if (extractConsumed >= CREDIT_COSTS.ai_extract) {
          const anthropic = getAnthropicClient();
          if (anthropic) {
            try {
              const pageMarkdown = data.markdown ?? toMarkdown(page.extractedContent, { onlyMainContent });
              const systemPrompt = extract.schema
                ? `Extract structured data from the web page content. Return valid JSON matching this schema:\n${JSON.stringify(extract.schema, null, 2)}`
                : 'Extract structured data from the web page content. Return valid JSON.';
              const userPrompt = `${extract.prompt ?? 'Extract the key information.'}\n\n${pageMarkdown.slice(0, 30_000)}`;

              const message = await anthropic.messages.create({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 4096,
                system: systemPrompt,
                messages: [{ role: 'user', content: userPrompt }],
              });

              const textContent = message.content.find((b) => b.type === 'text');
              const raw = textContent?.text ?? '';
              try {
                const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/) ?? [null, raw];
                data.extract = JSON.parse(jsonMatch[1]?.trim() ?? raw);
              } catch {
                data.extract = raw;
              }
            } catch (err) {
              // Refund extract credits on LLM failure
              refundCredits(auth.accountId, CREDIT_COSTS.ai_extract);
              logger.error('Inline extraction failed', { error: err instanceof Error ? err.message : String(err) });
              // Non-fatal — return scrape data without extraction
            }
          } else {
            // Anthropic not configured — refund the extract credits
            refundCredits(auth.accountId, CREDIT_COSTS.ai_extract);
          }
          }
        }
      }
    }

    return c.json({ success: true, data } satisfies ScrapeResponse);
  } catch (err) {
    // Refund the credit consumed before the crawl
    refundCredit(auth.accountId);
    logger.error('Scrape failed', { error: err instanceof Error ? err.message : String(err) });
    return c.json({ success: false, error: 'Scrape failed' }, 500);
  }
});

export { app as scrapeRoutes };
