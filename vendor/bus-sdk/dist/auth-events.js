/**
 * @theonefamily/bus-sdk — Auth Event Helpers
 *
 * Typed wrappers for emitting authentication telemetry to The One Bus.
 * Products call these from their auth handlers to provide cross-platform
 * auth visibility in the SIEM and Hub Bar.
 *
 * Usage:
 *   import { emitLoginSuccess, emitLoginFailed } from '@theonefamily/bus-sdk';
 *
 *   await emitLoginSuccess({ source: 'psa', ... }).catch(() => {});
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
        _url = process.env['BUS_API_URL'] || null;
    if (!_key)
        _key = process.env['BUS_INTEGRATION_KEY'] || process.env['BUS_KEY'] || null;
    if (!_url || !_key)
        return null;
    return `${_url.replace(/\/$/, '')}/api/events`;
}
async function _emitRaw(payload) {
    const endpoint = _getEndpoint();
    if (!endpoint)
        return; // Silently skip if bus not configured
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
export async function emitAuthEvent(input) {
    await _emitRaw({
        source: input.source,
        event_type: input.event_type,
        tenant_id: input.tenant_id,
        severity: AUTH_SEVERITY[input.event_type],
        title: authTitle(input.event_type, input.metadata.email, input.metadata.failure_reason),
        actor_id: input.user_id ?? undefined,
        metadata: input.metadata,
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
//# sourceMappingURL=auth-events.js.map