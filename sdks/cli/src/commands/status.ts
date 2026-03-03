import { TheOneCrawl } from '@theonecrawl/js';
import { getApiKey, getApiUrl } from '../config.js';
import { formatOutput, printError, printInfo } from '../output.js';

interface StatusOptions {
  json?: boolean;
}

export async function statusCommand(id: string, opts: StatusOptions): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey) {
    printError('No API key. Run "theonecrawl login" or set THEONECRAWL_API_KEY.');
    process.exit(1);
  }

  try {
    const client = new TheOneCrawl({ apiKey, apiUrl: getApiUrl() });
    const result = await client.getCrawlStatus(id);

    if (opts.json) {
      formatOutput(result, true);
    } else {
      printInfo(`Status: ${result.status} | ${result.completed}/${result.total} pages | ${result.creditsUsed} credits`);
    }
  } catch (err) {
    printError(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}
