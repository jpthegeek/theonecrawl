// ---------------------------------------------------------------------------
// TheOneCrawl — Redis client singleton (ioredis)
// ---------------------------------------------------------------------------

import { Redis } from 'ioredis';
import { randomBytes } from 'node:crypto';
import { logger } from './logger.js';

type RedisClient = Redis;

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let client: RedisClient | null = null;
let available = false;
const instanceId = `toc_${randomBytes(6).toString('hex')}`;
let heartbeatInterval: ReturnType<typeof setInterval> | null = null;

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Initialize the Redis connection. Non-fatal — returns false if Redis
 * is not configured or connection fails.
 */
export async function initRedis(): Promise<boolean> {
  const url = process.env['REDIS_URL'];
  if (!url) {
    logger.info('REDIS_URL not set — using in-memory fallback');
    return false;
  }

  try {
    client = new Redis(url, {
      maxRetriesPerRequest: 3,
      retryStrategy(times: number) {
        if (times > 10) return null; // Stop retrying after 10 attempts
        return Math.min(times * 500, 5000); // Exponential backoff, max 5s
      },
      enableReadyCheck: true,
      lazyConnect: true,
      tls: url.startsWith('rediss://') ? { rejectUnauthorized: true } : undefined,
    });

    client.on('connect', () => {
      available = true;
      logger.info('Redis connected', { instanceId });
    });

    client.on('ready', () => {
      available = true;
    });

    client.on('error', (err: Error) => {
      logger.error('Redis error', { error: err.message });
    });

    client.on('close', () => {
      available = false;
      logger.warn('Redis connection closed');
    });

    client.on('end', () => {
      available = false;
    });

    await client.connect();

    // Start heartbeat
    heartbeatInterval = setInterval(async () => {
      if (client && available) {
        try {
          await client.set(`toc:instance:${instanceId}:heartbeat`, Date.now().toString(), 'EX', 60);
        } catch {
          // Non-critical
        }
      }
    }, 30_000);
    heartbeatInterval.unref();

    // Initial heartbeat
    await client.set(`toc:instance:${instanceId}:heartbeat`, Date.now().toString(), 'EX', 60);

    return true;
  } catch (err) {
    logger.warn('Redis connection failed — using in-memory fallback', {
      error: err instanceof Error ? err.message : String(err),
    });
    client = null;
    available = false;
    return false;
  }
}

/**
 * Check if Redis is currently available.
 */
export function isRedisAvailable(): boolean {
  return available && client !== null;
}

/**
 * Get the Redis client, or null if unavailable.
 */
export function getRedisClient(): RedisClient | null {
  return available ? client : null;
}

/**
 * Get the unique instance ID for this process.
 */
export function getInstanceId(): string {
  return instanceId;
}

/**
 * Gracefully close the Redis connection.
 */
export async function closeRedis(): Promise<void> {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }

  if (client) {
    try {
      // Remove heartbeat key
      await client.del(`toc:instance:${instanceId}:heartbeat`);
    } catch {
      // Best-effort cleanup
    }
    try {
      await client.quit();
    } catch {
      client.disconnect();
    }
    client = null;
    available = false;
    logger.info('Redis disconnected', { instanceId });
  }
}
