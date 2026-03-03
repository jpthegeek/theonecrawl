import { TheOneCrawl } from '@theonecrawl/js';
import ora from 'ora';
import { getApiKey, getApiUrl } from '../config.js';
import { formatOutput, printError } from '../output.js';

interface ExtractOptions {
  prompt?: string;
  json?: boolean;
}

export async function extractCommand(url: string, opts: ExtractOptions): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey) {
    printError('No API key. Run "theonecrawl login" or set THEONECRAWL_API_KEY.');
    process.exit(1);
  }

  const spinner = ora(`Extracting from ${url}...`).start();

  try {
    const client = new TheOneCrawl({ apiKey, apiUrl: getApiUrl() });
    const result = await client.extract({
      urls: [url],
      prompt: opts.prompt,
    });

    spinner.stop();
    formatOutput(result.data, opts.json ?? false);
  } catch (err) {
    spinner.fail('Extract failed');
    printError(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}
