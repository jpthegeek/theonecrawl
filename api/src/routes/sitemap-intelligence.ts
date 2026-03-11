// ---------------------------------------------------------------------------
// TheOneCrawl — POST /v1/sitemap (Enhanced sitemap intelligence)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import * as cheerio from 'cheerio';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { consumeCredit, consumeCredits, checkCredits, recordUsageEvent, ensureHydrated, refundCredit, refundCredits } from '../billing/credits.js';
import { CREDIT_COSTS } from '../shared/constants.js';
import { crawlWebsite } from '../engine/crawler.js';
import { validateUrlNotPrivate, fetchWithSsrfProtection } from '../shared/ssrf.js';
import { logger } from '../shared/logger.js';
import { trackCreditConsumption } from '../auth/abuse-detection.js';

const sitemapSchema = z.object({
  url: z.string().url('Must be a valid URL').max(2048),
  includeMetadata: z.boolean().optional().default(false),
  limit: z.number().int().min(1).max(500).optional().default(100),
});

const app = new Hono();

app.post('/', authMiddleware, async (c) => {
  const auth = getAuth(c);

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = sitemapSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { url, includeMetadata, limit } = parsed.data;

  // SSRF check
  const ssrfCheck = await validateUrlNotPrivate(url);
  if (!ssrfCheck.valid) {
    return c.json({ success: false, error: ssrfCheck.error ?? 'Cannot crawl this URL' }, 400);
  }

  // Ensure credits are loaded from Cosmos
  await ensureHydrated(auth.accountId);

  // Determine credit cost
  const creditCost = includeMetadata ? CREDIT_COSTS.sitemap_intelligence : 1;

  // Check credits
  const credits = checkCredits(auth.accountId);
  if (credits.remaining < creditCost) {
    return c.json({ success: false, error: 'Insufficient credits', credits }, 402);
  }

  // Consume credits
  const consumed = consumeCredits(auth.accountId, creditCost);
  if (consumed < creditCost) {
    return c.json({ success: false, error: 'Insufficient credits' }, 402);
  }
  recordUsageEvent(auth.accountId, 'sitemap_intelligence', creditCost, url);
  void trackCreditConsumption(auth.accountId, creditCost, credits.total);

  try {
    // Discover URLs via crawl (same approach as /v1/map)
    const result = await crawlWebsite(url, {
      maxPages: Math.min(limit, 100),
      maxDepth: 3,
      extractMedia: false,
      convertToBlocks: false,
      waitForJs: true,
      viewport: { width: 1440, height: 900 },
      timeout: 15_000,
      respectRobotsTxt: true,
      userAgent: 'TheOneCrawl/1.0 (+https://theonecrawl.app/bot; compatible)',
    });

    // Collect all discovered URLs
    const allUrls = new Set<string>();
    for (const page of result.pages) {
      allUrls.add(page.url);
      for (const link of page.extractedContent.links) {
        if (!link.isExternal) {
          allUrls.add(link.href);
        }
      }
    }

    const urlList = Array.from(allUrls).slice(0, limit);

    // Build result entries
    interface UrlEntry {
      url: string;
      title?: string;
      description?: string;
      lastmod?: string;
    }

    // If not fetching metadata, return URLs only
    if (!includeMetadata) {
      const urls: UrlEntry[] = urlList.map((u) => ({ url: u }));
      return c.json({ success: true, urls, total: urls.length });
    }

    // Fetch lightweight head metadata for up to 20 URLs
    const metadataUrls = urlList.slice(0, 20);
    const urls: UrlEntry[] = await Promise.all(
      metadataUrls.map(async (u): Promise<UrlEntry> => {
        try {
          const ssrf = await validateUrlNotPrivate(u);
          if (!ssrf.valid) return { url: u };

          const resp = await fetchWithSsrfProtection(u, {
            method: 'GET',
            headers: {
              'User-Agent': 'TheOneCrawl/1.0 (+https://theonecrawl.app/bot; compatible)',
              'Accept': 'text/html',
            },
          });

          if (!resp.ok) return { url: u };

          // Read only the first 32 KB to get <head> content
          const fullText = await resp.text();
          const partial = fullText.slice(0, 32768);

          const $ = cheerio.load(partial);

          const title =
            $('meta[property="og:title"]').attr('content') ||
            $('title').first().text().trim() ||
            undefined;

          const description =
            $('meta[name="description"]').attr('content') ||
            $('meta[property="og:description"]').attr('content') ||
            undefined;

          const lastmod = resp.headers.get('last-modified') || undefined;

          return { url: u, title, description, lastmod };
        } catch {
          // Metadata fetch failed — return URL without metadata
          return { url: u };
        }
      }),
    );

    // Append remaining URLs (beyond the 20 metadata limit) without metadata
    const remainingUrls: UrlEntry[] = urlList.slice(20).map((u) => ({ url: u }));
    const allEntries = [...urls, ...remainingUrls];

    return c.json({ success: true, urls: allEntries, total: allEntries.length });
  } catch (err) {
    // Refund credits on failure
    refundCredits(auth.accountId, creditCost);
    logger.error('Sitemap intelligence failed', {
      error: err instanceof Error ? err.message : String(err),
    });
    return c.json({ success: false, error: 'Sitemap discovery failed' }, 500);
  }
});

export { app as sitemapIntelligenceRoutes };
