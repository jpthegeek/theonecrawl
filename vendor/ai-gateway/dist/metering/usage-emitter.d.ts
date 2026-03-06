import type { RedisClient } from '../utils/redis.js';
import type { UsageEvent, AuditRecord } from '../types.js';
export interface UsageEmitter {
    /** Buffer a usage event for batch writing to Cosmos. */
    emit(event: UsageEvent): Promise<void>;
    /** Buffer an audit record. */
    emitAudit(record: AuditRecord): Promise<void>;
    /** Get current buffer sizes. */
    bufferStatus(): Promise<{
        usage: number;
        audit: number;
    }>;
}
export declare function createUsageEmitter(redis: RedisClient, platform: string): UsageEmitter;
//# sourceMappingURL=usage-emitter.d.ts.map