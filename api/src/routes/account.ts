// ---------------------------------------------------------------------------
// TheOneCrawl — Account management routes
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { getSession, destroySession } from '../auth/sessions.js';
import { hashPassword } from '../auth/passwords.js';
import { cosmosQuery, cosmosUpsert, cosmosDelete, isCosmosConfigured } from '../shared/cosmos.js';
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
      stripe_customer_id: account.stripe_customer_id,
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
  password: z.string().min(8).optional(),
}).strict();

accountRoutes.patch('/', async (c) => {
  const session = requireSession(c);
  if (!session) return c.json({ success: false, error: 'Not authenticated' }, 401);
  if (!isCosmosConfigured()) return c.json({ success: false, error: 'Database not configured' }, 503);

  const body = await c.req.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }, 400);
  }

  const accounts = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
    [{ name: '@id', value: session.accountId }],
  );

  const account = accounts[0];
  if (!account) return c.json({ success: false, error: 'Account not found' }, 404);

  if (parsed.data.name) account.name = parsed.data.name;
  if (parsed.data.password) account.password_hash = await hashPassword(parsed.data.password);
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

  // TODO: Cancel Stripe subscription, delete all data
  // For now, mark account as deleted
  const accounts = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
    [{ name: '@id', value: session.accountId }],
  );

  const account = accounts[0];
  if (account) {
    await cosmosDelete('accounts', account.id, account.id);
  }

  destroySession(c);
  return c.json({ success: true });
});
