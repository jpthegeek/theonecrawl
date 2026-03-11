import type { Notification } from '../types';
interface UseNotificationsResult {
    notifications: Notification[];
    unreadCount: number;
    markAllRead: () => void;
    markRead: (id: string) => void;
    dismiss: (id: string) => void;
    muted: boolean;
    muteUntil: (ms: number) => void;
    unmute: () => void;
    toastQueue: Notification[];
    dismissToast: (id: string) => void;
}
export declare function useNotifications(apiBase: string, signalrEndpoint: string | undefined, tenantId: string | null, userId: string | null): UseNotificationsResult;
export {};
