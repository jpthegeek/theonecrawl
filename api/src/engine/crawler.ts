// ---------------------------------------------------------------------------
// TheOneCrawl — Main crawler using Crawlee + Playwright
// ---------------------------------------------------------------------------

import {
  PlaywrightCrawler,
  type PlaywrightCrawlingContext,
  Configuration,
} from 'crawlee';
import type { Page } from 'playwright';
import { extractContent, extractSiteMetadata, detectTechnology, filterHtmlByTags } from './extractor.js';
import { convertToCmsBlocks, generateThemeSuggestion } from './converter.js';
import { executeActions, sanitizeHeaders } from './actions.js';
import { isPdfUrl, parsePdf } from './pdf-parser.js';
import { validateUrlNotPrivate, fetchWithSsrfProtection } from '../shared/ssrf.js';
import { logger } from '../shared/logger.js';
import type { ActionResult } from './actions.js';
import type {
  CrawlOptions,
  CrawlResult,
  PageResult,
  SiteMetadata,
  CrawlProgress,
} from './types.js';

// Content size limits
const MAX_HTML_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50 MB

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Crawl a website starting from the given URL and return structured results.
 * Supports both single-page and multi-page crawling with configurable depth.
 */
export async function crawlWebsite(
  startUrl: string,
  options: CrawlOptions,
  onProgress?: (progress: CrawlProgress) => void,
): Promise<CrawlResult> {
  // Handle PDF URLs directly (no Playwright needed)
  if (isPdfUrl(startUrl)) {
    const pdfPage = await crawlPdfPage(startUrl);
    return {
      pages: [pdfPage],
      media: [],
      siteMetadata: {
        title: pdfPage.title,
        description: pdfPage.description,
        favicon: '',
        ogImage: '',
        colorPalette: [],
        primaryFont: 'Inter',
        secondaryFont: 'Inter',
        technology: [],
        language: 'en',
      },
    };
  }

  const parsedUrl = new URL(startUrl);
  const baseOrigin = parsedUrl.origin;

  const pages: PageResult[] = [];
  const discoveredUrls = new Set<string>([normalizeUrl(startUrl)]);
  const completedUrls = new Set<string>();
  const failedUrls = new Set<string>();
  const allFonts = new Set<string>();
  const allColors: string[] = [];
  let siteMetadata: SiteMetadata | null = null;

  const progress: CrawlProgress = {
    pagesQueued: 1,
    pagesCompleted: 0,
    pagesFailed: 0,
    currentUrl: startUrl,
  };

  // Configure Crawlee to use in-memory storage (no persistence)
  const config = new Configuration({
    persistStorage: false,
    purgeOnStart: true,
  });

  const crawler = new PlaywrightCrawler(
    {
      maxRequestsPerCrawl: options.maxPages,
      maxConcurrency: 3,
      requestHandlerTimeoutSecs: Math.ceil(options.timeout / 1000),
      navigationTimeoutSecs: Math.ceil(options.timeout / 1000),

      launchContext: {
        launchOptions: {
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
          ],
        },
      },

      browserPoolOptions: {
        useFingerprints: false,
        maxOpenPagesPerBrowser: 3,
      },

      preNavigationHooks: [
        async ({ page }: { page: Page }) => {
          // Mobile emulation
          if (options.mobile) {
            await page.setViewportSize({ width: 390, height: 844 });
          } else {
            await page.setViewportSize(options.viewport);
          }

          // Build custom headers
          const extraHeaders: Record<string, string> = {};
          if (options.userAgent) {
            extraHeaders['User-Agent'] = options.userAgent;
          }
          if (options.mobile) {
            extraHeaders['User-Agent'] =
              'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
          }
          // Apply user-provided custom headers (sanitized)
          if (options.headers) {
            Object.assign(extraHeaders, sanitizeHeaders(options.headers));
          }
          if (Object.keys(extraHeaders).length > 0) {
            await page.setExtraHTTPHeaders(extraHeaders);
          }

          // Block unnecessary resources + SSRF protection for all sub-requests
          await page.route('**/*', async (route) => {
            const type = route.request().resourceType();
            // Block media-heavy resources to speed up crawling
            if (['media', 'font', 'websocket'].includes(type)) {
              return route.abort();
            }

            // SSRF protection: validate each request URL to prevent redirect-based SSRF
            // and executeJavascript-initiated fetches to internal hosts
            const reqUrl = route.request().url();
            try {
              const ssrfCheck = await validateUrlNotPrivate(reqUrl);
              if (!ssrfCheck.valid) {
                logger.warn('Blocked SSRF attempt in browser context', { url: reqUrl });
                return route.abort();
              }
            } catch {
              return route.abort();
            }

            return route.continue();
          });
        },
      ],

      async requestHandler(context: PlaywrightCrawlingContext) {
        const { request, page, enqueueLinks, log } = context;
        const url = request.loadedUrl || request.url;
        const normalizedUrl = normalizeUrl(url);

        progress.currentUrl = url;
        onProgress?.(progress);

        log.info(`Crawling: ${url}`);

        const startTime = Date.now();

        try {
          // Wait for content to load
          if (options.waitForJs) {
            await page.waitForLoadState('networkidle', {
              timeout: options.timeout * 0.7,
            }).catch(() => {
              // Fallback to domcontentloaded if networkidle times out
              log.warning(`Network idle timeout for ${url}, using DOM content`);
            });
          } else {
            await page.waitForLoadState('domcontentloaded', {
              timeout: options.timeout * 0.7,
            });
          }

          // Scroll the page to trigger lazy-loaded content
          await autoScroll(page);

          // waitFor: number → timeout, string → CSS selector
          if (options.waitFor != null) {
            if (typeof options.waitFor === 'number') {
              await page.waitForTimeout(options.waitFor);
            } else if (typeof options.waitFor === 'string') {
              await page.waitForSelector(options.waitFor, { timeout: 10_000 }).catch(() => {
                log.warning(`waitFor selector "${options.waitFor}" timed out on ${url}`);
              });
            }
          }

          // Execute browser actions
          let actionResults: ActionResult[] | undefined;
          if (options.actions && options.actions.length > 0) {
            actionResults = await executeActions(page, options.actions);
          }

          // Get the fully rendered HTML (apply tag filtering if configured)
          let html = await page.content();
          if (html.length > MAX_HTML_SIZE) {
            logger.warn('Page content exceeds size limit, truncating', { url, size: html.length });
            html = html.slice(0, MAX_HTML_SIZE);
          }
          html = filterHtmlByTags(html, options.includeTags, options.excludeTags);
          const loadTimeMs = Date.now() - startTime;

          // Take screenshot
          let screenshot: string | undefined;
          try {
            const buffer = await page.screenshot({
              type: 'jpeg',
              quality: 80,
              fullPage: false,
            });
            screenshot = `data:image/jpeg;base64,${buffer.toString('base64')}`;
          } catch (err) {
            log.warning(`Screenshot failed for ${url}: ${err}`);
          }

          // Extract content
          const extractedContent = extractContent(html, url);
          const metadata = extractSiteMetadata(html, url);

          // First page provides the site metadata
          if (!siteMetadata) {
            const technology = detectTechnology(html);
            siteMetadata = {
              title: metadata.title,
              description: metadata.description,
              favicon: metadata.favicon,
              ogImage: metadata.ogImage,
              colorPalette: extractedContent.colorPalette,
              primaryFont: extractedContent.fonts[0] || 'Inter',
              secondaryFont: extractedContent.fonts[1] || extractedContent.fonts[0] || 'Inter',
              technology,
              language: metadata.language,
              generator: metadata.generator,
            };
          }

          // Accumulate design tokens
          extractedContent.fonts.forEach((f) => allFonts.add(f));
          allColors.push(...extractedContent.colorPalette);

          // Get the HTTP status code
          const response = page.mainFrame().url() === url ? 200 : 301;

          const pageResult: PageResult = {
            url,
            title: metadata.title,
            description: metadata.description,
            html,
            screenshot,
            extractedContent,
            actionResults,
            statusCode: response,
            loadTimeMs,
          };

          pages.push(pageResult);
          completedUrls.add(normalizedUrl);
          progress.pagesCompleted++;
          onProgress?.(progress);

          // Discover and enqueue links for multi-page crawling
          if (options.maxPages > 1 && options.maxDepth > 0) {
            const currentDepth = request.userData?.depth ?? 0;
            if (currentDepth < options.maxDepth) {
              await enqueueLinks({
                strategy: 'same-domain',
                transformRequestFunction: (req) => {
                  const reqNormalized = normalizeUrl(req.url);

                  // Only crawl same-origin URLs
                  try {
                    const reqUrl = new URL(req.url);
                    if (reqUrl.origin !== baseOrigin) return false;
                  } catch {
                    return false;
                  }

                  // Skip if already seen
                  if (discoveredUrls.has(reqNormalized)) return false;

                  // Skip if we've hit the page limit
                  if (discoveredUrls.size >= options.maxPages) return false;

                  // Apply blocked patterns
                  if (shouldBlockUrl(req.url, options.blockedPatterns || [])) return false;

                  // Apply allowed patterns
                  if (options.allowedPatterns && options.allowedPatterns.length > 0) {
                    if (!matchesAnyPattern(req.url, options.allowedPatterns)) return false;
                  }

                  discoveredUrls.add(reqNormalized);
                  progress.pagesQueued = discoveredUrls.size;

                  req.userData = { depth: currentDepth + 1 };
                  return req;
                },
              });
            }
          }
        } catch (err) {
          log.error(`Failed to process ${url}: ${err}`);
          failedUrls.add(normalizedUrl);
          progress.pagesFailed++;
          onProgress?.(progress);
        }
      },

      failedRequestHandler({ request, log }) {
        const url = request.url;
        log.error(`Request failed after retries: ${url}`);
        failedUrls.add(normalizeUrl(url));
        progress.pagesFailed++;
        onProgress?.(progress);
      },
    },
    config,
  );

  // Start the crawl
  await crawler.run([startUrl]);

  // Build final site metadata with accumulated data
  if (!siteMetadata) {
    siteMetadata = {
      title: '',
      description: '',
      favicon: '',
      ogImage: '',
      colorPalette: [],
      primaryFont: 'Inter',
      secondaryFont: 'Inter',
      technology: [],
      language: 'en',
    };
  }

  // Merge accumulated design tokens into metadata
  siteMetadata.colorPalette = deduplicateColors(allColors).slice(0, 12);
  if (allFonts.size > 0) {
    const fontArray = Array.from(allFonts);
    siteMetadata.primaryFont = fontArray[0] || 'Inter';
    siteMetadata.secondaryFont = fontArray[1] || fontArray[0] || 'Inter';
  }

  // Convert pages to CMS blocks if requested
  if (options.convertToBlocks) {
    for (const page of pages) {
      page.cmsBlocks = convertToCmsBlocks(page.extractedContent, siteMetadata);
    }
  }

  // Generate theme suggestion from the first page
  const firstPage = pages[0];
  const themeSuggestion = firstPage
    ? generateThemeSuggestion(firstPage.extractedContent, siteMetadata)
    : undefined;

  return {
    pages,
    media: [], // Media processing happens separately
    siteMetadata,
    themeSuggestion,
  };
}

