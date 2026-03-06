/**
 * Tenant Isolation — validates tenant context and prevents cross-tenant leaks.
 */
/**
 * Verify tenant is allowed to use the gateway and not blocked.
 */
export function checkTenantIsolation(tenantId, customerId, tenantPolicy) {
    if (!tenantId) {
        return { allowed: false, reason: 'Missing tenant context' };
    }
    if (!tenantPolicy) {
        // No explicit policy — allow by default (permissive for new tenants)
        return { allowed: true };
    }
    if (!tenantPolicy.enabled) {
        return { allowed: false, reason: 'AI access disabled for this tenant' };
    }
    // Check if specific customer is blocked
    if (customerId && tenantPolicy.blockedCustomers?.includes(customerId)) {
        return { allowed: false, reason: 'AI access blocked for this customer' };
    }
    return { allowed: true };
}
/**
 * Verify that a feature is allowed for this tenant.
 */
export function checkFeatureAccess(feature, tenantPolicy) {
    if (!tenantPolicy?.allowedFeatures) {
        // null = all features allowed
        return { allowed: true };
    }
    if (tenantPolicy.allowedFeatures.includes(feature)) {
        return { allowed: true };
    }
    return { allowed: false, reason: `Feature "${feature}" not enabled for this tenant` };
}
//# sourceMappingURL=tenant-isolation.js.map