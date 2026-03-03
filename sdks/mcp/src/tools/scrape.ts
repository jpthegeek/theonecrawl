import type { TheOneCrawl } from '@theonecrawl/js';

export const scrapeTool = {
  name: 'theonecrawl_scrape',
  description: 'Scrape a single web page and return its content as markdown, HTML, or structured data.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      url: { type: 'string', description: 'The URL to scrape' },
      formats: {
        type: 'array',
        items: { type: 'string', enum: ['markdown', 'html', 'rawHtml', 'links', 'screenshot', 'cms_blocks'] },
        description: 'Output formats (default: markdown)',
      },
      onlyMainContent: { type: 'boolean', description: 'Strip boilerplate and return only main content' },
    },
    required: ['url'],
  },
  async handler(client: TheOneCrawl, args: Record<string, unknown>) {
    const result = await client.scrapeUrl(args['url'] as string, {
      formats: args['formats'] as any,
      onlyMainContent: args['onlyMainContent'] as boolean | undefined,
    });

    const parts: string[] = [];
    if (result.data.markdown) parts.push(result.data.markdown);
    else if (result.data.html) parts.push(result.data.html);
    if (result.data.metadata) {
      parts.push(`\n---\nTitle: ${result.data.metadata.title}\nURL: ${result.data.metadata.sourceURL ?? args['url']}`);
    }

    return parts.join('\n') || JSON.stringify(result.data, null, 2);
  },
};
