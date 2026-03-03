import type { TheOneCrawl } from '@theonecrawl/js';

export const batchScrapeTool = {
  name: 'theonecrawl_batch_scrape',
  description: 'Scrape multiple URLs in a single batch operation. Returns structured data for all URLs.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      urls: {
        type: 'array',
        items: { type: 'string' },
        description: 'URLs to scrape (max 100)',
      },
      formats: {
        type: 'array',
        items: { type: 'string', enum: ['markdown', 'html', 'rawHtml', 'links', 'screenshot', 'cms_blocks'] },
        description: 'Output formats (default: markdown)',
      },
      onlyMainContent: { type: 'boolean', description: 'Strip boilerplate and return only main content' },
    },
    required: ['urls'],
  },
  async handler(client: TheOneCrawl, args: Record<string, unknown>) {
    const result = await client.batchScrape({
      urls: args['urls'] as string[],
      formats: args['formats'] as any,
      onlyMainContent: args['onlyMainContent'] as boolean | undefined,
    });

    const parts: string[] = [`Batch scrape: ${result.completed}/${result.total} completed`];
    for (const page of result.data) {
      const content = (page as any).markdown || (page as any).html || '';
      parts.push(`\n---\nURL: ${page.url}\n${content.slice(0, 2000)}`);
    }

    return parts.join('\n');
  },
};
