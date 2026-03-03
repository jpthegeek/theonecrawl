import { describe, it, expect, beforeAll, vi } from 'vitest';
import { Hono } from 'hono';
import { scrapeRoutes } from '../scrape.js';

// Mock the auth middleware for integration tests
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
  consumeCredit: () => true,
  consumeCredits: () => 5,
  recordUsageEvent: () => {},
  ensureHydrated: async () => {},
  refundCredit: () => {},
  refundCredits: () => {},
}));

// Mock SSRF
vi.mock('../../shared/ssrf.js', () => ({
  validateUrlNotPrivate: async () => ({ valid: true }),
}));

// Mock crawler
vi.mock('../../engine/crawler.js', () => ({
  crawlWebsite: async () => ({
    pages: [{
      url: 'https://example.com',
      title: 'Example',
      description: 'Test page',
      html: '<html><body><h1>Hello</h1></body></html>',
      extractedContent: {
        headings: [{ level: 1, text: 'Hello' }],
        paragraphs: [],
        images: [],
        links: [],
        navigation: [],
        forms: [],
        socialLinks: [],
        contactInfo: [],
        colorPalette: [],
        fonts: [],
        sections: [],
        lists: [],
        tables: [],
        videos: [],
        testimonials: [],
        faqs: [],
        pricingPlans: [],
        stats: [],
      },
      statusCode: 200,
      loadTimeMs: 100,
    }],
    media: [],
    siteMetadata: {
      title: 'Example',
      description: 'Test page',
      favicon: '',
      ogImage: '',
      colorPalette: [],
      primaryFont: 'Inter',
      secondaryFont: 'Inter',
      technology: [],
      language: 'en',
    },
  }),
}));

// Mock anthropic
vi.mock('../../shared/anthropic.js', () => ({
  getAnthropicClient: () => null,
}));

describe('POST /v1/scrape', () => {
  const app = new Hono();
  app.route('/v1/scrape', scrapeRoutes);

  it('returns 400 for missing URL', async () => {
    const res = await app.request('/v1/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid URL', async () => {
    const res = await app.request('/v1/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'not a url' }),
    });
    expect(res.status).toBe(400);
  });

  it('returns 200 with valid URL', async () => {
    const res = await app.request('/v1/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://example.com' }),
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.metadata.title).toBe('Example');
  });

  it('accepts mobile flag', async () => {
    const res = await app.request('/v1/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://example.com', mobile: true }),
    });
    expect(res.status).toBe(200);
  });

  it('accepts custom headers', async () => {
    const res = await app.request('/v1/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: 'https://example.com',
        headers: { 'Accept-Language': 'fr-FR' },
      }),
    });
    expect(res.status).toBe(200);
  });

  it('accepts browser actions', async () => {
    const res = await app.request('/v1/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: 'https://example.com',
        actions: [{ type: 'wait', milliseconds: 1000 }],
      }),
    });
    expect(res.status).toBe(200);
  });

  it('rejects invalid action schemas', async () => {
    const res = await app.request('/v1/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: 'https://example.com',
        actions: [{ type: 'click' }], // missing selector
      }),
    });
    expect(res.status).toBe(400);
  });

  it('accepts waitFor as number', async () => {
    const res = await app.request('/v1/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://example.com', waitFor: 2000 }),
    });
    expect(res.status).toBe(200);
  });

  it('accepts waitFor as string (selector)', async () => {
    const res = await app.request('/v1/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://example.com', waitFor: '#loaded' }),
    });
    expect(res.status).toBe(200);
  });
});
