import type { Notification } from './types';
interface NotificationBellProps {
    notifications: Notification[];
    unreadCount: number;
    open: boolean;
    onToggle: () => void;
    onClose: () => void;
    onMarkAllRead: () => void;
    onMarkRead: (id: string) => void;
    onDismiss: (id: string) => void;
    muted: boolean;
    onMute: (ms: number) => void;
    onUnmute: () => void;
    hubUrl: string;
}
export declare function NotificationBell({ notifications, unreadCount, open, onToggle, onClose, onMarkAllRead, onMarkRead, onDismiss, muted, onMute, onUnmute, hubUrl, }: NotificationBellProps): import("react/jsx-runtime").JSX.Element;
export {};
