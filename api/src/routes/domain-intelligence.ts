// ---------------------------------------------------------------------------
// TheOneCrawl — POST /v1/intelligence/domain
//
// Monitor a domain for DNS, certificate, and HTTP health.
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { consumeCredit, checkCredits, recordUsageEvent, ensureHydrated, refundCredit } from '../billing/credits.js';
import { validateUrlNotPrivate } from '../shared/ssrf.js';
import { probeDomain } from '../shared/domain-probe.js';
import { logger } from '../shared/logger.js';

const app = new Hono();

// ---------------------------------------------------------------------------
// Validation
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

// ---------------------------------------------------------------------------
// POST /v1/intelligence/domain
// ---------------------------------------------------------------------------

app.post('/', authMiddleware, async (c) => {
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

  // Consume 1 credit before probe
  const consumed = consumeCredit(auth.accountId);
  if (!consumed) {
    return c.json({ success: false, error: 'Insufficient credits' }, 402);
  }

  try {
    const result = await probeDomain(domain);
    recordUsageEvent(auth.accountId, 'domain_intelligence', 1, domain);
    return c.json({ success: true, data: result, creditsUsed: 1 });
  } catch (err) {
    // Refund on unexpected failure
    refundCredit(auth.accountId);
    logger.error('Domain intelligence probe failed', {
      domain,
      error: err instanceof Error ? err.message : String(err),
    });
    return c.json({ success: false, error: 'Domain probe failed' }, 500);
  }
});

export { app as domainIntelligenceRoutes };
