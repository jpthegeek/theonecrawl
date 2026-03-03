// ---------------------------------------------------------------------------
// TheOneCrawl — Sliding window rate limiter (Redis + in-memory fallback)
// ---------------------------------------------------------------------------

import { isRedisAvailable, getRedisClient } from '../shared/redis.js';
import { logger } from '../shared/logger.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  timestamps: number[];
  concurrentCount: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetMs: number;
}

// ---------------------------------------------------------------------------
// In-memory fallback state
// ---------------------------------------------------------------------------

const entries = new Map<string, RateLimitEntry>();
const WINDOW_MS = 60_000; // 1 minute
const CLEANUP_INTERVAL = 5 * 60_000; // 5 minutes

// Auto-cleanup stale entries
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of entries) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < WINDOW_MS);
    if (entry.timestamps.length === 0 && entry.concurrentCount === 0) {
      entries.delete(key);
    }
  }
}, CLEANUP_INTERVAL).unref();

// ---------------------------------------------------------------------------
// Redis Lua scripts
// ---------------------------------------------------------------------------

const RATE_LIMIT_LUA = `
local key = KEYS[1]
local window_ms = tonumber(ARGV[1])
local max_requests = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local member = ARGV[4]
local window_start = now - window_ms

-- Remove expired entries
redis.call('ZREMRANGEBYSCORE', key, '-inf', window_start)

-- Count current entries
local count = redis.call('ZCARD', key)

if count >= max_requests then
  -- Get oldest entry for reset time calculation
  local oldest = redis.call('ZRANGE', key, 0, 0, 'WITHSCORES')
  local reset_ms = window_ms
  if #oldest >= 2 then
    reset_ms = tonumber(oldest[2]) + window_ms - now
  end
  return {0, 0, reset_ms}
end

-- Add new entry
redis.call('ZADD', key, now, member)
redis.call('PEXPIRE', key, window_ms + 1000)

local remaining = max_requests - count - 1
return {1, remaining, window_ms}
`;

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Check and consume one request for the given key within the sliding window.
 * Uses Redis ZSET when available, falls back to in-memory.
 */
export async function checkRateLimit(key: string, maxRequests: number): Promise<RateLimitResult> {
  if (isRedisAvailable()) {
    try {
      return await checkRateLimitRedis(key, maxRequests);
    } catch (err) {
      logger.warn('Redis rate limit failed, falling back to in-memory', {
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }
  return checkRateLimitMemory(key, maxRequests);
}

/**
 * Track concurrent operations (e.g., active crawl jobs).
 * Uses Redis INCR when available, falls back to in-memory.
 */
export async function acquireConcurrency(key: string, maxConcurrent: number): Promise<boolean> {
  if (isRedisAvailable()) {
    try {
      return await acquireConcurrencyRedis(key, maxConcurrent);
    } catch (err) {
      logger.warn('Redis concurrency acquire failed, falling back to in-memory', {
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }
  return acquireConcurrencyMemory(key, maxConcurrent);
}

/**
 * Release a concurrent operation slot.
 */
export async function releaseConcurrency(key: string): Promise<void> {
  if (isRedisAvailable()) {
    try {
      await releaseConcurrencyRedis(key);
      return;
    } catch (err) {
      logger.warn('Redis concurrency release failed, falling back to in-memory', {
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }
  releaseConcurrencyMemory(key);
}

// ---------------------------------------------------------------------------
// Redis implementations
// ---------------------------------------------------------------------------

async function checkRateLimitRedis(key: string, maxRequests: number): Promise<RateLimitResult> {
  const redis = getRedisClient()!;
  const now = Date.now();
  const member = `${now}_${Math.random().toString(36).slice(2, 8)}`;

  const result = await redis.eval(
    RATE_LIMIT_LUA,
    1,
    `toc:rl:${key}`,
    WINDOW_MS.toString(),
    maxRequests.toString(),
    now.toString(),
    member,
  ) as [number, number, number];

  return {
    allowed: result[0] === 1,
    remaining: Math.max(0, result[1]),
    limit: maxRequests,
    resetMs: Math.max(0, result[2]),
  };
}

async function acquireConcurrencyRedis(key: string, maxConcurrent: number): Promise<boolean> {
  const redis = getRedisClient()!;
  const redisKey = `toc:cc:${key}`;
  const current = await redis.incr(redisKey);
  // Safety TTL in case of crashes (5 minutes)
  await redis.expire(redisKey, 300);
  if (current > maxConcurrent) {
    await redis.decr(redisKey);
    return false;
  }
  return true;
}

async function releaseConcurrencyRedis(key: string): Promise<void> {
  const redis = getRedisClient()!;
  const redisKey = `toc:cc:${key}`;
  const val = await redis.decr(redisKey);
  // Don't let it go negative
  if (val < 0) {
    await redis.set(redisKey, '0', 'EX', 300);
  }
}

// ---------------------------------------------------------------------------
// In-memory fallback implementations
// ---------------------------------------------------------------------------

function checkRateLimitMemory(key: string, maxRequests: number): RateLimitResult {
  const now = Date.now();
  let entry = entries.get(key);

  if (!entry) {
    entry = { timestamps: [], concurrentCount: 0 };
    entries.set(key, entry);
  }

  // Clean old timestamps outside the window
  entry.timestamps = entry.timestamps.filter((t) => now - t < WINDOW_MS);

  if (entry.timestamps.length >= maxRequests) {
    const oldestInWindow = entry.timestamps[0] ?? now;
    return {
      allowed: false,
      remaining: 0,
      limit: maxRequests,
      resetMs: oldestInWindow + WINDOW_MS - now,
    };
  }

  entry.timestamps.push(now);

  return {
    allowed: true,
    remaining: maxRequests - entry.timestamps.length,
    limit: maxRequests,
    resetMs: WINDOW_MS,
  };
}

function acquireConcurrencyMemory(key: string, maxConcurrent: number): boolean {
  let entry = entries.get(key);
  if (!entry) {
    entry = { timestamps: [], concurrentCount: 0 };
    entries.set(key, entry);
  }

  if (entry.concurrentCount >= maxConcurrent) {
    return false;
  }

  entry.concurrentCount++;
  return true;
}

function releaseConcurrencyMemory(key: string): void {
  const entry = entries.get(key);
  if (entry && entry.concurrentCount > 0) {
    entry.concurrentCount--;
  }
}
