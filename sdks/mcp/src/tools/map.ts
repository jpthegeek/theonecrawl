import type { TheOneCrawl } from '@theonecrawl/js';

export const mapTool = {
  name: 'theonecrawl_map',
  description: 'Discover all URLs on a website via sitemaps and link crawling.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      url: { type: 'string', description: 'The URL to map' },
      search: { type: 'string', description: 'Filter URLs by search query' },
      limit: { type: 'number', description: 'Max URLs to return' },
    },
    required: ['url'],
  },
  async handler(client: TheOneCrawl, args: Record<string, unknown>) {
    const result = await client.mapUrl(args['url'] as string, {
      search: args['search'] as string | undefined,
      limit: args['limit'] as number | undefined,
    });

    return `Found ${result.links.length} URLs:\n${result.links.map((l) => `- ${l}`).join('\n')}`;
  },
};
