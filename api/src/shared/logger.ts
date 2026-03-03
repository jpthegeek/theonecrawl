// ---------------------------------------------------------------------------
// TheOneCrawl — Structured JSON logger (Azure Container App compatible)
// ---------------------------------------------------------------------------

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  service: string;
  [key: string]: unknown;
}

const SERVICE = 'TheOneCrawl';

function emit(level: LogLevel, message: string, data?: Record<string, unknown>): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    service: SERVICE,
    ...data,
  };

  const line = JSON.stringify(entry);

  switch (level) {
    case 'error':
      process.stderr.write(line + '\n');
      break;
    default:
      process.stdout.write(line + '\n');
      break;
  }
}

export const logger = {
  debug: (message: string, data?: Record<string, unknown>) => emit('debug', message, data),
  info: (message: string, data?: Record<string, unknown>) => emit('info', message, data),
  warn: (message: string, data?: Record<string, unknown>) => emit('warn', message, data),
  error: (message: string, data?: Record<string, unknown>) => emit('error', message, data),
};
