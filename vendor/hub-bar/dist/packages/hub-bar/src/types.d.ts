export type ProductId = 'psa' | 'rmm' | 'crm' | 'security' | 'backups' | 'projects' | 'books' | 'voice' | 'ai-studio' | 'livekit' | 'chms' | 'ams' | 'fleet' | 'people' | 'cmdb' | 'oncall' | 'visitor' | 'legal' | 'collective' | 'crawl' | 'hub' | 'ops-center' | 'portal' | 'bridge' | 'canvas' | 'mission';
export interface Product {
    id: ProductId;
    name: string;
    url: string;
    icon: string;
    active: boolean;
    color: string;
}
export interface Notification {
    id: string;
    productId: ProductId;
    productName: string;
    title: string;
    body?: string;
    severity: 'info' | 'warning' | 'error' | 'success';
    read: boolean;
    deepLink: string;
    createdAt: string;
}
export interface SearchResult {
    id: string;
    productId: ProductId;
    productName: string;
    title: string;
    subtitle?: string;
    icon?: string;
    deepLink: string;
}
export interface SearchResultGroup {
    productId: ProductId;
    productName: string;
    results: SearchResult[];
}
export interface HubSession {
    userId: string;
    tenantId: string;
    tenantSlug: string;
    tenantName: string;
    email: string;
    role: string;
    orgRole?: 'owner' | 'admin' | 'member' | 'viewer';
    entitlements?: string[];
    firstName?: string;
    lastName?: string;
    initials: string;
}
export interface SupportConfig {
    apiBaseUrl: string;
    apiKey: string;
    platformId: string;
    platformName: string;
}
export interface HubBarProps {
    currentProduct: ProductId;
    apiBase: string;
    signalrEndpoint?: string;
    session?: HubSession;
    onLogout?: () => void;
    hubUrl?: string;
    /** @deprecated Use supportConfig instead */
    chatSlot?: React.ReactNode;
    supportConfig?: SupportConfig;
}
