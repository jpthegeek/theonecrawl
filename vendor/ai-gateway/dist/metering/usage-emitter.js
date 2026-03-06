export function createUsageEmitter(redis, platform) {
    return {
        async emit(event) {
            await redis.lpush(`ai:buffer:${platform}:usage`, JSON.stringify(event));
        },
        async emitAudit(record) {
            await redis.lpush(`ai:buffer:${platform}:audit`, JSON.stringify(record));
        },
        async bufferStatus() {
            const [usage, audit] = await Promise.all([
                redis.llen(`ai:buffer:${platform}:usage`),
                redis.llen(`ai:buffer:${platform}:audit`),
            ]);
            return { usage, audit };
        },
    };
}
//# sourceMappingURL=usage-emitter.js.map