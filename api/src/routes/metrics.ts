// ---------------------------------------------------------------------------
// TheOneCrawl — Ops Center metrics endpoint
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { getQueueStats } from '../engine/queue.js';
import { isCosmosConfigured, cosmosQuery } from '../shared/cosmos.js';
import { logger } from '../shared/logger.js';
import { isRedisAvailable, getRedisClient } from '../shared/redis.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MetricsResponse {
  queue_depth: number;
  active_jobs: number;
  completed_24h: number;
  failed_24h: number;
  avg_job_duration_ms: number;
  error_rate: number;
  credit_consumption_rate: number;
  active_accounts_24h: number;
  redis_connected: boolean;
  uptime_ms: number;
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Cached metrics (60s TTL)
// ---------------------------------------------------------------------------

let cachedMetrics: { data: Partial<MetricsResponse>; expiresAt: number } | null = null;
const CACHE_TTL_MS = 60_000;
const startTime = Date.now();

async function getCosmosMetrics(): Promise<Partial<MetricsResponse>> {
  if (cachedMetrics && cachedMetrics.expiresAt > Date.now()) {
    return cachedMetrics.data;
  }

  if (!isCosmosConfigured()) {
    return {};
  }

  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // Query completed/failed jobs in last 24h
    const [completed, failed, usageEvents] = await Promise.all([
      cosmosQuery<{ count: number }>(
        'jobs',
        'SELECT VALUE COUNT(1) FROM c WHERE c.status = "complete" AND c.updatedAt >= @since',
        [{ name: '@since', value: since }],
      ),
      cosmosQuery<{ count: number }>(
        'jobs',
        'SELECT VALUE COUNT(1) FROM c WHERE c.status = "failed" AND c.updatedAt >= @since',
        [{ name: '@since', value: since }],
      ),
      cosmosQuery<{ total: number; accounts: number }>(
        'billing',
        'SELECT VALUE { total: COUNT(1), accounts: COUNT(DISTINCT c.account_id) } FROM c WHERE c.type = "usage_event" AND c.created_at >= @since',
        [{ name: '@since', value: since }],
      ),
    ]);

    const completedCount = (completed[0] as unknown as number) ?? 0;
    const failedCount = (failed[0] as unknown as number) ?? 0;
    const totalJobs = completedCount + failedCount;
    const usage = usageEvents[0];

    const data: Partial<MetricsResponse> = {
      completed_24h: completedCount,
      failed_24h: failedCount,
      error_rate: totalJobs > 0 ? (failedCount / totalJobs) * 100 : 0,
      credit_consumption_rate: (usage?.total as number) ?? 0,
      active_accounts_24h: (usage?.accounts as number) ?? 0,
    };

    cachedMetrics = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    return data;
  } catch (err) {
    logger.error('Failed to fetch Cosmos metrics', {
      error: err instanceof Error ? err.message : String(err),
    });
    return cachedMetrics?.data ?? {};
  }
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

export const metricsRoutes = new Hono();

metricsRoutes.get('/', async (c) => {
  // Authenticate with shared secret
  const token = process.env['OPS_CENTER_TOKEN'];
  if (!token) {
    return c.json({ error: 'Metrics endpoint not configured' }, 503);
  }

  const authHeader = c.req.header('Authorization');
  const provided = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (provided !== token) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const queueStats = getQueueStats();
  const cosmosMetrics = await getCosmosMetrics();

  // Get avg job duration from Redis if available
  let avgDuration = 0;
  const redis = getRedisClient();
  if (redis) {
    try {
      const val = await redis.get('toc:metrics:avg_duration');
      if (val) avgDuration = parseFloat(val);
    } catch {
      // Redis not critical for metrics
    }
  }

  const response: MetricsResponse = {
    queue_depth: queueStats.queued,
    active_jobs: queueStats.active,
    completed_24h: cosmosMetrics.completed_24h ?? 0,
    failed_24h: cosmosMetrics.failed_24h ?? 0,
    avg_job_duration_ms: avgDuration,
    error_rate: cosmosMetrics.error_rate ?? 0,
    credit_consumption_rate: cosmosMetrics.credit_consumption_rate ?? 0,
    active_accounts_24h: cosmosMetrics.active_accounts_24h ?? 0,
    redis_connected: isRedisAvailable(),
    uptime_ms: Date.now() - startTime,
    timestamp: new Date().toISOString(),
  };

  return c.json(response);
});
