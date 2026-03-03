// ---------------------------------------------------------------------------
// TheOneCrawl — AI extraction route (Claude-powered)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { getAuthFromRequest } from '../auth/sessions.js';
import { consumeCredits, checkCredits, recordUsageEvent, ensureHydrated, refundCredits } from '../billing/credits.js';
import { CREDIT_COSTS } from '../shared/constants.js';
import { validateUrlNotPrivate, fetchWithSsrfProtection } from '../shared/ssrf.js';
import { getAnthropicClient } from '../shared/anthropic.js';
import { logger } from '../shared/logger.js';
import { trackCreditConsumption } from '../auth/abuse-detection.js';

export const extractRoutes = new Hono();

// Max response body size for fetched pages (5 MB)
const MAX_FETCH_SIZE = 5 * 1024 * 1024;

const extractSchema = z.object({
  urls: z.array(z.string().url().max(2048)).min(1).max(10),
  prompt: z.string().max(10000).optional(),
  schema: z.record(z.unknown()).optional().refine(
    (s) => !s || JSON.stringify(s).length <= 10240,
    'Extract schema must not exceed 10 KB',
  ),
  enableWebSearch: z.boolean().optional(),
});

// flexAuth: tries API key first, falls back to session cookie
async function flexAuth(c: any, next: any): Promise<Response | void> {
  const authHeader = c.req.header('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authMiddleware(c, next);
  }
  // Session fallback
  const auth = await getAuthFromRequest(c);
  if (!auth) {
    return c.json({ success: false, error: 'Authentication required' }, 401);
  }
  c.set('auth', auth);
  await next();
}

extractRoutes.post('/', flexAuth, async (c) => {
  const auth = getAuth(c);
  const body = await c.req.json().catch(() => null);
  const parsed = extractSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { urls, prompt, schema } = parsed.data;

  // Ensure credits are loaded from Cosmos
  await ensureHydrated(auth.accountId);

  // Check credits
  const credits = checkCredits(auth.accountId);
  const cost = CREDIT_COSTS.ai_extract * urls.length;
  if (credits.remaining < cost) {
    return c.json({
      success: false,
      error: `Insufficient credits. Need ${cost}, have ${credits.remaining}.`,
    }, 402);
  }

  const anthropic = getAnthropicClient();
  if (!anthropic) {
    return c.json({ success: false, error: 'AI extraction not configured (ANTHROPIC_API_KEY missing)' }, 503);
  }

  // SSRF check all URLs before fetching
  for (const url of urls) {
    const ssrfCheck = await validateUrlNotPrivate(url);
    if (!ssrfCheck.valid) {
      return c.json({ success: false, error: `${ssrfCheck.error}: ${url}` }, 400);
    }
  }

  // Fetch page content with SSRF-safe redirects and size limits
  const pageContents: string[] = [];
  for (const url of urls) {
    try {
      const resp = await fetchWithSsrfProtection(url, {
        headers: { 'User-Agent': 'TheOneCrawl/1.0 (+https://theonecrawl.app/bot)' },
        signal: AbortSignal.timeout(15_000),
      });

      // Read response with size limit
      const contentLength = resp.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > MAX_FETCH_SIZE) {
        pageContents.push(`--- ${url} ---\n[Response too large]`);
        continue;
      }

      const html = await resp.text();
      const text = html.slice(0, MAX_FETCH_SIZE)
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 30_000); // Cap context size
      pageContents.push(`--- ${url} ---\n${text}`);
    } catch {
      pageContents.push(`--- ${url} ---\n[Failed to fetch]`);
    }
  }

  const systemPrompt = schema
    ? `Extract structured data from the web page content. Return valid JSON matching this schema:\n${JSON.stringify(schema, null, 2)}`
    : 'Extract structured data from the web page content. Return valid JSON.';

  const userPrompt = `${prompt ?? 'Extract the key information from these pages.'}\n\n${pageContents.join('\n\n')}`;

  // Consume credits upfront (before LLM call to prevent free usage on crash)
  const actualConsumed = consumeCredits(auth.accountId, cost);
  if (actualConsumed < cost) {
    return c.json({ success: false, error: 'Insufficient credits' }, 402);
  }
  recordUsageEvent(auth.accountId, 'extract', cost, urls[0]);
  void trackCreditConsumption(auth.accountId, cost, credits.total);

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const textContent = message.content.find((b) => b.type === 'text');
    let extracted: unknown;
    try {
      // Try to parse as JSON
      const raw = textContent?.text ?? '';
      const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/) ?? [null, raw];
      extracted = JSON.parse(jsonMatch[1]?.trim() ?? raw);
    } catch {
      extracted = textContent?.text ?? '';
    }

    return c.json({
      success: true,
      data: extracted,
      creditsUsed: cost,
    });
  } catch (err) {
    // Refund credits consumed before the LLM call
    refundCredits(auth.accountId, cost);
    logger.error('AI extraction failed', { error: err instanceof Error ? err.message : String(err) });
    return c.json({ success: false, error: 'AI extraction failed' }, 500);
  }
});
