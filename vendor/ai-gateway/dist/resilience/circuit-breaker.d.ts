import type { RedisClient } from '../utils/redis.js';
export type CircuitState = 'closed' | 'open' | 'half_open';
export interface CircuitBreaker {
    /** Get current state for a provider. */
    getState(provider: string): Promise<CircuitState>;
    /** Record a successful call. */
    recordSuccess(provider: string): Promise<void>;
    /** Record a failed call. Returns true if circuit just opened. */
    recordFailure(provider: string): Promise<boolean>;
    /** Check if calls should be allowed. */
    canCall(provider: string): Promise<boolean>;
}
interface CircuitBreakerConfig {
    /** Number of failures before opening circuit (default: 5) */
    failureThreshold?: number;
    /** Seconds before trying half-open (default: 30) */
    cooldownSeconds?: number;
    /** Window for counting failures in seconds (default: 60) */
    failureWindowSeconds?: number;
    /** Seconds to keep half-open state before auto-closing (default: 60) */
    halfOpenSeconds?: number;
}
export declare function createCircuitBreaker(redis: RedisClient, config?: CircuitBreakerConfig): CircuitBreaker;
export {};
//# sourceMappingURL=circuit-breaker.d.ts.map