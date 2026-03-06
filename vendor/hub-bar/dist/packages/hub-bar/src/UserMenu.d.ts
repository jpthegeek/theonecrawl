import type { HubSession } from './types';
interface UserMenuProps {
    session: HubSession;
    open: boolean;
    onToggle: () => void;
    onClose: () => void;
    onLogout?: () => void;
    hubUrl: string;
}
export declare function UserMenu({ session, open, onToggle, onClose, onLogout, hubUrl, }: UserMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
