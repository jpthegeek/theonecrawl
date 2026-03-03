// ---------------------------------------------------------------------------
// TheOneCrawl — Auth routes (register, login, logout, me, forgot-password)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { randomBytes } from 'node:crypto';
import { hashPassword, verifyPassword } from '../auth/passwords.js';
import { createSession, getSession, destroySession } from '../auth/sessions.js';
import { cosmosQuery, cosmosUpsert, isCosmosConfigured } from '../shared/cosmos.js';
import type { AccountRecord } from '../auth/api-keys.js';

export const authRoutes = new Hono();

// ---------------------------------------------------------------------------
// POST /auth/register
// ---------------------------------------------------------------------------

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1).max(100),
});

authRoutes.post('/register', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }, 400);
  }

  const { email, password, name } = parsed.data;

  if (!isCosmosConfigured()) {
    return c.json({ success: false, error: 'Database not configured' }, 503);
  }

  // Check if email already exists
  const existing = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.type = "account" AND c.email = @email',
    [{ name: '@email', value: email.toLowerCase() }],
  );

  if (existing.length > 0) {
    return c.json({ success: false, error: 'An account with this email already exists' }, 409);
  }

  const passwordHash = await hashPassword(password);
  const accountId = `acct_${randomBytes(12).toString('hex')}`;

  const account: AccountRecord = {
    id: accountId,
    type: 'account',
    email: email.toLowerCase(),
    name,
    password_hash: passwordHash,
    auth_provider: 'email',
    plan: 'free',
    email_verified: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  await cosmosUpsert('accounts', account);

  createSession(c, { accountId, email: account.email, plan: account.plan });

  return c.json({
    success: true,
    account: {
      id: accountId,
      email: account.email,
      name: account.name,
      plan: account.plan,
    },
  }, 201);
});

// ---------------------------------------------------------------------------
// POST /auth/login
// ---------------------------------------------------------------------------

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

authRoutes.post('/login', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Invalid email or password' }, 400);
  }

  const { email, password } = parsed.data;

  if (!isCosmosConfigured()) {
    return c.json({ success: false, error: 'Database not configured' }, 503);
  }

  const accounts = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.type = "account" AND c.email = @email',
    [{ name: '@email', value: email.toLowerCase() }],
  );

  const account = accounts[0];
  if (!account || !account.password_hash) {
    return c.json({ success: false, error: 'Invalid email or password' }, 401);
  }

  const valid = await verifyPassword(password, account.password_hash);
  if (!valid) {
    return c.json({ success: false, error: 'Invalid email or password' }, 401);
  }

  createSession(c, { accountId: account.id, email: account.email, plan: account.plan });

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
// POST /auth/logout
// ---------------------------------------------------------------------------

authRoutes.post('/logout', (c) => {
  destroySession(c);
  return c.json({ success: true });
});

// ---------------------------------------------------------------------------
// GET /auth/me
// ---------------------------------------------------------------------------

authRoutes.get('/me', async (c) => {
  const session = getSession(c);
  if (!session) {
    return c.json({ success: false, error: 'Not authenticated' }, 401);
  }

  if (!isCosmosConfigured()) {
    return c.json({
      success: true,
      account: { id: session.accountId, email: session.email, plan: session.plan },
    });
  }

  const accounts = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
    [{ name: '@id', value: session.accountId }],
  );

  const account = accounts[0];
  if (!account) {
    destroySession(c);
    return c.json({ success: false, error: 'Account not found' }, 401);
  }

  return c.json({
    success: true,
    account: {
      id: account.id,
      email: account.email,
      name: account.name,
      plan: account.plan,
      email_verified: account.email_verified,
      created_at: account.created_at,
    },
  });
});

// ---------------------------------------------------------------------------
// POST /auth/forgot-password
// ---------------------------------------------------------------------------

authRoutes.post('/forgot-password', async (c) => {
  // Always return success to prevent email enumeration
  const body = await c.req.json().catch(() => null);
  const email = (body as { email?: string } | null)?.email;
  if (!email) {
    return c.json({ success: true, message: 'If that email exists, a reset link will be sent.' });
  }

  // TODO: Send password reset email via SES
  // For now, just acknowledge
  return c.json({ success: true, message: 'If that email exists, a reset link will be sent.' });
});
