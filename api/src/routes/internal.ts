// ---------------------------------------------------------------------------
// TheOneCrawl — /v1/internal/* (inter-product internal API)
//
// Internal versions of scrape/enrich/map for other The One Stack products.
// No credits deducted — internal calls are free.
// Auth via X-Integration-Key header (timingSafeEqual).
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { internalMiddleware, getInternalAuth } from '../auth/internal-middleware.js';
import { crawlWebsite } from '../engine/crawler.js';
import { toMarkdown } from '../engine/markdown-converter.js';
import { validateUrlNotPrivate } from '../shared/ssrf.js';
import { logger } from '../shared/logger.js';
import { browserActionSchema } from '../engine/actions.js';
import type { ScrapeResponse, ScrapeFormat, CompanyIntelligence } from '../engine/types.js';

export const internalRoutes = new Hono();

// ---------------------------------------------------------------------------
// Shared header value schema (same as scrape route)
// ---------------------------------------------------------------------------

const headerValueSchema = z.string().max(4096).refine(
  (v) => !/[\r\n]/.test(v),
  'Header value must not contain newlines',
);

// ---------------------------------------------------------------------------
// POST /v1/internal/scrape
// Same body as /v1/scrape — no credit deduction.
// ---------------------------------------------------------------------------

const internalScrapeSchema = z.object({
  url: z.string().url('Must be a valid URL').max(2048),
  formats: z.array(z.enum(['markdown', 'html', 'rawHtml', 'screenshot', 'links', 'extract', 'cms_blocks']))
    .optional()
    .default(['markdown']),
  onlyMainContent: z.boolean().optional().default(true),
  includeTags: z.array(z.string().max(200)).max(20).optional(),
  excludeTags: z.array(z.string().max(200)).max(20).optional(),
  waitFor: z.union([
    z.number().int().min(0).max(30000),
    z.string().max(200),
  ]).optional(),
  timeout: z.number().int().min(5000).max(60000).optional().default(30000),
  actions: z.array(browserActionSchema).max(20).optional(),
  headers: z.record(z.string().max(200), headerValueSchema)
    .optional()
    .refine(
      (obj) => !obj || Object.keys(obj).length <= 20,
      'Maximum 20 headers allowed',
    ),
  mobile: z.boolean().optional(),
});

internalRoutes.post('/scrape', internalMiddleware, async (c) => {
  const internalAuth = getInternalAuth(c);

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = internalScrapeSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { url, formats, onlyMainContent, timeout, waitFor, actions, headers, mobile, includeTags, excludeTags } = parsed.data;

  // SSRF check — internal routes still enforce security
  const ssrfCheck = await validateUrlNotPrivate(url);
  if (!ssrfCheck.valid) {
    return c.json({ success: false, error: ssrfCheck.error ?? 'Cannot scrape this URL' }, 400);
  }

  logger.info('internal.scrape', {
    sourceProduct: internalAuth.sourceProduct,
    sourceAccountId: internalAuth.sourceAccountId,
    url,
    formats,
  });

  try {
    const result = await crawlWebsite(url, {
      maxPages: 1,
      maxDepth: 0,
      extractMedia: false,
      convertToBlocks: formats.includes('cms_blocks'),
      waitForJs: true,
      viewport: { width: 1440, height: 900 },
      timeout,
      respectRobotsTxt: true,
      userAgent: 'TheOneCrawl/1.0 (+https://theonecrawl.app/bot; compatible)',
      onlyMainContent,
      formats: formats as ScrapeFormat[],
      waitFor,
      actions,
      headers,
      mobile,
      includeTags,
      excludeTags,
    });

    const page = result.pages[0];
    if (!page) {
      return c.json({ success: false, error: 'Failed to scrape page' }, 500);
    }

    const data: ScrapeResponse['data'] = {
      metadata: {
        title: page.title,
        description: page.description,
        language: result.siteMetadata.language,
        ogImage: result.siteMetadata.ogImage || undefined,
        favicon: result.siteMetadata.favicon || undefined,
        statusCode: page.statusCode,
        sourceURL: page.url,
      },
    };

    if (formats.includes('markdown')) {
      data.markdown = toMarkdown(page.extractedContent, { onlyMainContent });
    }
    if (formats.includes('html')) {
      data.html = page.html;
    }
    if (formats.includes('rawHtml')) {
      data.rawHtml = page.html;
    }
    if (formats.includes('screenshot') && page.screenshot) {
      data.screenshot = page.screenshot;
    }
    if (formats.includes('links')) {
      data.links = page.extractedContent.links;
    }
    if (formats.includes('cms_blocks') && page.cmsBlocks) {
      data.cms_blocks = page.cmsBlocks;
      data.designSystem = result.themeSuggestion;
    }
    if (page.actionResults && page.actionResults.length > 0) {
      data.actions = page.actionResults;
    }

    return c.json({ success: true, data } satisfies ScrapeResponse);
  } catch (err) {
    logger.error('internal.scrape failed', {
      sourceProduct: internalAuth.sourceProduct,
      sourceAccountId: internalAuth.sourceAccountId,
      error: err instanceof Error ? err.message : String(err),
    });
    return c.json({ success: false, error: 'Scrape failed' }, 500);
  }
});

