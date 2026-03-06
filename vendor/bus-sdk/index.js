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
export function createBusClient(config) {
    const { url, integrationKey, timeoutMs = 5000 } = config;
    const endpoint = `${url.replace(/\/$/, '')}/api/bus/events`;
    async function emit(event) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Integration-Key': integrationKey,
                },
                body: JSON.stringify(event),
            });
            // 201 = direct write, 202 = buffered (both are success)
            if (!res.ok) {
                const text = await res.text().catch(() => '');
                console.warn(`[Bus SDK] Event emit failed (${res.status}): ${text}`);
            }
        }
        catch (err) {
            // Bus events are fire-and-forget — log but never throw
            if (err instanceof Error && err.name !== 'AbortError') {
                console.warn('[Bus SDK] Event emit error:', err.message);
            }
        }
        finally {
            clearTimeout(timer);
        }
    }
    async function emitBatch(events) {
        await Promise.allSettled(events.map(emit));
    }
    return { emit, emitBatch };
}
// Convenience: module-level client for products that want a singleton
let _defaultClient = null;
export function configureBus(config) {
    _defaultClient = createBusClient(config);
}
// Re-export auth event helpers so products can import from '@theonefamily/bus-sdk'
export * from './auth-events.js';
export async function emitBusEvent(event) {
    if (!_defaultClient) {
        // Auto-configure from env vars if not explicitly set
        const url = process.env.BUS_API_URL;
        const key = process.env.BUS_INTEGRATION_KEY;
        if (url && key) {
            _defaultClient = createBusClient({ url, integrationKey: key });
        }
        else {
            console.warn('[Bus SDK] Bus not configured. Set BUS_API_URL and BUS_INTEGRATION_KEY or call configureBus().');
            return;
        }
    }
    await _defaultClient.emit(event);
}
