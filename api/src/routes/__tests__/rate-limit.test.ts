import { describe, it, expect } from 'vitest';

describe('IP extraction from X-Forwarded-For', () => {
  // Simulate the extractClientIp function from index.ts
  function extractClientIp(xff: string | undefined): string {
    if (xff) {
      const parts = xff.split(',').map((s) => s.trim()).filter(Boolean);
      // Last entry is set by the trusted proxy
      return parts[parts.length - 1] || 'unknown';
    }
    return 'unknown';
  }

  it('uses last entry from X-Forwarded-For (trusted proxy)', () => {
    // Client can spoof the first entry, but the last one is set by the LB
    expect(extractClientIp('spoofed.ip, real.client.ip, lb.proxy.ip')).toBe('lb.proxy.ip');
  });

  it('handles single IP', () => {
    expect(extractClientIp('1.2.3.4')).toBe('1.2.3.4');
  });

  it('handles missing header', () => {
    expect(extractClientIp(undefined)).toBe('unknown');
  });

  it('handles empty header', () => {
    expect(extractClientIp('')).toBe('unknown');
  });

  it('trims whitespace from entries', () => {
    expect(extractClientIp(' 1.1.1.1 , 2.2.2.2 ')).toBe('2.2.2.2');
  });
});

describe('account lockout logic', () => {
  // Reproduce the lockout logic from auth.ts
  const MAX_LOGIN_ATTEMPTS = 10;
  const LOCKOUT_DURATION_MS = 15 * 60 * 1000;

  interface LoginAttemptRecord {
    count: number;
    firstAttempt: number;
    lockedUntil?: number;
  }

  const loginAttempts = new Map<string, LoginAttemptRecord>();

  function checkAccountLockout(email: string): boolean {
    const key = email.toLowerCase();
    const record = loginAttempts.get(key);
    if (!record) return false;
    if (record.lockedUntil && Date.now() < record.lockedUntil) return true;
    if (record.lockedUntil && Date.now() >= record.lockedUntil) {
      loginAttempts.delete(key);
      return false;
    }
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

  it('does not lock out after fewer than 10 attempts', () => {
    loginAttempts.clear();
    for (let i = 0; i < 9; i++) {
      recordFailedLogin('test@example.com');
    }
    expect(checkAccountLockout('test@example.com')).toBe(false);
  });

  it('locks out after 10 failed attempts', () => {
    loginAttempts.clear();
    for (let i = 0; i < 10; i++) {
      recordFailedLogin('lock@example.com');
    }
    expect(checkAccountLockout('lock@example.com')).toBe(true);
  });

  it('is case-insensitive for email', () => {
    loginAttempts.clear();
    for (let i = 0; i < 10; i++) {
      recordFailedLogin('Case@Example.COM');
    }
    expect(checkAccountLockout('case@example.com')).toBe(true);
  });
});
