export class TheOneCrawlError extends Error {
  readonly statusCode: number;
  readonly response?: unknown;

  constructor(message: string, statusCode: number, response?: unknown) {
    super(message);
    this.name = 'TheOneCrawlError';
    this.statusCode = statusCode;
    this.response = response;
  }
}

export class AuthenticationError extends TheOneCrawlError {
  constructor(message = 'Invalid or missing API key') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class RateLimitError extends TheOneCrawlError {
  readonly retryAfter?: number;

  constructor(message = 'Rate limit exceeded', retryAfter?: number) {
    super(message, 429);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

export class InsufficientCreditsError extends TheOneCrawlError {
  constructor(message = 'Insufficient credits') {
    super(message, 402);
    this.name = 'InsufficientCreditsError';
  }
}
