export interface NavItem {
    id: string;
    label: string;
    description?: string;
    product: string;
    productLabel: string;
    url: string;
    keywords: string[];
    icon: string;
    category: 'page' | 'setting' | 'report' | 'feature';
    requiresProduct?: string;
}
export declare const NAV_INDEX: NavItem[];
