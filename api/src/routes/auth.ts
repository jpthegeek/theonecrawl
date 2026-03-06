// ---------------------------------------------------------------------------
// TheOneCrawl — Auth routes (register, login, logout, me, forgot-password)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { randomBytes, createHash } from 'node:crypto';
import { hashPassword, verifyPassword } from '../auth/passwords.js';
import { createSession, getSession, destroySession } from '../auth/sessions.js';
import { cosmosQuery, cosmosUpsert, isCosmosConfigured } from '../shared/cosmos.js';
import { sendWelcomeEmail, sendPasswordResetEmail, sendVerificationEmail } from '../shared/email.js';
import { logger } from '../shared/logger.js';
import { extractClientIp } from '../shared/request-utils.js';
import { trackLoginFailure, trackRegistration } from '../auth/abuse-detection.js';
import type { AccountRecord } from '../auth/api-keys.js';
import { emitLoginSuccess, emitLoginFailed } from '@theonefamily/bus-sdk';
import { auditLog } from '../shared/audit.js';

export const authRoutes = new Hono();

// ---------------------------------------------------------------------------
// Account lockout tracking (in-memory, 15-minute TTL)
// ---------------------------------------------------------------------------

const MAX_LOGIN_ATTEMPTS = 10;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

interface LoginAttemptRecord {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, LoginAttemptRecord>();

// Periodic cleanup of expired login attempt records (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of loginAttempts.entries()) {
    const expired = record.lockedUntil
      ? now >= record.lockedUntil
      : now - record.firstAttempt > LOCKOUT_DURATION_MS;
    if (expired) loginAttempts.delete(key);
  }
}, 5 * 60 * 1000).unref();

function checkAccountLockout(email: string): boolean {
  const key = email.toLowerCase();
  const record = loginAttempts.get(key);
  if (!record) return false;

  // Check if locked
  if (record.lockedUntil && Date.now() < record.lockedUntil) {
    return true; // Still locked
  }

  // If lockout expired, reset
  if (record.lockedUntil && Date.now() >= record.lockedUntil) {
    loginAttempts.delete(key);
    return false;
  }

  // If attempts window expired, reset
  if (Date.now() - record.firstAttempt > LOCKOUT_DURATION_MS) {
    loginAttempts.delete(key);
    return false;
  }

  return false;
}

function recordFailedLogin(email: string): void {
  const key = email.toLowerCase();
  const record = loginAttempts.get(key);

  if (!record || Date.now() - record.firstAttempt > LOCKOUT_DURATION_MS) {
    loginAttempts.set(key, { count: 1, firstAttempt: Date.now() });
    return;
  }

  record.count++;
  if (record.count >= MAX_LOGIN_ATTEMPTS) {
    record.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
  }
}

function clearLoginAttempts(email: string): void {
  loginAttempts.delete(email.toLowerCase());
}

// ---------------------------------------------------------------------------
// POST /auth/register
// ---------------------------------------------------------------------------

const registerSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8, 'Password must be at least 8 characters').max(256),
  name: z.string().min(1).max(100),
});

authRoutes.post('/register', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
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
    // Don't reveal whether the email exists — return same shape as success
    // but don't actually create anything
    return c.json({
      success: true,
      message: 'Check your email to verify your account.',
    }, 201);
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

  // Track registration for abuse detection
  void trackRegistration(extractClientIp(c));

  createSession(c, { accountId, email: account.email, plan: account.plan });

  // Generate verification token and send verification email
  const verifyToken = randomBytes(32).toString('hex');
  const verifyTokenHash = createHash('sha256').update(verifyToken).digest('hex');
  await cosmosUpsert('accounts', {
    id: `verify_${verifyTokenHash}`,
    type: 'email_verification' as const,
    account_id: accountId,
    token_hash: verifyTokenHash,
    expires_at: new Date(Date.now() + 24 * 3600_000).toISOString(),
    used: false,
  });
  void sendVerificationEmail(account.email, verifyToken);

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
  email: z.string().email().max(254),
  password: z.string().min(1),
});

