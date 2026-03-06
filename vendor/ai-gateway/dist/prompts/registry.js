/**
 * Prompt Registry — fetches versioned system prompts from Ops Center.
 * Caches locally in Redis with 10-min TTL.
 */
const CACHE_TTL = 600; // 10 minutes
export function createPromptRegistry(opts) {
    const { platform, redis, opsCenterUrl, opsCenterApiKey } = opts;
    async function getPrompt(feature) {
        const cacheKey = `ai:prompt:${platform}:${feature}`;
        // Try cache first
        const cached = await redis.get(cacheKey);
        if (cached) {
            try {
                return JSON.parse(cached);
            }
            catch {
                // Corrupted cache, fall through to fetch
            }
        }
        // Fetch from Ops Center
        if (!opsCenterUrl || !opsCenterApiKey)
            return null;
        try {
            const res = await fetch(`${opsCenterUrl}/api/ai-gateway/sdk/prompts/${platform}/${feature}`, {
                headers: { 'x-api-key': opsCenterApiKey },
                signal: AbortSignal.timeout(5000),
            });
            if (!res.ok)
                return null;
            const data = await res.json();
            const prompt = data.data;
            // Cache the result
            await redis.set(cacheKey, JSON.stringify(prompt), CACHE_TTL);
            return prompt;
        }
        catch {
            return null;
        }
    }
    async function invalidate(feature) {
        await redis.del(`ai:prompt:${platform}:${feature}`);
    }
    return { getPrompt, invalidate };
}
//# sourceMappingURL=registry.js.map