// ---------------------------------------------------------------------------
// TheOneCrawl — Hono auth middleware
// ---------------------------------------------------------------------------

import type { Context, Next } from 'hono';
import { validateApiKey, type AuthContext } from './api-keys.js';
import { checkRateLimit } from './rate-limiter.js';
import { getAccountStatus, trackRequest } from './abuse-detection.js';
import { extractClientIp } from '../shared/request-utils.js';
import { ABUSE_SCORE_THRESHOLDS } from '../shared/constants.js';

/**
 * Bearer token auth middleware.
 * Extracts API key from Authorization header, validates it, attaches
 * AuthContext to the request, and enforces rate limits + abuse checks.
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

  // Abuse status check
  const abuseStatus = await getAccountStatus(auth.accountId);
  if (abuseStatus === 'suspended' || abuseStatus === 'banned') {
    return c.json({ success: false, error: 'Account suspended due to policy violation' }, 403);
  }

  if (abuseStatus === 'warned') {
    c.header('X-Abuse-Warning', 'Unusual activity detected. Contact support if this is unexpected.');
  }

  // Rate limiting — throttled accounts get 50% reduction
  let effectiveRateLimit = auth.rateLimits.requestsPerMin;
  if (abuseStatus === 'throttled') {
    effectiveRateLimit = Math.ceil(effectiveRateLimit * 0.5);
  }

  const rateResult = await checkRateLimit(`rate:${auth.accountId}`, effectiveRateLimit);
  c.header('X-RateLimit-Limit', String(rateResult.limit));
  c.header('X-RateLimit-Remaining', String(rateResult.remaining));
  c.header('X-RateLimit-Reset', String(Math.ceil(rateResult.resetMs / 1000)));

  if (!rateResult.allowed) {
    return c.json(
      { success: false, error: 'Rate limit exceeded. Please slow down.' },
      429,
    );
  }

  // Track request for abuse detection (fire-and-forget)
  const ip = extractClientIp(c);
  void trackRequest(auth.accountId, ip);

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
