import type { Product } from '../types';
interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
}
export declare function useProducts(apiBase: string, tenantId: string | null): UseProductsResult;
export {};
