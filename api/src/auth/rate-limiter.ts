// ---------------------------------------------------------------------------
// TheOneCrawl — Sliding window rate limiter (in-memory)
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  timestamps: number[];
  concurrentCount: number;
}

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

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetMs: number;
}

/**
 * Check and consume one request for the given key within the sliding window.
 */
export function checkRateLimit(key: string, maxRequests: number): RateLimitResult {
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

/**
 * Track concurrent operations (e.g., active crawl jobs).
 */
export function acquireConcurrency(key: string, maxConcurrent: number): boolean {
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

export function releaseConcurrency(key: string): void {
  const entry = entries.get(key);
  if (entry && entry.concurrentCount > 0) {
    entry.concurrentCount--;
  }
}
