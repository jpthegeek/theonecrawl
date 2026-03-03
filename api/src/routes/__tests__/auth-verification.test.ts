import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Hono } from 'hono';
import { createHash } from 'node:crypto';
import { authRoutes } from '../auth.js';

// Mock cosmos
const mockUpsert = vi.fn().mockResolvedValue({});
const mockQuery = vi.fn().mockResolvedValue([]);

vi.mock('../../shared/cosmos.js', () => ({
  cosmosQuery: (...args: unknown[]) => mockQuery(...args),
  cosmosUpsert: (...args: unknown[]) => mockUpsert(...args),
  isCosmosConfigured: () => true,
}));

// Mock passwords
vi.mock('../../auth/passwords.js', () => ({
  hashPassword: async () => '$2b$10$mockhashedpassword',
  verifyPassword: async () => true,
}));

// Mock sessions
vi.mock('../../auth/sessions.js', () => ({
  createSession: () => {},
  getSession: () => ({ accountId: 'acct_test123', email: 'test@example.com', plan: 'free', exp: Math.floor(Date.now() / 1000) + 86400 }),
  destroySession: () => {},
}));

// Mock email
const mockSendVerification = vi.fn().mockResolvedValue(true);
const mockSendWelcome = vi.fn().mockResolvedValue(true);
vi.mock('../../shared/email.js', () => ({
  sendVerificationEmail: (...args: unknown[]) => mockSendVerification(...args),
  sendWelcomeEmail: (...args: unknown[]) => mockSendWelcome(...args),
  sendPasswordResetEmail: vi.fn().mockResolvedValue(true),
}));

const app = new Hono();
app.route('/auth', authRoutes);

describe('POST /auth/verify-email', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 for missing token', async () => {
    const res = await app.request('/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid/expired token', async () => {
    mockQuery.mockResolvedValueOnce([]); // No matching verification
    const res = await app.request('/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: 'invalid-token' }),
    });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain('Invalid or expired');
  });

  it('verifies email and sends welcome email on valid token', async () => {
    const token = 'a'.repeat(64);
    const tokenHash = createHash('sha256').update(token).digest('hex');

    // First query: find verification token
    mockQuery.mockResolvedValueOnce([{
      id: `verify_${tokenHash}`,
      account_id: 'acct_test123',
      token_hash: tokenHash,
      expires_at: new Date(Date.now() + 86400_000).toISOString(),
      used: false,
    }]);

    // Second query: find account
    mockQuery.mockResolvedValueOnce([{
      id: 'acct_test123',
      type: 'account',
      email: 'test@example.com',
      name: 'Test User',
      email_verified: false,
      updated_at: new Date().toISOString(),
    }]);

    const res = await app.request('/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);

    // Should upsert account with email_verified: true + mark token used
    expect(mockUpsert).toHaveBeenCalledTimes(2);
    const accountUpsert = mockUpsert.mock.calls[0]![1];
    expect(accountUpsert.email_verified).toBe(true);
  });
});

describe('POST /auth/resend-verification', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 if email already verified', async () => {
    mockQuery.mockResolvedValueOnce([{
      id: 'acct_test123',
      type: 'account',
      email: 'test@example.com',
      name: 'Test User',
      email_verified: true,
    }]);

    const res = await app.request('/auth/resend-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain('already verified');
  });

  it('sends verification email for unverified account', async () => {
    mockQuery.mockResolvedValueOnce([{
      id: 'acct_test123',
      type: 'account',
      email: 'test@example.com',
      name: 'Test User',
      email_verified: false,
    }]);

    const res = await app.request('/auth/resend-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);

    // Should store verification token and send email
    expect(mockUpsert).toHaveBeenCalledTimes(1);
    // Wait for fire-and-forget email
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(mockSendVerification).toHaveBeenCalledTimes(1);
  });
});

describe('POST /auth/register', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends verification email instead of welcome email on register', async () => {
    // No existing account
    mockQuery.mockResolvedValueOnce([]);

    const res = await app.request('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'newuser@example.com',
        password: 'securepass123',
        name: 'New User',
      }),
    });

    expect(res.status).toBe(201);

    // Should create account + verification token (2 upserts)
    expect(mockUpsert).toHaveBeenCalledTimes(2);

    // Verification token document
    const tokenDoc = mockUpsert.mock.calls[1]![1];
    expect(tokenDoc.type).toBe('email_verification');
    expect(tokenDoc.account_id).toBeDefined();

    // Wait for fire-and-forget email
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(mockSendVerification).toHaveBeenCalledTimes(1);
    expect(mockSendWelcome).not.toHaveBeenCalled();
  });
});
