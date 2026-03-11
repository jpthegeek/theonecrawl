import type { NavItem } from './nav-index';
export declare function scoreMatch(item: NavItem, query: string): number;
export interface ScoredNavItem extends NavItem {
    score: number;
}
export declare function searchNavIndex(items: NavItem[], query: string, activeProducts?: string[], limit?: number): ScoredNavItem[];
export interface RecentNavVisit {
    label: string;
    url: string;
    product: string;
    productLabel: string;
    icon?: string;
    visitedAt: number;
}
export declare function getRecentNav(): RecentNavVisit[];
export declare function trackNavVisit(visit: Omit<RecentNavVisit, 'visitedAt'>): void;
export declare const PRODUCT_BADGE_COLORS: Record<string, string>;
export declare function getProductBadgeColor(product: string): string;
