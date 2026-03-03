// ---------------------------------------------------------------------------
// Request types
// ---------------------------------------------------------------------------

export type ScrapeFormat =
  | 'markdown'
  | 'html'
  | 'rawHtml'
  | 'screenshot'
  | 'links'
  | 'extract'
  | 'cms_blocks';

export type BrowserActionType =
  | 'wait'
  | 'click'
  | 'write'
  | 'press'
  | 'scroll'
  | 'screenshot'
  | 'executeJavascript'
  | 'scrape';

export interface BrowserAction {
  type: BrowserActionType;
  selector?: string;
  milliseconds?: number;
  text?: string;
  key?: string;
  direction?: 'up' | 'down';
  amount?: number;
  script?: string;
}

export interface ActionResult {
  type: BrowserActionType;
  success: boolean;
  screenshot?: string;
  html?: string;
  result?: unknown;
  error?: string;
}

export interface ScrapeParams {
  formats?: ScrapeFormat[];
  onlyMainContent?: boolean;
  includeTags?: string[];
  excludeTags?: string[];
  waitFor?: number | string;
  timeout?: number;
  actions?: BrowserAction[];
  headers?: Record<string, string>;
  mobile?: boolean;
  extract?: {
    schema?: Record<string, unknown>;
    prompt?: string;
  };
}

export interface CrawlParams {
  limit?: number;
  maxDepth?: number;
  includePaths?: string[];
  excludePaths?: string[];
  scrapeOptions?: ScrapeParams;
  webhook?: string;
  webhookSecret?: string;
  allowBackwardLinks?: boolean;
  ignoreSitemap?: boolean;
}

export interface MapParams {
  search?: string;
  limit?: number;
  ignoreSitemap?: boolean;
}

export interface ExtractParams {
  urls: string[];
  prompt?: string;
  schema?: Record<string, unknown>;
  enableWebSearch?: boolean;
}

export interface BatchScrapeParams {
  urls: string[];
  formats?: ScrapeFormat[];
  onlyMainContent?: boolean;
  includeTags?: string[];
  excludeTags?: string[];
  webhook?: string;
  webhookSecret?: string;
}

export interface BatchScrapeResponse {
  success: boolean;
  id: string;
  url: string;
}

export interface BatchScrapeStatusResponse {
  success: boolean;
  status: 'scraping' | 'completed' | 'failed';
  total: number;
  completed: number;
  creditsUsed: number;
  data: Array<{
    url: string;
    markdown?: string;
    html?: string;
    metadata: PageMetadata;
    links?: LinkData[];
  }>;
  expiresAt?: string;
}

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export interface PageMetadata {
  title: string;
  description: string;
  language: string;
  ogImage?: string;
  favicon?: string;
  statusCode: number;
  sourceURL?: string;
  [key: string]: unknown;
}

export interface LinkData {
  text: string;
  href: string;
  isExternal: boolean;
  rel?: string;
}

export interface ScrapeResponse {
  success: boolean;
  data: {
    markdown?: string;
    html?: string;
    rawHtml?: string;
    screenshot?: string;
    links?: LinkData[];
    metadata: PageMetadata;
    cms_blocks?: unknown[];
    designSystem?: unknown;
    actions?: ActionResult[];
    extract?: unknown;
  };
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
    metadata: PageMetadata;
    links?: LinkData[];
    cms_blocks?: unknown[];
  }>;
  next?: string;
}

export interface MapResponse {
  success: boolean;
  links: string[];
}

export interface ExtractResponse {
  success: boolean;
  data: unknown;
  creditsUsed?: number;
}

export interface CmsBlocksResponse {
  success: boolean;
  data: {
    jobId: string;
    url: string;
    blocks: unknown[];
    themeSuggestion?: unknown;
    headerBlock?: unknown;
    footerBlock?: unknown;
    pageIndex: number;
    totalPages: number;
  };
}

export interface DesignSystemResponse {
  success: boolean;
  data: {
    siteMetadata: unknown;
    themeSuggestion?: unknown;
    colorPalette: unknown[];
    fonts: {
      primary: string;
      secondary: string;
    };
    technology: string[];
  };
}

// ---------------------------------------------------------------------------
// Client config
// ---------------------------------------------------------------------------

export interface TheOneCrawlConfig {
  apiKey?: string;
  apiUrl?: string;
}
