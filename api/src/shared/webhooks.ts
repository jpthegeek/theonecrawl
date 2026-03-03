// ---------------------------------------------------------------------------
// TheOneCrawl — HMAC-SHA256 webhook delivery
// ---------------------------------------------------------------------------

import { createHmac, timingSafeEqual } from 'node:crypto';
import { WEBHOOK_SIGNATURE_HEADER } from './constants.js';
import { validateUrlNotPrivate } from './ssrf.js';
import { logger } from './logger.js';
import { trackWebhookDelivery } from '../auth/abuse-detection.js';

export type WebhookEvent =
  | 'crawl.started'
  | 'crawl.page'
  | 'crawl.completed'
  | 'crawl.failed'
  | 'scrape.completed'
  | 'batch.started'
  | 'batch.url_completed'
  | 'batch.completed'
  | 'batch.failed';

interface WebhookPayload {
  event: WebhookEvent;
  data: Record<string, unknown>;
  timestamp: string;
  idempotencyKey: string;
}

// Maximum age for webhook replay protection (5 minutes)
const MAX_WEBHOOK_AGE_MS = 5 * 60 * 1000;

const RETRY_DELAYS_MS = [0, 5_000, 30_000]; // immediate, 5s, 30s

/**
 * Deliver a webhook with HMAC-SHA256 signature.
 * Retries up to 3 times with exponential backoff (0s, 5s, 30s).
 */
export async function sendWebhook(
  url: string,
  event: WebhookEvent,
  data: Record<string, unknown>,
  secret?: string,
  accountId?: string,
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

  // Re-validate SSRF at delivery time (DNS may have changed since creation)
  const ssrfCheck = await validateUrlNotPrivate(url);
  if (!ssrfCheck.valid) {
    logger.warn('Webhook URL failed SSRF check at delivery time', { event, url, error: ssrfCheck.error });
    return false;
  }

  // Track webhook delivery for flood detection
  try {
    const domain = new URL(url).hostname;
    void trackWebhookDelivery(domain, accountId);
  } catch {
    // URL parse failure — non-critical
  }

  for (let attempt = 0; attempt < RETRY_DELAYS_MS.length; attempt++) {
    const delay = RETRY_DELAYS_MS[attempt]!;
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
        signal: AbortSignal.timeout(10_000),
        redirect: 'manual', // Prevent redirect-based SSRF
      });

      if (response.ok) {
        return true;
      }

      // If redirect, don't follow — log and treat as failure
      if (response.status >= 300 && response.status < 400) {
        logger.warn('Webhook URL redirected (not followed for SSRF safety)', {
          event, url, status: response.status, attempt: attempt + 1,
        });
        return false;
      }

      logger.warn('Webhook delivery failed', { event, url, status: response.status, attempt: attempt + 1 });
    } catch (err) {
      logger.warn('Webhook delivery error', {
        event, url,
        error: err instanceof Error ? err.message : String(err),
        attempt: attempt + 1,
      });
    }
  }

  return false;
}

/**
 * Verify a webhook signature using timing-safe comparison.
 * Also validates timestamp freshness to prevent replay attacks.
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string,
): boolean {
  // Compute expected signature
  const expected = `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;

  // Length check first (timingSafeEqual requires equal-length buffers)
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) {
    return false;
  }

  // Timing-safe comparison
  if (!timingSafeEqual(sigBuf, expBuf)) {
    return false;
  }

  // Replay protection: check timestamp freshness
  try {
    const parsed = JSON.parse(body);
    if (parsed.timestamp) {
      const age = Date.now() - new Date(parsed.timestamp).getTime();
      if (age > MAX_WEBHOOK_AGE_MS || age < -MAX_WEBHOOK_AGE_MS) {
        return false;
      }
    }
  } catch {
    // If body isn't valid JSON, skip timestamp check
  }

  return true;
}