authRoutes.post('/login', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Invalid email or password' }, 400);
  }

  const { email, password } = parsed.data;

  // Check account lockout before any DB queries
  if (checkAccountLockout(email)) {
    return c.json({ success: false, error: 'Too many failed login attempts. Please try again later.' }, 429);
  }

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
    // Run dummy scrypt to prevent timing-based email enumeration
    // (ensures response time is similar whether account exists or not)
    await verifyPassword(password, 'deadbeefdeadbeefdeadbeefdeadbeef:' + '00'.repeat(64));
    recordFailedLogin(email);
    void trackLoginFailure(extractClientIp(c), email);
    emitLoginFailed({ source: 'crawl', tenant_id: email, email, auth_method: 'password', ip: extractClientIp(c), user_agent: c.req.header('user-agent') || '', failure_reason: 'user_not_found' }).catch(() => {});
    return c.json({ success: false, error: 'Invalid email or password' }, 401);
  }

  const valid = await verifyPassword(password, account.password_hash);
  if (!valid) {
    recordFailedLogin(email);
    void trackLoginFailure(extractClientIp(c), email);
    emitLoginFailed({ source: 'crawl', tenant_id: account.id, user_id: account.id, email, auth_method: 'password', ip: extractClientIp(c), user_agent: c.req.header('user-agent') || '', failure_reason: 'invalid_password' }).catch(() => {});
    return c.json({ success: false, error: 'Invalid email or password' }, 401);
  }

  // Success — clear failed attempts
  clearLoginAttempts(email);
  emitLoginSuccess({ source: 'crawl', tenant_id: account.id, user_id: account.id, email: account.email, auth_method: 'password', ip: extractClientIp(c), user_agent: c.req.header('user-agent') || '' }).catch(() => {});
  auditLog({
    tenantId: account.id,
    actorId: account.id,
    actorEmail: account.email,
    actorIp: extractClientIp(c) ?? null,
    actorUserAgent: c.req.header('user-agent') ?? null,
    action: 'auth.login',
    actionCategory: 'auth',
    entityType: 'account',
    entityId: account.id,
    entityName: account.email,
    metadata: { auth_method: 'password' },
  });

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
// POST /auth/verify-email
// ---------------------------------------------------------------------------

const verifyEmailSchema = z.object({
  token: z.string().min(1).max(256),
});

authRoutes.post('/verify-email', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = verifyEmailSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Invalid input' }, 400);
  }

  if (!isCosmosConfigured()) {
    return c.json({ success: false, error: 'Database not configured' }, 503);
  }

  const tokenHash = createHash('sha256').update(parsed.data.token).digest('hex');
  const verifications = await cosmosQuery<{
    id: string;
    account_id: string;
    token_hash: string;
    expires_at: string;
    used: boolean;
  }>(
    'accounts',
    'SELECT * FROM c WHERE c.type = "email_verification" AND c.token_hash = @hash AND c.used = false',
    [{ name: '@hash', value: tokenHash }],
  );

  const verification = verifications[0];
  if (!verification || new Date(verification.expires_at) < new Date()) {
    return c.json({ success: false, error: 'Invalid or expired verification token' }, 400);
  }

  // Mark account as verified
  const accounts = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
    [{ name: '@id', value: verification.account_id }],
  );
  const account = accounts[0];
  if (!account) {
    return c.json({ success: false, error: 'Account not found' }, 404);
  }

  account.email_verified = true;
  account.updated_at = new Date().toISOString();
  await cosmosUpsert('accounts', account);

  // Mark token as used
  await cosmosUpsert('accounts', { ...verification, used: true });

  // Send welcome email now that email is verified
  void sendWelcomeEmail(account.email, account.name);

  return c.json({ success: true });
});

// ---------------------------------------------------------------------------
// POST /auth/resend-verification
// ---------------------------------------------------------------------------

const resendRateLimits = new Map<string, number[]>();

// Periodic cleanup of expired resend rate limits (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of resendRateLimits.entries()) {
    const valid = timestamps.filter((t) => now - t < 3600_000);
    if (valid.length === 0) resendRateLimits.delete(key);
    else resendRateLimits.set(key, valid);
  }
}, 5 * 60 * 1000).unref();

authRoutes.post('/resend-verification', async (c) => {
  const session = getSession(c);
  if (!session) {
    return c.json({ success: false, error: 'Not authenticated' }, 401);
  }

  if (!isCosmosConfigured()) {
    return c.json({ success: false, error: 'Database not configured' }, 503);
  }

  // Check if already verified
  const accounts = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
    [{ name: '@id', value: session.accountId }],
  );
  const account = accounts[0];
  if (!account) {
    return c.json({ success: false, error: 'Account not found' }, 404);
  }
  if (account.email_verified) {
    return c.json({ success: false, error: 'Email already verified' }, 400);
  }

  // Rate limit: 3 per hour
  const now = Date.now();
  const key = session.accountId;
  const timestamps = (resendRateLimits.get(key) ?? []).filter((t) => now - t < 3600_000);
  if (timestamps.length >= 3) {
    return c.json({ success: false, error: 'Too many verification emails. Try again later.' }, 429);
  }
  timestamps.push(now);
  resendRateLimits.set(key, timestamps);

  // Generate new token
  const verifyToken = randomBytes(32).toString('hex');
  const verifyTokenHash = createHash('sha256').update(verifyToken).digest('hex');
  await cosmosUpsert('accounts', {
    id: `verify_${verifyTokenHash}`,
    type: 'email_verification' as const,
    account_id: session.accountId,
    token_hash: verifyTokenHash,
    expires_at: new Date(Date.now() + 24 * 3600_000).toISOString(),
    used: false,
  });

  void sendVerificationEmail(account.email, verifyToken);

  return c.json({ success: true, message: 'Verification email sent' });
});

