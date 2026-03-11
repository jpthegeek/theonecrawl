// ---------------------------------------------------------------------------
// TheOneCrawl — Core types
// ---------------------------------------------------------------------------

import type { CmsBlock, WebsiteTheme } from './cms-types.js';
import type { BrowserAction, ActionResult } from './actions.js';

// ---------------------------------------------------------------------------
// Page type detection
// ---------------------------------------------------------------------------

export type PageType =
  | 'homepage'
  | 'product_page'
  | 'pricing_page'
  | 'blog_post'
  | 'documentation'
  | 'job_posting'
  | 'press_release'
  | 'contact_page'
  | 'about_page'
  | 'landing_page'
  | 'news_article'
  | 'unknown';

// Re-export CMS types for consumers
export type { CmsBlock, WebsiteTheme };
export type { BrowserAction, ActionResult };

// ---------------------------------------------------------------------------
// Crawl job lifecycle
// ---------------------------------------------------------------------------

export type CrawlJobStatus =
  | 'queued'
  | 'crawling'
  | 'extracting'
  | 'converting'
  | 'complete'
  | 'failed';

export interface CrawlJob {
  id: string;
  accountId: string;
  url: string;
  status: CrawlJobStatus;
  options: CrawlOptions;
  result?: CrawlResult;
  error?: string;
  progress?: CrawlProgress;
  webhookUrl?: string;
  webhookSecret?: string;
  /** If true, credits were already consumed at enqueue time (batch jobs) */
  creditsPrepaid?: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface CrawlProgress {
  pagesQueued: number;
  pagesCompleted: number;
  pagesFailed: number;
  currentUrl?: string;
}

// ---------------------------------------------------------------------------
// Crawl options
// ---------------------------------------------------------------------------

export interface CrawlOptions {
  /** How many pages to crawl (1 = single page) */
  maxPages: number;
  /** Link follow depth from the start URL */
  maxDepth: number;
  /** Download and optimize images */
  extractMedia: boolean;
  /** Convert extracted content to CMS blocks */
  convertToBlocks: boolean;
  /** Use Playwright for JS-heavy sites (slower, more accurate) */
  waitForJs: boolean;
  /** Viewport size for screenshots and rendering */
  viewport: { width: number; height: number };
  /** Per-page timeout in milliseconds */
  timeout: number;
  /** Respect robots.txt disallow rules */
  respectRobotsTxt: boolean;
  /** Custom user agent string */
  userAgent: string;
  /** Allowed URL patterns (glob-style). Empty = allow all under same origin. */
  allowedPatterns?: string[];
  /** Blocked URL patterns (glob-style). Always blocks logout, admin, etc. */
  blockedPatterns?: string[];
  /** Return only main content (strip boilerplate) */
  onlyMainContent?: boolean;
  /** Output formats */
  formats?: ScrapeFormat[];
  /** Wait for timeout (ms) or CSS selector after page load */
  waitFor?: number | string;
  /** HTML tags to include */
  includeTags?: string[];
  /** HTML tags to exclude */
  excludeTags?: string[];
  /** Browser actions to execute after page load */
  actions?: BrowserAction[];
  /** Custom HTTP headers to send with the request */
  headers?: Record<string, string>;
  /** Emulate mobile device (390x844 viewport + mobile UA) */
  mobile?: boolean;
}

export type ScrapeFormat =
  | 'markdown'
  | 'html'
  | 'rawHtml'
  | 'screenshot'
  | 'links'
  | 'extract'
  | 'cms_blocks';

export const DEFAULT_CRAWL_OPTIONS: CrawlOptions = {
  maxPages: 1,
  maxDepth: 0,
  extractMedia: true,
  convertToBlocks: true,
  waitForJs: true,
  viewport: { width: 1440, height: 900 },
  timeout: 30_000,
  respectRobotsTxt: true,
  userAgent:
    'TheOneCrawl/1.0 (+https://theonecrawl.app/bot; compatible)',
  allowedPatterns: [],
  blockedPatterns: [],
  onlyMainContent: true,
  formats: ['markdown'],
};

// ---------------------------------------------------------------------------
// Crawl results
// ---------------------------------------------------------------------------

export interface CrawlResult {
  pages: PageResult[];
  media: MediaAsset[];
  siteMetadata: SiteMetadata;
  themeSuggestion?: Partial<WebsiteTheme>;
  /** Extracted header block from the crawled site */
  headerBlock?: CmsBlock;
  /** Extracted footer block from the crawled site */
  footerBlock?: CmsBlock;
}

export interface PageResult {
  url: string;
  title: string;
  description: string;
  html: string;
  markdown?: string;
  screenshot?: string;
  extractedContent: ExtractedContent;
  cmsBlocks?: CmsBlock[];
  actionResults?: ActionResult[];
  statusCode: number;
  loadTimeMs: number;
}

// ---------------------------------------------------------------------------
// Extracted content — structured data pulled from HTML
// ---------------------------------------------------------------------------

export interface ExtractedContent {
  headings: ExtractedHeading[];
  paragraphs: string[];
  images: ExtractedImage[];
  links: ExtractedLink[];
  navigation: ExtractedNavItem[];
  forms: ExtractedForm[];
  socialLinks: ExtractedSocialLink[];
  contactInfo: ExtractedContact[];
  colorPalette: string[];
  fonts: string[];
  sections: ExtractedSection[];
  lists: ExtractedList[];
  tables: ExtractedTable[];
  videos: ExtractedVideo[];
  testimonials: ExtractedTestimonial[];
  faqs: ExtractedFaq[];
  pricingPlans: ExtractedPricingPlan[];
  stats: ExtractedStat[];
}

export interface ExtractedHeading {
  level: number;
  text: string;
  id?: string;
}

export interface ExtractedImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  isBackground?: boolean;
  isLogo?: boolean;
  isHero?: boolean;
}

