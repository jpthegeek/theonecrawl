// ---------------------------------------------------------------------------
// TheOneCrawl — Hono HTTP server
//
// Firecrawl-compatible API with CMS block conversion and design system
// extraction. Open-source engine (AGPL-3.0) with SaaS billing layer.
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { scrapeRoutes } from './routes/scrape.js';
import { crawlRoutes } from './routes/crawl.js';
import { mapRoutes } from './routes/map.js';
import { getQueueStats, stopWorker, setJobStore, loadPendingJobs } from './engine/queue.js';
import { isCosmosConfigured } from './shared/cosmos.js';
import { JobStore } from './shared/job-store.js';
import { SERVICE_NAME, SERVICE_VERSION, API_DOMAIN, APP_DOMAIN, ROOT_DOMAIN } from './shared/constants.js';

// ---------------------------------------------------------------------------
// App setup
// ---------------------------------------------------------------------------

const app = new Hono();

// Middleware
app.use('*', logger());
app.use(
  '*',
  cors({
    origin: [
      `https://${API_DOMAIN}`,
      `https://${APP_DOMAIN}`,
      `https://${ROOT_DOMAIN}`,
      // Dev origins
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3001',
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-TheOneCrawl-Signature'],
    credentials: true,
    maxAge: 86400,
  }),
);

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------

app.get('/health', (c) => {
  const stats = getQueueStats();
  return c.json({
    status: 'ok',
    service: SERVICE_NAME,
    version: SERVICE_VERSION,
    uptime: process.uptime(),
    queue: stats,
    cosmos: isCosmosConfigured(),
    timestamp: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------------------
// Firecrawl-compatible routes
// ---------------------------------------------------------------------------

app.route('/v1/scrape', scrapeRoutes);
app.route('/v1/crawl', crawlRoutes);
app.route('/v1/map', mapRoutes);

// ---------------------------------------------------------------------------
// Stub routes (Phase 7)
// ---------------------------------------------------------------------------

app.post('/v1/extract', (c) => {
  return c.json({
    success: false,
    error: 'AI extraction is coming soon. Use /v1/scrape with formats: ["extract"] for basic extraction.',
  }, 501);
});

app.post('/v1/batch/scrape', (c) => {
  return c.json({
    success: false,
    error: 'Batch scraping is coming soon.',
  }, 501);
});

// ---------------------------------------------------------------------------
// 404 handler
// ---------------------------------------------------------------------------

app.notFound((c) => {
  return c.json({
    success: false,
    error: 'Not found. See https://theonecrawl.app/docs for API documentation.',
  }, 404);
});

// ---------------------------------------------------------------------------
// Error handler
// ---------------------------------------------------------------------------

app.onError((err, c) => {
  console.error('[server] Unhandled error:', err);
  return c.json({
    success: false,
    error: 'Internal server error',
  }, 500);
});

// ---------------------------------------------------------------------------
// Cosmos DB persistence (optional — falls back to in-memory)
// ---------------------------------------------------------------------------

if (isCosmosConfigured()) {
  const store = new JobStore();
  setJobStore(store);
  console.info(`[${SERVICE_NAME}] Cosmos DB persistence initialized`);
  await loadPendingJobs();
} else {
  console.info(`[${SERVICE_NAME}] Using in-memory storage (COSMOS_ENDPOINT not set)`);
}

// ---------------------------------------------------------------------------
// Server startup
// ---------------------------------------------------------------------------

const PORT = parseInt(process.env['PORT'] || '3001', 10);
const HOST = process.env['HOST'] || '0.0.0.0';

console.info(`[${SERVICE_NAME}] Starting on ${HOST}:${PORT}`);

serve({
  fetch: app.fetch,
  port: PORT,
  hostname: HOST,
});

// Graceful shutdown
const shutdown = () => {
  console.info(`[${SERVICE_NAME}] Shutting down...`);
  stopWorker();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export { app };
