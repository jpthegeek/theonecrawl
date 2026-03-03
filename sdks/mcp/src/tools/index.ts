import type { TheOneCrawl } from '@theonecrawl/js';
import { scrapeTool } from './scrape.js';
import { crawlTool } from './crawl.js';
import { crawlStatusTool } from './crawl-status.js';
import { mapTool } from './map.js';
import { extractTool } from './extract.js';
import { cmsBlocksTool } from './cms-blocks.js';
import { designSystemTool } from './design-system.js';
import { batchScrapeTool } from './batch-scrape.js';

export interface ToolDef {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: (client: TheOneCrawl, args: Record<string, unknown>) => Promise<string>;
}

export const allTools: ToolDef[] = [
  scrapeTool,
  crawlTool,
  crawlStatusTool,
  mapTool,
  extractTool,
  batchScrapeTool,
  cmsBlocksTool,
  designSystemTool,
];

export const toolMap = new Map(allTools.map((t) => [t.name, t]));
