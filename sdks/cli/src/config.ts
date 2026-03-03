import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const CONFIG_DIR = join(homedir(), '.theonecrawl');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

interface Config {
  apiKey?: string;
  apiUrl?: string;
}

export function loadConfig(): Config {
  try {
    if (!existsSync(CONFIG_FILE)) return {};
    return JSON.parse(readFileSync(CONFIG_FILE, 'utf-8')) as Config;
  } catch {
    return {};
  }
}

export function saveConfig(config: Config): void {
  mkdirSync(CONFIG_DIR, { recursive: true });
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2) + '\n', { mode: 0o600 });
}

export function getApiKey(): string | undefined {
  return process.env['THEONECRAWL_API_KEY'] ?? loadConfig().apiKey;
}

export function getApiUrl(): string | undefined {
  return process.env['THEONECRAWL_API_URL'] ?? loadConfig().apiUrl;
}
