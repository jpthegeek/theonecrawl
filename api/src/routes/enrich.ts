// ---------------------------------------------------------------------------
// TheOneCrawl — /v1/enrich/company (company intelligence from domain)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware, getAuth } from '../auth/middleware.js';
import { consumeCredits, checkCredits, recordUsageEvent, ensureHydrated, refundCredits } from '../billing/credits.js';
import { CREDIT_COSTS } from '../shared/constants.js';
import { crawlWebsite } from '../engine/crawler.js';
import { toMarkdown } from '../engine/markdown-converter.js';
import { validateUrlNotPrivate } from '../shared/ssrf.js';
import { getGateway, CLAUDE_MODEL } from '../shared/anthropic.js';
import { logger } from '../shared/logger.js';
import type { CompanyIntelligence } from '../engine/types.js';

const app = new Hono();

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const enrichCompanySchema = z.object({
  domain: z.string()
    .max(253)
    .transform((d) => d.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, ''))
    .refine(
      (d) => /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/.test(d),
      'Must be a valid domain (e.g. example.com)',
    ),
  /** If true, use Claude to fill gaps and normalize extracted data (costs additional credits) */
  includeAiEnrichment: z.boolean().optional().default(false),
});

// ---------------------------------------------------------------------------
// POST /v1/enrich/company
// ---------------------------------------------------------------------------

app.post('/company', authMiddleware, async (c) => {
  const auth = getAuth(c);

  const body = await c.req.json().catch(() => null);
  if (!body) {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const parsed = enrichCompanySchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { domain, includeAiEnrichment } = parsed.data;
  const homeUrl = `https://${domain}`;

  // SSRF check
  const ssrfCheck = await validateUrlNotPrivate(homeUrl);
  if (!ssrfCheck.valid) {
    return c.json({ success: false, error: ssrfCheck.error ?? 'Cannot enrich this domain' }, 400);
  }

  // Credit check
  await ensureHydrated(auth.accountId);
  const credits = checkCredits(auth.accountId);
  const baseCost = CREDIT_COSTS.enrich_company;
  const aiCost = includeAiEnrichment ? CREDIT_COSTS.enrich_company_ai : 0;
  const totalCost = baseCost + aiCost;

  if (credits.remaining < baseCost) {
    return c.json({ success: false, error: 'Insufficient credits' }, 402);
  }

  // Consume base credits before crawl
  const consumed = consumeCredits(auth.accountId, baseCost);
  if (consumed < baseCost) {
    return c.json({ success: false, error: 'Insufficient credits' }, 402);
  }

  let creditsUsed = consumed;

  try {
    // Crawl homepage + try /about page (2 pages max, depth 0 to avoid wandering)
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
      refundCredits(auth.accountId, consumed);
      return c.json({ success: false, error: 'Failed to crawl domain' }, 500);
    }

    // Build company intelligence from extracted content
    const allExtracted = pages.flatMap((p) => p.extractedContent ? [p.extractedContent] : []);
    const primaryExtracted = homePage.extractedContent;

    // Aggregate key people from all pages (look for team/about patterns)
    const keyPeople: CompanyIntelligence['keyPeople'] = [];
    for (const ec of allExtracted) {
      // Extract people from testimonials (often include title/company)
      for (const testimonial of ec.testimonials) {
        if (testimonial.author && testimonial.author !== 'Anonymous' && testimonial.title) {
          const existing = keyPeople.find((p) => p.name === testimonial.author);
          if (!existing) {
            keyPeople.push({ name: testimonial.author, title: testimonial.title });
          }
        }
      }
    }

    // Aggregate products from all pages
    const products: string[] = [];
    for (const ec of allExtracted) {
      for (const plan of ec.pricingPlans) {
        if (plan.name && !products.includes(plan.name)) {
          products.push(plan.name);
        }
      }
    }

    // Deduplicate contacts across pages
    const contactSet = new Set<string>();
    const deduplicatedContacts = allExtracted
      .flatMap((ec) => ec.contactInfo)
      .filter((c) => {
        const key = `${c.type}:${c.value}`;
        if (contactSet.has(key)) return false;
        contactSet.add(key);
        return true;
      });

    // Deduplicate social links across pages
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

    // Optional AI enrichment
    if (includeAiEnrichment) {
      const aiCredits = checkCredits(auth.accountId);
      if (aiCredits.remaining >= aiCost) {
        const aiConsumed = consumeCredits(auth.accountId, aiCost);
        if (aiConsumed >= aiCost) {
          creditsUsed += aiConsumed;
          const gateway = getGateway();
          if (gateway) {
            try {
              const pageMarkdown = pages
                .map((p) => toMarkdown(p.extractedContent, { onlyMainContent: true }))
                .join('\n\n---\n\n')
                .slice(0, 30_000);

              const aiResponse = await gateway.chat({
                tenantId: auth.accountId,
                feature: 'enrich-company',
                provider: 'anthropic',
                system: `You are a company intelligence analyst. Given website content, extract and normalize company information. Return valid JSON with these optional fields:
{
  "name": "company name",
  "description": "1-2 sentence company description",
  "industry": "primary industry (e.g. IT Services, Healthcare, Finance)",
  "employeeCount": "estimated range e.g. 10-50, 50-200, 200-500, 500+",
  "founded": "founding year if mentioned",
  "headquarters": "city, state/country if mentioned",
  "aiSummary": "2-3 sentence summary of what the company does, who they serve, and their value proposition"
}
Only include fields you are confident about. Return null for unknown fields.`,
                messages: [{
                  role: 'user',
                  content: `Domain: ${domain}\n\nWebsite content:\n${pageMarkdown}`,
                }],
                model: CLAUDE_MODEL,
                maxTokens: 1024,
              });

              try {
                const raw = aiResponse.content;
                const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/) ?? [null, raw];
                const aiData = JSON.parse(jsonMatch[1]?.trim() ?? raw) as Partial<CompanyIntelligence>;

                // Merge AI data — AI fills gaps, doesn't overwrite existing values
                if (!intelligence.name && aiData.name) intelligence.name = aiData.name;
                if (!intelligence.description && aiData.description) intelligence.description = aiData.description;
                if (aiData.industry) intelligence.industry = aiData.industry;
                if (aiData.employeeCount) intelligence.employeeCount = aiData.employeeCount;
                if (aiData.founded) intelligence.founded = aiData.founded;
                if (aiData.headquarters) intelligence.headquarters = aiData.headquarters;
                if (aiData.aiSummary) intelligence.aiSummary = aiData.aiSummary;
              } catch {
                intelligence.aiSummary = aiResponse.content.slice(0, 500);
              }
            } catch (err) {
              // Refund AI credits on failure
              refundCredits(auth.accountId, aiCost);
              creditsUsed -= aiConsumed;
              logger.error('Company AI enrichment failed', {
                domain,
                error: err instanceof Error ? err.message : String(err),
              });
            }
          } else {
            // Gateway not configured — refund
            refundCredits(auth.accountId, aiConsumed);
            creditsUsed -= aiConsumed;
          }
        }
      }
    }

    recordUsageEvent(auth.accountId, 'enrich', creditsUsed, domain);

    return c.json({
      success: true,
      data: intelligence,
      creditsUsed,
    });

  } catch (err) {
    refundCredits(auth.accountId, consumed);
    logger.error('Company enrichment failed', {
      domain,
      error: err instanceof Error ? err.message : String(err),
    });
    return c.json({ success: false, error: 'Enrichment failed' }, 500);
  }
});

export { app as enrichRoutes };
