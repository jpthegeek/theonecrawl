import { TheOneCrawl } from '@theonecrawl/js';
import ora from 'ora';
import { getApiKey, getApiUrl } from '../config.js';
import { formatOutput, printError, printSuccess } from '../output.js';

interface CrawlOptions {
  limit?: string;
  maxDepth?: string;
  json?: boolean;
}

export async function crawlCommand(url: string, opts: CrawlOptions): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey) {
    printError('No API key. Run "theonecrawl login" or set THEONECRAWL_API_KEY.');
    process.exit(1);
  }

  const spinner = ora(`Crawling ${url}...`).start();

  try {
    const client = new TheOneCrawl({ apiKey, apiUrl: getApiUrl() });
    const result = await client.crawlUrl(url, {
      limit: opts.limit ? parseInt(opts.limit, 10) : undefined,
      maxDepth: opts.maxDepth ? parseInt(opts.maxDepth, 10) : undefined,
    });

    spinner.stop();

    if (opts.json) {
      formatOutput(result, true);
    } else {
      printSuccess(`Crawl complete: ${result.completed}/${result.total} pages, ${result.creditsUsed} credits used`);
      for (const page of result.data) {
        console.log(`  ${page.metadata.sourceURL ?? page.metadata.title}`);
      }
    }
  } catch (err) {
    spinner.fail('Crawl failed');
    printError(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}
