// ---------------------------------------------------------------------------
// TheOneCrawl — Account-level abuse detection engine
//
// Tracks signals in Redis (auto-expiring), computes abuse scores, and
// applies progressive penalties. Falls back to no-op when Redis unavailable.
// ---------------------------------------------------------------------------

import { isRedisAvailable, getRedisClient } from '../shared/redis.js';
import { DEFAULT_ABUSE_THRESHOLDS, ABUSE_SCORE_THRESHOLDS, ABUSE_SCORE_DECAY_PER_HOUR } from '../shared/constants.js';
import { logger } from '../shared/logger.js';
import type { AbuseStatus } from './api-keys.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AbuseThresholds {
  credential_stuffing: { count: number; windowSeconds: number; weight: number };
  velocity_spike: { multiplier: number; windowSeconds: number; weight: number };
  credit_burn: { percentThreshold: number; windowSeconds: number; weight: number };
  coordinated_targeting: { count: number; windowSeconds: number; weight: number };
  webhook_flood: { count: number; windowSeconds: number; weight: number };
  signup_abuse: { count: number; windowSeconds: number; weight: number };
  key_compromise: { count: number; windowSeconds: number; weight: number };
}

export interface AbuseDetails {
  accountId: string;
  status: AbuseStatus;
  score: number;
  signals: Record<string, number>;
  lastUpdated: string;
}

// ---------------------------------------------------------------------------
// Threshold loading (runtime-updatable via Redis)
// ---------------------------------------------------------------------------

let thresholds: AbuseThresholds = { ...DEFAULT_ABUSE_THRESHOLDS };

export async function loadThresholds(): Promise<void> {
  const redis = getRedisClient();
  if (!redis) return;
  try {
    const data = await redis.get('toc:abuse:config');
    if (data) {
      thresholds = { ...DEFAULT_ABUSE_THRESHOLDS, ...JSON.parse(data) };
    }
  } catch {
    // Use defaults
  }
}

export function getThresholds(): AbuseThresholds {
  return { ...thresholds };
}

export async function setThresholds(updates: Partial<AbuseThresholds>): Promise<void> {
  thresholds = { ...thresholds, ...updates };
  const redis = getRedisClient();
  if (redis) {
    await redis.set('toc:abuse:config', JSON.stringify(thresholds));
  }
}

// ---------------------------------------------------------------------------
// Signal tracking
// ---------------------------------------------------------------------------

async function incrementSignal(signalKey: string, windowSeconds: number): Promise<number> {
  const redis = getRedisClient();
  if (!redis) return 0;

  const pipeline = redis.pipeline();
  pipeline.incr(signalKey);
  pipeline.expire(signalKey, windowSeconds);
  const results = await pipeline.exec();
  return (results?.[0]?.[1] as number) ?? 0;
}

async function getSignalCount(signalKey: string): Promise<number> {
  const redis = getRedisClient();
  if (!redis) return 0;
  const val = await redis.get(signalKey);
  return val ? parseInt(val, 10) : 0;
}

// ---------------------------------------------------------------------------
// Score management
// ---------------------------------------------------------------------------

async function getScore(accountId: string): Promise<number> {
  const redis = getRedisClient();
  if (!redis) return 0;

  const data = await redis.hgetall(`toc:abuse:account:${accountId}`);
  if (!data || !data['score']) return 0;

  const score = parseFloat(data['score']);
  const lastUpdate = data['lastUpdate'] ? parseInt(data['lastUpdate'], 10) : Date.now();
  const hoursSince = (Date.now() - lastUpdate) / (60 * 60 * 1000);

  // Apply decay
  const decayed = Math.max(0, score - hoursSince * ABUSE_SCORE_DECAY_PER_HOUR);
  return Math.round(decayed * 100) / 100;
}

async function addScore(accountId: string, points: number, reason: string): Promise<number> {
  const redis = getRedisClient();
  if (!redis) return 0;

  const current = await getScore(accountId);
  const newScore = Math.min(150, current + points); // Cap at 150

  await redis.hset(`toc:abuse:account:${accountId}`, {
    score: newScore.toString(),
    lastUpdate: Date.now().toString(),
    lastReason: reason,
  });
  await redis.expire(`toc:abuse:account:${accountId}`, 7 * 24 * 60 * 60); // 7 day TTL

  // Check for status transitions
  await checkStatusTransition(accountId, newScore, reason);

  return newScore;
}

// ---------------------------------------------------------------------------
// Status management
// ---------------------------------------------------------------------------

