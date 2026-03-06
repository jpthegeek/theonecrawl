/** Default pricing per 1k tokens (USD). Updated as of March 2026. */
const DEFAULT_PRICING = {
    // Azure OpenAI
    'gpt-4.1': { input: 0.002, output: 0.008 },
    'gpt-4.1-mini': { input: 0.0004, output: 0.0016 },
    'gpt-4.1-nano': { input: 0.0001, output: 0.0004 },
    'gpt-4o': { input: 0.0025, output: 0.01 },
    'gpt-4o-mini': { input: 0.00015, output: 0.0006 },
    'gpt-5.2-chat': { input: 0.003, output: 0.012 },
    // Azure Foundry — Claude
    'claude-opus-4-6': { input: 0.015, output: 0.075 },
    'claude-opus-4-5': { input: 0.015, output: 0.075 },
    'claude-sonnet-4-6': { input: 0.003, output: 0.015 },
    'claude-sonnet-4-5': { input: 0.003, output: 0.015 },
    'claude-haiku-4-5': { input: 0.0008, output: 0.004 },
    // Embeddings
    'text-embedding-3-small': { input: 0.00002, output: 0 },
    'text-embedding-3-large': { input: 0.00013, output: 0 },
};
export function calculateCost(model, promptTokens, completionTokens, overrides) {
    const pricing = overrides?.[model] ?? DEFAULT_PRICING[model];
    if (!pricing)
        return 0;
    return (promptTokens / 1000) * pricing.input + (completionTokens / 1000) * pricing.output;
}
export function getModelFamily(model) {
    if (model.startsWith('claude'))
        return 'claude';
    if (model.startsWith('gpt'))
        return 'openai';
    return 'unknown';
}
//# sourceMappingURL=cost-calculator.js.map