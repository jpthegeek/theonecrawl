import { describe, it, expect } from 'vitest';
import { browserActionSchema, sanitizeHeaders } from '../actions.js';

describe('browserActionSchema', () => {
  it('validates a wait action', () => {
    const result = browserActionSchema.safeParse({ type: 'wait', milliseconds: 1000 });
    expect(result.success).toBe(true);
  });

  it('rejects wait without milliseconds', () => {
    const result = browserActionSchema.safeParse({ type: 'wait' });
    expect(result.success).toBe(false);
  });

  it('validates a click action', () => {
    const result = browserActionSchema.safeParse({ type: 'click', selector: '#btn' });
    expect(result.success).toBe(true);
  });

  it('rejects click without selector', () => {
    const result = browserActionSchema.safeParse({ type: 'click' });
    expect(result.success).toBe(false);
  });

  it('validates a write action', () => {
    const result = browserActionSchema.safeParse({ type: 'write', selector: '#input', text: 'hello' });
    expect(result.success).toBe(true);
  });

  it('rejects write without text', () => {
    const result = browserActionSchema.safeParse({ type: 'write', selector: '#input' });
    expect(result.success).toBe(false);
  });

  it('validates a press action', () => {
    const result = browserActionSchema.safeParse({ type: 'press', key: 'Enter' });
    expect(result.success).toBe(true);
  });

  it('rejects press without key', () => {
    const result = browserActionSchema.safeParse({ type: 'press' });
    expect(result.success).toBe(false);
  });

  it('validates a scroll action with defaults', () => {
    const result = browserActionSchema.safeParse({ type: 'scroll' });
    expect(result.success).toBe(true);
  });

  it('validates a scroll action with direction and amount', () => {
    const result = browserActionSchema.safeParse({ type: 'scroll', direction: 'up', amount: 500 });
    expect(result.success).toBe(true);
  });

  it('validates a screenshot action', () => {
    const result = browserActionSchema.safeParse({ type: 'screenshot' });
    expect(result.success).toBe(true);
  });

  it('validates an executeJavascript action', () => {
    const result = browserActionSchema.safeParse({ type: 'executeJavascript', script: 'return 1+1' });
    expect(result.success).toBe(true);
  });

  it('rejects executeJavascript without script', () => {
    const result = browserActionSchema.safeParse({ type: 'executeJavascript' });
    expect(result.success).toBe(false);
  });

  it('validates a scrape action', () => {
    const result = browserActionSchema.safeParse({ type: 'scrape' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid action type', () => {
    const result = browserActionSchema.safeParse({ type: 'invalid' });
    expect(result.success).toBe(false);
  });

  it('rejects milliseconds over 30000', () => {
    const result = browserActionSchema.safeParse({ type: 'wait', milliseconds: 50000 });
    expect(result.success).toBe(false);
  });
});

describe('sanitizeHeaders', () => {
  it('allows safe headers', () => {
    const result = sanitizeHeaders({
      'Accept-Language': 'en-US',
      'X-Custom': 'value',
    });
    expect(result).toEqual({
      'Accept-Language': 'en-US',
      'X-Custom': 'value',
    });
  });

  it('blocks Host header', () => {
    const result = sanitizeHeaders({ Host: 'evil.com', 'X-Custom': 'ok' });
    expect(result).toEqual({ 'X-Custom': 'ok' });
  });

  it('blocks Origin header', () => {
    const result = sanitizeHeaders({ Origin: 'http://evil.com' });
    expect(result).toEqual({});
  });

  it('blocks Content-Length', () => {
    const result = sanitizeHeaders({ 'Content-Length': '100' });
    expect(result).toEqual({});
  });

  it('blocks Proxy-* headers', () => {
    const result = sanitizeHeaders({
      'Proxy-Authorization': 'Basic abc',
      'Proxy-Connection': 'keep-alive',
    });
    expect(result).toEqual({});
  });

  it('blocks Sec-* headers', () => {
    const result = sanitizeHeaders({
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
    });
    expect(result).toEqual({});
  });

  it('is case-insensitive for blocking', () => {
    const result = sanitizeHeaders({ host: 'evil.com', ORIGIN: 'bad' });
    expect(result).toEqual({});
  });
});
