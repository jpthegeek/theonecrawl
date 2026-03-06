/**
 * Quality Signals — AI response quality tracking.
 * Signals are buffered in Redis and flushed to Ops Center.
 */
export function createQualityTracker(redis, platform) {
    async function report(signal) {
        try {
            await redis.lpush(`ai:buffer:${platform}:quality`, JSON.stringify({
                ...signal,
                timestamp: new Date().toISOString(),
            }));
        }
        catch {
            // Non-critical — quality signals are best-effort
        }
    }
    return { report };
}
//# sourceMappingURL=signals.js.map