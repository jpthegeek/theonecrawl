import type { TheOneCrawl } from '@theonecrawl/js';

export const scrapeTool = {
  name: 'theonecrawl_scrape',
  description: 'Scrape a single web page and return its content as markdown, HTML, or structured data. Supports browser actions, custom headers, and mobile emulation.',
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
      actions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: { type: 'string', enum: ['wait', 'click', 'write', 'press', 'scroll', 'screenshot', 'executeJavascript', 'scrape'] },
            selector: { type: 'string' },
            milliseconds: { type: 'number' },
            text: { type: 'string' },
            key: { type: 'string' },
            direction: { type: 'string', enum: ['up', 'down'] },
            amount: { type: 'number' },
            script: { type: 'string' },
          },
          required: ['type'],
        },
        description: 'Browser actions to execute after page load (max 20)',
      },
      headers: {
        type: 'object',
        additionalProperties: { type: 'string' },
        description: 'Custom HTTP headers to send',
      },
      mobile: { type: 'boolean', description: 'Emulate mobile device (iPhone viewport + UA)' },
    },
    required: ['url'],
  },
  async handler(client: TheOneCrawl, args: Record<string, unknown>) {
    const result = await client.scrapeUrl(args['url'] as string, {
      formats: args['formats'] as any,
      onlyMainContent: args['onlyMainContent'] as boolean | undefined,
      actions: args['actions'] as any,
      headers: args['headers'] as Record<string, string> | undefined,
      mobile: args['mobile'] as boolean | undefined,
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
