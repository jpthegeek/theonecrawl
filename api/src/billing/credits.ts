// ---------------------------------------------------------------------------
// TheOneCrawl — Credit management (Redis cache + Cosmos persistence)
// ---------------------------------------------------------------------------

import { nanoid } from 'nanoid';
import type { CrawlCredits, CrawlPlan } from '../engine/types.js';
import { PLAN_CREDITS } from '../shared/constants.js';
import { cosmosUpsert, cosmosRead, isCosmosConfigured } from '../shared/cosmos.js';
import { isRedisAvailable, getRedisClient } from '../shared/redis.js';
import { logger } from '../shared/logger.js';

// ---------------------------------------------------------------------------
// In-memory store (backed by Redis cache + Cosmos persistence)
// ---------------------------------------------------------------------------

interface CreditRecord {
  accountId: string;
  plan: CrawlPlan;
  used: number;
  resetDate: string;
}

const store = new Map<string, CreditRecord>();
const REDIS_CREDIT_TTL = 300; // 5 minutes

// ---------------------------------------------------------------------------
// Redis Lua script for atomic credit consumption
// ---------------------------------------------------------------------------

const CONSUME_CREDIT_LUA = `
local key = KEYS[1]
local max_credits = tonumber(ARGV[1])
local count = tonumber(ARGV[2])

local used = tonumber(redis.call('HGET', key, 'used') or '0')
if used + count > max_credits then
  return -1
end

local new_used = used + count
redis.call('HSET', key, 'used', new_used)
return new_used
`;

// ---------------------------------------------------------------------------
// Cosmos persistence
// ---------------------------------------------------------------------------

interface CreditDocument {
  [key: string]: unknown;
  id: string;
  account_id: string;
  type: 'credit_record';
  plan: CrawlPlan;
  used: number;
  resetDate: string;
  updated_at: string;
}

async function persistCredits(record: CreditRecord): Promise<void> {
  if (!isCosmosConfigured()) return;
  try {
    const doc: CreditDocument = {
      id: `credits_${record.accountId}`,
      account_id: record.accountId,
      type: 'credit_record',
      plan: record.plan,
      used: record.used,
      resetDate: record.resetDate,
      updated_at: new Date().toISOString(),
    };
    await cosmosUpsert('billing', doc);
  } catch (err) {
    logger.error('Failed to persist credits', { accountId: record.accountId, error: err instanceof Error ? err.message : String(err) });
  }
}

