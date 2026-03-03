import { describe, it, expect, vi } from 'vitest';
import { Hono } from 'hono';
import { batchScrapeRoutes } from '../batch-scrape.js';

// Mock auth
vi.mock('../../auth/middleware.js', () => ({
  authMiddleware: async (c: any, next: any) => {
    c.set('auth', { accountId: 'test-account', keyId: 'test-key' });
    await next();
  },
  getAuth: (c: any) => c.get('auth'),
}));

// Mock credits
vi.mock('../../billing/credits.js', () => ({
  checkCredits: () => ({ remaining: 100, total: 500, used: 400, accountId: 'test-account', plan: 'free', resetDate: '' }),
  consumeCredits: (id: string, n: number) => n,
  recordUsageEvent: () => {},
  ensureHydrated: async () => {},
  refundCredits: () => {},
}));

// Mock SSRF
vi.mock('../../shared/ssrf.js', () => ({
  validateUrlNotPrivate: async () => ({ valid: true }),
}));

// Mock queue
vi.mock('../../engine/queue.js', () => ({
  enqueueBatch: () => 'batch_test123',
  getBatch: (id: string) => id === 'batch_test123' ? {
    id: 'batch_test123',
    accountId: 'test-account',
    urls: ['https://a.com', 'https://b.com'],
    status: 'completed',
    completedCount: 2,
    failedCount: 0,
    results: [
      { url: 'https://a.com', markdown: '# A', metadata: { title: 'A', statusCode: 200 } },
      { url: 'https://b.com', markdown: '# B', metadata: { title: 'B', statusCode: 200 } },
    ],
    completedAt: new Date().toISOString(),
  } : null,
}));

describe('POST /v1/batch/scrape', () => {
  const app = new Hono();
  app.route('/v1/batch/scrape', batchScrapeRoutes);

  it('returns 400 for missing urls', async () => {
    const res = await app.request('/v1/batch/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
  });

  it('returns 400 for empty urls array', async () => {
    const res = await app.request('/v1/batch/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: [] }),
    });
    expect(res.status).toBe(400);
  });

  it('returns 201 with valid URLs', async () => {
    const res = await app.request('/v1/batch/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: ['https://example.com', 'https://test.com'] }),
    });
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.id).toBe('batch_test123');
  });

  it('returns 400 for invalid URLs in array', async () => {
    const res = await app.request('/v1/batch/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: ['not a url'] }),
    });
    expect(res.status).toBe(400);
  });
});

describe('GET /v1/batch/scrape/:id', () => {
  const app = new Hono();
  app.route('/v1/batch/scrape', batchScrapeRoutes);

  it('returns batch status for valid ID', async () => {
    const res = await app.request('/v1/batch/scrape/batch_test123', {
      method: 'GET',
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe('completed');
    expect(json.total).toBe(2);
    expect(json.data).toHaveLength(2);
  });

  it('returns 404 for unknown batch', async () => {
    const res = await app.request('/v1/batch/scrape/batch_unknown', {
      method: 'GET',
    });
    expect(res.status).toBe(404);
  });
});
