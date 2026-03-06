import type { KBArticle, KBCategory } from '../types';
export declare function useKBCategories(): {
    categories: KBCategory[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};
export declare function useKBArticles(category?: string): {
    articles: KBArticle[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};
export declare function useKBArticle(slug: string | undefined): {
    article: KBArticle | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};
export declare function useKBSearch(): {
    results: KBArticle[];
    loading: boolean;
    error: string | null;
    search: (query: string) => Promise<void>;
};
