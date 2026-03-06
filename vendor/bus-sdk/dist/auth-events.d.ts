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
import type { BusEventSource } from './index.js';
export type AuthEventType = 'auth.login.success' | 'auth.login.failed' | 'auth.mfa.challenged' | 'auth.mfa.success' | 'auth.mfa.failed' | 'auth.lockout' | 'auth.lockout.expired' | 'auth.logout' | 'auth.password.reset.requested' | 'auth.password.reset.completed' | 'auth.microsoft.linked' | 'auth.microsoft.login' | 'auth.hub_sso.login';
export type AuthMethod = 'password' | 'microsoft' | 'hub_sso';
export type AuthFailureReason = 'invalid_password' | 'invalid_mfa' | 'account_locked' | 'user_not_found' | 'mfa_required' | 'session_expired';
export interface AuthEventMetadata {
    email: string;
    auth_method: AuthMethod;
    ip: string;
    user_agent: string;
    failure_reason?: AuthFailureReason;
    lockout_until?: string;
    session_id?: string;
    failed_attempts?: number;
}
export interface AuthEventInput {
    event_type: AuthEventType;
    source: BusEventSource;
    tenant_id: string;
    user_id?: string | null;
    metadata: AuthEventMetadata;
}
export declare function emitAuthEvent(input: AuthEventInput): Promise<void>;
export interface LoginSuccessDetails {
    source: BusEventSource;
    tenant_id: string;
    user_id: string;
    email: string;
    auth_method: AuthMethod;
    ip: string;
    user_agent: string;
    session_id?: string;
}
export declare function emitLoginSuccess(details: LoginSuccessDetails): Promise<void>;
export interface LoginFailedDetails {
    source: BusEventSource;
    tenant_id: string;
    user_id?: string | null;
    email: string;
    auth_method: AuthMethod;
    ip: string;
    user_agent: string;
    failure_reason: AuthFailureReason;
    failed_attempts?: number;
}
export declare function emitLoginFailed(details: LoginFailedDetails): Promise<void>;
export interface HubSsoLoginDetails {
    source: BusEventSource;
    tenant_id: string;
    user_id: string;
    email: string;
    ip: string;
    user_agent: string;
}
export declare function emitHubSsoLogin(details: HubSsoLoginDetails): Promise<void>;
export interface LockoutDetails {
    source: BusEventSource;
    tenant_id: string;
    user_id?: string;
    email: string;
    ip: string;
    user_agent: string;
    lockout_until: string;
    failed_attempts: number;
}
export declare function emitLockout(details: LockoutDetails): Promise<void>;
//# sourceMappingURL=auth-events.d.ts.map