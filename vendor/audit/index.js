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
import { emitBusEvent } from '@theonefamily/bus-sdk';
// ─── Severity mapping ─────────────────────────────────────────
const CATEGORY_SEVERITY = {
    auth: 'info',
    user_management: 'warning',
    data_create: 'info',
    data_update: 'info',
    data_delete: 'warning',
    data_access: 'info',
    config: 'warning',
    security: 'critical',
    admin: 'warning',
    integration: 'info',
    system: 'info',
};
const HIGH_SEVERITY_ACTIONS = new Set([
    'auth.login_failed',
    'auth.session_revoke',
    'auth.api_key_revoke',
    'user.remove',
    'user.deactivate',
    'admin.tenant_suspend',
    'admin.impersonate',
]);
function getSeverity(category, action) {
    if (HIGH_SEVERITY_ACTIONS.has(action))
        return 'critical';
    if (action.endsWith('.delete'))
        return 'warning';
    return CATEGORY_SEVERITY[category];
}
// ─── Title formatting ─────────────────────────────────────────
function formatAuditTitle(options) {
    const entity = options.entityName ?? `${options.entityType}:${options.entityId}`;
    return `[${options.source}] ${options.actorEmail} → ${options.action} on ${entity}`;
}
// ─── Core functions ───────────────────────────────────────────
/**
 * Writes audit event to Cosmos AND emits to Bus.
 * Fire-and-forget — never throws, never blocks.
 */
export async function writeAudit(cosmosWrite, options) {
    const event = {
        id: `audit_${crypto.randomUUID()}`,
        type: 'audit_event',
        tenant_id: options.tenantId,
        actor_id: options.actorId,
        actor_email: options.actorEmail,
        actor_type: options.actorType ?? 'user',
        actor_ip: options.actorIp ?? null,
        actor_user_agent: options.actorUserAgent ?? null,
        action: options.action,
        action_category: options.actionCategory,
        entity_type: options.entityType,
        entity_id: options.entityId,
        entity_name: options.entityName,
        changes: options.changes,
        source: options.source,
        request_id: options.requestId,
        metadata: options.metadata,
        created_at: new Date().toISOString(),
        ttl: 7776000, // 90 days
    };
    // Write to Cosmos (fire-and-forget)
    cosmosWrite('audit_log', event).catch(() => { });
    // Emit to Bus (fire-and-forget) — Bus forwards to Event Hub → ADX
    emitBusEvent({
        source: options.source,
        event_type: `audit.${options.action}`,
        tenant_id: options.tenantId,
        severity: getSeverity(options.actionCategory, options.action),
        title: formatAuditTitle(options),
        entity_id: options.entityId,
        actor_id: options.actorId,
        metadata: {
            action_category: options.actionCategory,
            entity_type: options.entityType,
            entity_name: options.entityName,
            changes: options.changes,
            actor_email: options.actorEmail,
            actor_ip: options.actorIp,
            request_id: options.requestId,
            ...options.metadata,
        },
    }).catch(() => { });
}
/**
 * Extract actor context from an HTTP request.
 * Works with Azure Functions v4 HttpRequest.
 */
export function extractAuditContext(req, user) {
    return {
        actorId: user.id,
        actorEmail: user.email,
        actorIp: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
        actorUserAgent: req.headers.get('user-agent') ?? null,
        requestId: req.headers.get('x-request-id') ?? crypto.randomUUID(),
    };
}
/**
 * Diff two objects and return AuditChange[] for changed fields.
 * If fields array is provided, only those fields are compared.
 * If omitted, all keys from both objects are compared.
 */
export function diffChanges(before, after, fields) {
    const trackFields = fields ?? [...new Set([...Object.keys(before), ...Object.keys(after)])];
    const changes = [];
    for (const field of trackFields) {
        if (JSON.stringify(before[field]) !== JSON.stringify(after[field])) {
            changes.push({ field, old_value: before[field] ?? null, new_value: after[field] ?? null });
        }
    }
    return changes;
}
