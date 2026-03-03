import chalk from 'chalk';

export function printJson(data: unknown): void {
  console.log(JSON.stringify(data, null, 2));
}

export function printSuccess(message: string): void {
  console.log(chalk.green('✓'), message);
}

export function printError(message: string): void {
  console.error(chalk.red('✗'), message);
}

export function printInfo(message: string): void {
  console.log(chalk.blue('ℹ'), message);
}

export function printMarkdown(md: string): void {
  console.log(md);
}

export function formatOutput(data: unknown, json: boolean): void {
  if (json) {
    printJson(data);
  } else if (typeof data === 'string') {
    console.log(data);
  } else {
    printJson(data);
  }
}
