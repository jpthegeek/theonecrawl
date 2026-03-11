import type { ProductId } from './types';
export interface JarvisConfig {
    apiBase: string;
}
export interface JarvisPanelProps {
    apiBase: string;
    tenantId: string | null;
    userId: string | null;
    currentProduct: ProductId;
}
export declare function JarvisButton({ apiBase, tenantId, userId, }: JarvisPanelProps): import("react/jsx-runtime").JSX.Element;
