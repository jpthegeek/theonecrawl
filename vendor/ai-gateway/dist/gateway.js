import { createAzureOpenAIProvider, createAzureFoundryProvider, createAnthropicProvider } from './providers/index.js';
import { createPolicyEngine } from './policy/engine.js';
import { createUsageEmitter } from './metering/usage-emitter.js';
import { createCircuitBreaker } from './resilience/circuit-breaker.js';
import { createRedisClient, createMemoryClient } from './utils/redis.js';
import { calculateCost, getModelFamily } from './utils/cost-calculator.js';
import { scrubMessages } from './safety/pii-scrubber.js';
import { createPromptRegistry } from './prompts/registry.js';
export function createAIGateway(config) {
    const { platform } = config;
    // ── Initialize Redis ──────────────────────────────────────────
    let redis;
    if (config.disableRedis) {
        redis = createMemoryClient();
    }
    else if (config.redis?.client) {
        redis = createRedisClient(config.redis.client);
    }
    else if (config.redis?.url) {
        redis = createRedisClient(config.redis.url);
    }
    else {
        redis = createMemoryClient();
    }
    // ── Initialize Providers ──────────────────────────────────────
    const providers = new Map();
    if (config.providers['azure-openai']) {
        providers.set('azure-openai', createAzureOpenAIProvider(config.providers['azure-openai']));
    }
    if (config.providers['azure-foundry']) {
        providers.set('azure-foundry', createAzureFoundryProvider(config.providers['azure-foundry']));
    }
    if (config.providers['anthropic']) {
        providers.set('anthropic', createAnthropicProvider(config.providers['anthropic']));
    }
    // ── Initialize Subsystems ─────────────────────────────────────
    const policy = createPolicyEngine({
        platform,
        redis,
        opsCenterUrl: config.opsCenter?.url,
        opsCenterApiKey: config.opsCenter?.apiKey,
        defaultFallback: config.defaultFallback,
    });
    const emitter = createUsageEmitter(redis, platform);
    const circuitBreaker = createCircuitBreaker(redis);
    const promptRegistry = createPromptRegistry({
        platform,
        redis,
        opsCenterUrl: config.opsCenter?.url,
        opsCenterApiKey: config.opsCenter?.apiKey,
    });
    // ── Helper: resolve provider with fallback ────────────────────
    function getProvider(name) {
        return providers.get(name) ?? null;
    }
    // ── Chat Implementation ───────────────────────────────────────
    async function chat(request) {
        const callId = crypto.randomUUID();
        const startTime = Date.now();
        // 1. Check tenant access
        const access = policy.checkTenantAccess(request.tenantId, request.feature);
        if (!access.allowed) {
            throw new GatewayError(access.reason ?? 'Access denied', 'ACCESS_DENIED');
        }
        // 2. Resolve routing (feature → provider + model)
        const routing = policy.getRouting(request.feature);
        const providerName = request.provider ?? routing.provider;
        const model = request.model ?? routing.model;
        // 3. Estimate tokens for quota check (~4 chars per token rough estimate)
        const estimatedTokens = request.messages.reduce((sum, m) => sum + Math.ceil(m.content.length / 4), 0) + (request.maxTokens ?? 1000);
        // 4. Check quota
        const quota = await policy.checkQuota(request.tenantId, estimatedTokens);
        if (!quota.allowed) {
            throw new GatewayError(quota.reason ?? 'Quota exceeded', 'QUOTA_EXCEEDED');
        }
        // 5. PII scrubbing
        let piiDetected = false;
        let piiScrubbed = false;
        let messagesForProvider = request.messages;
        let systemForProvider = request.system;
        const piiConfig = policy.getPIIConfig ? policy.getPIIConfig() : null;
        if (piiConfig) {
            const scrubResult = scrubMessages(request.messages.map(m => ({ role: m.role, content: m.content })), request.feature, piiConfig);
            messagesForProvider = scrubResult.messages;
            piiDetected = scrubResult.piiDetected;
            piiScrubbed = scrubResult.piiScrubbed;
            // Scrub system prompt too
            if (systemForProvider && piiConfig.default === 'scrub') {
                const sysResult = scrubMessages([{ role: 'system', content: systemForProvider }], request.feature, piiConfig);
                systemForProvider = sysResult.messages[0]?.content ?? systemForProvider;
            }
        }
        // 6. Prompt registry — use versioned prompt if no explicit system prompt
        let promptVersion = null;
        if (!systemForProvider) {
            const registeredPrompt = await promptRegistry.getPrompt(request.feature);
            if (registeredPrompt && registeredPrompt.status === 'active') {
                systemForProvider = registeredPrompt.systemPrompt;
                promptVersion = registeredPrompt.version;
            }
        }
        // 7. Check circuit breaker
        const circuitState = await circuitBreaker.getState(providerName);
        let activeProvider = getProvider(providerName);
        let activeProviderName = providerName;
        let activeModel = model;
        if (!await circuitBreaker.canCall(providerName) && routing.fallback) {
            // Circuit open — try fallback
            activeProvider = getProvider(routing.fallback.provider);
            activeProviderName = routing.fallback.provider;
            activeModel = routing.fallback.model;
        }
        if (!activeProvider) {
            throw new GatewayError(`No provider available: ${providerName}`, 'NO_PROVIDER');
        }
        // 8. Make the AI call
        let content;
        let usage;
        let actualModel;
        try {
            const result = await activeProvider.chat({
                model: activeModel,
                messages: messagesForProvider,
                system: systemForProvider,
                maxTokens: request.maxTokens,
                temperature: request.temperature,
                responseFormat: request.responseFormat,
            });
            content = result.content;
            usage = result.usage;
            actualModel = result.model;
            // Record success on circuit breaker
            await circuitBreaker.recordSuccess(activeProviderName);
        }
        catch (err) {
            // Record failure on circuit breaker
            await circuitBreaker.recordFailure(activeProviderName);
            // Try fallback if primary failed and we haven't already
            if (activeProviderName === providerName && routing.fallback) {
                const fallbackProvider = getProvider(routing.fallback.provider);
                if (fallbackProvider) {
                    const result = await fallbackProvider.chat({
                        model: routing.fallback.model,
                        messages: messagesForProvider,
                        system: systemForProvider,
                        maxTokens: request.maxTokens,
                        temperature: request.temperature,
                        responseFormat: request.responseFormat,
                    });
                    content = result.content;
                    usage = result.usage;
                    actualModel = result.model;
                    activeProviderName = routing.fallback.provider;
                }
                else {
                    throw err;
                }
            }
            else {
                throw err;
            }
        }
        const latencyMs = Date.now() - startTime;
        const costUsd = calculateCost(actualModel, usage.promptTokens, usage.completionTokens, config.pricing);
        // 9. Record usage against quota counters
        await policy.recordUsage(request.tenantId, usage.totalTokens, costUsd);
        // 10. Emit usage event (async, non-blocking)
        const usageEvent = {
            callId,
            platform,
            tenantId: request.tenantId,
            customerId: request.customerId ?? null,
            userId: request.userId ?? null,
            feature: request.feature,
            model: actualModel,
            provider: activeProviderName,
            tokensIn: usage.promptTokens,
            tokensOut: usage.completionTokens,
            estimatedCostUsd: costUsd,
            latencyMs,
            cached: false,
            piiDetected,
            promptVersion,
            timestamp: new Date().toISOString(),
        };
        void emitter.emit(usageEvent);
        // 11. Emit audit record (async, non-blocking)
        const auditRecord = {
            ...usageEvent,
            piiScrubbed,
            contentFlags: [],
            qualitySignal: null,
            circuitState,
        };
        void emitter.emitAudit(auditRecord);
        // 12. Return response
        return {
            callId,
            content,
            model: actualModel,
            provider: activeProviderName,
            usage,
            costUsd,
            promptVersion,
            aiDisclosure: {
                aiGenerated: true,
                modelFamily: getModelFamily(actualModel),
            },
            metadata: {
                latencyMs,
                cached: false,
                piiDetected,
                piiScrubbed,
                circuitState,
                feature: request.feature,
            },
        };
    }
    // ── Tool Chat Implementation ──────────────────────────────────
    async function chatWithTools(request) {
        const callId = crypto.randomUUID();
        const startTime = Date.now();
        // 1. Check tenant access
        const access = policy.checkTenantAccess(request.tenantId, request.feature);
        if (!access.allowed) {
            throw new GatewayError(access.reason ?? 'Access denied', 'ACCESS_DENIED');
        }
        // 2. Resolve routing
        const routing = policy.getRouting(request.feature);
        const providerName = request.provider ?? routing.provider;
        const model = request.model ?? routing.model;
        // 3. Estimate tokens (string messages only; block arrays counted by char length)
        const estimatedTokens = request.messages.reduce((sum, m) => {
            const len = typeof m.content === 'string'
                ? m.content.length
                : m.content.reduce((s, b) => s + ('text' in b ? b.text.length : ('content' in b ? b.content.length : 100)), 0);
            return sum + Math.ceil(len / 4);
        }, 0) + (request.maxTokens ?? 1000);
        // 4. Check quota
        const quota = await policy.checkQuota(request.tenantId, estimatedTokens);
        if (!quota.allowed) {
            throw new GatewayError(quota.reason ?? 'Quota exceeded', 'QUOTA_EXCEEDED');
        }
        // 5. PII scrubbing — only on string-content messages (user text before tool loop)
        let piiDetected = false;
        let piiScrubbed = false;
        let messagesForProvider = request.messages;
        const piiConfig = policy.getPIIConfig ? policy.getPIIConfig() : null;
        if (piiConfig) {
            const stringMessages = request.messages
                .filter((m) => typeof m.content === 'string')
                .map((m) => ({ role: m.role, content: m.content }));
            if (stringMessages.length > 0) {
                const scrubResult = scrubMessages(stringMessages, request.feature, piiConfig);
                piiDetected = scrubResult.piiDetected;
                piiScrubbed = scrubResult.piiScrubbed;
                // Patch scrubbed content back into messages
                let scrubIdx = 0;
                messagesForProvider = request.messages.map((m) => {
                    if (typeof m.content === 'string') {
                        return { ...m, content: scrubResult.messages[scrubIdx++]?.content ?? m.content };
                    }
                    return m;
                });
            }
        }
        // 6. Prompt registry for system prompt
        let systemForProvider = request.system;
        let promptVersion = null;
        if (!systemForProvider) {
            const registeredPrompt = await promptRegistry.getPrompt(request.feature);
            if (registeredPrompt && registeredPrompt.status === 'active') {
                systemForProvider = registeredPrompt.systemPrompt;
                promptVersion = registeredPrompt.version;
            }
        }
        // 7. Circuit breaker
        const circuitState = await circuitBreaker.getState(providerName);
        let activeProvider = getProvider(providerName);
        let activeProviderName = providerName;
        let activeModel = model;
        if (!await circuitBreaker.canCall(providerName) && routing.fallback) {
            activeProvider = getProvider(routing.fallback.provider);
            activeProviderName = routing.fallback.provider;
            activeModel = routing.fallback.model;
        }
        if (!activeProvider?.chatWithTools) {
            // Fallback: if chosen provider lacks tool support, try other registered providers
            for (const [name, p] of providers) {
                if (p.chatWithTools) {
                    activeProvider = p;
                    activeProviderName = name;
                    break;
                }
            }
        }
        if (!activeProvider?.chatWithTools) {
            throw new GatewayError('No provider with tool support available', 'NO_PROVIDER');
        }
        // 8. Make the call
        let result;
        try {
            result = await activeProvider.chatWithTools({
                model: activeModel,
                messages: messagesForProvider,
                tools: request.tools,
                system: systemForProvider,
                maxTokens: request.maxTokens,
                temperature: request.temperature,
            });
            await circuitBreaker.recordSuccess(activeProviderName);
        }
        catch (err) {
            await circuitBreaker.recordFailure(activeProviderName);
            throw err;
        }
        const latencyMs = Date.now() - startTime;
        const costUsd = calculateCost(result.model, result.usage.promptTokens, result.usage.completionTokens, config.pricing);
        // 9. Record usage against quota counters
        await policy.recordUsage(request.tenantId, result.usage.totalTokens, costUsd);
        // 10. Emit usage + audit (async, non-blocking)
        const usageEvent = {
            callId,
            platform,
            tenantId: request.tenantId,
            customerId: request.customerId ?? null,
            userId: request.userId ?? null,
            feature: request.feature,
            model: result.model,
            provider: activeProviderName,
            tokensIn: result.usage.promptTokens,
            tokensOut: result.usage.completionTokens,
            estimatedCostUsd: costUsd,
            latencyMs,
            cached: false,
            piiDetected,
            promptVersion,
            timestamp: new Date().toISOString(),
        };
        void emitter.emit(usageEvent);
        void emitter.emitAudit({ ...usageEvent, piiScrubbed, contentFlags: [], qualitySignal: null, circuitState });
        return {
            callId,
            blocks: result.blocks,
            stopReason: result.stopReason,
            model: result.model,
            provider: activeProviderName,
            usage: result.usage,
            costUsd,
            promptVersion,
            aiDisclosure: { aiGenerated: true, modelFamily: getModelFamily(result.model) },
            metadata: { latencyMs, cached: false, piiDetected, piiScrubbed, circuitState, feature: request.feature },
        };
    }
    // ── Embed Implementation ──────────────────────────────────────
    async function embed(request) {
        const routing = policy.getRouting(request.feature);
        const providerName = routing.provider ?? 'azure-openai';
        const model = request.model ?? 'text-embedding-3-small';
        // Embeddings only supported on OpenAI
        const provider = getProvider(providerName === 'azure-foundry' ? 'azure-openai' : providerName);
        if (!provider?.embed) {
            throw new GatewayError('Embedding not available on this provider', 'NO_EMBED');
        }
        const result = await provider.embed({ model, input: request.input });
        const costUsd = calculateCost(model, result.usage.promptTokens, 0, config.pricing);
        // Emit usage
        void emitter.emit({
            callId: crypto.randomUUID(),
            platform,
            tenantId: request.tenantId,
            customerId: null,
            userId: request.userId ?? null,
            feature: request.feature,
            model,
            provider: providerName,
            tokensIn: result.usage.promptTokens,
            tokensOut: 0,
            estimatedCostUsd: costUsd,
            latencyMs: 0,
            cached: false,
            piiDetected: false,
            promptVersion: null,
            timestamp: new Date().toISOString(),
        });
        return { ...result, costUsd };
    }
    // ── Quality Signal ────────────────────────────────────────────
    async function reportQuality(signal) {
        // Buffer for Ops Center (same Redis pattern)
        await redis.lpush(`ai:buffer:${platform}:quality`, JSON.stringify({ ...signal, platform, timestamp: new Date().toISOString() }));
    }
    // ── Access Check ──────────────────────────────────────────────
    async function checkAccess(tenantId, feature) {
        const access = policy.checkTenantAccess(tenantId, feature);
        if (!access.allowed)
            return access;
        return policy.checkQuota(tenantId, 0);
    }
    // ── Shutdown ──────────────────────────────────────────────────
    async function shutdown() {
        await redis.quit();
    }
    return { chat, chatWithTools, embed, reportQuality, checkAccess, shutdown };
}
// ── Error Class ─────────────────────────────────────────────────
export class GatewayError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = 'GatewayError';
    }
}
//# sourceMappingURL=gateway.js.map