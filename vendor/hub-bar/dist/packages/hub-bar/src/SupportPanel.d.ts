import type { SupportConfig } from '../../../shared/support-module/types';
import type { ProductId } from './types';
export interface SupportPanelProps {
    config: SupportConfig;
    user: {
        email: string;
        name: string;
    };
    currentProduct?: ProductId;
}
export declare function SupportButton({ config, user, currentProduct }: SupportPanelProps): import("react/jsx-runtime").JSX.Element;
