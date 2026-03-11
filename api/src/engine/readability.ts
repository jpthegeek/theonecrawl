// ---------------------------------------------------------------------------
// TheOneCrawl — Readability + SEO metrics (pure computation, no AI)
// ---------------------------------------------------------------------------

import * as cheerio from 'cheerio';
import type { ExtractedContent } from './types.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ReadabilityMetrics {
  wordCount: number;
  sentenceCount: number;
  avgWordsPerSentence: number;
  fleschKincaidGrade: number;     // school grade level (lower = easier)
  fleschReadingEase: number;      // 0-100 (higher = easier, 60-70 = standard)
  estimatedReadingTimeMin: number; // at 200 words/min
}

export interface SeoMetrics {
  hasTitle: boolean;
  titleLength: number;
  hasMetaDescription: boolean;
  metaDescriptionLength: number;
  hasH1: boolean;
  h1Count: number;
  hasOgImage: boolean;
  hasCanonical: boolean;
  imagesMissingAlt: number;   // count of images without alt text
  internalLinksCount: number;
  externalLinksCount: number;
  schemaTypes: string[];       // detected Schema.org types from JSON-LD
}

// ---------------------------------------------------------------------------
// Readability computation
// ---------------------------------------------------------------------------

/**
 * Count syllable groups in a word — rough approximation via vowel runs.
 * Each run of consecutive vowels (a, e, i, o, u) counts as one syllable.
 * Minimum 1 syllable per word.
 */
function countSyllables(word: string): number {
  const lower = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!lower) return 0;
  // Count vowel groups
  const matches = lower.match(/[aeiou]+/g);
  const count = matches ? matches.length : 0;
  return Math.max(1, count);
}

/**
 * Compute Flesch-Kincaid readability metrics from plain text.
 */
export function computeReadability(text: string): ReadabilityMetrics {
  if (!text || !text.trim()) {
    return {
      wordCount: 0,
      sentenceCount: 0,
      avgWordsPerSentence: 0,
      fleschKincaidGrade: 0,
      fleschReadingEase: 0,
      estimatedReadingTimeMin: 0,
    };
  }

  // Word count: split on whitespace, filter empties
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;

  // Sentence count: split on sentence-ending punctuation
  const sentenceMatches = text.match(/[^.!?]*[.!?]+/g);
  const sentenceCount = sentenceMatches ? sentenceMatches.length : Math.max(1, Math.ceil(wordCount / 20));

  if (wordCount === 0) {
    return {
      wordCount: 0,
      sentenceCount: 0,
      avgWordsPerSentence: 0,
      fleschKincaidGrade: 0,
      fleschReadingEase: 0,
      estimatedReadingTimeMin: 0,
    };
  }

  const avgWordsPerSentence = wordCount / sentenceCount;

  // Total syllables across all words
  const totalSyllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const avgSyllablesPerWord = totalSyllables / wordCount;

  // Flesch Reading Ease: 206.835 - (1.015 * ASL) - (84.6 * ASW)
  const fleschReadingEase = Math.round(
    (206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord) * 10,
  ) / 10;

  // Flesch-Kincaid Grade: 0.39 * ASL + 11.8 * ASW - 15.59
  const fleschKincaidGrade = Math.round(
    (0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59) * 10,
  ) / 10;

  // Estimated reading time at 200 words per minute
  const estimatedReadingTimeMin = Math.round((wordCount / 200) * 10) / 10;

  return {
    wordCount,
    sentenceCount,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    fleschKincaidGrade,
    fleschReadingEase,
    estimatedReadingTimeMin,
  };
}

// ---------------------------------------------------------------------------
// SEO computation
// ---------------------------------------------------------------------------

/**
 * Compute SEO metrics from the raw HTML + already-extracted content.
 */
export function computeSeo(
  html: string,
  extracted: ExtractedContent,
  siteMetadata: { title: string; description: string; ogImage: string },
): SeoMetrics {
  const $ = cheerio.load(html);

  const title = siteMetadata.title || $('title').first().text().trim();
  const metaDescription =
    $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    siteMetadata.description ||
    '';

  const hasTitle = title.length > 0;
  const titleLength = title.length;

  const hasMetaDescription = metaDescription.length > 0;
  const metaDescriptionLength = metaDescription.length;

  // H1 analysis
  const h1Count = extracted.headings.filter((h) => h.level === 1).length;
  const hasH1 = h1Count > 0;

  // OG image
  const hasOgImage = !!(siteMetadata.ogImage && siteMetadata.ogImage.length > 0);

  // Canonical link
  const hasCanonical = $('link[rel="canonical"]').length > 0;

  // Images missing alt text (non-background images from extracted content)
  const imagesMissingAlt = extracted.images.filter(
    (img) => !img.isBackground && (img.alt === '' || img.alt === undefined),
  ).length;

  // Internal/external link counts
  const internalLinksCount = extracted.links.filter((l) => !l.isExternal).length;
  const externalLinksCount = extracted.links.filter((l) => l.isExternal).length;

  // Schema.org types from JSON-LD
  const schemaTypes: string[] = [];
  $('script[type="application/ld+json"]').each((_i, el) => {
    try {
      const data = JSON.parse($(el).text()) as Record<string, unknown>;
      if (data['@type']) {
        const typeVal = data['@type'];
        if (Array.isArray(typeVal)) {
          for (const t of typeVal) {
            if (typeof t === 'string' && !schemaTypes.includes(t)) {
              schemaTypes.push(t);
            }
          }
        } else if (typeof typeVal === 'string' && !schemaTypes.includes(typeVal)) {
          schemaTypes.push(typeVal);
        }
      }
    } catch {
      // ignore malformed JSON-LD
    }
  });

  return {
    hasTitle,
    titleLength,
    hasMetaDescription,
    metaDescriptionLength,
    hasH1,
    h1Count,
    hasOgImage,
    hasCanonical,
    imagesMissingAlt,
    internalLinksCount,
    externalLinksCount,
    schemaTypes,
  };
}
