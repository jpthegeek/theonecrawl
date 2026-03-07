// ---------------------------------------------------------------------------
// TheOneCrawl — Portal SSO route (Hub centralized auth)
//
// GET /auth/portal-sso?token=<JWT>
// Validates a short-lived JWT from Hub, finds or creates the user,
// creates a session, and redirects to the dashboard.
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { jwtVerify } from 'jose';
import { randomBytes } from 'node:crypto';
import { createSession } from '../auth/sessions.js';
import { cosmosQuery, cosmosUpsert, isCosmosConfigured } from '../shared/cosmos.js';
import { APP_DOMAIN } from '../shared/constants.js';
import { logger } from '../shared/logger.js';
import { extractClientIp } from '../shared/request-utils.js';
import { emitHubSsoLogin } from '@theonefamily/bus-sdk';
import { auditLog } from '../shared/audit.js';
import type { AccountRecord } from '../auth/api-keys.js';

export const portalSsoRoutes = new Hono();

// ---------------------------------------------------------------------------
// GET /auth/portal-sso
// ---------------------------------------------------------------------------

portalSsoRoutes.get('/portal-sso', async (c) => {
  const token = c.req.query('token');
  if (!token) {
    return c.json({ success: false, error: 'Missing token parameter' }, 400);
  }

  const ssoSecret = process.env['PORTAL_SSO_SECRET'];
  if (!ssoSecret) {
    logger.error('PORTAL_SSO_SECRET not configured');
    return c.json({ success: false, error: 'SSO not configured' }, 503);
  }

  if (!isCosmosConfigured()) {
    return c.json({ success: false, error: 'Database not configured' }, 503);
  }

  // 1. Validate JWT
  let payload: any;
  try {
    const secret = new TextEncoder().encode(ssoSecret);
    const result = await jwtVerify(token, secret, {
      issuer: 'the-one-hub',
      maxTokenAge: '70s',
    });
    payload = result.payload;
  } catch (err) {
    logger.warn('Portal SSO JWT validation failed', {
      error: err instanceof Error ? err.message : String(err),
    });
    return c.json({ success: false, error: 'Invalid or expired token' }, 401);
  }

  // 2. Validate platform claim
  if (payload.platform && payload.platform !== 'crawl') {
    return c.json({ success: false, error: 'Token not intended for this platform' }, 403);
  }

  // 3. JTI replay prevention (70s TTL)
  const jti = payload.jti as string | undefined;
  if (!jti) {
    return c.json({ success: false, error: 'Token missing jti claim' }, 400);
  }

  try {
    const existing = await cosmosQuery<{ id: string }>(
      'accounts',
      'SELECT c.id FROM c WHERE c.id = @id AND c.type = "sso_jti"',
      [{ name: '@id', value: `jti_${jti}` }],
    );
    if (existing.length > 0) {
      return c.json({ success: false, error: 'Token already used' }, 401);
    }

    // Store JTI with TTL (70 seconds)
    await cosmosUpsert('accounts', {
      id: `jti_${jti}`,
      type: 'sso_jti' as const,
      jti,
      created_at: new Date().toISOString(),
      ttl: 70,
    });
  } catch (err) {
    logger.error('JTI replay check failed', {
      error: err instanceof Error ? err.message : String(err),
    });
    return c.json({ success: false, error: 'Internal error' }, 500);
  }

  // 4. Find or create user
  const hubUserId = payload.hub_user_id as string;
  const email = (payload.email as string)?.toLowerCase();
  const name = (payload.name as string) || email;
  const orgRole = (payload.orgRole as string) || 'member';

  if (!hubUserId || !email) {
    return c.json({ success: false, error: 'Token missing required claims' }, 400);
  }

  let account: AccountRecord | null = null;

  // Look up by hub_user_id first
  const byHubId = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.type = "account" AND c.hub_user_id = @hubUserId',
    [{ name: '@hubUserId', value: hubUserId }],
  );
  account = byHubId[0] ?? null;

  // Fall back to email lookup
  if (!account) {
    const byEmail = await cosmosQuery<AccountRecord>(
      'accounts',
      'SELECT * FROM c WHERE c.type = "account" AND c.email = @email',
      [{ name: '@email', value: email }],
    );
    account = byEmail[0] ?? null;
  }

  const now = new Date().toISOString();

  if (account) {
    // Update existing account with hub fields
    (account as any).hub_user_id = hubUserId;
    (account as any).hub_org_role = orgRole;
    account.name = name;
    account.updated_at = now;
    account.auth_provider = 'microsoft';
    await cosmosUpsert('accounts', account);
  } else {
    // Create new account
    const accountId = `acct_${randomBytes(12).toString('hex')}`;
    account = {
      id: accountId,
      type: 'account',
      email,
      name,
      auth_provider: 'microsoft',
      plan: 'free',
      email_verified: true,
      created_at: now,
      updated_at: now,
    } as AccountRecord;
    (account as any).hub_user_id = hubUserId;
    (account as any).hub_org_role = orgRole;
    await cosmosUpsert('accounts', account);
  }

  // 5. Create session
  createSession(c, {
    accountId: account.id,
    email: account.email,
    plan: account.plan,
  });

  // 6. Emit bus event
  emitHubSsoLogin({
    source: 'crawl',
    tenant_id: account.id,
    user_id: account.id,
    email: account.email,
    ip: extractClientIp(c) || '',
    user_agent: c.req.header('user-agent') || '',
  }).catch(() => {});

  // 7. Audit log
  auditLog({
    tenantId: account.id,
    actorId: account.id,
    actorEmail: account.email,
    actorIp: extractClientIp(c) ?? null,
    actorUserAgent: c.req.header('user-agent') ?? null,
    action: 'auth.hub_sso_login',
    actionCategory: 'auth',
    entityType: 'account',
    entityId: account.id,
    entityName: account.email,
    metadata: { hub_user_id: hubUserId, org_role: orgRole },
  });

  // 8. Redirect to dashboard
  const frontendUrl = `https://${APP_DOMAIN}`;
  return c.redirect(frontendUrl, 302);
});
