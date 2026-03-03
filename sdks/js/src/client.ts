import { VERSION } from './version.js';
import {
  TheOneCrawlError,
  AuthenticationError,
  RateLimitError,
  InsufficientCreditsError,
} from './errors.js';
import type {
  TheOneCrawlConfig,
  ScrapeParams,
  ScrapeResponse,
  CrawlParams,
  CrawlResponse,
  CrawlStatusResponse,
  MapParams,
  MapResponse,
  ExtractParams,
  ExtractResponse,
  CmsBlocksResponse,
  DesignSystemResponse,
} from './types.js';

const DEFAULT_API_URL = 'https://api.theonecrawl.app';
const POLL_INTERVAL = 2000;
const MAX_POLL_TIME = 300_000; // 5 minutes

export class TheOneCrawl {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(config?: TheOneCrawlConfig) {
    const key = config?.apiKey ?? process.env['THEONECRAWL_API_KEY'];
    if (!key) {
      throw new AuthenticationError(
        'API key is required. Pass { apiKey } or set THEONECRAWL_API_KEY environment variable.',
      );
    }
    this.apiKey = key;
    this.apiUrl = (config?.apiUrl ?? DEFAULT_API_URL).replace(/\/+$/, '');
  }

  // ---------------------------------------------------------------------------
  // Scrape
  // ---------------------------------------------------------------------------

  async scrapeUrl(url: string, params?: ScrapeParams): Promise<ScrapeResponse> {
    return this.request<ScrapeResponse>('/v1/scrape', {
      method: 'POST',
      body: { url, ...params },
    });
  }

  // ---------------------------------------------------------------------------
  // Crawl
  // ---------------------------------------------------------------------------

  /** Start a crawl and poll until complete. */
  async crawlUrl(url: string, params?: CrawlParams): Promise<CrawlStatusResponse> {
    const { id } = await this.startCrawl(url, params);
    return this.pollCrawl(id);
  }

  /** Start a crawl and return the job ID without polling. */
  async startCrawl(url: string, params?: CrawlParams): Promise<CrawlResponse> {
    return this.request<CrawlResponse>('/v1/crawl', {
      method: 'POST',
      body: { url, ...params },
    });
  }

  async getCrawlStatus(id: string): Promise<CrawlStatusResponse> {
    return this.request<CrawlStatusResponse>(`/v1/crawl/${encodeURIComponent(id)}`);
  }

  async cancelCrawl(id: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/v1/crawl/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  }

  // ---------------------------------------------------------------------------
  // Map
  // ---------------------------------------------------------------------------

  async mapUrl(url: string, params?: MapParams): Promise<MapResponse> {
    return this.request<MapResponse>('/v1/map', {
      method: 'POST',
      body: { url, ...params },
    });
  }

  // ---------------------------------------------------------------------------
  // Extract (AI)
  // ---------------------------------------------------------------------------

  async extract(params: ExtractParams): Promise<ExtractResponse> {
    return this.request<ExtractResponse>('/v1/extract', {
      method: 'POST',
      body: params,
    });
  }

  // ---------------------------------------------------------------------------
  // TheOneCrawl exclusives
  // ---------------------------------------------------------------------------

  async getCmsBlocks(crawlId: string, page?: number): Promise<CmsBlocksResponse> {
    const query = page != null ? `?page=${page}` : '';
    return this.request<CmsBlocksResponse>(
      `/v1/crawl/${encodeURIComponent(crawlId)}/cms-blocks${query}`,
    );
  }

  async getDesignSystem(crawlId: string): Promise<DesignSystemResponse> {
    return this.request<DesignSystemResponse>(
      `/v1/crawl/${encodeURIComponent(crawlId)}/design-system`,
    );
  }

  // ---------------------------------------------------------------------------
  // Internal
  // ---------------------------------------------------------------------------

  private async request<T>(path: string, options?: { method?: string; body?: unknown }): Promise<T> {
    const method = options?.method ?? 'GET';
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      'User-Agent': `@theonecrawl/js/${VERSION}`,
    };

    let bodyStr: string | undefined;
    if (options?.body) {
      headers['Content-Type'] = 'application/json';
      bodyStr = JSON.stringify(options.body);
    }

    const res = await fetch(`${this.apiUrl}${path}`, {
      method,
      headers,
      body: bodyStr,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      let parsed: unknown;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text;
      }

      if (res.status === 401) throw new AuthenticationError();
      if (res.status === 402) throw new InsufficientCreditsError();
      if (res.status === 429) {
        const retryAfter = parseInt(res.headers.get('Retry-After') ?? '', 10) || undefined;
        throw new RateLimitError(undefined, retryAfter);
      }

      const msg =
        typeof parsed === 'object' && parsed !== null && 'error' in parsed
          ? String((parsed as { error: unknown }).error)
          : `Request failed with status ${res.status}`;
      throw new TheOneCrawlError(msg, res.status, parsed);
    }

    return (await res.json()) as T;
  }

  private async pollCrawl(id: string): Promise<CrawlStatusResponse> {
    const start = Date.now();
    while (Date.now() - start < MAX_POLL_TIME) {
      const status = await this.getCrawlStatus(id);
      if (status.status === 'completed' || status.status === 'failed' || status.status === 'cancelled') {
        return status;
      }
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
    }
    throw new TheOneCrawlError('Crawl polling timed out after 5 minutes', 408);
  }
}