// ---------------------------------------------------------------------------
// POST /v1/internal/enrich/company
// Same as /v1/enrich/company — no credit deduction.
// Returns CompanyIntelligence.
// ---------------------------------------------------------------------------

const internalEnrichCompanySchema = z.object({
  domain: z.string()
    .max(253)
    .transform((d) => d.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, ''))
    .refine(
      (d) => /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/.test(d),
      'Must be a valid domain (e.g. example.com)',
    ),
});

internalRoutes.post('/enrich/company', internalMiddleware, async (c) => {
  const internalAuth = getInternalAuth(c);

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = internalEnrichCompanySchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { domain } = parsed.data;
  const homeUrl = `https://${domain}`;

  // SSRF check
  const ssrfCheck = await validateUrlNotPrivate(homeUrl);
  if (!ssrfCheck.valid) {
    return c.json({ success: false, error: ssrfCheck.error ?? 'Cannot enrich this domain' }, 400);
  }

  logger.info('internal.enrich.company', {
    sourceProduct: internalAuth.sourceProduct,
    sourceAccountId: internalAuth.sourceAccountId,
    domain,
  });

  try {
    const result = await crawlWebsite(homeUrl, {
      maxPages: 2,
      maxDepth: 1,
      extractMedia: false,
      convertToBlocks: false,
      waitForJs: true,
      viewport: { width: 1440, height: 900 },
      timeout: 30_000,
      respectRobotsTxt: true,
      userAgent: 'TheOneCrawl/1.0 (+https://theonecrawl.app/bot; compatible)',
      onlyMainContent: true,
      formats: ['markdown'],
      allowedPatterns: [
        `*${domain}*`,
        `*${domain}/about*`,
        `*${domain}/team*`,
        `*${domain}/company*`,
      ],
    });

    const { pages, siteMetadata } = result;
    const homePage = pages[0];

    if (!homePage) {
      return c.json({ success: false, error: 'Failed to crawl domain' }, 500);
    }

    const allExtracted = pages.flatMap((p) => p.extractedContent ? [p.extractedContent] : []);
    const primaryExtracted = homePage.extractedContent;

    // Aggregate key people
    const keyPeople: CompanyIntelligence['keyPeople'] = [];
    for (const ec of allExtracted) {
      for (const testimonial of ec.testimonials) {
        if (testimonial.author && testimonial.author !== 'Anonymous' && testimonial.title) {
          const existing = keyPeople.find((p) => p.name === testimonial.author);
          if (!existing) {
            keyPeople.push({ name: testimonial.author, title: testimonial.title });
          }
        }
      }
    }

    // Aggregate products
    const products: string[] = [];
    for (const ec of allExtracted) {
      for (const plan of ec.pricingPlans) {
        if (plan.name && !products.includes(plan.name)) {
          products.push(plan.name);
        }
      }
    }

    // Deduplicate contacts
    const contactSet = new Set<string>();
    const deduplicatedContacts = allExtracted
      .flatMap((ec) => ec.contactInfo)
      .filter((contact) => {
        const key = `${contact.type}:${contact.value}`;
        if (contactSet.has(key)) return false;
        contactSet.add(key);
        return true;
      });

    // Deduplicate social links
    const socialSet = new Set<string>();
    const deduplicatedSocials = allExtracted
      .flatMap((ec) => ec.socialLinks)
      .filter((s) => {
        if (socialSet.has(s.platform)) return false;
        socialSet.add(s.platform);
        return true;
      });

    const intelligence: CompanyIntelligence = {
      domain,
      name: siteMetadata.title || homePage.title || undefined,
      description: siteMetadata.description || homePage.description || undefined,
      techStack: siteMetadata.technology,
      socialLinks: deduplicatedSocials,
      contacts: deduplicatedContacts,
      keyPeople: keyPeople.slice(0, 20),
      products: products.slice(0, 20),
      pricingPlans: primaryExtracted.pricingPlans.slice(0, 6),
      logoUrl: primaryExtracted.images.find((img) => img.isLogo)?.src,
      faviconUrl: siteMetadata.favicon || undefined,
      ogImage: siteMetadata.ogImage || undefined,
      language: siteMetadata.language,
    };

    return c.json({ success: true, data: intelligence });
  } catch (err) {
    logger.error('internal.enrich.company failed', {
      sourceProduct: internalAuth.sourceProduct,
      sourceAccountId: internalAuth.sourceAccountId,
      domain,
      error: err instanceof Error ? err.message : String(err),
    });
    return c.json({ success: false, error: 'Enrichment failed' }, 500);
  }
});

