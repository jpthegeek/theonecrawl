import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { verifyWebhookSignature, sendWebhook } from '../webhooks.js';
import { createHmac } from 'node:crypto';

// Mock SSRF validation for sendWebhook tests
vi.mock('../ssrf.js', () => ({
  validateUrlNotPrivate: async () => ({ valid: true }),
}));

function signPayload(body: string, secret: string): string {
  return `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;
}

describe('verifyWebhookSignature', () => {
  const secret = 'test-webhook-secret';

  it('accepts valid signature with fresh timestamp', () => {
    const payload = JSON.stringify({
      event: 'crawl.completed',
      data: { id: 'test123' },
      timestamp: new Date().toISOString(),
    });
    const sig = signPayload(payload, secret);

    expect(verifyWebhookSignature(payload, sig, secret)).toBe(true);
  });

  it('rejects wrong signature', () => {
    const payload = JSON.stringify({
      event: 'crawl.completed',
      data: { id: 'test123' },
      timestamp: new Date().toISOString(),
    });
    const sig = signPayload(payload, 'wrong-secret');

    expect(verifyWebhookSignature(payload, sig, secret)).toBe(false);
  });

  it('rejects tampered body', () => {
    const payload = JSON.stringify({
      event: 'crawl.completed',
      data: { id: 'test123' },
      timestamp: new Date().toISOString(),
    });
    const sig = signPayload(payload, secret);

    const tampered = payload.replace('test123', 'tampered');
    expect(verifyWebhookSignature(tampered, sig, secret)).toBe(false);
  });

  it('rejects signatures with different length', () => {
    const payload = JSON.stringify({
      event: 'crawl.completed',
      data: {},
      timestamp: new Date().toISOString(),
    });

    expect(verifyWebhookSignature(payload, 'sha256=short', secret)).toBe(false);
  });

  it('rejects stale timestamp (older than 5 minutes)', () => {
    const staleTime = new Date(Date.now() - 6 * 60 * 1000).toISOString();
    const payload = JSON.stringify({
      event: 'crawl.completed',
      data: { id: 'test123' },
      timestamp: staleTime,
    });
    const sig = signPayload(payload, secret);

    expect(verifyWebhookSignature(payload, sig, secret)).toBe(false);
  });

  it('rejects future timestamp (clock skew > 5 minutes)', () => {
    const futureTime = new Date(Date.now() + 6 * 60 * 1000).toISOString();
    const payload = JSON.stringify({
      event: 'crawl.completed',
      data: { id: 'test123' },
      timestamp: futureTime,
    });
    const sig = signPayload(payload, secret);

    expect(verifyWebhookSignature(payload, sig, secret)).toBe(false);
  });

  it('accepts payload without timestamp field', () => {
    const payload = JSON.stringify({
      event: 'crawl.completed',
      data: { id: 'test123' },
    });
    const sig = signPayload(payload, secret);

    expect(verifyWebhookSignature(payload, sig, secret)).toBe(true);
  });

  it('accepts non-JSON body (skips timestamp check)', () => {
    const payload = 'not json at all';
    const sig = signPayload(payload, secret);

    expect(verifyWebhookSignature(payload, sig, secret)).toBe(true);
  });
});

describe('sendWebhook retries', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.useRealTimers();
  });

  it('succeeds on first attempt without retries', async () => {
    let callCount = 0;
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      callCount++;
      return new Response('ok', { status: 200 });
    });

    const result = await sendWebhook('https://example.com/hook', 'crawl.completed', { id: 'test' });
    expect(result).toBe(true);
    expect(callCount).toBe(1);
  });

  it('retries on failure and succeeds on second attempt', async () => {
    let callCount = 0;
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      callCount++;
      if (callCount === 1) return new Response('error', { status: 500 });
      return new Response('ok', { status: 200 });
    });

    const promise = sendWebhook('https://example.com/hook', 'crawl.completed', { id: 'test' });
    await vi.advanceTimersByTimeAsync(5_000);
    const result = await promise;
    expect(result).toBe(true);
    expect(callCount).toBe(2);
  });

  it('retries on network error and succeeds on third attempt', async () => {
    let callCount = 0;
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      callCount++;
      if (callCount <= 2) throw new Error('Network error');
      return new Response('ok', { status: 200 });
    });

    const promise = sendWebhook('https://example.com/hook', 'crawl.completed', { id: 'test' });
    await vi.advanceTimersByTimeAsync(5_000);
    await vi.advanceTimersByTimeAsync(30_000);
    const result = await promise;
    expect(result).toBe(true);
    expect(callCount).toBe(3);
  });

  it('returns false after all retries exhausted', async () => {
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      return new Response('error', { status: 500 });
    });

    const promise = sendWebhook('https://example.com/hook', 'crawl.completed', { id: 'test' });
    await vi.advanceTimersByTimeAsync(5_000);
    await vi.advanceTimersByTimeAsync(30_000);
    const result = await promise;
    expect(result).toBe(false);
    expect(globalThis.fetch).toHaveBeenCalledTimes(3);
  });
});
