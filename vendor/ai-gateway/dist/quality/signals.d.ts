/**
 * Quality Signals — AI response quality tracking.
 * Signals are buffered in Redis and flushed to Ops Center.
 */
import type { RedisClient } from '../utils/redis.js';
import type { QualitySignal } from '../types.js';
export interface QualityTracker {
    report(signal: QualitySignal & {
        platform: string;
    }): Promise<void>;
}
export declare function createQualityTracker(redis: RedisClient, platform: string): QualityTracker;
//# sourceMappingURL=signals.d.ts.map