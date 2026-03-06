import type { SupportConfig } from '../../../shared/support-module/types';
export interface SupportPanelProps {
    config: SupportConfig;
    user: {
        email: string;
        name: string;
    };
}
export declare function SupportButton({ config, user }: SupportPanelProps): import("react/jsx-runtime").JSX.Element;
