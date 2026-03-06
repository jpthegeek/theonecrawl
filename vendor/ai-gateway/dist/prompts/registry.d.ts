/**
 * Prompt Registry — fetches versioned system prompts from Ops Center.
 * Caches locally in Redis with 10-min TTL.
 */
import type { RedisClient } from '../utils/redis.js';
export interface PromptVersion {
    feature: string;
    version: string;
    status: 'active' | 'testing' | 'archived';
    systemPrompt: string;
    parameters?: {
        temperature?: number;
        maxTokens?: number;
        topP?: number;
    };
    abTest?: {
        variant: string;
        trafficPct: number;
    };
}
export interface PromptRegistry {
    getPrompt(feature: string): Promise<PromptVersion | null>;
    invalidate(feature: string): Promise<void>;
}
export declare function createPromptRegistry(opts: {
    platform: string;
    redis: RedisClient;
    opsCenterUrl?: string;
    opsCenterApiKey?: string;
}): PromptRegistry;
//# sourceMappingURL=registry.d.ts.map