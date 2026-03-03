import { Command } from 'commander';
import { scrapeCommand } from './commands/scrape.js';
import { crawlCommand } from './commands/crawl.js';
import { mapCommand } from './commands/map.js';
import { extractCommand } from './commands/extract.js';
import { statusCommand } from './commands/status.js';
import { cancelCommand } from './commands/cancel.js';
import { cmsBlocksCommand } from './commands/cms-blocks.js';
import { designSystemCommand } from './commands/design-system.js';
import { loginCommand } from './commands/login.js';

const program = new Command();

program
  .name('theonecrawl')
  .description('TheOneCrawl CLI — Firecrawl-compatible web crawling')
  .version('0.1.0');

program
  .command('login')
  .description('Save your API key to ~/.theonecrawl/config.json')
  .action(loginCommand);

program
  .command('scrape <url>')
  .description('Scrape a single page')
  .option('-f, --format <formats>', 'Output formats (comma-separated: markdown,html,links)')
  .option('-t, --timeout <ms>', 'Timeout in milliseconds')
  .option('-m, --main-content', 'Extract only main content')
  .option('--json', 'Output raw JSON')
  .action(scrapeCommand);

program
  .command('crawl <url>')
  .description('Crawl a website (multiple pages)')
  .option('-l, --limit <pages>', 'Max pages to crawl')
  .option('-d, --max-depth <depth>', 'Max link-follow depth')
  .option('--json', 'Output raw JSON')
  .action(crawlCommand);

program
  .command('map <url>')
  .description('Discover URLs on a website')
  .option('-s, --search <query>', 'Filter URLs by search query')
  .option('-l, --limit <count>', 'Max URLs to return')
  .option('--json', 'Output raw JSON')
  .action(mapCommand);

program
  .command('extract <url>')
  .description('AI-powered data extraction')
  .option('-p, --prompt <prompt>', 'Extraction prompt')
  .option('--json', 'Output raw JSON')
  .action(extractCommand);

program
  .command('status <id>')
  .description('Check crawl job status')
  .option('--json', 'Output raw JSON')
  .action(statusCommand);

program
  .command('cancel <id>')
  .description('Cancel a running crawl')
  .action(cancelCommand);

program
  .command('cms-blocks <id>')
  .description('Get CMS blocks from a completed crawl')
  .option('-p, --page <number>', 'Page index')
  .option('--json', 'Output raw JSON')
  .action(cmsBlocksCommand);

program
  .command('design-system <id>')
  .description('Get extracted design system from a completed crawl')
  .option('--json', 'Output raw JSON')
  .action(designSystemCommand);

program.parse();
