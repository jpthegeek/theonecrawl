import { describe, it, expect } from 'vitest';
import { extractContent, filterHtmlByTags, resolveUrl } from '../extractor.js';

describe('extractContent', () => {
  it('extracts headings from HTML', () => {
    const html = '<html><body><h1>Main Title</h1><h2>Subtitle</h2></body></html>';
    const result = extractContent(html, 'https://example.com');
    expect(result.headings).toEqual([
      { level: 1, text: 'Main Title' },
      { level: 2, text: 'Subtitle' },
    ]);
  });

  it('extracts paragraphs longer than 10 characters', () => {
    const html = '<html><body><p>Short</p><p>This is a longer paragraph for testing.</p></body></html>';
    const result = extractContent(html, 'https://example.com');
    expect(result.paragraphs).toEqual(['This is a longer paragraph for testing.']);
  });

  it('extracts images with resolved URLs', () => {
    const html = '<html><body><img src="/images/hero.jpg" alt="Hero"></body></html>';
    const result = extractContent(html, 'https://example.com');
    expect(result.images).toHaveLength(1);
    expect(result.images[0]?.src).toBe('https://example.com/images/hero.jpg');
    expect(result.images[0]?.alt).toBe('Hero');
  });

  it('extracts links', () => {
    const html = '<html><body><a href="/about">About</a><a href="https://other.com">External</a></body></html>';
    const result = extractContent(html, 'https://example.com');
    expect(result.links).toHaveLength(2);
    expect(result.links[0]?.isExternal).toBe(false);
    expect(result.links[1]?.isExternal).toBe(true);
  });

  it('extracts social links', () => {
    const html = '<html><body><a href="https://twitter.com/test">Twitter</a></body></html>';
    const result = extractContent(html, 'https://example.com');
    expect(result.socialLinks).toEqual([{ platform: 'twitter', url: 'https://twitter.com/test' }]);
  });

  it('extracts email contact info', () => {
    // Note: extractor filters out example.com emails, use a real-looking domain
    const html = '<html><body><p>Contact us at hello@acmecorp.com</p></body></html>';
    const result = extractContent(html, 'https://acmecorp.com');
    const emails = result.contactInfo.filter((c) => c.type === 'email');
    expect(emails).toHaveLength(1);
    expect(emails[0]?.value).toBe('hello@acmecorp.com');
  });
});

describe('filterHtmlByTags', () => {
  it('returns original HTML when no tags specified', () => {
    const html = '<html><body><p>Hello</p></body></html>';
    expect(filterHtmlByTags(html)).toBe(html);
  });

  it('removes elements matching excludeTags', () => {
    const html = '<html><body><nav>Nav</nav><p>Content</p><footer>Footer</footer></body></html>';
    const result = filterHtmlByTags(html, undefined, ['nav', 'footer']);
    expect(result).not.toContain('<nav>');
    expect(result).not.toContain('<footer>');
    expect(result).toContain('<p>Content</p>');
  });

  it('keeps only elements matching includeTags', () => {
    const html = '<html><body><nav>Nav</nav><main><p>Main content</p></main><footer>Foot</footer></body></html>';
    const result = filterHtmlByTags(html, ['main']);
    expect(result).toContain('Main content');
    expect(result).not.toContain('Nav');
    expect(result).not.toContain('Foot');
  });

  it('applies excludeTags before includeTags', () => {
    const html = '<html><body><main><p>Keep</p><div class="ads">Ad</div></main></body></html>';
    const result = filterHtmlByTags(html, ['main'], ['.ads']);
    expect(result).toContain('Keep');
    expect(result).not.toContain('Ad');
  });
});

describe('resolveUrl', () => {
  const base = new URL('https://example.com/page/');

  it('resolves absolute URLs unchanged', () => {
    expect(resolveUrl('https://other.com/img.png', base)).toBe('https://other.com/img.png');
  });

  it('resolves relative paths', () => {
    expect(resolveUrl('image.png', base)).toBe('https://example.com/page/image.png');
  });

  it('resolves root-relative paths', () => {
    expect(resolveUrl('/assets/logo.svg', base)).toBe('https://example.com/assets/logo.svg');
  });

  it('resolves protocol-relative URLs', () => {
    expect(resolveUrl('//cdn.example.com/file.js', base)).toBe('https://cdn.example.com/file.js');
  });

  it('returns empty string for empty input', () => {
    expect(resolveUrl('', base)).toBe('');
  });
});
