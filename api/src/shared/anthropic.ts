// ---------------------------------------------------------------------------
// TheOneCrawl — AI gateway singleton (replaces direct Anthropic SDK)
// ---------------------------------------------------------------------------

import { createAIGateway } from '@theone/ai-gateway';
import type { AIGateway } from '@theone/ai-gateway';

export const CLAUDE_MODEL = 'claude-sonnet-4-6';

let _gateway: AIGateway | null = null;

export function getGateway(): AIGateway | null {
  const apiKey = process.env['ANTHROPIC_API_KEY'];
  if (!apiKey) return null;

  if (!_gateway) {
    _gateway = createAIGateway({
      platform: 'crawl',
      providers: { 'anthropic': { apiKey } },
      redis: process.env['REDIS_URL'] ? { url: process.env['REDIS_URL'] } : undefined,
      opsCenter: {
        url: process.env['OPS_CENTER_API_URL'] ?? '',
        apiKey: process.env['OPS_CENTER_API_KEY'] ?? '',
      },
    });
  }
  return _gateway;
}

/** @deprecated Use getGateway() */
export function getAnthropicClient(): AIGateway | null {
  return getGateway();
}
