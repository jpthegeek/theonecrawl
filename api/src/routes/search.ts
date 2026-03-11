// ---------------------------------------------------------------------------
// TheOneCrawl — POST /v1/search (Search + optional scrape)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { consumeCredit, consumeCredits, checkCredits, recordUsageEvent, ensureHydrated, refundCredit, refundCredits } from '../billing/credits.js';
import { CREDIT_COSTS } from '../shared/constants.js';
import { crawlWebsite } from '../engine/crawler.js';
import { toMarkdown } from '../engine/markdown-converter.js';
import { validateUrlNotPrivate } from '../shared/ssrf.js';
import { searchWeb } from '../shared/search-provider.js';
import { logger } from '../shared/logger.js';
import { checkRateLimit } from '../auth/rate-limiter.js';
import { trackCreditConsumption } from '../auth/abuse-detection.js';
import type { SearchResult } from '../shared/search-provider.js';

const searchSchema = z.object({
  query: z.string().min(1).max(500).trim(),
  limit: z.number().int().min(1).max(10).optional().default(5),
  scrapeResults: z.boolean().optional().default(false),
});

const app = new Hono();

// More aggressive rate limit for search — 10 requests per minute per account
const searchRateLimit = async (c: any, next: any) => {
  const auth = c.get('auth') as { accountId: string } | undefined;
  const key = auth ? `search:account:${auth.accountId}` : `search:ip:${c.req.header('x-forwarded-for') || 'unknown'}`;
  const result = await checkRateLimit(key, 10);
  if (!result.allowed) {
    c.header('Retry-After', String(Math.ceil(result.resetMs / 1000)));
    return c.json({ success: false, error: 'Search rate limit exceeded (10 requests/min)' }, 429);
  }
  return next();
};

app.post('/', authMiddleware, searchRateLimit, async (c) => {
  const auth = getAuth(c);

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = searchSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { query, limit, scrapeResults } = parsed.data;

  // Ensure credits are loaded from Cosmos
  await ensureHydrated(auth.accountId);

  // Calculate total credit cost: 1 for search + 1 per page if scraping
  const searchCost = CREDIT_COSTS.search;
  const scrapeCost = scrapeResults ? limit * CREDIT_COSTS.search_scrape_page : 0;
  const totalCost = searchCost + scrapeCost;

  // Check credits
  const credits = checkCredits(auth.accountId);
  if (credits.remaining < searchCost) {
    return c.json({ success: false, error: 'Insufficient credits', credits }, 402);
  }

  // Consume the search credit first
  const consumed = consumeCredit(auth.accountId);
  if (!consumed) {
    return c.json({ success: false, error: 'Insufficient credits' }, 402);
  }
  recordUsageEvent(auth.accountId, 'search', 1, query);
  void trackCreditConsumption(auth.accountId, 1, credits.total);

  let creditsUsed = 1;

  try {
    // Perform the search
    const searchResults = await searchWeb(query, limit);

    // If not scraping, return results immediately
    if (!scrapeResults || searchResults.length === 0) {
      return c.json({
        success: true,
        results: searchResults,
        creditsUsed,
      });
    }

    // Scrape each result page
    interface EnrichedResult extends SearchResult {
      markdown?: string;
    }

    const enriched: EnrichedResult[] = await Promise.all(
      searchResults.map(async (result): Promise<EnrichedResult> => {
        // Check if we have credits remaining before each page scrape
        const currentCredits = checkCredits(auth.accountId);
        if (currentCredits.remaining <= 0) {
          return { ...result };
        }

        // SSRF check
        const ssrfCheck = await validateUrlNotPrivate(result.url);
        if (!ssrfCheck.valid) {
          return { ...result };
        }

        // Consume 1 credit per page
        const pageConsumed = consumeCredit(auth.accountId);
        if (!pageConsumed) {
          return { ...result };
        }
        creditsUsed += 1;
        recordUsageEvent(auth.accountId, 'search_scrape_page', 1, result.url);

        try {
          const crawlResult = await crawlWebsite(result.url, {
            maxPages: 1,
            maxDepth: 0,
            extractMedia: false,
            convertToBlocks: false,
            waitForJs: true,
            viewport: { width: 1440, height: 900 },
            timeout: 15_000, // Shorter timeout for search results
            respectRobotsTxt: true,
            userAgent: 'TheOneCrawl/1.0 (+https://theonecrawl.app/bot; compatible)',
            onlyMainContent: true,
            formats: ['markdown'],
          });

          const page = crawlResult.pages[0];
          if (!page) return { ...result };

          const markdown = toMarkdown(page.extractedContent, { onlyMainContent: true });
          return { ...result, markdown };
        } catch (err) {
          // Refund the page credit on failure
          refundCredit(auth.accountId);
          creditsUsed -= 1;
          logger.warn('Search result page scrape failed', {
            url: result.url,
            error: err instanceof Error ? err.message : String(err),
          });
          return { ...result };
        }
      }),
    );

    return c.json({
      success: true,
      results: enriched,
      creditsUsed,
    });
  } catch (err) {
    // Refund search credit on complete failure
    refundCredit(auth.accountId);
    logger.error('Search failed', {
      error: err instanceof Error ? err.message : String(err),
    });
    return c.json({ success: false, error: 'Search failed' }, 500);
  }
});

export { app as searchRoutes };
