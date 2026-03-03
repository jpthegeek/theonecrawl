// ---------------------------------------------------------------------------
// TheOneCrawl — Usage stats routes
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { getSession } from '../auth/sessions.js';
import { checkCredits } from '../billing/credits.js';
import { cosmosQuery, isCosmosConfigured } from '../shared/cosmos.js';

export const usageRoutes = new Hono();

interface UsageEvent {
  id: string;
  account_id: string;
  type: 'usage_event';
  operation: string;
  credits: number;
  url?: string;
  created_at: string;
}

// ---------------------------------------------------------------------------
// GET /v1/usage
// ---------------------------------------------------------------------------

usageRoutes.get('/', async (c) => {
  const session = getSession(c);
  if (!session) return c.json({ success: false, error: 'Not authenticated' }, 401);

  const credits = checkCredits(session.accountId);

  // Get usage events for charts
  let events: UsageEvent[] = [];
  if (isCosmosConfigured()) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    events = await cosmosQuery<UsageEvent>(
      'billing',
      'SELECT * FROM c WHERE c.account_id = @accountId AND c.type = "usage_event" AND c.created_at >= @since ORDER BY c.created_at DESC',
      [
        { name: '@accountId', value: session.accountId },
        { name: '@since', value: thirtyDaysAgo },
      ],
    );
  }

  // Aggregate by day
  const dailyUsage: Record<string, { scrape: number; crawl: number; map: number; extract: number }> = {};
  for (const event of events) {
    const day = event.created_at.substring(0, 10);
    if (!dailyUsage[day]) dailyUsage[day] = { scrape: 0, crawl: 0, map: 0, extract: 0 };
    const bucket = dailyUsage[day]!;
    const op = event.operation as keyof typeof bucket;
    if (op in bucket) bucket[op] += event.credits;
  }

  return c.json({
    success: true,
    credits: {
      total: credits.total,
      used: credits.used,
      remaining: credits.remaining,
      resetDate: credits.resetDate,
      plan: credits.plan,
    },
    dailyUsage: Object.entries(dailyUsage).map(([date, ops]) => ({ date, ...ops })),
  });
});
