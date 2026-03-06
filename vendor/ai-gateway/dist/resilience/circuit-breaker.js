export function createCircuitBreaker(redis, config) {
    const failureThreshold = config?.failureThreshold ?? 5;
    const cooldownSeconds = config?.cooldownSeconds ?? 30;
    const failureWindowSeconds = config?.failureWindowSeconds ?? 60;
    const halfOpenSeconds = config?.halfOpenSeconds ?? 60;
    const prefix = 'ai:circuit';
    return {
        async getState(provider) {
            const state = await redis.get(`${prefix}:${provider}:state`);
            if (state === 'open' || state === 'half_open' || state === 'closed') {
                return state;
            }
            // No state key — check if we recently had an open state (cooldown sentinel)
            const hadOpen = await redis.get(`${prefix}:${provider}:cooldown`);
            if (hadOpen) {
                // Cooldown expired but sentinel still present → half_open
                return 'half_open';
            }
            return 'closed';
        },
        async recordSuccess(provider) {
            const state = await this.getState(provider);
            if (state === 'half_open' || state === 'open') {
                // Successful call → close the circuit
                await redis.set(`${prefix}:${provider}:state`, 'closed');
                await redis.del(`${prefix}:${provider}:failures`);
                await redis.del(`${prefix}:${provider}:cooldown`);
            }
        },
        async recordFailure(provider) {
            const state = await this.getState(provider);
            // If half_open and we fail, go back to open
            if (state === 'half_open') {
                await redis.set(`${prefix}:${provider}:state`, 'open', cooldownSeconds);
                await redis.set(`${prefix}:${provider}:cooldown`, '1', cooldownSeconds + halfOpenSeconds);
                return true;
            }
            const failKey = `${prefix}:${provider}:failures`;
            const count = await redis.incrby(failKey, 1);
            if (count === 1) {
                await redis.expire(failKey, failureWindowSeconds);
            }
            if (count !== null && count >= failureThreshold) {
                // Open the circuit — state key expires after cooldown, triggering half_open
                await redis.set(`${prefix}:${provider}:state`, 'open', cooldownSeconds);
                // Cooldown sentinel lasts longer so getState can detect half_open after open expires
                await redis.set(`${prefix}:${provider}:cooldown`, '1', cooldownSeconds + halfOpenSeconds);
                return true;
            }
            return false;
        },
        async canCall(provider) {
            const state = await this.getState(provider);
            if (state === 'closed')
                return true;
            if (state === 'open')
                return false;
            // half_open: allow one test request
            return true;
        },
    };
}
//# sourceMappingURL=circuit-breaker.js.map