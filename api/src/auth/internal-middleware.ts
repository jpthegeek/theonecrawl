// ---------------------------------------------------------------------------
// TheOneCrawl — Internal service authentication middleware
//
// Used by /v1/internal/* endpoints to authenticate inter-product calls from
// other The One Stack products (CRM, Code, Protect, etc.).
// No credits are deducted for internal calls.
// ---------------------------------------------------------------------------

import type { Context, Next } from 'hono';
import { timingSafeEqual } from 'node:crypto';
import { checkRateLimit } from './rate-limiter.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface InternalAuthContext {
  sourceProduct: string;
  sourceAccountId: string;
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

/**
 * Internal service auth middleware.
 * Validates X-Integration-Key header using timingSafeEqual to prevent
 * timing attacks. Sets internalAuth on the context.
 *
 * Rate limit: 600 requests/min per source product (much higher than user limits).
 */
export async function internalMiddleware(c: Context, next: Next): Promise<Response | void> {
  const integrationKey = c.req.header('X-Integration-Key');
  const expectedKey = process.env['INTERNAL_SERVICE_KEY'];

  if (!expectedKey) {
    return c.json({ success: false, error: 'Internal service not configured' }, 503);
  }

  if (!integrationKey) {
    return c.json({ success: false, error: 'Missing X-Integration-Key header' }, 401);
  }

  // Constant-time comparison to prevent timing attacks
  let valid = false;
  try {
    const expected = Buffer.from(expectedKey, 'utf8');
    const provided = Buffer.from(integrationKey, 'utf8');
    // Must be same length before timingSafeEqual (different lengths = definitely invalid)
    if (expected.length === provided.length) {
      valid = timingSafeEqual(expected, provided);
    }
  } catch {
    valid = false;
  }

  if (!valid) {
    return c.json({ success: false, error: 'Invalid integration key' }, 401);
  }

  const sourceProduct = c.req.header('X-Source-Product');
  if (!sourceProduct) {
    return c.json({ success: false, error: 'Missing X-Source-Product header' }, 400);
  }

  const sourceAccountId = c.req.header('X-Source-Account-Id') ?? '';

  // Rate limit per source product: 600/min
  const rateResult = await checkRateLimit(`internal:${sourceProduct}`, 600);
  c.header('X-RateLimit-Limit', String(rateResult.limit));
  c.header('X-RateLimit-Remaining', String(rateResult.remaining));
  c.header('X-RateLimit-Reset', String(Math.ceil(rateResult.resetMs / 1000)));

  if (!rateResult.allowed) {
    return c.json({ success: false, error: 'Rate limit exceeded. Please slow down.' }, 429);
  }

  // Attach internal auth context
  c.set('internalAuth', { sourceProduct, sourceAccountId } satisfies InternalAuthContext);
  await next();
}

/**
 * Get internal auth context from request (set by internalMiddleware).
 */
export function getInternalAuth(c: Context): InternalAuthContext {
  return c.get('internalAuth') as InternalAuthContext;
}
