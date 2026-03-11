export type ProductId = 'psa' | 'rmm' | 'crm' | 'security' | 'backups' | 'projects' | 'books' | 'voice' | 'ai-studio' | 'livekit' | 'chms' | 'ams' | 'fleet' | 'people' | 'cmdb' | 'oncall' | 'visitor' | 'legal' | 'collective' | 'crawl' | 'hub' | 'ops-center' | 'portal' | 'bridge' | 'canvas' | 'mission' | 'migrate' | 'brand' | 'relay' | 'code';
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
    dismissed?: boolean;
    deepLink: string;
    createdAt: string;
    groupCount?: number;
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
    orgRole?: 'owner' | 'admin' | 'finance' | 'member' | 'viewer';
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
export interface OrgBranding {
    company_name?: string;
    logo_url?: string;
    logo_icon_url?: string;
    primary_color?: string;
    accent_color?: string;
    colors?: {
        header_bg?: string;
        header_text?: string;
    };
    hide_powered_by?: boolean;
}
export interface JarvisContextOverride {
    product?: ProductId;
    entity_type?: string;
    entity_id?: string;
    additional_context?: string;
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
    orgBranding?: OrgBranding;
}
