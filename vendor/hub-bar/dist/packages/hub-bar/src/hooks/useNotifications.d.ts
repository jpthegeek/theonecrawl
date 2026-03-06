import type { Notification } from '../types';
interface UseNotificationsResult {
    notifications: Notification[];
    unreadCount: number;
    markAllRead: () => void;
    markRead: (id: string) => void;
}
export declare function useNotifications(apiBase: string, signalrEndpoint: string | undefined, tenantId: string | null): UseNotificationsResult;
export {};