// ---------------------------------------------------------------------------
// POST /auth/forgot-password
// ---------------------------------------------------------------------------

const forgotPasswordLimits = new Map<string, number[]>();

// Periodic cleanup of expired forgot-password rate limits (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of forgotPasswordLimits.entries()) {
    const valid = timestamps.filter((t) => now - t < 3600_000);
    if (valid.length === 0) forgotPasswordLimits.delete(key);
    else forgotPasswordLimits.set(key, valid);
  }
}, 5 * 60 * 1000).unref();

authRoutes.post('/forgot-password', async (c) => {
  // Always return success to prevent email enumeration
  const body = await c.req.json().catch(() => null);
  const email = (body as { email?: string } | null)?.email;
  if (!email || typeof email !== 'string' || email.length > 254) {
    return c.json({ success: true, message: 'If that email exists, a reset link will be sent.' });
  }

  // Per-email rate limit: 3 per hour
  const emailKey = email.toLowerCase();
  const now = Date.now();
  const timestamps = (forgotPasswordLimits.get(emailKey) ?? []).filter((t) => now - t < 3600_000);
  if (timestamps.length >= 3) {
    // Still return success to prevent enumeration
    return c.json({ success: true, message: 'If that email exists, a reset link will be sent.' });
  }
  timestamps.push(now);
  forgotPasswordLimits.set(emailKey, timestamps);

  if (isCosmosConfigured()) {
    const accounts = await cosmosQuery<AccountRecord>(
      'accounts',
      'SELECT * FROM c WHERE c.type = "account" AND c.email = @email',
      [{ name: '@email', value: email.toLowerCase() }],
    );
    const account = accounts[0];
    if (account?.password_hash) {
      // Generate a reset token (stored in Cosmos, expires in 1 hour)
      const resetToken = randomBytes(32).toString('hex');
      const resetTokenHash = createHash('sha256').update(resetToken).digest('hex');
      await cosmosUpsert('accounts', {
        id: `reset_${resetTokenHash}`,
        type: 'password_reset' as const,
        account_id: account.id,
        token_hash: resetTokenHash,
        expires_at: new Date(Date.now() + 3600_000).toISOString(),
        used: false,
      });
      void sendPasswordResetEmail(account.email, resetToken);
    }
  }

  return c.json({ success: true, message: 'If that email exists, a reset link will be sent.' });
});

// ---------------------------------------------------------------------------
// POST /auth/reset-password
// ---------------------------------------------------------------------------

const resetPasswordSchema = z.object({
  token: z.string().min(1).max(256),
  password: z.string().min(8, 'Password must be at least 8 characters').max(256),
});

authRoutes.post('/reset-password', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Invalid input' }, 400);
  }

  if (!isCosmosConfigured()) {
    return c.json({ success: false, error: 'Database not configured' }, 503);
  }

  const tokenHash = createHash('sha256').update(parsed.data.token).digest('hex');
  const resets = await cosmosQuery<{
    id: string;
    account_id: string;
    token_hash: string;
    expires_at: string;
    used: boolean;
  }>(
    'accounts',
    'SELECT * FROM c WHERE c.type = "password_reset" AND c.token_hash = @hash AND c.used = false',
    [{ name: '@hash', value: tokenHash }],
  );

  const reset = resets[0];
  if (!reset || new Date(reset.expires_at) < new Date()) {
    return c.json({ success: false, error: 'Invalid or expired reset token' }, 400);
  }

  // Update password
  const accounts = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
    [{ name: '@id', value: reset.account_id }],
  );
  const account = accounts[0];
  if (!account) {
    return c.json({ success: false, error: 'Account not found' }, 404);
  }

  account.password_hash = await hashPassword(parsed.data.password);
  account.updated_at = new Date().toISOString();
  await cosmosUpsert('accounts', account);

  // Mark token as used
  await cosmosUpsert('accounts', { ...reset, used: true });

  return c.json({ success: true });
});
