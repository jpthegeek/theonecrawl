// ---------------------------------------------------------------------------
// TheOneCrawl — Constants
// ---------------------------------------------------------------------------

export const SERVICE_NAME = 'TheOneCrawl';
export const SERVICE_VERSION = '0.1.0';

// API key prefixes
export const API_KEY_PREFIX_LIVE = 'tc_live_';
export const API_KEY_PREFIX_TEST = 'tc_test_';

// Session cookie
export const SESSION_COOKIE_NAME = 'theonecrawl_session';
export const SESSION_COOKIE_DOMAIN = '.theonecrawl.app';
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

// Webhook signature header
export const WEBHOOK_SIGNATURE_HEADER = 'X-TheOneCrawl-Signature';

// Rate limiting defaults by plan
export const PLAN_RATE_LIMITS: Record<string, { requestsPerMin: number; concurrentCrawls: number }> = {
  free: { requestsPerMin: 10, concurrentCrawls: 1 },
  hobby: { requestsPerMin: 20, concurrentCrawls: 3 },
  standard: { requestsPerMin: 100, concurrentCrawls: 10 },
  growth: { requestsPerMin: 500, concurrentCrawls: 50 },
  enterprise: { requestsPerMin: 2000, concurrentCrawls: 200 },
};

// Credit allocations by plan (per month)
export const PLAN_CREDITS: Record<string, number> = {
  free: 500,
  hobby: 3_000,
  standard: 50_000,
  growth: 250_000,
  enterprise: 1_000_000,
};

// Credit costs per operation
export const CREDIT_COSTS = {
  scrape: 1,
  crawl_page: 1,
  map: 1,
  cms_blocks: 1, // extra cost for CMS block conversion
  ai_extract: 5,
  screenshot: 0, // included free
} as const;

// Stripe price IDs (set in Stripe dashboard)
export const STRIPE_PRICE_IDS: Record<string, string> = {
  hobby: process.env['STRIPE_PRICE_HOBBY'] || 'price_hobby',
  standard: process.env['STRIPE_PRICE_STANDARD'] || 'price_standard',
  growth: process.env['STRIPE_PRICE_GROWTH'] || 'price_growth',
  enterprise: process.env['STRIPE_PRICE_ENTERPRISE'] || 'price_enterprise',
};

// Reverse map: Stripe price ID → plan name
export const PRICE_TO_PLAN: Record<string, string> = Object.fromEntries(
  Object.entries(STRIPE_PRICE_IDS).map(([plan, priceId]) => [priceId, plan]),
);

// Domains
export const API_DOMAIN = 'api.theonecrawl.app';
export const APP_DOMAIN = 'app.theonecrawl.app';
export const ROOT_DOMAIN = 'theonecrawl.app';

// Abuse detection thresholds (runtime-updatable via Redis abuse:config)
export const DEFAULT_ABUSE_THRESHOLDS = {
  credential_stuffing: { count: 20, windowSeconds: 3600, weight: 30 },
  velocity_spike: { multiplier: 5, windowSeconds: 3600, weight: 15 },
  credit_burn: { percentThreshold: 50, windowSeconds: 3600, weight: 20 },
  coordinated_targeting: { count: 5, windowSeconds: 3600, weight: 25 },
  webhook_flood: { count: 100, windowSeconds: 3600, weight: 35 },
  signup_abuse: { count: 3, windowSeconds: 86400, weight: 25 },
  key_compromise: { count: 10, windowSeconds: 3600, weight: 20 },
} as const;

export const ABUSE_SCORE_THRESHOLDS = {
  warned: 30,
  throttled: 60,
  suspended: 80,
  banned: 100,
} as const;

export const ABUSE_SCORE_DECAY_PER_HOUR = 5;