/**
 * Crawl a single page without Crawlee overhead (used for simple single-page jobs).
 */
export async function crawlSinglePage(
  url: string,
  options: CrawlOptions,
): Promise<PageResult> {
  const result = await crawlWebsite(url, { ...options, maxPages: 1, maxDepth: 0 });
  const page = result.pages[0];
  if (!page) {
    throw new Error(`Failed to crawl ${url}: no page result`);
  }
  return page;
}

/**
 * Fetch a PDF URL and return a PageResult with extracted text.
 */
async function crawlPdfPage(url: string): Promise<PageResult> {
  const startTime = Date.now();
  const resp = await fetchWithSsrfProtection(url, {
    headers: { 'User-Agent': 'TheOneCrawl/1.0 (+https://theonecrawl.app/bot)' },
    signal: AbortSignal.timeout(30_000),
  });

  if (!resp.ok) {
    throw new Error(`Failed to fetch PDF: HTTP ${resp.status}`);
  }

  // Streaming size limit for PDFs
  const contentLength = resp.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_PDF_SIZE) {
    throw new Error(`PDF too large (${contentLength} bytes, max ${MAX_PDF_SIZE})`);
  }

  const arrayBuffer = await resp.arrayBuffer();
  if (arrayBuffer.byteLength > MAX_PDF_SIZE) {
    throw new Error(`PDF too large (${arrayBuffer.byteLength} bytes, max ${MAX_PDF_SIZE})`);
  }

  const buffer = Buffer.from(arrayBuffer);
  const pdfResult = await parsePdf(buffer);
  const loadTimeMs = Date.now() - startTime;

  return {
    url,
    title: pdfResult.metadata.title || url.split('/').pop() || 'PDF Document',
    description: pdfResult.metadata.subject || '',
    html: `<pre>${pdfResult.text}</pre>`,
    markdown: pdfResult.text,
    extractedContent: {
      headings: [],
      paragraphs: pdfResult.text.split(/\n\n+/).filter((p) => p.trim().length > 10),
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
    },
    statusCode: resp.status,
    loadTimeMs,
  };
}