export async function getAccountStatus(accountId: string): Promise<AbuseStatus> {
  const redis = getRedisClient();
  if (!redis) return 'active';

  const status = await redis.hget(`toc:abuse:account:${accountId}`, 'status');
  return (status as AbuseStatus) || 'active';
}

export async function setAccountStatus(
  accountId: string,
  status: AbuseStatus,
  reason?: string,
): Promise<void> {
  const redis = getRedisClient();
  if (!redis) return;

  await redis.hset(`toc:abuse:account:${accountId}`, {
    status,
    statusChangedAt: new Date().toISOString(),
    statusReason: reason || '',
  });

  logger.warn('Abuse status changed', { accountId, status, reason });
}

async function checkStatusTransition(
  accountId: string,
  score: number,
  reason: string,
): Promise<void> {
  const currentStatus = await getAccountStatus(accountId);
  let newStatus: AbuseStatus = 'active';

  if (score >= ABUSE_SCORE_THRESHOLDS.banned) {
    newStatus = 'banned';
  } else if (score >= ABUSE_SCORE_THRESHOLDS.suspended) {
    newStatus = 'suspended';
  } else if (score >= ABUSE_SCORE_THRESHOLDS.throttled) {
    newStatus = 'throttled';
  } else if (score >= ABUSE_SCORE_THRESHOLDS.warned) {
    newStatus = 'warned';
  }

  // Only escalate, never auto-de-escalate (admin must manually clear)
  const statusOrder: AbuseStatus[] = ['active', 'warned', 'throttled', 'suspended', 'banned'];
  const currentIdx = statusOrder.indexOf(currentStatus);
  const newIdx = statusOrder.indexOf(newStatus);

  if (newIdx > currentIdx) {
    await setAccountStatus(accountId, newStatus, reason);
  }
}

// ---------------------------------------------------------------------------
// Signal emission functions (fire-and-forget from route handlers)
// ---------------------------------------------------------------------------

/**
 * Track a general API request for velocity monitoring.
 */
export async function trackRequest(accountId: string, ip: string): Promise<void> {
  if (!isRedisAvailable()) return;

  try {
    const t = thresholds.velocity_spike;
    const count = await incrementSignal(
      `toc:abuse:velocity:${accountId}`,
      t.windowSeconds,
    );

    // Check velocity spike against baseline
    const redis = getRedisClient()!;
    const baselineKey = `toc:abuse:baseline:${accountId}`;
    const baseline = await redis.get(baselineKey);
    const baselineCount = baseline ? parseInt(baseline, 10) : 100; // Default baseline

    if (count > baselineCount * t.multiplier) {
      await addScore(accountId, t.weight, 'velocity_spike');
    }

    // Update rolling baseline hourly
    if (count === 1) {
      // First request in window — store previous window's count as baseline
      const prevKey = `toc:abuse:velocity_prev:${accountId}`;
      const prev = await redis.get(prevKey);
      if (prev) {
        await redis.set(baselineKey, prev, 'EX', 86400);
      }
    }
    await redis.set(`toc:abuse:velocity_prev:${accountId}`, count.toString(), 'EX', t.windowSeconds * 2);

    // Track distinct IPs per account (key compromise detection)
    const kc = thresholds.key_compromise;
    const ipKey = `toc:abuse:ips:${accountId}`;
    await redis.sadd(ipKey, ip);
    await redis.expire(ipKey, kc.windowSeconds);
    const ipCount = await redis.scard(ipKey);
    if (ipCount >= kc.count) {
      await addScore(accountId, kc.weight, 'key_compromise');
    }
  } catch (err) {
    logger.error('Abuse tracking error', { error: err instanceof Error ? err.message : String(err) });
  }
}

/**
 * Track a failed login attempt for credential stuffing detection.
 */
export async function trackLoginFailure(ip: string, email: string): Promise<void> {
  if (!isRedisAvailable()) return;

  try {
    const t = thresholds.credential_stuffing;

    // Track distinct emails per IP
    const key = `toc:abuse:login_fail:${ip}`;
    const redis = getRedisClient()!;
    await redis.sadd(key, email);
    await redis.expire(key, t.windowSeconds);
    const distinctEmails = await redis.scard(key);

    if (distinctEmails >= t.count) {
      // Can't attribute to a specific account — use IP-based score
      await addScore(`ip:${ip}`, t.weight, 'credential_stuffing');
    }
  } catch (err) {
    logger.error('Login failure tracking error', { error: err instanceof Error ? err.message : String(err) });
  }
}

