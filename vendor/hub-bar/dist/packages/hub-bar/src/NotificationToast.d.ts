import type { Notification } from './types';
interface NotificationToastProps {
    toasts: Notification[];
    onDismiss: (id: string) => void;
}
export declare function NotificationToast({ toasts, onDismiss }: NotificationToastProps): import("react/jsx-runtime").JSX.Element | null;
export {};
