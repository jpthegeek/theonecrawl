/**
 * @theonefamily/audit
 *
 * Standardized audit logging for all products in The One Family platform.
 * Writes to Cosmos audit_log container AND emits to The One Bus.
 * Fire-and-forget — never throws, never blocks.
 *
 * Usage:
 *   import { writeAudit, extractAuditContext, diffChanges } from '@theonefamily/audit';
 *
 *   const actor = extractAuditContext(req, user);
 *   writeAudit(db.create.bind(db), {
 *     tenantId,
 *     ...actor,
 *     action: 'ticket.update',
 *     actionCategory: 'data_update',
 *     entityType: 'ticket',
 *     entityId: ticketId,
 *     source: 'psa',
 *   });
 */
export type AuditCategory = 'auth' | 'user_management' | 'data_create' | 'data_update' | 'data_delete' | 'data_access' | 'config' | 'security' | 'admin' | 'integration' | 'system';
export interface AuditChange {
    field: string;
    old_value: unknown;
    new_value: unknown;
}
export interface AuditEvent {
    id: string;
    type: 'audit_event';
    tenant_id: string;
    actor_id: string;
    actor_email: string;
    actor_type: 'user' | 'api_key' | 'system' | 'webhook';
    actor_ip: string | null;
    actor_user_agent: string | null;
    action: string;
    action_category: AuditCategory;
    entity_type: string;
    entity_id: string;
    entity_name?: string;
    changes?: AuditChange[];
    source: string;
    request_id?: string;
    metadata?: Record<string, unknown>;
    created_at: string;
    ttl: number;
}
export interface WriteAuditOptions {
    tenantId: string;
    actorId: string;
    actorEmail: string;
    actorType?: 'user' | 'api_key' | 'system' | 'webhook';
    actorIp?: string | null;
    actorUserAgent?: string | null;
    action: string;
    actionCategory: AuditCategory;
    entityType: string;
    entityId: string;
    entityName?: string;
    changes?: AuditChange[];
    source: string;
    requestId?: string;
    metadata?: Record<string, unknown>;
}
/**
 * Writes audit event to Cosmos AND emits to Bus.
 * Fire-and-forget — never throws, never blocks.
 */
export declare function writeAudit(cosmosWrite: (container: string, doc: Record<string, unknown>) => Promise<unknown>, options: WriteAuditOptions): Promise<void>;
/**
 * Extract actor context from an HTTP request.
 * Works with Azure Functions v4 HttpRequest.
 */
export declare function extractAuditContext(req: {
    headers: {
        get(name: string): string | null | undefined;
    };
}, user: {
    id: string;
    email: string;
}): {
    actorId: string;
    actorEmail: string;
    actorIp: string | null;
    actorUserAgent: string | null;
    requestId: string;
};
/**
 * Diff two objects and return AuditChange[] for changed fields.
 * If fields array is provided, only those fields are compared.
 * If omitted, all keys from both objects are compared.
 */
export declare function diffChanges(before: Record<string, unknown>, after: Record<string, unknown>, fields?: string[]): AuditChange[];
//# sourceMappingURL=index.d.ts.map