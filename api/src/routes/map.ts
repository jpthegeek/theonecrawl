// ---------------------------------------------------------------------------
// TheOneCrawl — POST /v1/map (Firecrawl-compatible URL discovery)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { consumeCredit, checkCredits } from '../billing/credits.js';
import { crawlWebsite } from '../engine/crawler.js';
import { isPrivateHost } from '../shared/ssrf.js';

const mapSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  search: z.string().optional(),
  limit: z.number().int().min(1).max(5000).optional().default(100),
  ignoreSitemap: z.boolean().optional().default(false),
});

const app = new Hono();

app.post('/', authMiddleware, async (c) => {
  const auth = getAuth(c);

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = mapSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { url, search, limit } = parsed.data;

  // SSRF check
  try {
    const parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return c.json({ success: false, error: 'URL must use http or https protocol' }, 400);
    }
    if (isPrivateHost(parsedUrl.hostname)) {
      return c.json({ success: false, error: 'Cannot map private or internal addresses' }, 400);
    }
  } catch {
    return c.json({ success: false, error: 'Invalid URL' }, 400);
  }

  // Check credits
  const credits = checkCredits(auth.accountId);
  if (credits.remaining <= 0) {
    return c.json({ success: false, error: 'Insufficient credits', credits }, 402);
  }

  consumeCredit(auth.accountId);

  try {
    // Quick crawl to discover URLs (minimal extraction)
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
    const allLinks = new Set<string>();
    for (const page of result.pages) {
      allLinks.add(page.url);
      for (const link of page.extractedContent.links) {
        if (!link.isExternal) {
          allLinks.add(link.href);
        }
      }
    }

    let links = Array.from(allLinks);

    // Filter by search term if provided
    if (search) {
      const searchLower = search.toLowerCase();
      links = links.filter((link) => link.toLowerCase().includes(searchLower));
    }

    return c.json({
      success: true,
      links: links.slice(0, limit),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Map failed';
    return c.json({ success: false, error: message }, 500);
  }
});

export { app as mapRoutes };
