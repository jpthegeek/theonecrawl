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
// ─── BusClient ───────────────────────────────────────────────
export class BusClient {
    apiUrl;
    apiKey;
    maxRetries;
    retryDelayMs;
    timeoutMs;
    constructor(options = {}) {
        this.apiUrl = (options.apiUrl ?? process.env['BUS_API_URL'] ?? '').replace(/\/$/, '');
        this.apiKey = options.apiKey ?? process.env['BUS_KEY'] ?? '';
        this.maxRetries = options.maxRetries ?? 3;
        this.retryDelayMs = options.retryDelayMs ?? 500;
        this.timeoutMs = options.timeoutMs ?? 10_000;
        if (!this.apiUrl) {
            throw new Error('BusClient: BUS_API_URL is required (set env var or pass apiUrl option)');
        }
        if (!this.apiKey) {
            throw new Error('BusClient: BUS_KEY is required (set env var or pass apiKey option)');
        }
    }
    /** Emit a single event to The One Bus. Fire-and-forget from caller's perspective. */
    async emitEvent(event) {
        await this.postWithRetry(`${this.apiUrl}/api/events`, event);
    }
    /** Emit multiple events in a single request. */
    async emitEvents(events) {
        await this.postWithRetry(`${this.apiUrl}/api/events/batch`, { events });
    }
    /** Convenience: emit a PSA event. */
    async emitPSA(event) {
        await this.emitEvent({ ...event, source: 'psa' });
    }
    /** Convenience: emit an RMM event. */
    async emitRMM(event) {
        await this.emitEvent({ ...event, source: 'rmm' });
    }
    /** Convenience: emit a Security event. */
    async emitSecurity(event) {
        await this.emitEvent({ ...event, source: 'security' });
    }
    /** Convenience: emit a Backups event. */
    async emitBackups(event) {
        await this.emitEvent({ ...event, source: 'backups' });
    }
    /** Convenience: emit a CRM event. */
    async emitCRM(event) {
        await this.emitEvent({ ...event, source: 'crm' });
    }
    /** Convenience: emit a Books event. */
    async emitBooks(event) {
        await this.emitEvent({ ...event, source: 'books' });
    }
    /** Convenience: emit a Voice event. */
    async emitVoice(event) {
        await this.emitEvent({ ...event, source: 'voice' });
    }
    /** Convenience: emit a Projects event. */
    async emitProjects(event) {
        await this.emitEvent({ ...event, source: 'projects' });
    }
    async postWithRetry(url, body) {
        let lastError = null;
        for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
            if (attempt > 0) {
                // Exponential backoff: 500ms, 1000ms, 2000ms
                const delay = this.retryDelayMs * Math.pow(2, attempt - 1);
                await sleep(delay);
            }
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Integration-Key': this.apiKey,
                    },
                    body: JSON.stringify(body),
                    signal: AbortSignal.timeout(this.timeoutMs),
                });
                if (response.ok)
                    return;
                // Don't retry client errors (4xx) — they won't recover
                if (response.status >= 400 && response.status < 500) {
                    const text = await response.text().catch(() => '');
                    throw new Error(`Bus API error ${response.status}: ${text}`);
                }
                // Server errors (5xx) — retry
                lastError = new Error(`Bus API server error ${response.status}`);
            }
            catch (err) {
                if (err instanceof Error && err.name === 'AbortError') {
                    lastError = new Error(`Bus API request timed out after ${this.timeoutMs}ms`);
                }
                else if (err instanceof Error && err.message.startsWith('Bus API error')) {
                    // Client error — rethrow immediately
                    throw err;
                }
                else {
                    lastError = err instanceof Error ? err : new Error(String(err));
                }
            }
        }
        throw lastError ?? new Error('Bus API request failed after retries');
    }
}
// ─── Functional API ──────────────────────────────────────────
let _defaultClient = null;
function getDefaultClient() {
    if (!_defaultClient) {
        _defaultClient = new BusClient();
    }
    return _defaultClient;
}
/**
 * Emit an event using the default client (reads BUS_API_URL + BUS_KEY from env).
 * Convenience for products that don't need a custom client.
 */
export async function emitEvent(event) {
    return getDefaultClient().emitEvent(event);
}
/**
 * Reset the default client (useful for testing or config changes).
 */
export function resetDefaultClient() {
    _defaultClient = null;
}
// ─── emitBusEvent (auto-configuring convenience) ─────────────
let _autoBusClient = null;
export async function emitBusEvent(event) {
    if (!_autoBusClient) {
        const url = process.env['BUS_API_URL'];
        const key = process.env['BUS_INTEGRATION_KEY'] || process.env['BUS_KEY'];
        if (!url || !key) {
            console.warn('[Bus SDK] Bus not configured. Set BUS_API_URL and BUS_INTEGRATION_KEY.');
            return;
        }
        _autoBusClient = new BusClient({ apiUrl: url, apiKey: key });
    }
    await _autoBusClient.emitEvent(event);
}
// Re-export auth event helpers
export * from './auth-events.js';
// ─── Utilities ───────────────────────────────────────────────
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//# sourceMappingURL=index.js.map