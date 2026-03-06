import React from 'react';
import { OpsCenterClient } from './ops-center-client';
import type { SupportConfig, SupportUser } from './types';
interface SupportContextValue {
    client: OpsCenterClient;
    config: SupportConfig;
    user: SupportUser;
}
export declare function useSupportContext(): SupportContextValue;
interface SupportProviderProps {
    config: SupportConfig;
    user: SupportUser;
    children: React.ReactNode;
}
export declare function SupportProvider({ config, user, children }: SupportProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
