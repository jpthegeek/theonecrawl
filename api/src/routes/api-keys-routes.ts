// ---------------------------------------------------------------------------
// TheOneCrawl — API key management routes (wraps auth/api-keys.ts)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import { z } from 'zod';
import { getSession } from '../auth/sessions.js';
import { createApiKey, revokeApiKey, listApiKeys } from '../auth/api-keys.js';
import { getAuthFromRequest } from '../auth/sessions.js';

export const apiKeysRoutes = new Hono();

// ---------------------------------------------------------------------------
// GET /v1/api-keys
// ---------------------------------------------------------------------------

apiKeysRoutes.get('/', async (c) => {
  const session = getSession(c);
  if (!session) return c.json({ success: false, error: 'Not authenticated' }, 401);

  const keys = await listApiKeys(session.accountId);

  return c.json({
    success: true,
    keys: keys.map((k) => ({
      id: k.id,
      name: k.name,
      key_prefix: k.key_prefix,
      environment: k.environment,
      created_at: k.created_at,
      last_used_at: k.last_used_at,
    })),
  });
});

// ---------------------------------------------------------------------------
// POST /v1/api-keys
// ---------------------------------------------------------------------------

const createSchema = z.object({
  name: z.string().min(1).max(100),
  environment: z.enum(['live', 'test']).default('live'),
});

apiKeysRoutes.post('/', async (c) => {
  const session = getSession(c);
  if (!session) return c.json({ success: false, error: 'Not authenticated' }, 401);

  const body = await c.req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }, 400);
  }

  const { key, record } = await createApiKey(session.accountId, parsed.data.name, parsed.data.environment);

  // Return the full key only on creation — never again
  return c.json({
    success: true,
    key, // one-time display
    api_key: {
      id: record.id,
      name: record.name,
      key_prefix: record.key_prefix,
      environment: record.environment,
      created_at: record.created_at,
    },
  }, 201);
});

// ---------------------------------------------------------------------------
// DELETE /v1/api-keys/:id
// ---------------------------------------------------------------------------

apiKeysRoutes.delete('/:id', async (c) => {
  const session = getSession(c);
  if (!session) return c.json({ success: false, error: 'Not authenticated' }, 401);

  const keyId = c.req.param('id');
  const revoked = await revokeApiKey(keyId, session.accountId);

  if (!revoked) {
    return c.json({ success: false, error: 'API key not found' }, 404);
  }

  return c.json({ success: true });
});
