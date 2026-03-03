import { TheOneCrawl } from '@theonecrawl/js';
import ora from 'ora';
import { getApiKey, getApiUrl } from '../config.js';
import { formatOutput, printError } from '../output.js';

interface MapOptions {
  search?: string;
  limit?: string;
  json?: boolean;
}

export async function mapCommand(url: string, opts: MapOptions): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey) {
    printError('No API key. Run "theonecrawl login" or set THEONECRAWL_API_KEY.');
    process.exit(1);
  }

  const spinner = ora(`Mapping ${url}...`).start();

  try {
    const client = new TheOneCrawl({ apiKey, apiUrl: getApiUrl() });
    const result = await client.mapUrl(url, {
      search: opts.search,
      limit: opts.limit ? parseInt(opts.limit, 10) : undefined,
    });

    spinner.stop();

    if (opts.json) {
      formatOutput(result, true);
    } else {
      console.log(`Found ${result.links.length} URLs:`);
      for (const link of result.links) {
        console.log(`  ${link}`);
      }
    }
  } catch (err) {
    spinner.fail('Map failed');
    printError(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}
