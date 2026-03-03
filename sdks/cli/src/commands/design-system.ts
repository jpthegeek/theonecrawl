import { TheOneCrawl } from '@theonecrawl/js';
import { getApiKey, getApiUrl } from '../config.js';
import { formatOutput, printError } from '../output.js';

interface DesignSystemOptions {
  json?: boolean;
}

export async function designSystemCommand(id: string, opts: DesignSystemOptions): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey) {
    printError('No API key. Run "theonecrawl login" or set THEONECRAWL_API_KEY.');
    process.exit(1);
  }

  try {
    const client = new TheOneCrawl({ apiKey, apiUrl: getApiUrl() });
    const result = await client.getDesignSystem(id);
    formatOutput(result, opts.json ?? true);
  } catch (err) {
    printError(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}
