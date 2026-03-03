// ---------------------------------------------------------------------------
// TheOneCrawl — HMAC-SHA256 webhook delivery
// ---------------------------------------------------------------------------

import { createHmac } from 'node:crypto';
import { WEBHOOK_SIGNATURE_HEADER } from './constants.js';

export type WebhookEvent =
  | 'crawl.started'
  | 'crawl.page'
  | 'crawl.completed'
  | 'crawl.failed'
  | 'scrape.completed';

interface WebhookPayload {
  event: WebhookEvent;
  data: Record<string, unknown>;
  timestamp: string;
  idempotencyKey: string;
}

/**
 * Deliver a webhook with HMAC-SHA256 signature.
 */
export async function sendWebhook(
  url: string,
  event: WebhookEvent,
  data: Record<string, unknown>,
  secret?: string,
): Promise<boolean> {
  const payload: WebhookPayload = {
    event,
    data,
    timestamp: new Date().toISOString(),
    idempotencyKey: `${event}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
  };

  const body = JSON.stringify(payload);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'TheOneCrawl-Webhook/1.0',
  };

  // Sign with HMAC-SHA256 if secret provided
  if (secret) {
    const signature = createHmac('sha256', secret).update(body).digest('hex');
    headers[WEBHOOK_SIGNATURE_HEADER] = `sha256=${signature}`;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.warn(`[webhook] Delivery failed: ${event} → ${url} (HTTP ${response.status})`);
      return false;
    }

    return true;
  } catch (err) {
    console.warn(`[webhook] Delivery error: ${event} → ${url}:`, err);
    return false;
  }
}

/**
 * Verify a webhook signature.
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string,
): boolean {
  const expected = createHmac('sha256', secret).update(body).digest('hex');
  return signature === `sha256=${expected}`;
}