// ---------------------------------------------------------------------------
// Auto-scroll to trigger lazy loading
// ---------------------------------------------------------------------------

async function autoScroll(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const maxScrolls = 15;
      let scrollCount = 0;

      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        scrollCount++;

        if (totalHeight >= scrollHeight || scrollCount >= maxScrolls) {
          clearInterval(timer);
          // Scroll back to top
          window.scrollTo(0, 0);
          resolve();
        }
      }, 150);
    });
  });

  // Brief wait for any triggered lazy loads
  await page.waitForTimeout(500);
}

// ---------------------------------------------------------------------------
// URL utilities
// ---------------------------------------------------------------------------

function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Remove trailing slash, hash, and common tracking params
    parsed.hash = '';
    parsed.searchParams.delete('utm_source');
    parsed.searchParams.delete('utm_medium');
    parsed.searchParams.delete('utm_campaign');
    parsed.searchParams.delete('utm_content');
    parsed.searchParams.delete('utm_term');
    parsed.searchParams.delete('ref');
    parsed.searchParams.delete('fbclid');
    parsed.searchParams.delete('gclid');

    let path = parsed.pathname;
    if (path.endsWith('/') && path.length > 1) {
      path = path.slice(0, -1);
    }
    parsed.pathname = path;

    return parsed.href;
  } catch {
    return url;
  }
}

