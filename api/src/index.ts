// ---------------------------------------------------------------------------
// TheOneCrawl — Hono HTTP server
//
// Firecrawl-compatible API with CMS block conversion and design system
// extraction. Open-source engine (AGPL-3.0) with SaaS billing layer.
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { scrapeRoutes } from './routes/scrape.js';
import { crawlRoutes } from './routes/crawl.js';
import { mapRoutes } from './routes/map.js';
import { authRoutes } from './routes/auth.js';
import { accountRoutes } from './routes/account.js';
import { apiKeysRoutes } from './routes/api-keys-routes.js';
import { usageRoutes } from './routes/usage.js';
import { jobsRoutes } from './routes/jobs-routes.js';
import { billingRoutes } from './routes/billing.js';
import { extractRoutes } from './routes/extract.js';
import { batchScrapeRoutes } from './routes/batch-scrape.js';
import { metricsRoutes } from './routes/metrics.js';
import { adminRoutes } from './routes/admin.js';
import { getQueueStats, stopWorker, setJobStore, loadPendingJobs, recoverInterruptedJobs, waitForDrain } from './engine/queue.js';
import { isCosmosConfigured, cosmosQuery } from './shared/cosmos.js';
import { authMiddleware } from './auth/middleware.js';
import { JobStore } from './shared/job-store.js';
import { SERVICE_NAME, SERVICE_VERSION, API_DOMAIN, APP_DOMAIN, ROOT_DOMAIN } from './shared/constants.js';
import { checkRateLimit } from './auth/rate-limiter.js';
import { logger } from './shared/logger.js';
import { initRedis, isRedisAvailable, closeRedis, getRedisClient } from './shared/redis.js';
import { extractClientIp } from './shared/request-utils.js';

// ---------------------------------------------------------------------------
// App setup
// ---------------------------------------------------------------------------

const app = new Hono();

const IS_PRODUCTION = process.env['NODE_ENV'] === 'production';
const startTime = Date.now();

// Middleware

