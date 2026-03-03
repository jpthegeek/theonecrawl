# TheOneCrawl Integration Guide

> Everything another app or AI agent session needs to integrate with the TheOneCrawl web crawling platform.

## Quick Start

**Base URL:** `https://api.theonecrawl.app` (production)
**Firecrawl Compatible:** Drop-in replacement — change base URL + API key.

```bash
# Scrape a page
curl -X POST https://api.theonecrawl.app/v1/scrape \
  -H "Authorization: Bearer tc_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","formats":["markdown"]}'
```

---

## Authentication

### API Key (SDKs & server-to-server)

All `/v1/*` API endpoints require a Bearer token:

```
Authorization: Bearer tc_live_<key>
```

Key prefixes:
- `tc_live_` — Production keys (charged against quota)
- `tc_test_` — Test keys (free, rate-limited)

API keys are SHA-256 hashed before storage. The raw key is only shown once at creation time.

### Session Cookie (web dashboard)

Dashboard auth uses HMAC-signed httpOnly cookies on `.theonecrawl.app`. Not relevant for external integrations.

---

## Rate Limits

Response headers on every request:

| Header | Description |
|---|---|
| `X-RateLimit-Limit` | Max requests per minute for your plan |
| `X-RateLimit-Remaining` | Remaining requests in current window |
| `X-RateLimit-Reset` | Seconds until rate limit resets |

When exceeded: HTTP 429 with `{"success":false,"error":"Rate limit exceeded. Please slow down."}`.

| Plan | Requests/min | Concurrent Crawls | Credits/mo |
|---|---|---|---|
| Free | 10 | 1 | 500 |
| Hobby | 20 | 3 | 3,000 |
| Standard | 100 | 10 | 50,000 |
| Growth | 500 | 50 | 250,000 |

---

## API Endpoints

### POST /v1/scrape — Single Page Scrape (synchronous)

Scrapes a single URL and returns the result immediately.

**Request:**
```json
{
  "url": "https://example.com",
  "formats": ["markdown", "html", "links", "screenshot", "cms_blocks"],
  "onlyMainContent": true,
  "includeTags": ["article", "main"],
  "excludeTags": ["nav", "footer"],
  "waitFor": 2000,
  "timeout": 30000
}
```

