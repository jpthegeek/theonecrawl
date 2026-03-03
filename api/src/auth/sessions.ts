// ---------------------------------------------------------------------------
// TheOneCrawl — HMAC-signed stateless session tokens
// ---------------------------------------------------------------------------

import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Context } from 'hono';
import { setCookie, getCookie, deleteCookie } from 'hono/cookie';
import { SESSION_COOKIE_NAME, SESSION_COOKIE_DOMAIN, SESSION_MAX_AGE } from '../shared/constants.js';
import { PLAN_RATE_LIMITS } from '../shared/constants.js';
import { cosmosQuery, isCosmosConfigured } from '../shared/cosmos.js';
import type { AuthContext, AccountRecord } from './api-keys.js';
import type { CrawlPlan } from '../engine/types.js';

// Plan cache to avoid per-request DB calls (1 hour TTL)
const planCache = new Map<string, { plan: CrawlPlan; cachedAt: number }>();
const PLAN_CACHE_TTL = 60 * 60 * 1000; // 1 hour
const MAX_PLAN_CACHE_SIZE = 10_000;

// Periodic cleanup of expired plan cache entries (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of planCache.entries()) {
    if (now - entry.cachedAt > PLAN_CACHE_TTL) planCache.delete(key);
  }
}, 5 * 60 * 1000).unref();
const SESSION_STALE_AGE = 60 * 60; // 1 hour in seconds

const SECRET = process.env['SESSION_SECRET'];
if (!SECRET && process.env['NODE_ENV'] === 'production') {
  throw new Error('SESSION_SECRET environment variable is required in production');
}
const SIGNING_KEY = SECRET || 'dev-only-not-for-production';

export interface SessionPayload {
  accountId: string;
  email: string;
  plan: CrawlPlan;
  exp: number; // expiry timestamp in seconds
}

function sign(payload: string): string {
  return createHmac('sha256', SIGNING_KEY).update(payload).digest('base64url');
}

function encode(payload: SessionPayload): string {
  const json = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = sign(json);
  return `${json}.${sig}`;
}

function decode(token: string): SessionPayload | null {
  const [json, sig] = token.split('.');
  if (!json || !sig) return null;

  const expected = sign(json);
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }

  let payload: SessionPayload;
  try {
    payload = JSON.parse(Buffer.from(json, 'base64url').toString()) as SessionPayload;
  } catch {
    return null;
  }
  if (!payload || payload.exp < Math.floor(Date.now() / 1000)) return null;

  return payload;
}

export function createSession(c: Context, payload: Omit<SessionPayload, 'exp'>): void {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const token = encode({ ...payload, exp });

  const isLocalhost = c.req.header('host')?.includes('localhost');
  setCookie(c, SESSION_COOKIE_NAME, token, {
    path: '/',
    httpOnly: true,
    secure: !isLocalhost,
    sameSite: 'Lax',
    maxAge: SESSION_MAX_AGE,
    ...(isLocalhost ? {} : { domain: SESSION_COOKIE_DOMAIN }),
  });
}

export function getSession(c: Context): SessionPayload | null {
  const token = getCookie(c, SESSION_COOKIE_NAME);
  if (!token) return null;
  return decode(token);
}

export function destroySession(c: Context): void {
  const isLocalhost = c.req.header('host')?.includes('localhost');
  deleteCookie(c, SESSION_COOKIE_NAME, {
    path: '/',
    ...(isLocalhost ? {} : { domain: SESSION_COOKIE_DOMAIN }),
  });
}

/**
 * Convert a session to an AuthContext (same shape as API key auth).
 * If the session is older than 1 hour, re-fetch the plan from Cosmos
 * to catch plan upgrades/downgrades without requiring re-login.
 */
export async function sessionToAuthContext(session: SessionPayload): Promise<AuthContext> {
  let plan = session.plan;

  // Check if session is stale (older than 1 hour)
  const sessionAge = Math.floor(Date.now() / 1000) - (session.exp - SESSION_MAX_AGE);
  if (sessionAge > SESSION_STALE_AGE && isCosmosConfigured()) {
    // Check plan cache first
    const cached = planCache.get(session.accountId);
    if (cached && Date.now() - cached.cachedAt < PLAN_CACHE_TTL) {
      plan = cached.plan;
    } else {
      try {
        const accounts = await cosmosQuery<AccountRecord>(
          'accounts',
          'SELECT c.plan FROM c WHERE c.id = @id AND c.type = "account"',
          [{ name: '@id', value: session.accountId }],
        );
        if (accounts[0]) {
          plan = accounts[0].plan;
          if (planCache.size >= MAX_PLAN_CACHE_SIZE) {
              const firstKey = planCache.keys().next().value;
              if (firstKey) planCache.delete(firstKey);
            }
            planCache.set(session.accountId, { plan, cachedAt: Date.now() });
        }
      } catch {
        // On failure, use session plan
      }
    }
  }

  return {
    accountId: session.accountId,
    plan,
    environment: 'live',
    rateLimits: PLAN_RATE_LIMITS[plan] ?? PLAN_RATE_LIMITS['free']!,
  };
}

/** Middleware: try API key first, fall back to session cookie. */
export async function getAuthFromRequest(c: Context): Promise<AuthContext | null> {
  // Already set by authMiddleware?
  const existing = c.get('auth') as AuthContext | undefined;
  if (existing) return existing;

  // Try session cookie
  const session = getSession(c);
  if (!session) return null;

  return sessionToAuthContext(session);
}
