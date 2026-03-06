import { Redis as IORedis } from 'ioredis';
/**
 * Redis wrapper with graceful degradation.
 * If Redis is unavailable, operations silently fall back to no-ops.
 * AI calls should NEVER be blocked because Redis is down.
 */
export interface RedisClient {
    /** Whether Redis is connected */
    readonly connected: boolean;
    /** Increment a counter. Returns new value, or null if Redis unavailable. */
    incrby(key: string, amount: number): Promise<number | null>;
    /** Increment a float counter. */
    incrbyfloat(key: string, amount: number): Promise<number | null>;
    /** Get a value. */
    get(key: string): Promise<string | null>;
    /** Set a value with optional TTL (seconds). */
    set(key: string, value: string, ttlSeconds?: number): Promise<void>;
    /** Push to a list (usage buffer). */
    lpush(key: string, ...values: string[]): Promise<number | null>;
    /** Pop N items from a list. */
    lpop(key: string, count: number): Promise<string[] | null>;
    /** Get list length. */
    llen(key: string): Promise<number>;
    /** Set TTL on a key. */
    expire(key: string, seconds: number): Promise<void>;
    /** Delete a key. */
    del(key: string): Promise<void>;
    /** Disconnect. */
    quit(): Promise<void>;
}
export declare function createRedisClient(urlOrClient?: string | IORedis): RedisClient;
/**
 * In-memory fallback when Redis is not configured.
 * Provides basic quota tracking that works per-instance only (no distributed state).
 */
export declare function createMemoryClient(): RedisClient;
//# sourceMappingURL=redis.d.ts.map