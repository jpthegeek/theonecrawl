/**
 * @theonefamily/bus-sdk — Auth Event Helpers
 *
 * Typed wrappers for emitting authentication telemetry to The One Bus.
 * Products call these from their auth handlers to provide cross-platform
 * auth visibility in the SIEM and Hub Bar.
 *
 * Usage:
 *   import { emitLoginFailed, emitLockout } from '@theonefamily/bus-sdk/auth-events';
 *   // or
 *   import { emitLoginFailed, emitLockout } from '@theonefamily/bus-sdk';
 *
 *   await emitLoginFailed({
 *     source: 'psa',
 *     tenant_id: ctx.tenantId,
 *     email: body.email,
 *     auth_method: 'password',
 *     ip: req.headers.get('x-forwarded-for') || '',
 *     user_agent: req.headers.get('user-agent') || '',
 *     failure_reason: 'invalid_password',
 *     failed_attempts: attempts,
 *   });
 */
// ─── Severity mapping ────────────────────────────────────────
const AUTH_SEVERITY = {
    'auth.login.success': 'info',
    'auth.login.failed': 'warning',
    'auth.mfa.challenged': 'info',
    'auth.mfa.success': 'info',
    'auth.mfa.failed': 'warning',
    'auth.lockout': 'warning',
    'auth.lockout.expired': 'info',
    'auth.logout': 'info',
    'auth.password.reset.requested': 'info',
    'auth.password.reset.completed': 'info',
    'auth.microsoft.linked': 'info',
    'auth.microsoft.login': 'info',
    'auth.hub_sso.login': 'info',
};
function authTitle(event_type, email, reason) {
    switch (event_type) {
        case 'auth.login.success': return `Login successful: ${email}`;
        case 'auth.login.failed': return reason ? `Login failed: ${email} (${reason})` : `Login failed: ${email}`;
        case 'auth.mfa.challenged': return `MFA challenge: ${email}`;
        case 'auth.mfa.success': return `MFA verified: ${email}`;
        case 'auth.mfa.failed': return `MFA failed: ${email}`;
        case 'auth.lockout': return `Account locked: ${email}`;
        case 'auth.lockout.expired': return `Lockout expired: ${email}`;
        case 'auth.logout': return `Logout: ${email}`;
        case 'auth.password.reset.requested': return `Password reset requested: ${email}`;
        case 'auth.password.reset.completed': return `Password reset completed: ${email}`;
        case 'auth.microsoft.linked': return `Microsoft account linked: ${email}`;
        case 'auth.microsoft.login': return `Microsoft login: ${email}`;
        case 'auth.hub_sso.login': return `Hub SSO login: ${email}`;
    }
}
let _url = null;
let _key = null;
function _getEndpoint() {
    if (!_url)
        _url = process.env.BUS_API_URL || null;
    if (!_key)
        _key = process.env.BUS_INTEGRATION_KEY || null;
    if (!_url || !_key)
        return null;
    return `${_url.replace(/\/$/, '')}/api/bus/events`;
}
async function _emitRaw(payload) {
    const endpoint = _getEndpoint();
    if (!endpoint) {
        console.warn('[Bus SDK / auth] Bus not configured. Set BUS_API_URL and BUS_INTEGRATION_KEY.');
        return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                'X-Integration-Key': _key,
            },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            console.warn(`[Bus SDK / auth] Emit failed (${res.status}): ${text}`);
        }
    }
    catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
            console.warn('[Bus SDK / auth] Emit error:', err.message);
        }
    }
    finally {
        clearTimeout(timer);
    }
}
// ─── Primary helper: emitAuthEvent ────────────────────────────
/**
 * Emit any auth event to The One Bus.
 * All other helpers delegate to this.
 */
export async function emitAuthEvent(input) {
    await _emitRaw({
        source: input.source,
        event_type: input.event_type,
        tenant_id: input.tenant_id,
        severity: AUTH_SEVERITY[input.event_type],
        title: authTitle(input.event_type, input.metadata.email, input.metadata.failure_reason),
        actor_id: input.user_id ?? undefined,
        metadata: {
            ...input.metadata,
            // Flatten geo into top-level metadata fields for easier KQL extraction
            geo_country: input.metadata.geo?.country,
            geo_region: input.metadata.geo?.region,
            geo_city: input.metadata.geo?.city,
        },
    });
}
export async function emitLoginSuccess(details) {
    await emitAuthEvent({
        event_type: 'auth.login.success',
        source: details.source,
        tenant_id: details.tenant_id,
        user_id: details.user_id,
        metadata: {
            email: details.email,
            auth_method: details.auth_method,
            ip: details.ip,
            user_agent: details.user_agent,
            session_id: details.session_id,
            geo: details.geo,
        },
    });
}
export async function emitLoginFailed(details) {
    await emitAuthEvent({
        event_type: 'auth.login.failed',
        source: details.source,
        tenant_id: details.tenant_id,
        user_id: details.user_id ?? null,
        metadata: {
            email: details.email,
            auth_method: details.auth_method,
            ip: details.ip,
            user_agent: details.user_agent,
            failure_reason: details.failure_reason,
            failed_attempts: details.failed_attempts,
            geo: details.geo,
        },
    });
}
export async function emitMfaEvent(details) {
    await emitAuthEvent({
        event_type: details.event_type,
        source: details.source,
        tenant_id: details.tenant_id,
        user_id: details.user_id,
        metadata: {
            email: details.email,
            auth_method: 'password', // MFA is always secondary to the primary method
            ip: details.ip,
            user_agent: details.user_agent,
            failure_reason: details.failure_reason,
        },
    });
}
export async function emitLockout(details) {
    await emitAuthEvent({
        event_type: 'auth.lockout',
        source: details.source,
        tenant_id: details.tenant_id,
        user_id: details.user_id,
        metadata: {
            email: details.email,
            auth_method: 'password',
            ip: details.ip,
            user_agent: details.user_agent,
            lockout_until: details.lockout_until,
            failed_attempts: details.failed_attempts,
        },
    });
}
export async function emitHubSsoLogin(details) {
    await emitAuthEvent({
        event_type: 'auth.hub_sso.login',
        source: details.source,
        tenant_id: details.tenant_id,
        user_id: details.user_id,
        metadata: {
            email: details.email,
            auth_method: 'hub_sso',
            ip: details.ip,
            user_agent: details.user_agent,
            session_id: details.session_id,
        },
    });
}
