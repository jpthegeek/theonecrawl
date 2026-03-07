// ---------------------------------------------------------------------------
// TheOneCrawl — Permissions registration endpoint
//
// POST /permissions/register
// Called by Hub to register this product's permission definitions.
// Authenticated via X-Hub-Service-Key header.
// ---------------------------------------------------------------------------

import { Hono } from 'hono';

export const permissionsRoutes = new Hono();

const CRAWL_PERMISSIONS = {
  product_id: 'crawl',
  categories: [
    {
      name: 'Crawl Management',
      permissions: [
        {
          key: 'crawl.jobs.view',
          label: 'View crawl jobs',
          applies_to: ['staff'],
          is_sensitive: false,
        },
        {
          key: 'crawl.jobs.create',
          label: 'Create crawl jobs',
          applies_to: ['staff'],
          is_sensitive: false,
        },
        {
          key: 'crawl.jobs.manage',
          label: 'Start/stop/delete crawl jobs',
          applies_to: ['staff'],
          is_sensitive: false,
        },
        {
          key: 'crawl.results.view',
          label: 'View crawl results',
          applies_to: ['staff'],
          is_sensitive: false,
        },
        {
          key: 'crawl.results.export',
          label: 'Export crawl data',
          applies_to: ['staff'],
          is_sensitive: false,
        },
        {
          key: 'crawl.schedules.view',
          label: 'View crawl schedules',
          applies_to: ['staff'],
          is_sensitive: false,
        },
        {
          key: 'crawl.schedules.manage',
          label: 'Create/edit schedules',
          applies_to: ['staff'],
          is_sensitive: false,
        },
        {
          key: 'crawl.admin.settings',
          label: 'System configuration',
          applies_to: ['staff'],
          is_sensitive: false,
        },
      ],
    },
  ],
};

permissionsRoutes.post('/register', async (c) => {
  const serviceKey = c.req.header('X-Hub-Service-Key');
  if (!serviceKey || serviceKey !== process.env['HUB_SERVICE_KEY']) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  return c.json({
    success: true,
    ...CRAWL_PERMISSIONS,
  });
});
