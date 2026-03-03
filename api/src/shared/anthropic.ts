// ---------------------------------------------------------------------------
// TheOneCrawl — Shared Anthropic client
// ---------------------------------------------------------------------------

import Anthropic from '@anthropic-ai/sdk';

let cachedClient: Anthropic | null = null;

export function getAnthropicClient(): Anthropic | null {
  if (cachedClient) return cachedClient;
  const key = process.env['ANTHROPIC_API_KEY'];
  if (!key) return null;
  cachedClient = new Anthropic({ apiKey: key });
  return cachedClient;
}
