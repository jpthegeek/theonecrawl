import type { TheOneCrawl } from '@theonecrawl/js';

export const designSystemTool = {
  name: 'theonecrawl_design_system',
  description: 'Extract the design system (colors, fonts, spacing) from a completed crawl. TheOneCrawl exclusive feature.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      crawlId: { type: 'string', description: 'The crawl job ID' },
    },
    required: ['crawlId'],
  },
  async handler(client: TheOneCrawl, args: Record<string, unknown>) {
    const result = await client.getDesignSystem(args['crawlId'] as string);
    return JSON.stringify(result, null, 2);
  },
};
