import { TheOneCrawl } from '@theonecrawl/js';
import { getApiKey, getApiUrl } from '../config.js';
import { printError, printSuccess } from '../output.js';

export async function cancelCommand(id: string): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey) {
    printError('No API key. Run "theonecrawl login" or set THEONECRAWL_API_KEY.');
    process.exit(1);
  }

  try {
    const client = new TheOneCrawl({ apiKey, apiUrl: getApiUrl() });
    await client.cancelCrawl(id);
    printSuccess(`Crawl ${id} cancelled`);
  } catch (err) {
    printError(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}
