import { TheOneCrawl } from '@theonecrawl/js';
import { getApiKey, getApiUrl } from '../config.js';
import { formatOutput, printError } from '../output.js';

interface CmsBlocksOptions {
  page?: string;
  json?: boolean;
}

export async function cmsBlocksCommand(id: string, opts: CmsBlocksOptions): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey) {
    printError('No API key. Run "theonecrawl login" or set THEONECRAWL_API_KEY.');
    process.exit(1);
  }

  try {
    const client = new TheOneCrawl({ apiKey, apiUrl: getApiUrl() });
    const result = await client.getCmsBlocks(id, opts.page ? parseInt(opts.page, 10) : undefined);
    formatOutput(result, opts.json ?? true);
  } catch (err) {
    printError(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}
