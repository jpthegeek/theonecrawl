import type { Redis } from 'ioredis';
export interface AIGatewayConfig {
    /** Platform identifier (e.g., 'psa', 'voice', 'ai-platform') */
    platform: string;
    /** Ops Center API for policy sync, usage ingest, audit */
    opsCenter?: {
        url: string;
        apiKey: string;
    };
    /** Redis for quota tracking, usage buffering, circuit breaker */
    redis?: {
        url: string;
        /** Existing Redis instance (if already connected) */
        client?: Redis;
    };
    /** AI provider configurations */
    providers: {
        'azure-openai'?: AzureOpenAIProviderConfig;
        'azure-foundry'?: AzureFoundryProviderConfig;
        'anthropic'?: AnthropicProviderConfig;
    };
    /** Override default pricing (model → cost per 1k tokens) */
    pricing?: Record<string, {
        input: number;
        output: number;
    }>;
    /** Default fallback provider+model used when a feature has no explicit fallback configured */
    defaultFallback?: {
        provider: string;
        model: string;
    };
    /** Disable Redis (in-memory fallback for local dev) */
    disableRedis?: boolean;
}
export interface AzureOpenAIProviderConfig {
    /** Azure OpenAI endpoint URL */
    endpoint: string;
    /** API key (falls back to Managed Identity if omitted) */
    apiKey?: string;
    /** API version (default: 2024-12-01-preview) */
    apiVersion?: string;
}
export interface AzureFoundryProviderConfig {
    /** Azure AI Foundry resource name */
    resource: string;
    /** API key (falls back to Managed Identity if omitted) */
    apiKey?: string;
}
export interface AnthropicProviderConfig {
    /** Anthropic API key */
    apiKey: string;
}
export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}
export interface ChatRequest {
    /** Feature name for policy routing (e.g., 'ticket-suggest', 'call-recap') */
    feature: string;
    /** Tenant making the request */
    tenantId: string;
    /** Optional customer ID for per-customer tracking */
    customerId?: string;
    /** User who triggered the request */
    userId?: string;
    /** Messages to send */
    messages: ChatMessage[];
    /** System prompt (overrides prompt registry if set) */
    system?: string;
    /** Model override (bypasses policy routing) */
    model?: string;
    /** Provider override (bypasses policy routing) */
    provider?: string;
    /** Max tokens to generate */
    maxTokens?: number;
    /** Temperature (0-2) */
    temperature?: number;
    /** Response format */
    responseFormat?: {
        type: 'json_object';
    } | {
        type: 'text';
    };
}
export interface ChatResponse {
    /** Unique call ID for audit trail */
    callId: string;
    /** Generated content */
    content: string;
    /** Model that was actually used */
    model: string;
    /** Provider that was used */
    provider: string;
    /** Token usage */
    usage: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    /** Estimated cost in USD */
    costUsd: number;
    /** Prompt version used (if from registry) */
    promptVersion: string | null;
    /** AI disclosure metadata */
    aiDisclosure: {
        aiGenerated: true;
        modelFamily: string;
    };
    /** Additional metadata */
    metadata: {
        latencyMs: number;
        cached: boolean;
        piiDetected: boolean;
        piiScrubbed: boolean;
        circuitState: string;
        feature: string;
    };
}
export interface EmbedRequest {
    /** Feature name for policy routing */
    feature: string;
    /** Tenant making the request */
    tenantId: string;
    /** Text to embed */
    input: string | string[];
    /** Model override */
    model?: string;
    /** User who triggered the request */
    userId?: string;
}
export interface EmbedResponse {
    embeddings: number[][];
    usage: {
        promptTokens: number;
        totalTokens: number;
    };
    model: string;
    costUsd: number;
}
export type QualitySignalType = 'thumbs_up' | 'thumbs_down' | 'regenerated' | 'edited' | 'abandoned';
export interface QualitySignal {
    callId: string;
    signal: QualitySignalType;
    editDistance?: number;
}
export interface PlatformPolicy {
    platform: string;
    enabled: boolean;
    routing: Record<string, FeatureRouting>;
    tiers: Record<string, TierConfig>;
    defaultTier: string;
    piiConfig: PIIConfig;
    cacheConfig: Record<string, {
        enabled: boolean;
        ttlSeconds: number;
    }>;
}
export interface FeatureRouting {
    provider: string;
    model: string;
    fallback?: {
        provider: string;
        model: string;
    };
}
export interface TierConfig {
    model: string;
    rpm: number;
    dailyTokenLimit: number | null;
    monthlyBudgetUsd: number | null;
}
export interface TenantPolicy {
    tenantId: string;
    platform: string;
    enabled: boolean;
    tier: string;
    dailyTokenLimit: number | null;
    dailyTokenHardLimit: number | null;
    monthlyBudgetUsd: number | null;
    allowedFeatures: string[] | null;
    blockedCustomers: string[];
}
export interface PIIConfig {
    default: 'scrub' | 'warn' | 'allow';
    features: Record<string, 'scrub' | 'warn' | 'allow'>;
    patterns: Record<string, boolean>;
}
/** A normalized tool definition (provider-agnostic) */
export interface ToolDefinition {
    name: string;
    description: string;
    input_schema: Record<string, unknown>;
}
/** A single content block within a message */
export type ContentBlock = {
    type: 'text';
    text: string;
} | {
    type: 'tool_use';
    id: string;
    name: string;
    input: Record<string, unknown>;
} | {
    type: 'tool_result';
    tool_use_id: string;
    content: string;
};
/** A chat message that supports tool-use content blocks */
export interface ToolChatMessage {
    role: 'user' | 'assistant';
    /** Plain string for normal turns; ContentBlock[] for tool-use turns */
    content: string | ContentBlock[];
}
/** Gateway-level request for a single tool-use turn */
export interface ToolChatRequest extends Omit<ChatRequest, 'messages'> {
    messages: ToolChatMessage[];
    tools: ToolDefinition[];
}
/** Gateway-level response for a single tool-use turn */
export interface ToolChatResponse {
    callId: string;
    /** Raw content blocks — caller inspects for tool_use to drive the loop */
    blocks: ContentBlock[];
    stopReason: 'end_turn' | 'tool_use' | 'max_tokens' | string;
    model: string;
    provider: string;
    usage: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    costUsd: number;
    promptVersion: string | null;
    aiDisclosure: {
        aiGenerated: true;
        modelFamily: string;
    };
    metadata: {
        latencyMs: number;
        cached: boolean;
        piiDetected: boolean;
        piiScrubbed: boolean;
        circuitState: string;
        feature: string;
    };
}
export interface AIProvider {
    readonly name: string;
    chat(request: ProviderChatRequest): Promise<ProviderChatResponse>;
    /** Optional — providers that support tool use implement this */
    chatWithTools?(request: ProviderToolChatRequest): Promise<ProviderToolChatResponse>;
    embed?(request: ProviderEmbedRequest): Promise<ProviderEmbedResponse>;
    healthCheck(): Promise<boolean>;
}
export interface ProviderToolChatRequest {
    model: string;
    messages: ToolChatMessage[];
    tools: ToolDefinition[];
    system?: string;
    maxTokens?: number;
    temperature?: number;
}
export interface ProviderToolChatResponse {
    blocks: ContentBlock[];
    stopReason: string;
    usage: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    model: string;
}
export interface ProviderChatRequest {
    model: string;
    messages: ChatMessage[];
    system?: string;
    maxTokens?: number;
    temperature?: number;
    responseFormat?: {
        type: 'json_object';
    } | {
        type: 'text';
    };
}
export interface ProviderChatResponse {
    content: string;
    usage: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    model: string;
    finishReason: string | null;
}
export interface ProviderEmbedRequest {
    model: string;
    input: string | string[];
}
export interface ProviderEmbedResponse {
    embeddings: number[][];
    usage: {
        promptTokens: number;
        totalTokens: number;
    };
    model: string;
}
export interface UsageEvent {
    callId: string;
    platform: string;
    tenantId: string;
    customerId: string | null;
    userId: string | null;
    feature: string;
    model: string;
    provider: string;
    tokensIn: number;
    tokensOut: number;
    estimatedCostUsd: number;
    latencyMs: number;
    cached: boolean;
    piiDetected: boolean;
    promptVersion: string | null;
    timestamp: string;
}
export interface AuditRecord extends UsageEvent {
    piiScrubbed: boolean;
    contentFlags: string[];
    qualitySignal: string | null;
    circuitState: string;
}
export interface AIGateway {
    /** Send a chat completion through the gateway */
    chat(request: ChatRequest): Promise<ChatResponse>;
    /**
     * Send a single tool-use turn through the gateway.
     * The caller owns the tool execution loop — this handles one turn at a time
     * so that domain-specific tool execution (HTTP requests, DB calls, etc.) stays
     * with the caller while quota, audit, circuit breaking, and PII scrubbing are
     * enforced by the gateway on every turn.
     */
    chatWithTools(request: ToolChatRequest): Promise<ToolChatResponse>;
    /** Generate embeddings through the gateway */
    embed(request: EmbedRequest): Promise<EmbedResponse>;
    /** Report quality feedback for an AI call */
    reportQuality(signal: QualitySignal): Promise<void>;
    /** Check if a tenant is enabled and within quota */
    checkAccess(tenantId: string, feature?: string): Promise<{
        allowed: boolean;
        reason?: string;
    }>;
    /** Graceful shutdown — flush buffers */
    shutdown(): Promise<void>;
}
//# sourceMappingURL=types.d.ts.map