export interface ExtractedLink {
  text: string;
  href: string;
  isExternal: boolean;
  rel?: string;
}

export interface ExtractedNavItem {
  label: string;
  url: string;
  children?: ExtractedNavItem[];
}

export interface ExtractedForm {
  action: string;
  method: string;
  fields: ExtractedFormField[];
}

export interface ExtractedFormField {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface ExtractedSocialLink {
  platform: string;
  url: string;
}

export interface ExtractedContact {
  type: 'email' | 'phone' | 'address' | 'hours';
  value: string;
}

export interface ExtractedSection {
  tag: string;
  id?: string;
  className?: string;
  headings: ExtractedHeading[];
  paragraphs: string[];
  images: ExtractedImage[];
  links: ExtractedLink[];
  order: number;
  isHero: boolean;
  isFooter: boolean;
  isHeader: boolean;
}

export interface ExtractedList {
  type: 'ordered' | 'unordered';
  items: string[];
}

export interface ExtractedTable {
  headers: string[];
  rows: string[][];
}

export interface ExtractedVideo {
  src: string;
  type: 'youtube' | 'vimeo' | 'custom';
  poster?: string;
}

export interface ExtractedTestimonial {
  quote: string;
  author: string;
  title?: string;
  avatar?: string;
  company?: string;
  rating?: number;
}

export interface ExtractedFaq {
  question: string;
  answer: string;
}

export interface ExtractedPricingPlan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  cta?: string;
  highlighted: boolean;
}

export interface ExtractedStat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

// ---------------------------------------------------------------------------
// Media assets
// ---------------------------------------------------------------------------

export interface MediaAsset {
  originalUrl: string;
  localPath: string;
  mimeType: string;
  width?: number;
  height?: number;
  fileSize: number;
  optimized: boolean;
  hash: string;
}

// ---------------------------------------------------------------------------
// Site metadata
// ---------------------------------------------------------------------------

export interface SiteMetadata {
  title: string;
  description: string;
  favicon: string;
  ogImage: string;
  colorPalette: string[];
  primaryFont: string;
  secondaryFont: string;
  technology: string[];
  language: string;
  generator?: string;
}

// ---------------------------------------------------------------------------
// Plans & Credits
// ---------------------------------------------------------------------------

export type CrawlPlan = 'free' | 'hobby' | 'standard' | 'growth' | 'enterprise';

export interface CrawlCredits {
  accountId: string;
  total: number;
  used: number;
  remaining: number;
  resetDate: string;
  plan: CrawlPlan;
}

// ---------------------------------------------------------------------------
// Firecrawl-compatible API types
// ---------------------------------------------------------------------------

export interface ScrapeRequest {
  url: string;
  formats?: ScrapeFormat[];
  onlyMainContent?: boolean;
  includeTags?: string[];
  excludeTags?: string[];
  waitFor?: number;
  timeout?: number;
  actions?: unknown[];
  extract?: {
    schema?: Record<string, unknown>;
    prompt?: string;
  };
}

