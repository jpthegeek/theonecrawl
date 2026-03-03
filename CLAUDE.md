# TheOneCrawl — Claude Code Context

## Product Overview

TheOneCrawl is an open-source (AGPL-3.0) web crawling SaaS that converts websites into structured data (markdown, HTML, CMS blocks, design systems). Firecrawl-compatible API — users can switch by changing base URL + API key.

**Domain:** `theonecrawl.app`
**API:** `api.theonecrawl.app` (Container App)
**Dashboard:** `app.theonecrawl.app` (Static Web App)

## Architecture

### Monorepo Structure

```
api/              — Hono HTTP server (containerized), the core product
web/              — React SWA: marketing + dashboard
sdks/js/          — @theonecrawl/js (npm)
sdks/python/      — theonecrawl (PyPI)
sdks/cli/         — @theonecrawl/cli (npx)
sdks/mcp/         — @theonecrawl/mcp (MCP server)
```

### API Layout (`api/src/`)

```
engine/           — Core crawl engine (Playwright + Crawlee + Cheerio + Sharp)
  crawler.ts      — Multi-page crawling with Playwright
  extractor.ts    — Cheerio-based content extraction (headings, images, links, etc.)
  converter.ts    — HTML → CMS block conversion
  media-processor.ts — Image download, dedup, optimization
  markdown-converter.ts — ExtractedContent → clean markdown
  queue.ts        — In-memory job queue with worker loop
  types.ts        — All TypeScript interfaces
  cms-types.ts    — Inlined CMS types (from former @nexuvo/cms-core)
routes/           — Hono route handlers
  scrape.ts       — POST /v1/scrape (synchronous)
  crawl.ts        — POST /v1/crawl, GET /v1/crawl/:id, DELETE, cms-blocks, design-system
  map.ts          — POST /v1/map
auth/             — Authentication layer
  api-keys.ts     — tc_live_/tc_test_ key generation, SHA-256 hashing, validation
  middleware.ts   — Hono auth middleware (Bearer token)
  rate-limiter.ts — Sliding window per API key
billing/          — Credits and Stripe
  credits.ts      — Plan-based credit management with Cosmos persistence
shared/           — Cross-cutting concerns
  cosmos.ts       — Direct @azure/cosmos client (single DB)
  job-store.ts    — Cosmos job persistence
  webhooks.ts     — HMAC-SHA256 webhook delivery
  ssrf.ts         — Private IP/host blocking
  constants.ts    — Service constants, plan configs
```

### Azure Resources (Resource Group: `TheOneCrawl`)

| Resource | Name | Type |
|---|---|---|
| Cosmos DB | `theonecrawl-cosmos` | Provisioned (autoscale 5000 RU) |
| Container App | `theonecrawl-api` | 2 vCPU / 4 GiB |
| Container App Env | `theonecrawl-env` | East US 2 |
| Static Web App | `theonecrawl-web` | Free |
| Key Vault | `theonecrawl-vault` | Standard (RBAC) |
| Managed Identity | `theonecrawl-identity` | User-assigned |
| Container Registry | `theonecrawlacr` | Basic (dedicated) |

### Cosmos DB (database: `theonecrawl`)

| Container | Partition Key | Document Types |
|---|---|---|
| `accounts` | `/id` | account, api_key, membership, webhook_config |
| `jobs` | `/account_id` | crawl_job, scrape_result, batch_job |
| `billing` | `/account_id` | credit_record, invoice, subscription |

## API Endpoints (Firecrawl-compatible)

| Method | Path | Description |
|---|---|---|
| POST | `/v1/scrape` | Single page scrape (sync) |
| POST | `/v1/crawl` | Multi-page async crawl |
| GET | `/v1/crawl/:id` | Poll crawl status |
| DELETE | `/v1/crawl/:id` | Cancel crawl |
| POST | `/v1/map` | URL/sitemap discovery |
| GET | `/v1/crawl/:id/cms-blocks` | CMS blocks (exclusive) |
| GET | `/v1/crawl/:id/design-system` | Design system (exclusive) |

## Pricing

| Plan | Price/mo | Credits/mo | Rate | Concurrent |
|---|---|---|---|---|
| Free | $0 | 500 | 10/min | 1 |
| Hobby | $12 | 3,000 | 20/min | 3 |
| Standard | $59 | 50,000 | 100/min | 10 |
| Growth | $249 | 250,000 | 500/min | 50 |

## Key Decisions

- **No `@nexuvo/*` dependencies** — fully standalone, all CMS types inlined
- **Single Cosmos database** — no multi-tenant routing complexity
- **In-memory job queue** with optional Cosmos write-through
- **API keys use SHA-256 hashing** — key never stored, only hash
- **AGPL-3.0** — core engine is open source, SaaS adds auth/billing/dashboard
- **Stripe** — shared StatusOne LLC account, separate products

## Integration

See `docs/INTEGRATION.md` for comprehensive integration docs. This includes:
- All API endpoints with request/response schemas
- SDK usage (JS, Python, CLI, MCP)
- Webhook setup and signature verification
- Error codes and credit costs
- Infrastructure details and Key Vault secrets
- Firecrawl migration guide

## Dev Commands

```bash
pnpm install          # Install all dependencies
pnpm dev              # Start API in dev mode (tsx watch)
pnpm build            # Build API TypeScript
pnpm typecheck        # Type check all packages
```
