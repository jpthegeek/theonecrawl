import Anthropic from '@anthropic-ai/sdk';
export function createAnthropicProvider(config) {
    const client = new Anthropic({ apiKey: config.apiKey });
    return {
        name: 'anthropic',
        async chat(request) {
            const messages = request.messages
                .filter((m) => m.role !== 'system')
                .map((m) => ({ role: m.role, content: m.content }));
            const response = await client.messages.create({
                model: request.model,
                messages,
                system: request.system,
                max_tokens: request.maxTokens ?? 4096,
                temperature: request.temperature ?? 0.7,
            });
            const textBlock = response.content.find((b) => b.type === 'text');
            return {
                content: textBlock?.text ?? '',
                usage: {
                    promptTokens: response.usage.input_tokens,
                    completionTokens: response.usage.output_tokens,
                    totalTokens: response.usage.input_tokens + response.usage.output_tokens,
                },
                model: response.model,
                finishReason: response.stop_reason,
            };
        },
        async chatWithTools(request) {
            const messages = request.messages.map((m) => ({
                role: m.role,
                content: typeof m.content === 'string'
                    ? m.content
                    : m.content.map((block) => {
                        if (block.type === 'text')
                            return { type: 'text', text: block.text };
                        if (block.type === 'tool_use')
                            return {
                                type: 'tool_use',
                                id: block.id,
                                name: block.name,
                                input: block.input,
                            };
                        // tool_result
                        return {
                            type: 'tool_result',
                            tool_use_id: block.tool_use_id,
                            content: block.content,
                        };
                    }),
            }));
            const tools = request.tools.map((t) => ({
                name: t.name,
                description: t.description,
                input_schema: t.input_schema,
            }));
            const response = await client.messages.create({
                model: request.model,
                messages,
                tools,
                system: request.system,
                max_tokens: request.maxTokens ?? 4096,
                temperature: request.temperature ?? 0.7,
            });
            const blocks = [];
            for (const b of response.content) {
                if (b.type === 'text')
                    blocks.push({ type: 'text', text: b.text });
                else if (b.type === 'tool_use')
                    blocks.push({ type: 'tool_use', id: b.id, name: b.name, input: b.input });
                // skip thinking/redacted_thinking blocks
            }
            return {
                blocks,
                stopReason: response.stop_reason ?? 'end_turn',
                usage: {
                    promptTokens: response.usage.input_tokens,
                    completionTokens: response.usage.output_tokens,
                    totalTokens: response.usage.input_tokens + response.usage.output_tokens,
                },
                model: response.model,
            };
        },
        // Anthropic doesn't have an embedding API
        embed: undefined,
        async healthCheck() {
            try {
                await client.messages.create({
                    model: 'claude-haiku-4-5',
                    messages: [{ role: 'user', content: 'ping' }],
                    max_tokens: 1,
                });
                return true;
            }
            catch {
                return false;
            }
        },
    };
}
//# sourceMappingURL=anthropic.js.map