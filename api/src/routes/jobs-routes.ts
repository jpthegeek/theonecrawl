// ---------------------------------------------------------------------------
// TheOneCrawl — Crawl job history routes
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { getSession } from '../auth/sessions.js';
import { cosmosQuery, isCosmosConfigured } from '../shared/cosmos.js';
import type { CrawlJob } from '../engine/types.js';

export const jobsRoutes = new Hono();

// ---------------------------------------------------------------------------
// GET /v1/jobs
// ---------------------------------------------------------------------------

jobsRoutes.get('/', async (c) => {
  const session = getSession(c);
  if (!session) return c.json({ success: false, error: 'Not authenticated' }, 401);

  const page = Math.max(1, parseInt(c.req.query('page') ?? '1', 10) || 1);
  const limit = Math.max(1, Math.min(parseInt(c.req.query('limit') ?? '20', 10) || 20, 100));
  const offset = (page - 1) * limit;

  if (!isCosmosConfigured()) {
    return c.json({ success: true, jobs: [], total: 0, page, limit });
  }

  // Get total count
  const countResult = await cosmosQuery<{ count: number }>(
    'jobs',
    'SELECT VALUE COUNT(1) FROM c WHERE c.account_id = @accountId',
    [{ name: '@accountId', value: session.accountId }],
  );
  const total = countResult[0] ?? 0;

  // Get paginated jobs
  const jobs = await cosmosQuery<CrawlJob>(
    'jobs',
    'SELECT c.id, c.url, c.status, c.options.maxPages, c.progress, c.createdAt, c.completedAt FROM c WHERE c.account_id = @accountId ORDER BY c.createdAt DESC OFFSET @offset LIMIT @limit',
    [
      { name: '@accountId', value: session.accountId },
      { name: '@offset', value: offset },
      { name: '@limit', value: limit },
    ],
  );

  return c.json({
    success: true,
    jobs: jobs.map((j) => ({
      id: j.id,
      url: j.url,
      status: j.status,
      pages: j.progress?.pagesCompleted ?? 0,
      createdAt: j.createdAt,
      completedAt: j.completedAt,
    })),
    total,
    page,
    limit,
  });
});