// ---------------------------------------------------------------------------
// POST /v1/internal/map
// Same as /v1/map — no credit deduction.
// ---------------------------------------------------------------------------

const internalMapSchema = z.object({
  url: z.string().url('Must be a valid URL').max(2048),
  search: z.string().max(500).optional(),
  limit: z.number().int().min(1).max(5000).optional().default(100),
  ignoreSitemap: z.boolean().optional().default(false),
});

internalRoutes.post('/map', internalMiddleware, async (c) => {
  const internalAuth = getInternalAuth(c);

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = internalMapSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { url, search, limit } = parsed.data;

  // SSRF check
  const ssrfCheck = await validateUrlNotPrivate(url);
  if (!ssrfCheck.valid) {
    return c.json({ success: false, error: ssrfCheck.error ?? 'Cannot map this URL' }, 400);
  }

  logger.info('internal.map', {
    sourceProduct: internalAuth.sourceProduct,
    sourceAccountId: internalAuth.sourceAccountId,
    url,
    limit,
  });

  try {
    const result = await crawlWebsite(url, {
      maxPages: Math.min(limit, 100),
      maxDepth: 3,
      extractMedia: false,
      convertToBlocks: false,
      waitForJs: true,
      viewport: { width: 1440, height: 900 },
      timeout: 15_000,
      respectRobotsTxt: true,
      userAgent: 'TheOneCrawl/1.0 (+https://theonecrawl.app/bot; compatible)',
    });

    const allLinks = new Set<string>();
    for (const page of result.pages) {
      allLinks.add(page.url);
      for (const link of page.extractedContent.links) {
        if (!link.isExternal) {
          allLinks.add(link.href);
        }
      }
    }

    let links = Array.from(allLinks);

    if (search) {
      const searchLower = search.toLowerCase();
      links = links.filter((link) => link.toLowerCase().includes(searchLower));
    }

    return c.json({ success: true, links: links.slice(0, limit) });
  } catch (err) {
    logger.error('internal.map failed', {
      sourceProduct: internalAuth.sourceProduct,
      sourceAccountId: internalAuth.sourceAccountId,
      error: err instanceof Error ? err.message : String(err),
    });
    return c.json({ success: false, error: 'Map failed' }, 500);
  }
});