async function loadCredits(accountId: string): Promise<CreditRecord | null> {
  if (!isCosmosConfigured()) return null;
  try {
    const doc = await cosmosRead<CreditDocument>(
      'billing',
      `credits_${accountId}`,
      accountId,
    );
    if (!doc) return null;
    return { accountId, plan: doc.plan, used: doc.used, resetDate: doc.resetDate };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Redis cache helpers
// ---------------------------------------------------------------------------

async function cacheToRedis(record: CreditRecord): Promise<void> {
  const redis = getRedisClient();
  if (!redis) return;
  try {
    const key = `toc:credits:${record.accountId}`;
    await redis.hset(key, {
      plan: record.plan,
      used: record.used.toString(),
      resetDate: record.resetDate,
    });
    await redis.expire(key, REDIS_CREDIT_TTL);
  } catch {
    // Non-critical
  }
}

async function loadFromRedis(accountId: string): Promise<CreditRecord | null> {
  const redis = getRedisClient();
  if (!redis) return null;
  try {
    const data = await redis.hgetall(`toc:credits:${accountId}`);
    if (!data || !data['plan']) return null;
    return {
      accountId,
      plan: data['plan'] as CrawlPlan,
      used: parseInt(data['used'] || '0', 10),
      resetDate: data['resetDate'] || computeNextResetDate(),
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function checkCredits(accountId: string): CrawlCredits {
  const record = getOrCreateRecord(accountId);
  maybeResetCredits(record);

  const total = PLAN_CREDITS[record.plan] ?? PLAN_CREDITS['free']!;
  const remaining = Math.max(0, total - record.used);

  return {
    accountId: record.accountId,
    total,
    used: record.used,
    remaining,
    resetDate: record.resetDate,
    plan: record.plan,
  };
}

export function consumeCredit(accountId: string): boolean {
  const record = getOrCreateRecord(accountId);
  maybeResetCredits(record);

  const total = PLAN_CREDITS[record.plan] ?? PLAN_CREDITS['free']!;
  if (record.used >= total) return false;

  record.used++;
  store.set(accountId, record);

  // Write-through: Redis + Cosmos
  void cacheToRedis(record);
  void persistCredits(record);
  return true;
}

export function consumeCredits(accountId: string, count: number): number {
  const record = getOrCreateRecord(accountId);
  maybeResetCredits(record);

  const total = PLAN_CREDITS[record.plan] ?? PLAN_CREDITS['free']!;
  const remaining = Math.max(0, total - record.used);
  const consumed = Math.min(remaining, count);

  record.used += consumed;
  store.set(accountId, record);
  void cacheToRedis(record);
  void persistCredits(record);
  return consumed;
}

export function getCreditsForPlan(plan: CrawlPlan): number {
  return PLAN_CREDITS[plan] ?? PLAN_CREDITS['free']!;
}

export function setPlan(accountId: string, plan: CrawlPlan): void {
  const record = getOrCreateRecord(accountId);
  const oldPlan = record.plan;
  record.plan = plan;
  const oldTotal = PLAN_CREDITS[oldPlan] ?? PLAN_CREDITS['free']!;
  const newTotal = PLAN_CREDITS[plan] ?? PLAN_CREDITS['free']!;
  if (newTotal > oldTotal) {
    record.used = 0;
  }
  store.set(accountId, record);
  void cacheToRedis(record);
  void persistCredits(record);
}

export function resetCredits(accountId: string): CrawlCredits {
  const record = getOrCreateRecord(accountId);
  record.used = 0;
  record.resetDate = computeNextResetDate();
  store.set(accountId, record);
  void cacheToRedis(record);
  void persistCredits(record);
  return checkCredits(accountId);
}

// ---------------------------------------------------------------------------
// Usage event tracking
// ---------------------------------------------------------------------------

export function recordUsageEvent(
  accountId: string,
  operation: string,
  credits: number,
  url?: string,
): void {
  if (!isCosmosConfigured()) return;
  const doc = {
    id: `usage_${nanoid(16)}`,
    account_id: accountId,
    type: 'usage_event' as const,
    operation,
    credits,
    url,
    created_at: new Date().toISOString(),
  };
  void cosmosUpsert('billing', doc).catch((err) => {
    logger.error('Failed to record usage event', {
      accountId,
      operation,
      error: err instanceof Error ? err.message : String(err),
    });
  });
}

// ---------------------------------------------------------------------------
// Credit refunds
// ---------------------------------------------------------------------------

export function refundCredit(accountId: string): void {
  const record = getOrCreateRecord(accountId);
  if (record.used > 0) {
    record.used--;
    store.set(accountId, record);
    void cacheToRedis(record);
    void persistCredits(record);
  }
}

export function refundCredits(accountId: string, count: number): void {
  if (count <= 0) return;
  const record = getOrCreateRecord(accountId);
  record.used = Math.max(0, record.used - count);
  store.set(accountId, record);
  void cacheToRedis(record);
  void persistCredits(record);
}

// ---------------------------------------------------------------------------
// Hydration — ensure credit record is loaded before checking/consuming
// ---------------------------------------------------------------------------

const hydrationPromises = new Map<string, Promise<void>>();

/**
 * Ensure credit record is hydrated from Redis/Cosmos before checking/consuming.
 * Checks Redis first (fast), then Cosmos (authoritative).
 */
export async function ensureHydrated(accountId: string): Promise<void> {
  const pending = hydrationPromises.get(accountId);
  if (pending) {
    await pending;
    return;
  }

  if (store.has(accountId)) return;

  const promise = (async () => {
    // Try Redis first (sub-ms latency)
    if (isRedisAvailable()) {
      const cached = await loadFromRedis(accountId);
      if (cached && !store.has(accountId)) {
        store.set(accountId, cached);
        return;
      }
    }

    // Fall back to Cosmos
    const saved = await loadCredits(accountId);
    if (!store.has(accountId)) {
      const record = saved ?? {
        accountId,
        plan: 'free' as CrawlPlan,
        used: 0,
        resetDate: computeNextResetDate(),
      };
      store.set(accountId, record);
      // Warm Redis cache for next time
      void cacheToRedis(record);
    }
  })();

  hydrationPromises.set(accountId, promise);
  try {
    await promise;
  } finally {
    hydrationPromises.delete(accountId);
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function getOrCreateRecord(accountId: string): CreditRecord {
  let record = store.get(accountId);
  if (!record) {
    record = {
      accountId,
      plan: 'free',
      used: 0,
      resetDate: computeNextResetDate(),
    };
    store.set(accountId, record);
  }
  return record;
}

function maybeResetCredits(record: CreditRecord): void {
  const now = new Date();
  const resetDate = new Date(record.resetDate);
  if (now >= resetDate) {
    record.used = 0;
    record.resetDate = computeNextResetDate();
    store.set(record.accountId, record);
    void cacheToRedis(record);
    void persistCredits(record);
  }
}

function computeNextResetDate(): string {
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  return next.toISOString();
}
