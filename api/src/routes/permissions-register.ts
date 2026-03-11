// ---------------------------------------------------------------------------
// TheOneCrawl — Permissions registration endpoint
//
// POST /permissions/register
// Called by Hub to register this product's permission definitions.
// Authenticated via X-Hub-Service-Key header.
// ---------------------------------------------------------------------------

import { Hono } from 'hono';

export const permissionsRoutes = new Hono();

const CRAWL_PERMISSIONS = [
  // Crawl Management
  { id: 'crawl.jobs.view', resource: 'jobs', action: 'view', display_name: 'View Jobs', description: 'View crawl jobs', category: 'Crawl Management', applies_to: ['staff'], is_sensitive: false },
  { id: 'crawl.jobs.create', resource: 'jobs', action: 'create', display_name: 'Create Jobs', description: 'Create crawl jobs', category: 'Crawl Management', applies_to: ['staff'], is_sensitive: false },
  { id: 'crawl.jobs.manage', resource: 'jobs', action: 'manage', display_name: 'Manage Jobs', description: 'Start/stop/delete crawl jobs', category: 'Crawl Management', applies_to: ['staff'], is_sensitive: false },
  { id: 'crawl.results.view', resource: 'results', action: 'view', display_name: 'View Results', description: 'View crawl results', category: 'Crawl Management', applies_to: ['staff'], is_sensitive: false },
  { id: 'crawl.results.export', resource: 'results', action: 'export', display_name: 'Export Results', description: 'Export crawl data', category: 'Crawl Management', applies_to: ['staff'], is_sensitive: false },
  { id: 'crawl.schedules.view', resource: 'schedules', action: 'view', display_name: 'View Schedules', description: 'View crawl schedules', category: 'Crawl Management', applies_to: ['staff'], is_sensitive: false },
  { id: 'crawl.schedules.manage', resource: 'schedules', action: 'manage', display_name: 'Manage Schedules', description: 'Create/edit schedules', category: 'Crawl Management', applies_to: ['staff'], is_sensitive: false },
  { id: 'crawl.admin.settings', resource: 'admin', action: 'settings', display_name: 'System Configuration', description: 'System configuration', category: 'Administration', applies_to: ['staff'], is_sensitive: false },
];

permissionsRoutes.post('/register', async (c) => {
  const serviceKey = c.req.header('X-Hub-Service-Key') || c.req.header('x-hub-service-key');
  const expectedKey = process.env['HUB_SERVICE_KEY'];
  if (!expectedKey || !serviceKey || serviceKey !== expectedKey) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const hubApiUrl = process.env['HUB_API_URL'];
  if (!hubApiUrl) {
    return c.json({ error: 'HUB_API_URL not configured' }, 503);
  }

  const resp = await fetch(`${hubApiUrl}/api/hub/permissions/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hub-Service-Key': expectedKey,
    },
    body: JSON.stringify({ product_id: 'crawl', permissions: CRAWL_PERMISSIONS }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    return c.json({ error: 'Hub registration failed', detail: text }, resp.status as any);
  }

  const result = await resp.json();
  return c.json({ success: true, registered: CRAWL_PERMISSIONS.length, hub_response: result });
});
