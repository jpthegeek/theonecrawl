import { describe, it, expect } from 'vitest';
import { toMarkdown } from '../markdown-converter.js';
import type { ExtractedContent } from '../types.js';

function makeContent(overrides: Partial<ExtractedContent> = {}): ExtractedContent {
  return {
    headings: [],
    paragraphs: [],
    images: [],
    links: [],
    navigation: [],
    forms: [],
    socialLinks: [],
    contactInfo: [],
    colorPalette: [],
    fonts: [],
    sections: [],
    lists: [],
    tables: [],
    videos: [],
    testimonials: [],
    faqs: [],
    pricingPlans: [],
    stats: [],
    ...overrides,
  };
}

describe('toMarkdown', () => {
  it('converts headings to markdown', () => {
    const content = makeContent({
      headings: [
        { level: 1, text: 'Title' },
        { level: 2, text: 'Subtitle' },
      ],
    });
    const md = toMarkdown(content);
    expect(md).toContain('# Title');
    expect(md).toContain('## Subtitle');
  });

  it('converts paragraphs to markdown', () => {
    const content = makeContent({
      paragraphs: ['First paragraph text.', 'Second paragraph text.'],
    });
    const md = toMarkdown(content);
    expect(md).toContain('First paragraph text.');
    expect(md).toContain('Second paragraph text.');
  });

  it('converts lists to markdown', () => {
    const content = makeContent({
      lists: [
        { type: 'unordered', items: ['Item A', 'Item B'] },
        { type: 'ordered', items: ['Step 1', 'Step 2'] },
      ],
    });
    const md = toMarkdown(content);
    expect(md).toContain('- Item A');
    expect(md).toContain('- Item B');
    expect(md).toContain('1. Step 1');
    expect(md).toContain('2. Step 2');
  });

  it('converts tables to markdown', () => {
    const content = makeContent({
      tables: [{ headers: ['Name', 'Value'], rows: [['foo', 'bar']] }],
    });
    const md = toMarkdown(content);
    expect(md).toContain('| Name | Value |');
    expect(md).toContain('| foo | bar |');
  });

  it('converts FAQs to markdown', () => {
    const content = makeContent({
      faqs: [{ question: 'What is this?', answer: 'A test.' }],
    });
    const md = toMarkdown(content);
    expect(md).toContain('**What is this?**');
    expect(md).toContain('A test.');
  });

  it('skips header/footer sections in main-content-only mode', () => {
    const content = makeContent({
      sections: [
        { tag: 'header', isHeader: true, isFooter: false, isHero: false, order: 0, headings: [{ level: 1, text: 'NavTitle' }], paragraphs: [], images: [], links: [] },
        { tag: 'section', isHeader: false, isFooter: false, isHero: false, order: 1, headings: [{ level: 2, text: 'Content' }], paragraphs: ['Body text here.'], images: [], links: [] },
        { tag: 'footer', isHeader: false, isFooter: true, isHero: false, order: 2, headings: [], paragraphs: ['Copyright'], images: [], links: [] },
      ],
    });
    const md = toMarkdown(content, { onlyMainContent: true });
    expect(md).toContain('Content');
    expect(md).toContain('Body text here.');
    expect(md).not.toContain('NavTitle');
    expect(md).not.toContain('Copyright');
  });

  it('collapses triple newlines', () => {
    const content = makeContent({
      headings: [{ level: 1, text: 'Title' }],
      paragraphs: ['Para'],
    });
    const md = toMarkdown(content);
    expect(md).not.toMatch(/\n{3,}/);
  });
});