export interface ScrapeResponse {
  success: boolean;
  data: {
    markdown?: string;
    html?: string;
    rawHtml?: string;
    screenshot?: string;
    links?: ExtractedLink[];
    metadata: {
      title: string;
      description: string;
      language: string;
      ogImage?: string;
      favicon?: string;
      statusCode: number;
      [key: string]: unknown;
    };
    cms_blocks?: CmsBlock[];
    designSystem?: Partial<WebsiteTheme>;
    actions?: ActionResult[];
    extract?: unknown;
  };
}

export interface CrawlRequest {
  url: string;
  limit?: number;
  maxDepth?: number;
  includePaths?: string[];
  excludePaths?: string[];
  scrapeOptions?: Partial<ScrapeRequest>;
  webhook?: string;
  allowBackwardLinks?: boolean;
  ignoreSitemap?: boolean;
}

export interface CrawlResponse {
  success: boolean;
  id: string;
  url: string;
}

export interface CrawlStatusResponse {
  success: boolean;
  status: 'scraping' | 'completed' | 'failed' | 'cancelled';
  total: number;
  completed: number;
  creditsUsed: number;
  data: Array<{
    markdown?: string;
    html?: string;
    metadata: {
      title: string;
      description: string;
      sourceURL: string;
      statusCode: number;
      [key: string]: unknown;
    };
    links?: ExtractedLink[];
    cms_blocks?: CmsBlock[];
  }>;
  next?: string;
}

export interface MapRequest {
  url: string;
  search?: string;
  limit?: number;
  ignoreSitemap?: boolean;
}

export interface MapResponse {
  success: boolean;
  links: string[];
}

// ---------------------------------------------------------------------------
// API response types
// ---------------------------------------------------------------------------

export interface CrawlBlocksResponse {
  jobId: string;
  url: string;
  blocks: CmsBlock[];
  themeSuggestion?: Partial<WebsiteTheme>;
  headerBlock?: CmsBlock;
  footerBlock?: CmsBlock;
}

// ---------------------------------------------------------------------------
// Web Monitors — change detection & scheduled crawls
// ---------------------------------------------------------------------------

export type MonitorFrequency = 'hourly' | 'daily' | 'weekly';
export type MonitorChangeType = 'any_change' | 'significant_change' | 'keyword_alert';
export type MonitorStatus = 'active' | 'paused' | 'error';

export interface Monitor {
  id: string;
  accountId: string;
  url: string;
  name?: string;
  frequency: MonitorFrequency;
  changeType: MonitorChangeType;
  /** Keywords to watch for (required when changeType = 'keyword_alert') */
  keywords?: string[];
  webhookUrl?: string;
  webhookSecret?: string;
  status: MonitorStatus;
  /** ISO timestamp of the next scheduled check */
  nextCheckAt: string;
  lastCheckedAt?: string;
  lastChangedAt?: string;
  /** SHA-256 hash of the last markdown content */
  lastContentHash?: string;
  /** Last known markdown content (capped at 50 KB) */
  lastMarkdown?: string;
  /** Number of consecutive errors before pausing */
  errorCount: number;
  /** Last error message */
  lastError?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonitorCheck {
  id: string;
  monitorId: string;
  accountId: string;
  type: 'monitor_check';
  checkedAt: string;
  contentHash: string;
  changed: boolean;
  /** What kind of change was detected */
  changeDetected?: 'content_change' | 'keyword_appeared' | 'keyword_disappeared' | 'significant_change';
  /** Keywords that appeared (keyword_alert monitors) */
  keywordsMatched?: string[];
  /** Brief diff summary (line count delta) */
  diffSummary?: string;
  creditsUsed: number;
}

// ---------------------------------------------------------------------------
// Company Intelligence — structured data from company domain enrichment
// ---------------------------------------------------------------------------

export interface CompanyIntelligence {
  domain: string;
  name?: string;
  description?: string;
  industry?: string;
  /** Estimated employee count range, e.g. "50-200" */
  employeeCount?: string;
  founded?: string;
  headquarters?: string;
  /** Detected technology stack */
  techStack: string[];
  socialLinks: ExtractedSocialLink[];
  contacts: ExtractedContact[];
  /** Key people extracted from about/team pages */
  keyPeople?: Array<{ name: string; title?: string; linkedIn?: string }>;
  /** Main products or services */
  products?: string[];
  pricingPlans?: ExtractedPricingPlan[];
  logoUrl?: string;
  faviconUrl?: string;
  ogImage?: string;
  language?: string;
  /** AI-generated enrichment notes (when includeAiEnrichment: true) */
  aiSummary?: string;
}
