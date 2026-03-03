import type { TheOneCrawl } from '@theonecrawl/js';

export const extractTool = {
  name: 'theonecrawl_extract',
  description: 'AI-powered structured data extraction from web pages using Claude.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      urls: {
        type: 'array',
        items: { type: 'string' },
        description: 'URLs to extract data from',
      },
      prompt: { type: 'string', description: 'What data to extract' },
    },
    required: ['urls'],
  },
  async handler(client: TheOneCrawl, args: Record<string, unknown>) {
    const result = await client.extract({
      urls: args['urls'] as string[],
      prompt: args['prompt'] as string | undefined,
    });

    return typeof result.data === 'string'
      ? result.data
      : JSON.stringify(result.data, null, 2);
  },
};
