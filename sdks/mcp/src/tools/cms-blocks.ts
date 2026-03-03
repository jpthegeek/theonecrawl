import type { TheOneCrawl } from '@theonecrawl/js';

export const cmsBlocksTool = {
  name: 'theonecrawl_cms_blocks',
  description: 'Get CMS-ready content blocks from a completed crawl. TheOneCrawl exclusive feature.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      crawlId: { type: 'string', description: 'The crawl job ID' },
      page: { type: 'number', description: 'Page index (optional)' },
    },
    required: ['crawlId'],
  },
  async handler(client: TheOneCrawl, args: Record<string, unknown>) {
    const result = await client.getCmsBlocks(
      args['crawlId'] as string,
      args['page'] as number | undefined,
    );

    return JSON.stringify(result, null, 2);
  },
};