| Field | Type | Default | Description |
|---|---|---|---|
| `url` | string | **required** | URL to scrape |
| `formats` | string[] | `["markdown"]` | Output formats: `markdown`, `html`, `rawHtml`, `screenshot`, `links`, `cms_blocks` |
| `onlyMainContent` | boolean | `true` | Strip navigation/footer/ads |
| `includeTags` | string[] | `[]` | Only include these HTML tags |
| `excludeTags` | string[] | `[]` | Remove these HTML tags |
| `waitFor` | number | `0` | Wait N ms after page load for JS |
| `timeout` | number | `30000` | Per-page timeout in ms |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "markdown": "# Example Domain\n\nThis domain is for use...",
    "html": "<h1>Example Domain</h1>...",
    "links": [{"text": "More info", "href": "https://iana.org", "isExternal": true}],
    "metadata": {
      "title": "Example Domain",
      "description": "",
      "language": "en",
      "statusCode": 200,
      "ogImage": null,
      "favicon": "/favicon.ico"
    },
    "cms_blocks": [...],
    "designSystem": {...}
  }
}
```

**Credit cost:** 1 credit per scrape.

---

### POST /v1/crawl — Multi-Page Crawl (async)

Starts an asynchronous multi-page crawl. Returns a job ID immediately.

**Request:**
```json
{
  "url": "https://example.com",
  "limit": 50,
  "maxDepth": 3,
  "includePaths": ["/blog/*", "/docs/*"],
  "excludePaths": ["/admin/*"],
  "scrapeOptions": {
    "formats": ["markdown", "cms_blocks"],
    "onlyMainContent": true
  },
  "webhook": "https://your-app.com/webhook/crawl"
}
```

| Field | Type | Default | Description |
|---|---|---|---|
| `url` | string | **required** | Start URL |
| `limit` | number | `10` | Max pages to crawl |
| `maxDepth` | number | `2` | Link follow depth |
| `includePaths` | string[] | `[]` | Glob patterns to include |
| `excludePaths` | string[] | `[]` | Glob patterns to exclude |
| `scrapeOptions` | object | `{}` | Per-page scrape settings |
| `webhook` | string | `null` | URL for progress webhooks |

**Response (201):**
```json
{
  "success": true,
  "id": "crawl_a1b2c3d4e5f6",
  "url": "https://example.com"
}
```

**Credit cost:** 1 credit per page crawled.

---

### GET /v1/crawl/:id — Poll Crawl Status

**Response (200):**
```json
{
  "success": true,
  "status": "scraping",
  "total": 50,
  "completed": 12,
  "creditsUsed": 12,
  "data": [
    {
      "markdown": "# Page Title\n...",
      "metadata": {
        "title": "Page Title",
        "description": "...",
        "sourceURL": "https://example.com/page",
        "statusCode": 200
      }
    }
  ],
  "next": "/v1/crawl/crawl_a1b2c3d4e5f6?cursor=abc123"
}
```

Status values: `scraping`, `completed`, `failed`, `cancelled`.

Pagination: Follow the `next` URL to get more pages.

---

### DELETE /v1/crawl/:id — Cancel Crawl

Returns `{"success":true}` on cancellation.

---

### POST /v1/map — URL Discovery

Discovers all URLs on a site via sitemap + link crawling.

**Request:**
```json
{
  "url": "https://example.com",
  "search": "blog",
  "limit": 500,
  "ignoreSitemap": false
}
```

**Response (200):**
```json
{
  "success": true,
  "links": [
    "https://example.com/",
    "https://example.com/blog/post-1",
    "https://example.com/blog/post-2"
  ]
}
```

**Credit cost:** 1 credit.

---

### POST /v1/extract — AI-Powered Extraction (Claude)

Extracts structured data from web pages using Claude AI.

**Request:**
```json
{
  "urls": ["https://example.com/pricing"],
  "prompt": "Extract all pricing plans with their features and prices",
  "schema": {
    "plans": [
      {
        "name": "string",
        "price": "string",
        "features": ["string"]
      }
    ]
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "plans": [
      {"name": "Free", "price": "$0/mo", "features": ["500 pages", "1 crawl"]}
    ]
  },
  "creditsUsed": 5
}
```

**Credit cost:** 5 credits per URL.

---

### GET /v1/crawl/:id/cms-blocks — CMS Blocks (TheOneCrawl exclusive)

Returns structured CMS blocks from a completed crawl. Not available in Firecrawl.

**Response (200):**
```json
{
  "jobId": "crawl_a1b2c3d4e5f6",
  "url": "https://example.com",
  "blocks": [
    {
      "type": "hero",
      "data": {
        "headline": "Welcome to Example",
        "subheadline": "The best example site",
        "cta": {"text": "Get Started", "url": "/signup"},
        "backgroundImage": "https://example.com/hero.jpg"
      }
    },
    {
      "type": "features_grid",
      "data": {
        "items": [
          {"icon": "zap", "title": "Fast", "description": "Lightning quick"}
        ]
      }
    }
  ],
  "themeSuggestion": {
    "colors": {"primary": "#2563eb", "secondary": "#10b981"},
    "fonts": {"heading": "Inter", "body": "Inter"}
  },
  "headerBlock": {...},
  "footerBlock": {...}
}
```

---

### GET /v1/crawl/:id/design-system — Design System (TheOneCrawl exclusive)

Returns extracted design tokens from a completed crawl.

---

## Webhooks

Configure a webhook URL when starting a crawl to receive real-time notifications.

### Events

| Event | Description |
|---|---|
| `crawl.started` | Crawl has begun processing |
| `crawl.page` | A page has been crawled |
| `crawl.completed` | All pages crawled successfully |
| `crawl.failed` | Crawl encountered a fatal error |
| `scrape.completed` | Single scrape completed |

### Webhook Payload

```json
{
  "event": "crawl.page",
  "data": {
    "jobId": "crawl_a1b2c3d4e5f6",
    "url": "https://example.com/page",
    "completed": 5,
    "total": 50
  },
  "timestamp": "2026-03-03T15:00:00.000Z",
  "idempotencyKey": "crawl.page_1709474400_abc123"
}
```

### Signature Verification

Webhooks are signed with HMAC-SHA256. The signature is in the `X-TheOneCrawl-Signature` header:

```
X-TheOneCrawl-Signature: sha256=<hex_digest>
```

**Verification (Node.js):**
```typescript
import { createHmac } from 'node:crypto';

function verifyWebhook(body: string, signature: string, secret: string): boolean {
  const expected = createHmac('sha256', secret).update(body).digest('hex');
  return signature === `sha256=${expected}`;
}
```

**Verification (Python):**
```python
import hmac, hashlib

