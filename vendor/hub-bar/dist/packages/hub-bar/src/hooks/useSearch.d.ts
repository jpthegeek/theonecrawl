import type { SearchResultGroup } from '../types';
interface UseSearchResult {
    results: SearchResultGroup[];
    loading: boolean;
}
export declare function useSearch(apiBase: string, tenantId: string | null, query: string, debounceMs?: number): UseSearchResult;
export {};