/**
 * Track a new registration for signup abuse detection.
 */
export async function trackRegistration(ip: string): Promise<void> {
  if (!isRedisAvailable()) return;

  try {
    const t = thresholds.signup_abuse;
    const count = await incrementSignal(
      `toc:abuse:signup:${ip}`,
      t.windowSeconds,
    );

    if (count >= t.count) {
      await addScore(`ip:${ip}`, t.weight, 'signup_abuse');
    }
  } catch (err) {
    logger.error('Registration tracking error', { error: err instanceof Error ? err.message : String(err) });
  }
}

/**
 * Track credit consumption for credit burn detection.
 */
export async function trackCreditConsumption(
  accountId: string,
  creditsUsed: number,
  totalCredits: number,
): Promise<void> {
  if (!isRedisAvailable()) return;

  try {
    const t = thresholds.credit_burn;
    const key = `toc:abuse:credits:${accountId}`;
    const redis = getRedisClient()!;

    const count = await redis.incrby(key, creditsUsed);
    await redis.expire(key, t.windowSeconds);

    const percentConsumed = (count / totalCredits) * 100;
    if (percentConsumed >= t.percentThreshold) {
      await addScore(accountId, t.weight, 'credit_burn');
    }
  } catch (err) {
    logger.error('Credit consumption tracking error', { error: err instanceof Error ? err.message : String(err) });
  }
}

/**
 * Track webhook delivery for webhook flood detection.
 */
export async function trackWebhookDelivery(
  domain: string,
  accountId?: string,
): Promise<void> {
  if (!isRedisAvailable()) return;

  try {
    const t = thresholds.webhook_flood;
    const count = await incrementSignal(
      `toc:abuse:webhook:${domain}`,
      t.windowSeconds,
    );

    if (count >= t.count && accountId) {
      await addScore(accountId, t.weight, 'webhook_flood');
    }
  } catch (err) {
    logger.error('Webhook delivery tracking error', { error: err instanceof Error ? err.message : String(err) });
  }
}

// ---------------------------------------------------------------------------
// Admin query functions
// ---------------------------------------------------------------------------

export async function getAbuseDetails(accountId: string): Promise<AbuseDetails> {
  const redis = getRedisClient();
  if (!redis) {
    return { accountId, status: 'active', score: 0, signals: {}, lastUpdated: new Date().toISOString() };
  }

  const data = await redis.hgetall(`toc:abuse:account:${accountId}`);
  const score = await getScore(accountId);

  // Gather signal counts
  const signals: Record<string, number> = {};
  const signalKeys = [
    `toc:abuse:velocity:${accountId}`,
    `toc:abuse:credits:${accountId}`,
  ];

  for (const key of signalKeys) {
    const val = await redis.get(key);
    if (val) {
      const signalName = key.split(':')[3] || key;
      signals[signalName] = parseInt(val, 10);
    }
  }

  // Distinct IP count
  const ipCount = await redis.scard(`toc:abuse:ips:${accountId}`);
  if (ipCount > 0) signals['distinct_ips'] = ipCount;

  return {
    accountId,
    status: (data?.['status'] as AbuseStatus) || 'active',
    score,
    signals,
    lastUpdated: data?.['statusChangedAt'] || new Date().toISOString(),
  };
}

/**
 * List all accounts with non-active abuse status.
 */
export async function listFlaggedAccounts(): Promise<AbuseDetails[]> {
  const redis = getRedisClient();
  if (!redis) return [];

  try {
    // Scan for abuse account keys
    const flagged: AbuseDetails[] = [];
    let cursor = '0';

    do {
      const [nextCursor, keys] = await redis.scan(
        cursor,
        'MATCH',
        'toc:abuse:account:*',
        'COUNT',
        100,
      );
      cursor = nextCursor;

      for (const key of keys) {
        const accountId = key.replace('toc:abuse:account:', '');
        if (accountId.startsWith('ip:')) continue; // Skip IP-based entries

        const data = await redis.hgetall(key);
        if (data?.['status'] && data['status'] !== 'active') {
          flagged.push({
            accountId,
            status: data['status'] as AbuseStatus,
            score: await getScore(accountId),
            signals: {},
            lastUpdated: data['statusChangedAt'] || '',
          });
        }
      }
    } while (cursor !== '0');

    return flagged.sort((a, b) => b.score - a.score);
  } catch (err) {
    logger.error('Failed to list flagged accounts', {
      error: err instanceof Error ? err.message : String(err),
    });
    return [];
  }
}
