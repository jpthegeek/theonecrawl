import { Redis as IORedis } from 'ioredis';
export function createRedisClient(urlOrClient) {
    let redis = null;
    let isConnected = false;
    if (urlOrClient instanceof IORedis) {
        redis = urlOrClient;
        isConnected = redis.status === 'ready';
    }
    else if (urlOrClient) {
        try {
            redis = new IORedis(urlOrClient, {
                maxRetriesPerRequest: 1,
                retryStrategy: (times) => (times > 3 ? null : Math.min(times * 200, 2000)),
                enableReadyCheck: true,
                lazyConnect: false,
            });
            redis.on('ready', () => { isConnected = true; });
            redis.on('error', () => { isConnected = false; });
            redis.on('close', () => { isConnected = false; });
        }
        catch {
            redis = null;
        }
    }
    async function safeCall(fn, fallback) {
        if (!redis || !isConnected)
            return fallback;
        try {
            return await fn();
        }
        catch {
            return fallback;
        }
    }
    return {
        get connected() { return isConnected; },
        incrby: (key, amount) => safeCall(() => redis.incrby(key, amount), null),
        incrbyfloat: (key, amount) => safeCall(() => redis.incrbyfloat(key, amount).then(Number), null),
        get: (key) => safeCall(() => redis.get(key), null),
        set: (key, value, ttl) => safeCall(async () => {
            if (ttl)
                await redis.set(key, value, 'EX', ttl);
            else
                await redis.set(key, value);
        }, undefined),
        lpush: (key, ...values) => safeCall(() => redis.lpush(key, ...values), null),
        lpop: (key, count) => safeCall(() => redis.lpop(key, count), null),
        llen: (key) => safeCall(() => redis.llen(key), 0),
        expire: (key, seconds) => safeCall(async () => { await redis.expire(key, seconds); }, undefined),
        del: (key) => safeCall(async () => { await redis.del(key); }, undefined),
        quit: async () => {
            if (redis) {
                try {
                    await redis.quit();
                }
                catch { /* ignore */ }
            }
        },
    };
}
/**
 * In-memory fallback when Redis is not configured.
 * Provides basic quota tracking that works per-instance only (no distributed state).
 */
export function createMemoryClient() {
    const store = new Map();
    const lists = new Map();
    const ttls = new Map();
    function setTtl(key, seconds) {
        const existing = ttls.get(key);
        if (existing)
            clearTimeout(existing);
        ttls.set(key, setTimeout(() => { store.delete(key); lists.delete(key); ttls.delete(key); }, seconds * 1000));
    }
    return {
        get connected() { return true; },
        async incrby(key, amount) {
            const val = Number(store.get(key) ?? 0) + amount;
            store.set(key, String(val));
            return val;
        },
        async incrbyfloat(key, amount) {
            const val = Number(store.get(key) ?? 0) + amount;
            store.set(key, String(val));
            return val;
        },
        async get(key) { return store.get(key) ?? null; },
        async set(key, value, ttl) {
            store.set(key, value);
            if (ttl)
                setTtl(key, ttl);
        },
        async lpush(key, ...values) {
            const list = lists.get(key) ?? [];
            list.unshift(...values);
            lists.set(key, list);
            return list.length;
        },
        async lpop(key, count) {
            const list = lists.get(key);
            if (!list || list.length === 0)
                return null;
            const result = list.splice(0, count);
            return result.length === 0 ? null : result;
        },
        async llen(key) { return lists.get(key)?.length ?? 0; },
        async expire(key, seconds) { setTtl(key, seconds); },
        async del(key) { store.delete(key); lists.delete(key); },
        async quit() { store.clear(); lists.clear(); },
    };
}
//# sourceMappingURL=redis.js.map