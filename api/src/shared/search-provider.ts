// ---------------------------------------------------------------------------
// TheOneCrawl — Web search provider (DuckDuckGo HTML, no API key)
// ---------------------------------------------------------------------------

import * as cheerio from 'cheerio';
import { fetchWithSsrfProtection } from './ssrf.js';
import { logger } from './logger.js';

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  position: number;
}

const DDG_HTML_URL = 'https://html.duckduckgo.com/html/';
const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 10;

/**
 * Fetch DuckDuckGo HTML search results.
 * Returns up to `limit` results (default 5, max 10).
 * Returns empty array gracefully on any parsing or network failure.
 */
export async function searchWeb(query: string, limit?: number): Promise<SearchResult[]> {
  const maxResults = Math.min(limit ?? DEFAULT_LIMIT, MAX_LIMIT);

  if (!query || !query.trim()) {
    return [];
  }

  let html: string;
  try {
    const url = `${DDG_HTML_URL}?q=${encodeURIComponent(query.trim())}`;
    const response = await fetchWithSsrfProtection(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TheOneCrawl/1.0; +https://theonecrawl.app/bot)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      logger.warn('DuckDuckGo search returned non-OK status', { status: response.status });
      return [];
    }

    html = await response.text();
  } catch (err) {
    logger.warn('DuckDuckGo search fetch failed', {
      error: err instanceof Error ? err.message : String(err),
    });
    return [];
  }

  try {
    return parseDdgResults(html, maxResults);
  } catch (err) {
    logger.warn('DuckDuckGo result parsing failed', {
      error: err instanceof Error ? err.message : String(err),
    });
    return [];
  }
}

/**
 * Parse DuckDuckGo HTML search results page.
 * Result links are in `.result__a` (title + href), snippets in `.result__snippet`.
 * The href may be a DuckDuckGo redirect URL — extract the actual URL from `uddg=` param.
 */
function parseDdgResults(html: string, limit: number): SearchResult[] {
  const $ = cheerio.load(html);
  const results: SearchResult[] = [];

  $('.result').each((_i, el) => {
    if (results.length >= limit) return;

    const $el = $(el);
    const $link = $el.find('.result__a').first();
    const $snippet = $el.find('.result__snippet').first();

    const rawHref = $link.attr('href') || '';
    const title = $link.text().trim();
    const snippet = $snippet.text().trim();

    if (!title || !rawHref) return;

    // Extract actual URL from DuckDuckGo redirect if needed
    const actualUrl = extractActualUrl(rawHref);
    if (!actualUrl) return;

    // Filter out DuckDuckGo-internal URLs
    if (isDdgInternalUrl(actualUrl)) return;

    results.push({
      title,
      url: actualUrl,
      snippet,
      position: results.length + 1,
    });
  });

  return results;
}

/**
 * Extract the actual URL from a DuckDuckGo redirect href.
 * DDG uses query param `uddg=` for the destination URL.
 * If not present, returns the href as-is (may already be direct).
 */
function extractActualUrl(href: string): string | null {
  if (!href) return null;

  try {
    // Handle relative paths or protocol-relative
    const fullHref = href.startsWith('//') ? `https:${href}` : href;

    // Try parsing as URL — if it has uddg= param, extract it
    const parsed = new URL(fullHref, 'https://html.duckduckgo.com');
    const uddg = parsed.searchParams.get('uddg');
    if (uddg) {
      const decoded = decodeURIComponent(uddg);
      // Validate it's a proper http(s) URL
      new URL(decoded);
      return decoded;
    }

    // No redirect param — return as-is if valid http(s)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.href;
    }

    return null;
  } catch {
    return null;
  }
}

function isDdgInternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname.endsWith('duckduckgo.com') ||
      parsed.hostname === 'duckduckgo.com'
    );
  } catch {
    return true; // Can't parse — filter it out
  }
}
