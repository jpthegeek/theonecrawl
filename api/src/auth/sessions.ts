// ---------------------------------------------------------------------------
// TheOneCrawl — HMAC-signed stateless session tokens
// ---------------------------------------------------------------------------

import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Context } from 'hono';
import { setCookie, getCookie, deleteCookie } from 'hono/cookie';
import { SESSION_COOKIE_NAME, SESSION_COOKIE_DOMAIN, SESSION_MAX_AGE } from '../shared/constants.js';
import { PLAN_RATE_LIMITS } from '../shared/constants.js';
import type { AuthContext } from './api-keys.js';
import type { CrawlPlan } from '../engine/types.js';

const SECRET = process.env['SESSION_SECRET'] || 'dev-secret-change-in-production';

export interface SessionPayload {
  accountId: string;
  email: string;
  plan: CrawlPlan;
  exp: number; // expiry timestamp in seconds
}

function sign(payload: string): string {
  return createHmac('sha256', SECRET).update(payload).digest('base64url');
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

  const payload = JSON.parse(Buffer.from(json, 'base64url').toString()) as SessionPayload;
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;

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

/** Convert a session to an AuthContext (same shape as API key auth). */
export function sessionToAuthContext(session: SessionPayload): AuthContext {
  return {
    accountId: session.accountId,
    plan: session.plan,
    environment: 'live',
    rateLimits: PLAN_RATE_LIMITS[session.plan] ?? PLAN_RATE_LIMITS['free']!,
  };
}

/** Middleware: try API key first, fall back to session cookie. */
export function getAuthFromRequest(c: Context): AuthContext | null {
  // Already set by authMiddleware?
  const existing = c.get('auth') as AuthContext | undefined;
  if (existing) return existing;

  // Try session cookie
  const session = getSession(c);
  if (!session) return null;

  return sessionToAuthContext(session);
}
