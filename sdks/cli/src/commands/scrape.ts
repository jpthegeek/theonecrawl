import { TheOneCrawl } from '@theonecrawl/js';
import ora from 'ora';
import { getApiKey, getApiUrl } from '../config.js';
import { formatOutput, printError, printMarkdown } from '../output.js';
import type { ScrapeFormat } from '@theonecrawl/js';

interface ScrapeOptions {
  format?: string;
  timeout?: string;
  json?: boolean;
  mainContent?: boolean;
  mobile?: boolean;
  header?: string[];
}

export async function scrapeCommand(url: string, opts: ScrapeOptions): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey) {
    printError('No API key. Run "theonecrawl login" or set THEONECRAWL_API_KEY.');
    process.exit(1);
  }

  const spinner = ora(`Scraping ${url}...`).start();

  try {
    const client = new TheOneCrawl({ apiKey, apiUrl: getApiUrl() });
    const formats = opts.format ? opts.format.split(',') as ScrapeFormat[] : undefined;

    // Parse --header KEY:VALUE flags
    let headers: Record<string, string> | undefined;
    if (opts.header && opts.header.length > 0) {
      headers = {};
      for (const h of opts.header) {
        const idx = h.indexOf(':');
        if (idx > 0) {
          headers[h.slice(0, idx).trim()] = h.slice(idx + 1).trim();
        }
      }
    }

    const result = await client.scrapeUrl(url, {
      formats,
      onlyMainContent: opts.mainContent,
      timeout: opts.timeout ? parseInt(opts.timeout, 10) : undefined,
      mobile: opts.mobile,
      headers,
    });

    spinner.stop();

    if (opts.json) {
      formatOutput(result, true);
    } else if (result.data.markdown) {
      printMarkdown(result.data.markdown);
    } else {
      formatOutput(result.data, true);
    }
  } catch (err) {
    spinner.fail('Scrape failed');
    printError(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}
