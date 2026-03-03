// ---------------------------------------------------------------------------
// TheOneCrawl — API key generation, hashing, and validation
// ---------------------------------------------------------------------------

import { createHash, randomBytes } from 'node:crypto';
import { cosmosQuery, cosmosUpsert, cosmosDelete, isCosmosConfigured } from '../shared/cosmos.js';
import { API_KEY_PREFIX_LIVE, API_KEY_PREFIX_TEST, PLAN_RATE_LIMITS } from '../shared/constants.js';
import type { CrawlPlan } from '../engine/types.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ApiKeyRecord {
  id: string;
  account_id: string;
  type: 'api_key';
  name: string;
  key_hash: string;
  key_prefix: string; // first 12 chars for display (e.g., "tc_live_abc1...")
  environment: 'live' | 'test';
  created_at: string;
  last_used_at?: string;
  revoked: boolean;
}

export interface AccountRecord {
  id: string;
  type: 'account';
  email: string;
  name: string;
  password_hash?: string;
  auth_provider?: 'email' | 'microsoft';
  plan: CrawlPlan;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthContext {
  accountId: string;
  plan: CrawlPlan;
  environment: 'live' | 'test';
  rateLimits: { requestsPerMin: number; concurrentCrawls: number };
}

// ---------------------------------------------------------------------------
// In-memory cache for hot-path lookups
// ---------------------------------------------------------------------------

const keyCache = new Map<string, { accountId: string; plan: CrawlPlan; environment: 'live' | 'test'; expiresAt: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// ---------------------------------------------------------------------------
// Key generation
// ---------------------------------------------------------------------------

export function generateApiKey(environment: 'live' | 'test' = 'live'): { key: string; hash: string; prefix: string } {
  const prefix = environment === 'live' ? API_KEY_PREFIX_LIVE : API_KEY_PREFIX_TEST;
  const random = randomBytes(24).toString('base64url');
  const key = `${prefix}${random}`;
  const hash = hashApiKey(key);
  const keyPrefix = key.substring(0, 12) + '...';
  return { key, hash, prefix: keyPrefix };
}

export function hashApiKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}

// ---------------------------------------------------------------------------
// Key validation
// ---------------------------------------------------------------------------

export async function validateApiKey(key: string): Promise<AuthContext | null> {
  if (!key) return null;

  // Must start with a valid prefix
  if (!key.startsWith(API_KEY_PREFIX_LIVE) && !key.startsWith(API_KEY_PREFIX_TEST)) {
    return null;
  }

  const hash = hashApiKey(key);

  // Check cache first
  const cached = keyCache.get(hash);
  if (cached && cached.expiresAt > Date.now()) {
    return {
      accountId: cached.accountId,
      plan: cached.plan,
      environment: cached.environment,
      rateLimits: PLAN_RATE_LIMITS[cached.plan] ?? PLAN_RATE_LIMITS['free']!,
    };
  }

  // Lookup in Cosmos DB
  if (!isCosmosConfigured()) return null;

  try {
    const keys = await cosmosQuery<ApiKeyRecord>(
      'accounts',
      'SELECT * FROM c WHERE c.type = "api_key" AND c.key_hash = @hash AND c.revoked = false',
      [{ name: '@hash', value: hash }],
    );

    const keyRecord = keys[0];
    if (!keyRecord) return null;

    // Lookup the account to get the plan
    const accounts = await cosmosQuery<AccountRecord>(
      'accounts',
      'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
      [{ name: '@id', value: keyRecord.account_id }],
    );

    const account = accounts[0];
    if (!account) return null;

    const environment = keyRecord.environment;
    const plan = account.plan;

    // Cache the result
    keyCache.set(hash, {
      accountId: account.id,
      plan,
      environment,
      expiresAt: Date.now() + CACHE_TTL,
    });

    // Update last_used_at (fire-and-forget)
    void cosmosUpsert('accounts', {
      ...keyRecord,
      last_used_at: new Date().toISOString(),
    });

    return {
      accountId: account.id,
      plan,
      environment,
      rateLimits: PLAN_RATE_LIMITS[plan] ?? PLAN_RATE_LIMITS['free']!,
    };
  } catch (err) {
    console.error('[api-keys] Validation error:', err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Key management
// ---------------------------------------------------------------------------

export async function createApiKey(
  accountId: string,
  name: string,
  environment: 'live' | 'test' = 'live',
): Promise<{ key: string; record: ApiKeyRecord }> {
  const { key, hash, prefix } = generateApiKey(environment);

  const record: ApiKeyRecord = {
    id: `key_${randomBytes(8).toString('hex')}`,
    account_id: accountId,
    type: 'api_key',
    name,
    key_hash: hash,
    key_prefix: prefix,
    environment,
    created_at: new Date().toISOString(),
    revoked: false,
  };

  await cosmosUpsert('accounts', record);
  return { key, record };
}

export async function revokeApiKey(keyId: string, accountId: string): Promise<boolean> {
  try {
    const keys = await cosmosQuery<ApiKeyRecord>(
      'accounts',
      'SELECT * FROM c WHERE c.id = @id AND c.account_id = @accountId AND c.type = "api_key"',
      [
        { name: '@id', value: keyId },
        { name: '@accountId', value: accountId },
      ],
    );

    const keyRecord = keys[0];
    if (!keyRecord) return false;

    await cosmosUpsert('accounts', { ...keyRecord, revoked: true });

    // Invalidate cache
    keyCache.delete(keyRecord.key_hash);
    return true;
  } catch (err) {
    console.error('[api-keys] Revoke error:', err);
    return false;
  }
}

export async function listApiKeys(accountId: string): Promise<ApiKeyRecord[]> {
  return cosmosQuery<ApiKeyRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.account_id = @accountId AND c.type = "api_key" AND c.revoked = false ORDER BY c.created_at DESC',
    [{ name: '@accountId', value: accountId }],
  );
}

/**
 * Clear the key cache (useful for testing or after plan changes).
 */
export function clearKeyCache(): void {
  keyCache.clear();
}
