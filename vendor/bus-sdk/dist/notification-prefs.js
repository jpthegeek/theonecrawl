/**
 * Notification preference checker for products.
 *
 * Products call this before sending notifications to check if the user
 * has opted out of a specific product/event/channel combination.
 *
 * Usage:
 *   import { checkNotificationPreference } from '@theonefamily/bus-sdk';
 *
 *   const allowed = await checkNotificationPreference(userId, 'psa', 'ticket.created', 'email');
 *   if (allowed) {
 *     sendEmail(...);
 *   }
 */
let _hubApiUrl = null;
let _hubServiceKey = null;
function getConfig() {
    if (_hubApiUrl && _hubServiceKey)
        return { url: _hubApiUrl, key: _hubServiceKey };
    const url = process.env.HUB_BILLING_API_URL || process.env.HUB_API_URL;
    const key = process.env.HUB_SERVICE_KEY;
    if (url && key) {
        _hubApiUrl = url;
        _hubServiceKey = key;
        return { url, key };
    }
    return null;
}
/**
 * Check whether a user has allowed notifications for a given product/event/channel.
 *
 * Returns true (allow) by default if:
 * - Hub API is not configured (graceful degradation)
 * - The user has no preferences saved (all-on default)
 * - The specific product/event is not overridden
 *
 * Returns false only when the user has explicitly disabled that channel.
 */
export async function checkNotificationPreference(userId, product, eventType, channel) {
    const config = getConfig();
    if (!config)
        return true; // graceful degradation: allow if Hub not configured
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(`${config.url.replace(/\/$/, '')}/api/portal/notifications?user_id=${encodeURIComponent(userId)}`, {
            signal: controller.signal,
            headers: {
                'X-Service-Key': config.key,
                'Content-Type': 'application/json',
            },
        });
        clearTimeout(timer);
        if (!res.ok)
            return true; // fail-open: allow notifications
        const body = (await res.json());
        const prefs = body.data;
        // Check product-specific override first
        const productPrefs = prefs.products[product];
        if (productPrefs) {
            // Check exact event type first, then wildcard
            const eventPref = productPrefs[eventType] ?? productPrefs['*'];
            if (eventPref)
                return eventPref[channel];
        }
        // Fall back to global defaults
        return prefs.global_defaults[channel];
    }
    catch {
        // Fail-open: if Hub is unreachable, allow the notification
        return true;
    }
}