// Security headers
app.use('*', async (c, next) => {
  await next();
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('X-XSS-Protection', '0'); // Modern browsers — CSP is preferred
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  c.header('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'");
  c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
});

// Request body size limit (2 MB) — works for both Content-Length and streaming
const MAX_BODY_SIZE = 2 * 1024 * 1024;
app.use('*', async (c, next) => {
  const contentLength = c.req.header('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    return c.json({ success: false, error: 'Request body too large (max 2 MB)' }, 413);
  }
  await next();
});

// Request duration logging
app.use('*', async (c, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  logger.info('request', {
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    durationMs: duration,
  });
});

// CORS — only include localhost origins in non-production
const corsOrigins: string[] = [
  `https://${API_DOMAIN}`,
  `https://${APP_DOMAIN}`,
  `https://${ROOT_DOMAIN}`,
];
if (!IS_PRODUCTION) {
  corsOrigins.push('http://localhost:5173', 'http://localhost:5174', 'http://localhost:3001');
}

app.use(
  '*',
  cors({
    origin: corsOrigins,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-TheOneCrawl-Signature'],
    credentials: true,
    maxAge: 86400,
  }),
);

// ---------------------------------------------------------------------------
// Health check (minimal info for public endpoint)
// ---------------------------------------------------------------------------

const healthHandler = (c: any) => {
  return c.json({
    status: 'ok',
    service: SERVICE_NAME,
    version: SERVICE_VERSION,
    timestamp: new Date().toISOString(),
  });
};

app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

// ---------------------------------------------------------------------------
// Deep health check (authenticated, probes Cosmos)
// ---------------------------------------------------------------------------

app.get('/health/deep', authMiddleware, async (c) => {
  const components: Record<string, { status: string; latencyMs?: number; error?: string }> = {};

  // Probe Cosmos DB
  if (isCosmosConfigured()) {
    const cosmosStart = Date.now();
    try {
      await cosmosQuery('accounts', 'SELECT VALUE 1', []);
      components['cosmos'] = { status: 'ok', latencyMs: Date.now() - cosmosStart };
    } catch (err) {
      components['cosmos'] = {
        status: 'error',
        latencyMs: Date.now() - cosmosStart,
      };
      logger.error('Deep health check Cosmos probe failed', {
        error: err instanceof Error ? err.message : String(err),
      });
    }
  } else {
    components['cosmos'] = { status: 'not_configured' };
  }

  // Probe Redis
  if (isRedisAvailable()) {
    const redisStart = Date.now();
    try {
      const redis = getRedisClient();
      await redis!.ping();
      components['redis'] = { status: 'ok', latencyMs: Date.now() - redisStart };
    } catch (err) {
      components['redis'] = {
        status: 'error',
        latencyMs: Date.now() - redisStart,
      };
      logger.error('Deep health check Redis probe failed', {
        error: err instanceof Error ? err.message : String(err),
      });
    }
  } else {
    components['redis'] = { status: 'not_configured' };
  }

  const queueStats = getQueueStats();
  const uptimeMs = Date.now() - startTime;
  const allOk = Object.values(components).every((c) => c.status === 'ok' || c.status === 'not_configured');

  return c.json({
    status: allOk ? 'ok' : 'degraded',
    service: SERVICE_NAME,
    version: SERVICE_VERSION,
    uptimeMs,
    components,
    queue: queueStats,
    timestamp: new Date().toISOString(),
  }, allOk ? 200 : 503);
});

// ---------------------------------------------------------------------------
// Firecrawl-compatible routes
// ---------------------------------------------------------------------------

app.route('/v1/scrape', scrapeRoutes);
app.route('/v1/crawl', crawlRoutes);
app.route('/v1/map', mapRoutes);
app.route('/v1/extract', extractRoutes);

// ---------------------------------------------------------------------------
// Dashboard/auth routes (rate-limited per IP for session-based endpoints)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// CSRF protection — origin validation for state-changing dashboard requests
// ---------------------------------------------------------------------------

const CSRF_PROTECTED_PREFIXES = [
  '/v1/account/', '/v1/api-keys/', '/v1/billing/',
  '/v1/usage/', '/v1/jobs/', '/v1/auth/',
  '/v1/extract/', '/v1/batch/',
];

const csrfProtection = async (c: any, next: any) => {
  const method = c.req.method;
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    return next();
  }

  // Exempt API key-authenticated requests (not cookie-based)
  const authHeader = c.req.header('Authorization') as string | undefined;
  if (authHeader?.startsWith('Bearer ')) {
    return next();
  }

  // Exempt Stripe webhook (uses its own signature verification)
  if (c.req.path === '/v1/billing/webhook') {
    return next();
  }

  const origin = c.req.header('Origin') || extractOriginFromReferer(c.req.header('Referer'));
  if (!origin) {
    return c.json({ success: false, error: 'Missing Origin header' }, 403);
  }

  try {
    const originHost = new URL(origin).hostname;
    const allowed = corsOrigins.some((o: string) => {
      try { return new URL(o).hostname === originHost; }
      catch { return false; }
    });
    if (!allowed) {
      return c.json({ success: false, error: 'Invalid origin' }, 403);
    }
  } catch {
    return c.json({ success: false, error: 'Invalid origin' }, 403);
  }

  return next();
};

function extractOriginFromReferer(referer: string | undefined): string | undefined {
  if (!referer) return undefined;
  try {
    const url = new URL(referer);
    return `${url.protocol}//${url.host}`;
  } catch {
    return undefined;
  }
}

for (const prefix of CSRF_PROTECTED_PREFIXES) {
  app.use(`${prefix}*`, csrfProtection);
}

// Rate limit auth endpoints more aggressively (30/min per IP)
const authRateLimit = async (c: any, next: any) => {
  const ip = extractClientIp(c);
  const result = await checkRateLimit(`auth:${ip}`, 30);
  if (!result.allowed) {
    c.header('Retry-After', String(Math.ceil(result.resetMs / 1000)));
    return c.json({ success: false, error: 'Too many requests' }, 429);
  }
  await next();
};

