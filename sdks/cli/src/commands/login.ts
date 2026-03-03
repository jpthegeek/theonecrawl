import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { saveConfig, loadConfig } from '../config.js';
import { printSuccess, printError } from '../output.js';

export async function loginCommand(): Promise<void> {
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const apiKey = await rl.question('Enter your API key: ');
    if (!apiKey.trim()) {
      printError('API key cannot be empty');
      return;
    }

    const config = loadConfig();
    config.apiKey = apiKey.trim();
    saveConfig(config);
    printSuccess('API key saved to ~/.theonecrawl/config.json');
  } finally {
    rl.close();
  }
}
