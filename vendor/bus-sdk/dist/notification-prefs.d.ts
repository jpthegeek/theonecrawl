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
export type NotificationChannel = 'email' | 'push' | 'in_app';
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
export declare function checkNotificationPreference(userId: string, product: string, eventType: string, channel: NotificationChannel): Promise<boolean>;
//# sourceMappingURL=notification-prefs.d.ts.map