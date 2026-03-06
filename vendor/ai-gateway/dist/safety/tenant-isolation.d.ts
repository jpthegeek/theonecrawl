/**
 * Tenant Isolation — validates tenant context and prevents cross-tenant leaks.
 */
import type { TenantPolicy } from '../types.js';
export interface IsolationCheckResult {
    allowed: boolean;
    reason?: string;
}
/**
 * Verify tenant is allowed to use the gateway and not blocked.
 */
export declare function checkTenantIsolation(tenantId: string, customerId: string | undefined, tenantPolicy: TenantPolicy | null): IsolationCheckResult;
/**
 * Verify that a feature is allowed for this tenant.
 */
export declare function checkFeatureAccess(feature: string, tenantPolicy: TenantPolicy | null): IsolationCheckResult;
//# sourceMappingURL=tenant-isolation.d.ts.map