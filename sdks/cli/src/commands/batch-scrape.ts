import { TheOneCrawl } from '@theonecrawl/js';
import ora from 'ora';
import { getApiKey, getApiUrl } from '../config.js';
import { formatOutput, printError, printSuccess } from '../output.js';

interface BatchScrapeOptions {
  format?: string;
  json?: boolean;
  mainContent?: boolean;
}

export async function batchScrapeCommand(urls: string[], opts: BatchScrapeOptions): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey) {
    printError('No API key. Run "theonecrawl login" or set THEONECRAWL_API_KEY.');
    process.exit(1);
  }

  const spinner = ora(`Batch scraping ${urls.length} URLs...`).start();

  try {
    const client = new TheOneCrawl({ apiKey, apiUrl: getApiUrl() });
    const formats = opts.format ? opts.format.split(',') as any : undefined;
    const result = await client.batchScrape({
      urls,
      formats,
      onlyMainContent: opts.mainContent,
    });

    spinner.stop();

    if (opts.json) {
      formatOutput(result, true);
    } else {
      printSuccess(`Batch complete: ${result.completed}/${result.total} URLs, ${result.creditsUsed} credits used`);
      for (const page of result.data) {
        console.log(`  ${page.url}`);
      }
    }
  } catch (err) {
    spinner.fail('Batch scrape failed');
    printError(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}
