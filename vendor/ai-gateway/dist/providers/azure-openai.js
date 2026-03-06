import { AzureOpenAI } from 'openai';
import { DefaultAzureCredential, getBearerTokenProvider } from '@azure/identity';
export function createAzureOpenAIProvider(config) {
    const { endpoint, apiKey, apiVersion = '2024-12-01-preview' } = config;
    let client;
    if (apiKey) {
        client = new AzureOpenAI({ endpoint, apiKey, apiVersion });
    }
    else {
        const credential = new DefaultAzureCredential();
        const azureADTokenProvider = getBearerTokenProvider(credential, 'https://cognitiveservices.azure.com/.default');
        client = new AzureOpenAI({ endpoint, azureADTokenProvider, apiVersion });
    }
    return {
        name: 'azure-openai',
        async chat(request) {
            const messages = [];
            if (request.system) {
                messages.push({ role: 'system', content: request.system });
            }
            messages.push(...request.messages);
            const response = await client.chat.completions.create({
                model: request.model,
                messages,
                max_tokens: request.maxTokens,
                temperature: request.temperature ?? 0.7,
                response_format: request.responseFormat,
            });
            const choice = response.choices[0];
            return {
                content: choice?.message?.content ?? '',
                usage: {
                    promptTokens: response.usage?.prompt_tokens ?? 0,
                    completionTokens: response.usage?.completion_tokens ?? 0,
                    totalTokens: response.usage?.total_tokens ?? 0,
                },
                model: response.model ?? request.model,
                finishReason: choice?.finish_reason ?? null,
            };
        },
        async chatWithTools(request) {
            const messages = [];
            if (request.system)
                messages.push({ role: 'system', content: request.system });
            for (const m of request.messages) {
                if (typeof m.content === 'string') {
                    messages.push({ role: m.role, content: m.content });
                }
                else {
                    const toolUseBlocks = m.content.filter((b) => b.type === 'tool_use');
                    const toolResultBlocks = m.content.filter((b) => b.type === 'tool_result');
                    const textBlock = m.content.find((b) => b.type === 'text');
                    if (toolUseBlocks.length > 0) {
                        // Assistant message with tool calls
                        messages.push({
                            role: 'assistant',
                            content: null,
                            tool_calls: toolUseBlocks.map((b) => {
                                const tb = b;
                                return { id: tb.id, type: 'function', function: { name: tb.name, arguments: JSON.stringify(tb.input) } };
                            }),
                        });
                    }
                    else if (toolResultBlocks.length > 0) {
                        // Tool result messages (one per tool call)
                        for (const b of toolResultBlocks) {
                            const trb = b;
                            messages.push({ role: 'tool', tool_call_id: trb.tool_use_id, content: trb.content });
                        }
                    }
                    else if (textBlock) {
                        const tb = textBlock;
                        messages.push({ role: m.role, content: tb.text });
                    }
                }
            }
            const tools = request.tools.map((t) => ({
                type: 'function',
                function: { name: t.name, description: t.description, parameters: t.input_schema },
            }));
            const response = await client.chat.completions.create({
                model: request.model,
                messages: messages,
                tools,
                max_tokens: request.maxTokens,
                temperature: request.temperature ?? 0.7,
            });
            const choice = response.choices[0];
            // Translate OpenAI response back to normalized ContentBlock[]
            const blocks = [];
            if (choice?.message?.content) {
                blocks.push({ type: 'text', text: choice.message.content });
            }
            for (const tc of choice?.message?.tool_calls ?? []) {
                blocks.push({
                    type: 'tool_use',
                    id: tc.id,
                    name: tc.function.name,
                    input: JSON.parse(tc.function.arguments),
                });
            }
            const oaiFinishReason = choice?.finish_reason;
            const stopReason = oaiFinishReason === 'tool_calls' ? 'tool_use'
                : oaiFinishReason === 'stop' ? 'end_turn'
                    : oaiFinishReason === 'length' ? 'max_tokens'
                        : (oaiFinishReason ?? 'end_turn');
            return {
                blocks,
                stopReason,
                usage: {
                    promptTokens: response.usage?.prompt_tokens ?? 0,
                    completionTokens: response.usage?.completion_tokens ?? 0,
                    totalTokens: response.usage?.total_tokens ?? 0,
                },
                model: response.model ?? request.model,
            };
        },
        async embed(request) {
            const response = await client.embeddings.create({
                model: request.model,
                input: request.input,
            });
            return {
                embeddings: response.data.map((d) => d.embedding),
                usage: {
                    promptTokens: response.usage?.prompt_tokens ?? 0,
                    totalTokens: response.usage?.total_tokens ?? 0,
                },
                model: response.model ?? request.model,
            };
        },
        async healthCheck() {
            try {
                await client.models.list();
                return true;
            }
            catch {
                return false;
            }
        },
    };
}
//# sourceMappingURL=azure-openai.js.map