import { JSX } from 'react/jsx-runtime';
import { SupportConfig as SupportConfig_2 } from '../../../shared/support-module/types';

export declare const ALL_PRODUCTS: Omit<Product, 'active'>[];

export declare const HUB_BAR_HEIGHT = 48;

export declare const HUB_URL = "https://my.theonestack.com";

export declare function HubBar({ currentProduct, apiBase, signalrEndpoint, session: sessionOverride, onLogout, hubUrl, chatSlot, supportConfig, orgBranding, }: HubBarProps): JSX.Element | null;

export declare interface HubBarProps {
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

export declare interface HubSession {
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

export declare function JarvisButton({ apiBase, tenantId, userId, }: JarvisPanelProps): JSX.Element;

export declare interface JarvisContext {
    product: ProductId | null;
    page: string;
    entity_type?: string;
    entity_id?: string;
}

export declare interface JarvisContextOverride {
    product?: ProductId;
    entity_type?: string;
    entity_id?: string;
    additional_context?: string;
}

export declare interface JarvisMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    tool_calls?: ToolCallResult[];
    context_used?: string[];
    timestamp: string;
    error?: boolean;
}

declare interface JarvisPanelProps {
    apiBase: string;
    tenantId: string | null;
    userId: string | null;
    currentProduct: ProductId;
}

declare interface Notification_2 {
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
export { Notification_2 as Notification }

export declare function NotificationBell({ notifications, unreadCount, open, onToggle, onClose, onMarkAllRead, onMarkRead, onDismiss, muted, onMute, onUnmute, hubUrl, }: NotificationBellProps): JSX.Element;

declare interface NotificationBellProps {
    notifications: Notification_2[];
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

export declare function NotificationToast({ toasts, onDismiss }: NotificationToastProps): JSX.Element | null;

declare interface NotificationToastProps {
    toasts: Notification_2[];
    onDismiss: (id: string) => void;
}

declare interface OrgBranding {
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

export declare interface Product {
    id: ProductId;
    name: string;
    url: string;
    icon: string;
    active: boolean;
    color: string;
}

export declare type ProductId = 'psa' | 'rmm' | 'crm' | 'security' | 'backups' | 'projects' | 'books' | 'voice' | 'ai-studio' | 'livekit' | 'chms' | 'ams' | 'fleet' | 'people' | 'cmdb' | 'oncall' | 'visitor' | 'legal' | 'collective' | 'crawl' | 'hub' | 'ops-center' | 'portal' | 'bridge' | 'canvas' | 'mission' | 'migrate' | 'brand' | 'relay' | 'code';

export declare function ProductSwitcher({ currentProduct, products, open, onToggle, onClose, hubUrl, }: ProductSwitcherProps): JSX.Element;

declare interface ProductSwitcherProps {
    currentProduct: ProductId;
    products: Product[];
    open: boolean;
    onToggle: () => void;
    onClose: () => void;
    hubUrl: string;
}

export declare interface QuickAction {
    label: string;
    prompt: string;
}

export declare interface SearchResult {
    id: string;
    productId: ProductId;
    productName: string;
    title: string;
    subtitle?: string;
    icon?: string;
    deepLink: string;
}

export declare interface SearchResultGroup {
    productId: ProductId;
    productName: string;
    results: SearchResult[];
}

export declare const SEVERITY_COLORS: {
    readonly info: "#60a5fa";
    readonly success: "#34d399";
    readonly warning: "#fbbf24";
    readonly error: "#f87171";
};

export declare function SupportButton({ config, user }: SupportPanelProps): JSX.Element;

export declare interface SupportConfig {
    apiBaseUrl: string;
    apiKey: string;
    platformId: string;
    platformName: string;
}

declare interface SupportPanelProps {
    config: SupportConfig_2;
    user: {
        email: string;
        name: string;
    };
}

declare interface ToolCallResult {
    name: string;
    status: 'running' | 'done' | 'error';
    summary?: string;
}

export declare function UnifiedSearch({ apiBase, tenantId }: UnifiedSearchProps): JSX.Element;

declare interface UnifiedSearchProps {
    apiBase: string;
    tenantId: string | null;
}

export declare function useHubSession(override?: HubSession): HubSession | null;

export declare function useJarvis(apiBase: string, tenantId: string | null, _userId: string | null): {
    messages: JarvisMessage[];
    streaming: boolean;
    context: JarvisContext;
    quickActions: QuickAction[];
    sendMessage: (content: string) => Promise<void>;
    stopStreaming: () => void;
    clearMessages: () => void;
};

export declare function useNotifications(apiBase: string, signalrEndpoint: string | undefined, tenantId: string | null, userId: string | null): UseNotificationsResult;

declare interface UseNotificationsResult {
    notifications: Notification_2[];
    unreadCount: number;
    markAllRead: () => void;
    markRead: (id: string) => void;
    dismiss: (id: string) => void;
    muted: boolean;
    muteUntil: (ms: number) => void;
    unmute: () => void;
    toastQueue: Notification_2[];
    dismissToast: (id: string) => void;
}

export declare function useProducts(apiBase: string, tenantId: string | null): UseProductsResult;

declare interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export declare function UserMenu({ session, open, onToggle, onClose, onLogout, hubUrl, }: UserMenuProps): JSX.Element;

declare interface UserMenuProps {
    session: HubSession;
    open: boolean;
    onToggle: () => void;
    onClose: () => void;
    onLogout?: () => void;
    hubUrl: string;
}

export declare function useSearch(apiBase: string, tenantId: string | null, query: string, debounceMs?: number): UseSearchResult;

declare interface UseSearchResult {
    results: SearchResultGroup[];
    loading: boolean;
}

export { }
