// ---------------------------------------------------------------------------
// TheOneCrawl — Convert ExtractedContent to clean LLM-ready markdown
// ---------------------------------------------------------------------------

import type {
  ExtractedContent,
  ExtractedHeading,
  ExtractedLink,
  ExtractedList,
  ExtractedTable,
  ExtractedImage,
} from './types.js';

/**
 * Convert extracted page content to clean markdown.
 * When onlyMainContent is true, skips nav/header/footer boilerplate.
 */
export function toMarkdown(
  extracted: ExtractedContent,
  options: {
    onlyMainContent?: boolean;
    includeTags?: string[];
    excludeTags?: string[];
  } = {},
): string {
  const parts: string[] = [];
  const onlyMain = options.onlyMainContent ?? true;

  // If we have well-defined sections, convert each one
  if (extracted.sections.length > 0) {
    const sorted = [...extracted.sections].sort((a, b) => a.order - b.order);

    for (const section of sorted) {
      // Skip nav/header/footer in main-content-only mode
      if (onlyMain && (section.isHeader || section.isFooter)) continue;

      const sectionMd: string[] = [];

      for (const heading of section.headings) {
        sectionMd.push(headingToMd(heading));
      }

      for (const para of section.paragraphs) {
        sectionMd.push(para + '\n');
      }

      for (const img of section.images) {
        sectionMd.push(imageToMd(img));
      }

      if (sectionMd.length > 0) {
        parts.push(sectionMd.join('\n'));
      }
    }
  }

  // Fallback: flat conversion
  if (parts.length === 0) {
    // Headings
    for (const heading of extracted.headings) {
      parts.push(headingToMd(heading));
    }

    // Paragraphs
    for (const para of extracted.paragraphs) {
      parts.push(para + '\n');
    }
  }

  // Lists
  for (const list of extracted.lists) {
    parts.push(listToMd(list));
  }

  // Tables
  for (const table of extracted.tables) {
    parts.push(tableToMd(table));
  }

  // Images (only if not already included via sections)
  if (extracted.sections.length === 0) {
    for (const img of extracted.images) {
      if (img.isLogo) continue;
      parts.push(imageToMd(img));
    }
  }

  // Links section (if requested via formats or not in main-content-only mode)
  if (!onlyMain && extracted.links.length > 0) {
    parts.push('\n## Links\n');
    for (const link of extracted.links.slice(0, 50)) {
      parts.push(linkToMd(link));
    }
  }

  // FAQs
  if (extracted.faqs.length > 0) {
    parts.push('\n## FAQ\n');
    for (const faq of extracted.faqs) {
      parts.push(`**${faq.question}**\n\n${faq.answer}\n`);
    }
  }

  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// ---------------------------------------------------------------------------
// Element converters
// ---------------------------------------------------------------------------

function headingToMd(heading: ExtractedHeading): string {
  const prefix = '#'.repeat(Math.min(heading.level, 6));
  return `${prefix} ${heading.text}\n`;
}

function imageToMd(img: ExtractedImage): string {
  const alt = img.alt || 'image';
  return `![${alt}](${img.src})\n`;
}

function linkToMd(link: ExtractedLink): string {
  const text = link.text || link.href;
  return `- [${text}](${link.href})`;
}

function listToMd(list: ExtractedList): string {
  return list.items
    .map((item, i) => {
      const prefix = list.type === 'ordered' ? `${i + 1}.` : '-';
      return `${prefix} ${item}`;
    })
    .join('\n') + '\n';
}

function tableToMd(table: ExtractedTable): string {
  if (table.headers.length === 0 && table.rows.length === 0) return '';

  const lines: string[] = [];

  if (table.headers.length > 0) {
    lines.push('| ' + table.headers.join(' | ') + ' |');
    lines.push('| ' + table.headers.map(() => '---').join(' | ') + ' |');
  }

  for (const row of table.rows) {
    lines.push('| ' + row.join(' | ') + ' |');
  }

  return lines.join('\n') + '\n';
}
