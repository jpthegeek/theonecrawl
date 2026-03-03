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

export interface ScrapeParams {
  formats?: ScrapeFormat[];
  onlyMainContent?: boolean;
  includeTags?: string[];
  excludeTags?: string[];
  waitFor?: number;
  timeout?: number;
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
}

export interface CmsBlocksResponse {
  jobId: string;
  url: string;
  blocks: unknown[];
  themeSuggestion?: unknown;
  headerBlock?: unknown;
  footerBlock?: unknown;
}

export interface DesignSystemResponse {
  jobId: string;
  url: string;
  designSystem: unknown;
}

// ---------------------------------------------------------------------------
// Client config
// ---------------------------------------------------------------------------

export interface TheOneCrawlConfig {
  apiKey?: string;
  apiUrl?: string;
}
