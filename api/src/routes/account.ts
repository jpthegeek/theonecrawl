// ---------------------------------------------------------------------------
// TheOneCrawl — Account management routes
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import Stripe from 'stripe';
import { getSession, destroySession } from '../auth/sessions.js';
import { hashPassword, verifyPassword } from '../auth/passwords.js';
import { cosmosQuery, cosmosUpsert, cosmosDelete, isCosmosConfigured } from '../shared/cosmos.js';
import { logger } from '../shared/logger.js';
import type { AccountRecord } from '../auth/api-keys.js';

export const accountRoutes = new Hono();

function requireSession(c: any) {
  const session = getSession(c);
  if (!session) {
    return null;
  }
  return session;
}

// ---------------------------------------------------------------------------
// GET /v1/account
// ---------------------------------------------------------------------------

accountRoutes.get('/', async (c) => {
  const session = requireSession(c);
  if (!session) return c.json({ success: false, error: 'Not authenticated' }, 401);

  if (!isCosmosConfigured()) {
    return c.json({ success: true, account: { id: session.accountId, email: session.email, plan: session.plan } });
  }

  const accounts = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
    [{ name: '@id', value: session.accountId }],
  );

  const account = accounts[0];
  if (!account) return c.json({ success: false, error: 'Account not found' }, 404);

  return c.json({
    success: true,
    account: {
      id: account.id,
      email: account.email,
      name: account.name,
      plan: account.plan,
      email_verified: account.email_verified,
      created_at: account.created_at,
      updated_at: account.updated_at,
    },
  });
});

// ---------------------------------------------------------------------------
// PATCH /v1/account
// ---------------------------------------------------------------------------

const updateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  currentPassword: z.string().max(256).optional(),
  password: z.string().min(8).max(256).optional(),
}).strict();

accountRoutes.patch('/', async (c) => {
  const session = requireSession(c);
  if (!session) return c.json({ success: false, error: 'Not authenticated' }, 401);
  if (!isCosmosConfigured()) return c.json({ success: false, error: 'Database not configured' }, 503);

  const body = await c.req.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const accounts = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
    [{ name: '@id', value: session.accountId }],
  );

  const account = accounts[0];
  if (!account) return c.json({ success: false, error: 'Account not found' }, 404);

  if (parsed.data.name) account.name = parsed.data.name;
  if (parsed.data.password) {
    // Require current password to set a new one
    if (!parsed.data.currentPassword) {
      return c.json({ success: false, error: 'Current password is required to change password' }, 400);
    }
    if (!account.password_hash) {
      return c.json({ success: false, error: 'Cannot change password for this account' }, 400);
    }
    const valid = await verifyPassword(parsed.data.currentPassword, account.password_hash);
    if (!valid) {
      return c.json({ success: false, error: 'Current password is incorrect' }, 403);
    }
    account.password_hash = await hashPassword(parsed.data.password);
  }
  account.updated_at = new Date().toISOString();

  await cosmosUpsert('accounts', account);

  return c.json({
    success: true,
    account: {
      id: account.id,
      email: account.email,
      name: account.name,
      plan: account.plan,
    },
  });
});

// ---------------------------------------------------------------------------
// DELETE /v1/account
// ---------------------------------------------------------------------------

accountRoutes.delete('/', async (c) => {
  const session = requireSession(c);
  if (!session) return c.json({ success: false, error: 'Not authenticated' }, 401);
  if (!isCosmosConfigured()) return c.json({ success: false, error: 'Database not configured' }, 503);

  const accounts = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
    [{ name: '@id', value: session.accountId }],
  );

  const account = accounts[0];
  if (!account) {
    destroySession(c);
    return c.json({ success: true });
  }

  // Cancel Stripe subscription if active
  if (account.stripe_subscription_id && account.stripe_customer_id) {
    const stripeKey = process.env['STRIPE_SECRET_KEY'];
    if (stripeKey) {
      try {
        const stripe = new Stripe(stripeKey, { apiVersion: '2025-01-27.acacia' as Stripe.LatestApiVersion });
        await stripe.subscriptions.cancel(account.stripe_subscription_id);
      } catch (err) {
        logger.error('Failed to cancel Stripe subscription on account delete', {
          accountId: account.id,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }
  }

  // Delete API keys
  const apiKeys = await cosmosQuery<{ id: string }>(
    'accounts',
    'SELECT c.id FROM c WHERE c.type = "api_key" AND c.account_id = @accountId',
    [{ name: '@accountId', value: account.id }],
  );
  for (const key of apiKeys) {
    void cosmosDelete('accounts', key.id, key.id);
  }

  // Delete billing records
  const billingDocs = await cosmosQuery<{ id: string }>(
    'billing',
    'SELECT c.id FROM c WHERE c.account_id = @accountId',
    [{ name: '@accountId', value: account.id }],
  );
  for (const doc of billingDocs) {
    void cosmosDelete('billing', doc.id, account.id);
  }

  // Delete job records
  const jobDocs = await cosmosQuery<{ id: string }>(
    'jobs',
    'SELECT c.id FROM c WHERE c.account_id = @accountId',
    [{ name: '@accountId', value: account.id }],
  );
  for (const doc of jobDocs) {
    void cosmosDelete('jobs', doc.id, account.id);
  }

  // Delete the account
  await cosmosDelete('accounts', account.id, account.id);

  destroySession(c);
  return c.json({ success: true });
});
