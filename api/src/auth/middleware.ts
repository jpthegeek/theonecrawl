// ---------------------------------------------------------------------------
// TheOneCrawl — Hono auth middleware
// ---------------------------------------------------------------------------

import type { Context, Next } from 'hono';
import { validateApiKey, type AuthContext } from './api-keys.js';
import { checkRateLimit } from './rate-limiter.js';

/**
 * Bearer token auth middleware.
 * Extracts API key from Authorization header, validates it, attaches
 * AuthContext to the request, and enforces rate limits.
 */
export async function authMiddleware(c: Context, next: Next): Promise<Response | void> {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    return c.json({ success: false, error: 'Missing Authorization header. Use: Bearer tc_live_...' }, 401);
  }

  const parts = authHeader.split(' ');
  if (parts[0]?.toLowerCase() !== 'bearer' || !parts[1]) {
    return c.json({ success: false, error: 'Invalid Authorization format. Use: Bearer <api_key>' }, 401);
  }

  const apiKey = parts[1];
  const auth = await validateApiKey(apiKey);

  if (!auth) {
    return c.json({ success: false, error: 'Invalid or revoked API key' }, 401);
  }

  // Rate limiting
  const rateResult = checkRateLimit(`rate:${auth.accountId}`, auth.rateLimits.requestsPerMin);
  c.header('X-RateLimit-Limit', String(rateResult.limit));
  c.header('X-RateLimit-Remaining', String(rateResult.remaining));
  c.header('X-RateLimit-Reset', String(Math.ceil(rateResult.resetMs / 1000)));

  if (!rateResult.allowed) {
    return c.json(
      { success: false, error: 'Rate limit exceeded. Please slow down.' },
      429,
    );
  }

  // Attach auth context
  c.set('auth', auth);
  await next();
}

/**
 * Get auth context from request (set by authMiddleware).
 */
export function getAuth(c: Context): AuthContext {
  return c.get('auth') as AuthContext;
}
