import type { TheOneCrawl } from '@theonecrawl/js';

export const crawlTool = {
  name: 'theonecrawl_crawl',
  description: 'Crawl a website (multiple pages). Automatically polls until complete.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      url: { type: 'string', description: 'The starting URL to crawl' },
      limit: { type: 'number', description: 'Max pages to crawl (default: 10)' },
      maxDepth: { type: 'number', description: 'Max link-follow depth' },
    },
    required: ['url'],
  },
  async handler(client: TheOneCrawl, args: Record<string, unknown>) {
    const result = await client.crawlUrl(args['url'] as string, {
      limit: args['limit'] as number | undefined,
      maxDepth: args['maxDepth'] as number | undefined,
    });

    const pages = result.data.map((p) => {
      const parts = [`## ${p.metadata.title || p.metadata.sourceURL}`];
      if (p.markdown) parts.push(p.markdown.slice(0, 2000));
      return parts.join('\n');
    });

    return `Crawl complete: ${result.completed}/${result.total} pages\n\n${pages.join('\n\n---\n\n')}`;
  },
};
