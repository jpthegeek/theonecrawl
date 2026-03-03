import type { TheOneCrawl } from '@theonecrawl/js';

export const crawlStatusTool = {
  name: 'theonecrawl_crawl_status',
  description: 'Check the status of a running or completed crawl job.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      id: { type: 'string', description: 'The crawl job ID' },
    },
    required: ['id'],
  },
  async handler(client: TheOneCrawl, args: Record<string, unknown>) {
    const result = await client.getCrawlStatus(args['id'] as string);
    return `Status: ${result.status} | ${result.completed}/${result.total} pages | ${result.creditsUsed} credits used`;
  },
};
