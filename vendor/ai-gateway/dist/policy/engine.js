const POLICY_CACHE_TTL = 300; // 5 minutes
/** Default policy used when Ops Center is unreachable. Permissive — never block. */
const DEFAULT_PLATFORM_POLICY = {
    platform: 'default',
    enabled: true,
    routing: {},
    tiers: {
        default: { model: 'gpt-4.1-mini', rpm: 60, dailyTokenLimit: null, monthlyBudgetUsd: null },
    },
    defaultTier: 'default',
    piiConfig: { default: 'allow', features: {}, patterns: {} },
    cacheConfig: {},
};
const DEFAULT_TENANT_POLICY = {
    tenantId: 'default',
    platform: 'default',
    enabled: true,
    tier: 'default',
    dailyTokenLimit: null,
    dailyTokenHardLimit: null,
    monthlyBudgetUsd: null,
    allowedFeatures: null,
    blockedCustomers: [],
};
export function createPolicyEngine(config) {
    const { platform, redis, opsCenterUrl, opsCenterApiKey, defaultFallback } = config;
    let platformPolicy = { ...DEFAULT_PLATFORM_POLICY, platform };
    const tenantPolicies = new Map();
    let lastFetch = 0;
    async function fetchPolicy() {
        if (!opsCenterUrl || !opsCenterApiKey)
            return;
        const now = Date.now();
        // Check Redis cache first
        const cached = await redis.get(`ai:policy:${platform}`);
        if (cached) {
            try {
                platformPolicy = JSON.parse(cached);
                lastFetch = now;
                return;
            }
            catch { /* fall through to fetch */ }
        }
        // Fetch from Ops Center if cache is stale
        if (now - lastFetch < POLICY_CACHE_TTL * 1000)
            return;
        try {
            const res = await fetch(`${opsCenterUrl}/api/ai-gateway/sdk/policy/${platform}`, {
                headers: { 'X-Api-Key': opsCenterApiKey },
                signal: AbortSignal.timeout(5000),
            });
            if (res.ok) {
                const data = await res.json();
                platformPolicy = data.platformPolicy;
                if (data.tenantPolicies) {
                    for (const tp of data.tenantPolicies) {
                        tenantPolicies.set(tp.tenantId, tp);
                    }
                }
                // Cache in Redis
                await redis.set(`ai:policy:${platform}`, JSON.stringify(platformPolicy), POLICY_CACHE_TTL);
                lastFetch = now;
            }
        }
        catch {
            // Ops Center unreachable — use cached/default policy. Never block.
        }
    }
    function getTenantPolicy(tenantId) {
        return tenantPolicies.get(tenantId) ?? { ...DEFAULT_TENANT_POLICY, tenantId, platform };
    }
    // Initial fetch (non-blocking)
    void fetchPolicy();
    return {
        getRouting(feature) {
            const routing = platformPolicy.routing[feature];
            if (routing) {
                return routing.fallback ? routing : { ...routing, fallback: defaultFallback };
            }
            // Fall back to tier default model
            const defaultTier = platformPolicy.tiers[platformPolicy.defaultTier];
            return {
                provider: 'azure-openai',
                model: defaultTier?.model ?? 'gpt-4.1-mini',
                fallback: defaultFallback,
            };
        },
        checkTenantAccess(tenantId, feature) {
            if (!platformPolicy.enabled) {
                return { allowed: false, reason: 'AI gateway is disabled for this platform' };
            }
            const tp = getTenantPolicy(tenantId);
            if (!tp.enabled) {
                return { allowed: false, reason: 'AI access suspended for this tenant' };
            }
            if (feature && tp.allowedFeatures && !tp.allowedFeatures.includes(feature)) {
                return { allowed: false, reason: `Feature '${feature}' not available on current plan` };
            }
            return { allowed: true };
        },
        async checkQuota(tenantId, estimatedTokens) {
            const tp = getTenantPolicy(tenantId);
            // Check daily token hard limit
            if (tp.dailyTokenHardLimit) {
                const key = `ai:quota:${platform}:${tenantId}:tokens:daily`;
                const current = Number(await redis.get(key) ?? 0);
                if (current + estimatedTokens > tp.dailyTokenHardLimit) {
                    return { allowed: false, reason: 'Daily token limit exceeded' };
                }
            }
            // Check monthly budget
            if (tp.monthlyBudgetUsd) {
                const key = `ai:quota:${platform}:${tenantId}:cost:monthly`;
                const current = Number(await redis.get(key) ?? 0);
                if (current >= tp.monthlyBudgetUsd) {
                    return { allowed: false, reason: 'Monthly budget exceeded' };
                }
            }
            return { allowed: true };
        },
        async recordUsage(tenantId, tokens, costUsd) {
            const dailyKey = `ai:quota:${platform}:${tenantId}:tokens:daily`;
            const monthlyTokenKey = `ai:quota:${platform}:${tenantId}:tokens:monthly`;
            const monthlyCostKey = `ai:quota:${platform}:${tenantId}:cost:monthly`;
            await Promise.all([
                redis.incrby(dailyKey, tokens).then(async (val) => {
                    // Set TTL to end of day UTC if this is the first increment
                    if (val === tokens) {
                        const now = new Date();
                        const endOfDay = new Date(now);
                        endOfDay.setUTCHours(23, 59, 59, 999);
                        const ttl = Math.ceil((endOfDay.getTime() - now.getTime()) / 1000);
                        await redis.expire(dailyKey, ttl);
                    }
                }),
                redis.incrby(monthlyTokenKey, tokens).then(async (val) => {
                    if (val === tokens) {
                        const now = new Date();
                        const endOfMonth = new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59);
                        const ttl = Math.ceil((endOfMonth.getTime() - now.getTime()) / 1000);
                        await redis.expire(monthlyTokenKey, ttl);
                    }
                }),
                redis.incrbyfloat(monthlyCostKey, costUsd).then(async (val) => {
                    if (val !== null && val === costUsd) {
                        const now = new Date();
                        const endOfMonth = new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59);
                        const ttl = Math.ceil((endOfMonth.getTime() - now.getTime()) / 1000);
                        await redis.expire(monthlyCostKey, ttl);
                    }
                }),
            ]);
        },
        async refresh() {
            lastFetch = 0;
            await fetchPolicy();
        },
        getPlatformPolicy: () => platformPolicy,
        getTenantPolicy,
        getPIIConfig: () => {
            const cfg = platformPolicy.piiConfig;
            if (!cfg || cfg.default === 'allow' && Object.keys(cfg.features).length === 0)
                return null;
            return cfg;
        },
    };
}
//# sourceMappingURL=engine.js.map