import { describe, it, expect } from 'vitest';
import { isPdfUrl } from '../pdf-parser.js';

describe('isPdfUrl', () => {
  it('detects .pdf URLs', () => {
    expect(isPdfUrl('https://example.com/report.pdf')).toBe(true);
  });

  it('detects .PDF URLs (case insensitive)', () => {
    expect(isPdfUrl('https://example.com/REPORT.PDF')).toBe(true);
  });

  it('detects .pdf with query params', () => {
    expect(isPdfUrl('https://example.com/doc.pdf?v=1')).toBe(true);
  });

  it('rejects non-PDF URLs', () => {
    expect(isPdfUrl('https://example.com/page.html')).toBe(false);
    expect(isPdfUrl('https://example.com/')).toBe(false);
  });

  it('rejects invalid URLs', () => {
    expect(isPdfUrl('not a url')).toBe(false);
  });
});
