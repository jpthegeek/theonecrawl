// ---------------------------------------------------------------------------
// TheOneCrawl — /v1/intelligence/* (CVE intelligence feed)
//
// Queries CVE data from NVD and CIRCL APIs with Cosmos DB caching (24h TTL).
// Auth: Bearer token (authMiddleware). 1 credit per live CVE lookup (0 if cached).
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { consumeCredit, checkCredits, recordUsageEvent, ensureHydrated, refundCredit } from '../billing/credits.js';
import { getCachedCve, cacheCve, searchCachedCves } from '../shared/cve-store.js';
import { fetchCve } from '../shared/cve-fetcher.js';
import { probeDomain } from '../shared/domain-probe.js';
import { validateUrlNotPrivate } from '../shared/ssrf.js';
import { logger } from '../shared/logger.js';
import { isCosmosConfigured } from '../shared/cosmos.js';

export const intelligenceRoutes = new Hono();

// ---------------------------------------------------------------------------
// Validation schemas
// ---------------------------------------------------------------------------

// Single CVE lookup by ID
const cveLookupSchema = z.object({
  cveId: z.string()
    .regex(/^CVE-\d{4}-\d{4,}$/i, 'Must be a valid CVE ID (e.g. CVE-2024-12345)')
    .transform((id) => id.toUpperCase()),
});

// Search by vendor/product
const cveSearchSchema = z.object({
  vendor: z.string().max(200).optional(),
  product: z.string().max(200).optional(),
  minCvss: z.number().min(0).max(10).optional(),
  limit: z.number().int().min(1).max(100).optional().default(20),
});

// Combined discriminated union — cveId takes precedence
const cveRequestSchema = z.union([
  cveLookupSchema,
  cveSearchSchema,
]).refine(
  (data) => {
    // At least one filter must be present
    if ('cveId' in data) return true;
    const d = data as z.infer<typeof cveSearchSchema>;
    return !!(d.vendor || d.product || d.minCvss !== undefined);
  },
  'Provide cveId, or at least one of: vendor, product, minCvss',
);

// ---------------------------------------------------------------------------
// POST /v1/intelligence/cve
// ---------------------------------------------------------------------------

intelligenceRoutes.post('/cve', authMiddleware, async (c) => {
  const auth = getAuth(c);

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = cveRequestSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const data = parsed.data;

  // ---------------------------------------------------------------------------
  // Single CVE lookup by ID
  // ---------------------------------------------------------------------------

  if ('cveId' in data) {
    const { cveId } = data;

    // Check cache first (no credit cost for cache hits)
    if (isCosmosConfigured()) {
      try {
        const cached = await getCachedCve(cveId);
        if (cached) {
          logger.info('intelligence.cve.cache_hit', { cveId, accountId: auth.accountId });
          return c.json({ success: true, data: [cached], cached: true });
        }
      } catch (err) {
        // Cache read failure is non-fatal — proceed to live fetch
        logger.warn('intelligence.cve cache read failed', {
          cveId,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    // Cache miss — live fetch costs 1 credit
    await ensureHydrated(auth.accountId);
    const credits = checkCredits(auth.accountId);
    if (credits.remaining <= 0) {
      return c.json({ success: false, error: 'Insufficient credits', credits }, 402);
    }

    const consumed = consumeCredit(auth.accountId);
    if (!consumed) {
      return c.json({ success: false, error: 'Insufficient credits' }, 402);
    }
    recordUsageEvent(auth.accountId, 'scrape', 1, `cve:${cveId}`);

    try {
      const cve = await fetchCve(cveId);

      if (!cve) {
        // Refund — CVE not found is not billable
        refundCredit(auth.accountId);
        return c.json({ success: true, data: [], cached: false });
      }

      // Cache the result (fire-and-forget, non-fatal)
      if (isCosmosConfigured()) {
        void cacheCve(cve).catch((err) => {
          logger.warn('intelligence.cve cache write failed', {
            cveId,
            error: err instanceof Error ? err.message : String(err),
          });
        });
      }

      return c.json({ success: true, data: [cve], cached: false });
    } catch (err) {
      refundCredit(auth.accountId);
      logger.error('intelligence.cve fetch failed', {
        cveId,
        accountId: auth.accountId,
        error: err instanceof Error ? err.message : String(err),
      });
      return c.json({ success: false, error: 'CVE lookup failed' }, 500);
    }
  }

  // ---------------------------------------------------------------------------
  // Search query (vendor/product/minCvss) — cache-only, no live fetch
  // ---------------------------------------------------------------------------

  const searchQuery = data as z.infer<typeof cveSearchSchema>;

  if (!isCosmosConfigured()) {
    return c.json({ success: true, data: [], cached: true });
  }

  try {
    const results = await searchCachedCves({
      vendor: searchQuery.vendor,
      product: searchQuery.product,
      minCvss: searchQuery.minCvss,
      limit: searchQuery.limit,
    });

    return c.json({ success: true, data: results, cached: true });
  } catch (err) {
    logger.error('intelligence.cve search failed', {
      accountId: auth.accountId,
      error: err instanceof Error ? err.message : String(err),
    });
    return c.json({ success: false, error: 'CVE search failed' }, 500);
  }
});

// ---------------------------------------------------------------------------
// POST /v1/intelligence/domain
// ---------------------------------------------------------------------------

const domainIntelligenceSchema = z.object({
  domain: z
    .string()
    .max(253)
    .transform((d) => d.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, ''))
    .refine(
      (d) =>
        /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/.test(d),
      'Must be a valid domain (e.g. example.com)',
    ),
});

intelligenceRoutes.post('/domain', authMiddleware, async (c) => {
  const auth = getAuth(c);

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = domainIntelligenceSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { domain } = parsed.data;
  const homeUrl = `https://${domain}`;

  // SSRF check — prevents probing internal infrastructure
  const ssrfCheck = await validateUrlNotPrivate(homeUrl);
  if (!ssrfCheck.valid) {
    return c.json({ success: false, error: ssrfCheck.error ?? 'Cannot probe this domain' }, 400);
  }

  // Credit check
  await ensureHydrated(auth.accountId);
  const credits = checkCredits(auth.accountId);
  if (credits.remaining <= 0) {
    return c.json({ success: false, error: 'Insufficient credits', credits }, 402);
  }

  const consumed = consumeCredit(auth.accountId);
  if (!consumed) {
    return c.json({ success: false, error: 'Insufficient credits' }, 402);
  }

  try {
    const result = await probeDomain(domain);
    recordUsageEvent(auth.accountId, 'domain_intelligence', 1, domain);
    return c.json({ success: true, data: result, creditsUsed: 1 });
  } catch (err) {
    refundCredit(auth.accountId);
    logger.error('Domain intelligence probe failed', {
      domain,
      error: err instanceof Error ? err.message : String(err),
    });
    return c.json({ success: false, error: 'Domain probe failed' }, 500);
  }
});