// Default blocked URL patterns
const DEFAULT_BLOCKED = [
  /\/logout/i,
  /\/admin/i,
  /\/wp-admin/i,
  /\/wp-login/i,
  /\/login/i,
  /\/signin/i,
  /\/signup/i,
  /\/register/i,
  /\/cart/i,
  /\/checkout/i,
  /\/account/i,
  /\/dashboard/i,
  /\/api\//i,
  /\.pdf$/i,
  /\.zip$/i,
  /\.exe$/i,
  /\.dmg$/i,
  /\.doc[x]?$/i,
  /\.xls[x]?$/i,
  /\.ppt[x]?$/i,
  /\.(jpg|jpeg|png|gif|svg|webp|ico)$/i,
  /\.(mp3|mp4|wav|avi|mov|wmv)$/i,
  /\/feed\/?$/i,
  /\/rss\/?$/i,
  /\/sitemap\.xml/i,
  /\/robots\.txt/i,
];

/**
 * Convert a user-supplied pattern to a safe glob regex.
 * Escapes all regex metacharacters, only allows * (any chars) and ? (single char).
 * This prevents ReDoS from user-supplied patterns.
 */
function safeGlobToRegex(pattern: string): RegExp {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/\?/g, '.');
  return new RegExp(escaped, 'i');
}

function shouldBlockUrl(url: string, extraPatterns: string[]): boolean {
  // Check default blocked patterns (pre-compiled, trusted)
  for (const pattern of DEFAULT_BLOCKED) {
    if (pattern.test(url)) return true;
  }

  // Check user-specified blocked patterns (safe glob only — no raw regex)
  for (const pattern of extraPatterns) {
    try {
      if (safeGlobToRegex(pattern).test(url)) return true;
    } catch {
      // Skip invalid patterns
    }
  }

  return false;
}

function matchesAnyPattern(url: string, patterns: string[]): boolean {
  for (const pattern of patterns) {
    try {
      if (safeGlobToRegex(pattern).test(url)) return true;
    } catch {
      // Skip invalid patterns
    }
  }
  return false;
}

function deduplicateColors(colors: string[]): string[] {
  const counts = new Map<string, number>();
  for (const c of colors) {
    const normalized = c.toLowerCase().trim();
    counts.set(normalized, (counts.get(normalized) || 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([color]) => color);
}
