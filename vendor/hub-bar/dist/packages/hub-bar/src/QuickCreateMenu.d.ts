import type { ActionType } from './hooks/useQuickCreate';
interface QuickCreateMenuProps {
    onSelect: (action: ActionType) => void;
    onClose: () => void;
    entitlements?: string[];
}
export declare function QuickCreateMenu({ onSelect, onClose, entitlements }: QuickCreateMenuProps): import("react/jsx-runtime").JSX.Element | null;
export {};
