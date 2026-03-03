// ---------------------------------------------------------------------------
// TheOneCrawl — Admin abuse management API
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { getAuth } from '../auth/middleware.js';
import { authMiddleware } from '../auth/middleware.js';
import type { AccountRecord, AbuseStatus } from '../auth/api-keys.js';
import { cosmosQuery } from '../shared/cosmos.js';
import {
  getAbuseDetails,
  listFlaggedAccounts,
  setAccountStatus,
  getThresholds,
  setThresholds,
} from '../auth/abuse-detection.js';

export const adminRoutes = new Hono();

// All admin routes require authentication
adminRoutes.use('*', authMiddleware);

// Authorization: must be platform_admin
adminRoutes.use('*', async (c, next) => {
  const auth = getAuth(c);

  // Look up the full account record to check role
  const accounts = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
    [{ name: '@id', value: auth.accountId }],
  );

  const account = accounts[0];
  if (!account || account.role !== 'platform_admin') {
    return c.json({ success: false, error: 'Forbidden — admin role required' }, 403);
  }

  await next();
});

// GET /v1/admin/abuse/accounts — List flagged accounts
adminRoutes.get('/abuse/accounts', async (c) => {
  const flagged = await listFlaggedAccounts();
  return c.json({ success: true, accounts: flagged });
});

// GET /v1/admin/abuse/accounts/:id — Detailed abuse report
adminRoutes.get('/abuse/accounts/:id', async (c) => {
  const accountId = c.req.param('id');
  const details = await getAbuseDetails(accountId);
  return c.json({ success: true, ...details });
});

// POST /v1/admin/abuse/accounts/:id/status — Set account abuse status
adminRoutes.post('/abuse/accounts/:id/status', async (c) => {
  const accountId = c.req.param('id');
  const body = await c.req.json<{ status: AbuseStatus; reason?: string }>();

  const validStatuses: AbuseStatus[] = ['active', 'warned', 'throttled', 'suspended', 'banned'];
  if (!validStatuses.includes(body.status)) {
    return c.json({ success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }, 400);
  }

  await setAccountStatus(accountId, body.status, body.reason);
  return c.json({ success: true, accountId, status: body.status });
});

// GET /v1/admin/abuse/thresholds — Get current thresholds
adminRoutes.get('/abuse/thresholds', async (c) => {
  return c.json({ success: true, thresholds: getThresholds() });
});

// PUT /v1/admin/abuse/thresholds — Update thresholds
adminRoutes.put('/abuse/thresholds', async (c) => {
  const body = await c.req.json();
  await setThresholds(body);
  return c.json({ success: true, thresholds: getThresholds() });
});