// Rate limit dashboard endpoints (60/min per IP)
// Exempts the Stripe webhook path which uses its own signature verification
const dashboardRateLimit = async (c: any, next: any) => {
  // Stripe webhook has its own signature-based auth; don't rate-limit it by IP
  if (c.req.path === '/v1/billing/webhook') {
    return next();
  }

  const ip = extractClientIp(c);
  const result = await checkRateLimit(`dashboard:${ip}`, 60);
  if (!result.allowed) {
    c.header('Retry-After', String(Math.ceil(result.resetMs / 1000)));
    return c.json({ success: false, error: 'Too many requests' }, 429);
  }
  await next();
};

app.use('/v1/auth/*', authRateLimit);
app.use('/v1/account/*', dashboardRateLimit);
app.use('/v1/api-keys/*', dashboardRateLimit);
app.use('/v1/usage/*', dashboardRateLimit);
app.use('/v1/jobs/*', dashboardRateLimit);
app.use('/v1/billing/*', dashboardRateLimit);
app.use('/v1/extract', csrfProtection);
app.use('/v1/extract/*', csrfProtection);
app.use('/v1/batch/*', csrfProtection);
app.use('/v1/extract', dashboardRateLimit);
app.use('/v1/extract/*', dashboardRateLimit);
app.use('/v1/batch/*', dashboardRateLimit);

app.route('/v1/auth', authRoutes);
app.route('/v1/account', accountRoutes);
app.route('/v1/api-keys', apiKeysRoutes);
app.route('/v1/usage', usageRoutes);
app.route('/v1/jobs', jobsRoutes);
app.route('/v1/billing', billingRoutes);

// ---------------------------------------------------------------------------
// Batch scrape
// ---------------------------------------------------------------------------

app.route('/v1/batch/scrape', batchScrapeRoutes);

// ---------------------------------------------------------------------------
// Ops Center metrics
// ---------------------------------------------------------------------------

app.route('/api/metrics', metricsRoutes);
app.route('/v1/admin', adminRoutes);

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
  logger.error('Unhandled error', { error: err instanceof Error ? err.message : String(err) });
  return c.json({
    success: false,
    error: 'Internal server error',
  }, 500);
});

// ---------------------------------------------------------------------------
// Cosmos DB persistence (optional — falls back to in-memory)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Require Cosmos in production
// ---------------------------------------------------------------------------

if (IS_PRODUCTION && !isCosmosConfigured()) {
  throw new Error('COSMOS_ENDPOINT is required in production. Set COSMOS_ENDPOINT environment variable.');
}

if (isCosmosConfigured()) {
  const store = new JobStore();
  setJobStore(store);
  logger.info('Cosmos DB persistence initialized');
  await recoverInterruptedJobs();
  await loadPendingJobs();
} else {
  logger.info('Using in-memory storage (COSMOS_ENDPOINT not set)');
}

// Redis (non-fatal — falls back to in-memory)
await initRedis();

// ---------------------------------------------------------------------------
// Server startup
// ---------------------------------------------------------------------------

const PORT = parseInt(process.env['PORT'] || '3001', 10);
const HOST = process.env['HOST'] || '0.0.0.0';

logger.info(`Starting on ${HOST}:${PORT}`);

const server = serve({
  fetch: app.fetch,
  port: PORT,
  hostname: HOST,
});

// Graceful shutdown — stop accepting requests, then drain active jobs
let shuttingDown = false;
const shutdown = async () => {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info('Shutting down — closing server and draining active jobs (30s max)');
  server.close();
  await waitForDrain(30_000);
  await closeRedis();
  logger.info('Shutdown complete');
  process.exit(0);
};

process.on('SIGINT', () => void shutdown());
process.on('SIGTERM', () => void shutdown());
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled promise rejection', {
    error: reason instanceof Error ? reason.message : String(reason),
  });
});

export { app };
