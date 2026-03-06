/**
 * @theonefamily/bus-sdk
 *
 * Minimal SDK for products to emit events to The One Bus.
 *
 * Usage:
 *   import { createBusClient } from '@theonefamily/bus-sdk';
 *
 *   const bus = createBusClient({
 *     url: process.env.BUS_API_URL,        // e.g. 'https://api-bus.theoneops.app'
 *     integrationKey: process.env.BUS_KEY, // product's X-Integration-Key
 *   });
 *
 *   await bus.emit({
 *     source: 'psa',
 *     event_type: 'ticket.sla_breach',
 *     tenant_id: tenantId,
 *     severity: 'critical',
 *     title: `SLA breached on ticket #${ticket.number}`,
 *     entity_id: ticket.id,
 *     entity_url: `https://app.theonepsa.com/tickets/${ticket.id}`,
 *   });
 */
export type BusEventSource = 'psa' | 'rmm' | 'security' | 'backups' | 'crm' | 'books' | 'voice' | 'fleet' | 'people' | 'cmdb' | 'oncall' | 'visitor' | 'legal' | 'ai' | 'livekit' | 'crawl' | 'appfactory' | 'projects' | 'collective' | 'chms' | 'ams' | 'hub' | 'ops-center' | 'canvas' | 'portal' | 'bridge';
export type Severity = 'info' | 'warning' | 'critical';
export interface BusEventPayload {
    source: BusEventSource;
    event_type: string;
    tenant_id: string;
    severity: Severity;
    title: string;
    detail?: string;
    entity_id?: string;
    entity_url?: string;
    actor_id?: string;
    metadata?: Record<string, unknown>;
}
export interface BusClientConfig {
    /** Base URL of The One Bus API, e.g. 'https://api-bus.theoneops.app' */
    url: string;
    /** Integration key for this product (X-Integration-Key header) */
    integrationKey: string;
    /** Optional timeout in ms (default: 5000) */
    timeoutMs?: number;
}
export interface BusClient {
    /**
     * Emit an event to The One Bus. Fire-and-forget from the caller's perspective.
     * The Bus stores the event and handles routing.
     */
    emit(event: BusEventPayload): Promise<void>;
    /**
     * Emit multiple events in parallel.
     */
    emitBatch(events: BusEventPayload[]): Promise<void>;
}
export declare function createBusClient(config: BusClientConfig): BusClient;
export declare function configureBus(config: BusClientConfig): void;
export * from './auth-events.js';
export declare function emitBusEvent(event: BusEventPayload): Promise<void>;
//# sourceMappingURL=index.d.ts.map