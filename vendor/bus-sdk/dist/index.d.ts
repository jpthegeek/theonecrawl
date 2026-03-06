/**
 * @theonefamily/bus-sdk — Client SDK for The One Bus
 *
 * Provides a zero-config client for emitting events to The One Bus.
 * Products only need BUS_API_URL and BUS_KEY environment variables.
 *
 * Usage:
 *   import { BusClient } from '@theonefamily/bus-sdk';
 *   const bus = new BusClient();
 *   await bus.emitEvent({ source: 'psa', type: 'ticket.created', ... });
 */
export type EventSeverity = 'info' | 'warning' | 'critical';
export type EventSource = 'psa' | 'rmm' | 'security' | 'backups' | 'crm' | 'books' | 'voice' | 'ai' | 'projects' | 'collective' | 'fleet' | 'people' | 'cmdb' | 'oncall' | 'visitor' | 'legal' | 'chms' | 'ams' | 'hub' | 'ai-studio' | 'livekit' | 'crawl' | 'appfactory';
export type BusEventSource = EventSource;
export type Severity = EventSeverity;
export interface BusEventInput {
    source: EventSource;
    type: string;
    tenant_id: string;
    severity: EventSeverity;
    title: string;
    detail?: string;
    entity_id?: string;
    entity_url?: string;
    actor_id?: string;
    client_id?: string;
    client_name?: string;
    metadata?: Record<string, unknown>;
}
export interface BusClientOptions {
    apiUrl?: string;
    apiKey?: string;
    maxRetries?: number;
    retryDelayMs?: number;
    timeoutMs?: number;
}
export interface PSAEventInput extends Omit<BusEventInput, 'source'> {
    source?: 'psa';
}
export interface RMMEventInput extends Omit<BusEventInput, 'source'> {
    source?: 'rmm';
}
export interface SecurityEventInput extends Omit<BusEventInput, 'source'> {
    source?: 'security';
}
export interface BackupsEventInput extends Omit<BusEventInput, 'source'> {
    source?: 'backups';
}
export interface CRMEventInput extends Omit<BusEventInput, 'source'> {
    source?: 'crm';
}
export interface BooksEventInput extends Omit<BusEventInput, 'source'> {
    source?: 'books';
}
export interface VoiceEventInput extends Omit<BusEventInput, 'source'> {
    source?: 'voice';
}
export interface ProjectsEventInput extends Omit<BusEventInput, 'source'> {
    source?: 'projects';
}
export declare class BusClient {
    private readonly apiUrl;
    private readonly apiKey;
    private readonly maxRetries;
    private readonly retryDelayMs;
    private readonly timeoutMs;
    constructor(options?: BusClientOptions);
    /** Emit a single event to The One Bus. Fire-and-forget from caller's perspective. */
    emitEvent(event: BusEventInput): Promise<void>;
    /** Emit multiple events in a single request. */
    emitEvents(events: BusEventInput[]): Promise<void>;
    /** Convenience: emit a PSA event. */
    emitPSA(event: PSAEventInput): Promise<void>;
    /** Convenience: emit an RMM event. */
    emitRMM(event: RMMEventInput): Promise<void>;
    /** Convenience: emit a Security event. */
    emitSecurity(event: SecurityEventInput): Promise<void>;
    /** Convenience: emit a Backups event. */
    emitBackups(event: BackupsEventInput): Promise<void>;
    /** Convenience: emit a CRM event. */
    emitCRM(event: CRMEventInput): Promise<void>;
    /** Convenience: emit a Books event. */
    emitBooks(event: BooksEventInput): Promise<void>;
    /** Convenience: emit a Voice event. */
    emitVoice(event: VoiceEventInput): Promise<void>;
    /** Convenience: emit a Projects event. */
    emitProjects(event: ProjectsEventInput): Promise<void>;
    private postWithRetry;
}
/**
 * Emit an event using the default client (reads BUS_API_URL + BUS_KEY from env).
 * Convenience for products that don't need a custom client.
 */
export declare function emitEvent(event: BusEventInput): Promise<void>;
/**
 * Reset the default client (useful for testing or config changes).
 */
export declare function resetDefaultClient(): void;
export declare function emitBusEvent(event: BusEventInput): Promise<void>;
export * from './auth-events.js';
//# sourceMappingURL=index.d.ts.map