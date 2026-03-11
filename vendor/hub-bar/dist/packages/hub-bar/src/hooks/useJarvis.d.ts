import type { ProductId } from '../types';
export interface JarvisMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    tool_calls?: ToolCallResult[];
    context_used?: string[];
    timestamp: string;
    error?: boolean;
}
export interface ToolCallResult {
    name: string;
    status: 'running' | 'done' | 'error';
    summary?: string;
}
export interface JarvisContext {
    product: ProductId | null;
    page: string;
    entity_type?: string;
    entity_id?: string;
}
export interface QuickAction {
    label: string;
    prompt: string;
}
export declare function useJarvis(apiBase: string, tenantId: string | null, _userId: string | null): {
    messages: JarvisMessage[];
    streaming: boolean;
    context: JarvisContext;
    quickActions: QuickAction[];
    sendMessage: (content: string) => Promise<void>;
    stopStreaming: () => void;
    clearMessages: () => void;
};