def verify_webhook(body: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
    return signature == f"sha256={expected}"
```

---

## SDK Integration

### JavaScript / TypeScript

```bash
npm install @theonecrawl/js
```

```typescript
import { TheOneCrawl } from '@theonecrawl/js';

const client = new TheOneCrawl({ apiKey: 'tc_live_YOUR_KEY' });

// Scrape a single page
const scrape = await client.scrapeUrl('https://example.com', {
  formats: ['markdown', 'cms_blocks'],
});
console.log(scrape.data.markdown);

// Crawl multiple pages (auto-polls until complete)
const crawl = await client.crawlUrl('https://example.com', {
  limit: 20,
  maxDepth: 2,
});
console.log(crawl.data); // Array of page results

// Start a crawl without waiting
const job = await client.startCrawl('https://example.com', { limit: 100 });
console.log(job.id); // Poll manually with client.getCrawlStatus(job.id)

// AI extraction
const extracted = await client.extract({
  urls: ['https://example.com/pricing'],
  prompt: 'Extract pricing plans',
  schema: { plans: [{ name: 'string', price: 'string' }] },
});

// TheOneCrawl exclusives
const blocks = await client.getCmsBlocks(job.id);
const design = await client.getDesignSystem(job.id);
```

**Environment variable:** Set `THEONECRAWL_API_KEY` to avoid passing the key in code.

### Python

```bash
pip install theonecrawl
```

```python
from theonecrawl import TheOneCrawl

client = TheOneCrawl(api_key="tc_live_YOUR_KEY")

# Scrape
result = client.scrape_url("https://example.com", formats=["markdown"])
print(result["data"]["markdown"])

# Crawl (blocks until complete)
result = client.crawl_url("https://example.com", limit=20)

# Async
from theonecrawl import AsyncTheOneCrawl

async_client = AsyncTheOneCrawl(api_key="tc_live_YOUR_KEY")
result = await async_client.scrape_url("https://example.com")
```

### CLI

```bash
npx @theonecrawl/cli scrape https://example.com --format markdown
npx @theonecrawl/cli crawl https://example.com --limit 20 --json
npx @theonecrawl/cli extract https://example.com/pricing --prompt "Get pricing plans"
npx @theonecrawl/cli cms-blocks <crawl-id>
```

### MCP (for AI agents)

Add to your Claude desktop or agent MCP config:

```json
{
  "mcpServers": {
    "theonecrawl": {
      "command": "npx",
      "args": ["-y", "@theonecrawl/mcp"],
      "env": {
        "THEONECRAWL_API_KEY": "tc_live_YOUR_KEY"
      }
    }
  }
}
```

7 tools available: `theonecrawl_scrape`, `theonecrawl_crawl`, `theonecrawl_crawl_status`, `theonecrawl_map`, `theonecrawl_extract`, `theonecrawl_cms_blocks`, `theonecrawl_design_system`.

---

## Error Handling

All errors follow a consistent shape:

```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

| HTTP Status | Meaning |
|---|---|
| 400 | Invalid request (bad URL, missing fields, invalid schema) |
| 401 | Missing or invalid API key |
| 402 | Insufficient credits |
| 404 | Resource not found (crawl job doesn't exist) |
| 409 | Conflict (e.g., email already registered) |
| 429 | Rate limit exceeded |
| 500 | Internal server error |
| 501 | Feature not implemented |
| 503 | Service unavailable (database or AI not configured) |

---

## Credit System

Every API call consumes credits. Credits reset monthly based on plan.

| Operation | Credits |
|---|---|
| `scrape` | 1 per page |
| `crawl` | 1 per page crawled |
| `map` | 1 |
| `extract` (AI) | 5 per URL |
| `screenshot` | 0 (free with scrape) |

When credits are exhausted: HTTP 402 with remaining count.

---

## Integrating from Another App (Server-Side)

### Pattern 1: Direct API Calls

The simplest integration. Make HTTP requests directly.

```typescript
// In your app's backend
const THEONECRAWL_API_KEY = process.env.THEONECRAWL_API_KEY;
const THEONECRAWL_BASE_URL = process.env.THEONECRAWL_BASE_URL || 'https://api.theonecrawl.app';

async function scrapeUrl(url: string): Promise<ScrapeResult> {
  const res = await fetch(`${THEONECRAWL_BASE_URL}/v1/scrape`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${THEONECRAWL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, formats: ['markdown', 'cms_blocks'] }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}
```

### Pattern 2: Using the JS SDK

```typescript
import { TheOneCrawl } from '@theonecrawl/js';

// Create a singleton client
const crawlClient = new TheOneCrawl({
  apiKey: process.env.THEONECRAWL_API_KEY,
  apiUrl: process.env.THEONECRAWL_BASE_URL, // optional override
});

export { crawlClient };
```

### Pattern 3: Background Crawl with Webhook

For long-running crawls, use the webhook pattern to avoid blocking:

```typescript
// 1. Start the crawl
const job = await crawlClient.startCrawl('https://target-site.com', {
  limit: 100,
  maxDepth: 3,
  scrapeOptions: { formats: ['markdown', 'cms_blocks'] },
  webhook: 'https://your-app.com/api/webhooks/theonecrawl',
});

// 2. Store the job ID in your database
await db.crawlJobs.create({ jobId: job.id, status: 'crawling' });

// 3. Handle webhook callback
app.post('/api/webhooks/theonecrawl', async (req, res) => {
  const signature = req.headers['x-theonecrawl-signature'];
  if (!verifyWebhookSignature(req.body, signature, WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }

  const { event, data } = JSON.parse(req.body);

  if (event === 'crawl.completed') {
    // Fetch the full results
    const results = await crawlClient.getCrawlStatus(data.jobId);
    await processResults(results);
  }

  res.status(200).send('OK');
});
```

---

## Environment Variables for Integration

Your integrating app should define:

| Variable | Required | Description |
|---|---|---|
| `THEONECRAWL_API_KEY` | Yes | API key (`tc_live_...`) |
| `THEONECRAWL_BASE_URL` | No | Override base URL (default: `https://api.theonecrawl.app`) |
| `THEONECRAWL_WEBHOOK_SECRET` | No | Webhook signing secret (if using webhooks) |

---

## Infrastructure Details (for ops/platform team)

| Resource | Value |
|---|---|
| API endpoint | `https://api.theonecrawl.app` (→ Cloudflare WAF → Azure Container App) |
| Container App FQDN | `theonecrawl-api.agreeablewave-ef237075.eastus2.azurecontainerapps.io` |
| Web dashboard | `https://app.theonecrawl.app` (→ Azure Static Web App) |
| SWA hostname | `happy-forest-065c35d0f.4.azurestaticapps.net` |
| Cosmos DB | `theonecrawl-cosmos.documents.azure.com` (autoscale 5000 RU, provisioned) |
| Database | `theonecrawl` |
| Containers | `accounts` (/id), `jobs` (/account_id), `billing` (/account_id) |
| ACR | `theonecrawlacr.azurecr.io` |
| Key Vault | `theonecrawl-vault.vault.azure.net` |
| Managed Identity | `theonecrawl-identity` (client ID: `ec9b500a-2f25-403e-be10-1d222f2f1cd5`) |
| Resource Group | `TheOneCrawl` (East US 2) |
| GitHub | `jpthegeek/theonecrawl` |
| Email | AWS SES, `noreply@theonecrawl.app` |

### Key Vault Secrets

| Secret Name | Maps To Env Var |
|---|---|
| `session-secret` | `SESSION_SECRET` |
| `aws-ses-access-key-id` | `AWS_SES_ACCESS_KEY_ID` |
| `aws-ses-secret-access-key` | `AWS_SES_SECRET_ACCESS_KEY` |
| `stripe-secret-key` | `STRIPE_SECRET_KEY` |
| `stripe-webhook-secret` | `STRIPE_WEBHOOK_SECRET` |
| `anthropic-api-key` | `ANTHROPIC_API_KEY` |

### Cosmos DB auth

The API uses managed identity (`DefaultAzureCredential`) when `COSMOS_KEY` is not set. In production, `COSMOS_ENDPOINT` is the only required env var — the managed identity has Cosmos DB Built-in Data Contributor role.

---

## Firecrawl Migration

TheOneCrawl is API-compatible with Firecrawl. To migrate:

1. Change the base URL from `https://api.firecrawl.dev` to `https://api.theonecrawl.app`
2. Replace the API key prefix: `fc-` → `tc_live_`
3. All endpoint paths, request bodies, and response shapes are identical for: `/v1/scrape`, `/v1/crawl`, `/v1/crawl/:id`, `/v1/map`, `/v1/extract`

**Exclusive TheOneCrawl features** (not available in Firecrawl):
- `GET /v1/crawl/:id/cms-blocks` — Structured CMS blocks
- `GET /v1/crawl/:id/design-system` — Design token extraction
- `cms_blocks` format option in scrape requests
