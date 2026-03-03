// ---------------------------------------------------------------------------
// TheOneCrawl — AI extraction route (Claude-powered)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import Anthropic from '@anthropic-ai/sdk';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { getAuthFromRequest } from '../auth/sessions.js';
import { consumeCredits, checkCredits } from '../billing/credits.js';
import { CREDIT_COSTS } from '../shared/constants.js';

export const extractRoutes = new Hono();

const extractSchema = z.object({
  urls: z.array(z.string().url()).min(1).max(10),
  prompt: z.string().optional(),
  schema: z.record(z.unknown()).optional(),
  enableWebSearch: z.boolean().optional(),
});

function getAnthropicClient(): Anthropic | null {
  const key = process.env['ANTHROPIC_API_KEY'];
  if (!key) return null;
  return new Anthropic({ apiKey: key });
}

// flexAuth: tries API key first, falls back to session cookie
async function flexAuth(c: any, next: any): Promise<Response | void> {
  const authHeader = c.req.header('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authMiddleware(c, next);
  }
  // Session fallback
  const auth = getAuthFromRequest(c);
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
    return c.json({ success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }, 400);
  }

  const { urls, prompt, schema } = parsed.data;

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

  // Fetch page content
  const pageContents: string[] = [];
  for (const url of urls) {
    try {
      const resp = await fetch(url, {
        headers: { 'User-Agent': 'TheOneCrawl/1.0 (+https://theonecrawl.app/bot)' },
        signal: AbortSignal.timeout(15_000),
      });
      const html = await resp.text();
      // Rough text extraction (strip tags)
      const text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
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

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    consumeCredits(auth.accountId, cost);

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
    console.error('[extract] Claude API error:', err);
    return c.json({ success: false, error: 'AI extraction failed' }, 500);
  }
});
