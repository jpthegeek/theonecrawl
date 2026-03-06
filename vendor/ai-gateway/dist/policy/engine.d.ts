import type { RedisClient } from '../utils/redis.js';
import type { PlatformPolicy, TenantPolicy, FeatureRouting, PIIConfig } from '../types.js';
export interface PolicyEngine {
    /** Get the resolved routing for a feature (model + provider). */
    getRouting(feature: string): FeatureRouting;
    /** Check if a tenant is enabled and allowed to use a feature. */
    checkTenantAccess(tenantId: string, feature?: string): {
        allowed: boolean;
        reason?: string;
    };
    /** Check quota — returns { allowed, remaining } based on Redis counters. */
    checkQuota(tenantId: string, estimatedTokens: number): Promise<{
        allowed: boolean;
        reason?: string;
    }>;
    /** Record token usage against quota counters. */
    recordUsage(tenantId: string, tokens: number, costUsd: number): Promise<void>;
    /** Force refresh policies from Ops Center. */
    refresh(): Promise<void>;
    /** Get the full platform policy (for inspection). */
    getPlatformPolicy(): PlatformPolicy;
    /** Get a tenant policy (for inspection). */
    getTenantPolicy(tenantId: string): TenantPolicy;
    /** Get PII scrubbing config. */
    getPIIConfig?(): PIIConfig | null;
}
interface PolicyEngineConfig {
    platform: string;
    redis: RedisClient;
    opsCenterUrl?: string;
    opsCenterApiKey?: string;
    defaultFallback?: {
        provider: string;
        model: string;
    };
}
export declare function createPolicyEngine(config: PolicyEngineConfig): PolicyEngine;
export {};
//# sourceMappingURL=engine.d.ts.map