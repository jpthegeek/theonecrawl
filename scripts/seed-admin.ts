#!/usr/bin/env npx tsx
// ---------------------------------------------------------------------------
// TheOneCrawl — Seed platform super admin account
//
// Usage:
//   COSMOS_ENDPOINT=https://theonecrawl-cosmos.documents.azure.com:443/ \
//   COSMOS_KEY=<key> \
//   npx tsx scripts/seed-admin.ts
//
// Or with managed identity (no COSMOS_KEY):
//   COSMOS_ENDPOINT=https://theonecrawl-cosmos.documents.azure.com:443/ \
//   npx tsx scripts/seed-admin.ts
// ---------------------------------------------------------------------------

import { CosmosClient } from '@azure/cosmos';
import { DefaultAzureCredential } from '@azure/identity';
import { scrypt, randomBytes } from 'node:crypto';

const ADMIN_EMAIL = 'jpearson@jpthegeek.com';
const ADMIN_NAME = 'JP Pearson';
const ADMIN_PASSWORD = process.env['ADMIN_PASSWORD'] || randomBytes(16).toString('base64url');
const DATABASE_NAME = process.env['COSMOS_DATABASE'] || 'theonecrawl';

function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(16).toString('hex');
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

async function main() {
  const endpoint = process.env['COSMOS_ENDPOINT'];
  const key = process.env['COSMOS_KEY'];

  if (!endpoint) {
    console.error('COSMOS_ENDPOINT is required');
    process.exit(1);
  }

  const client = key
    ? new CosmosClient({ endpoint, key })
    : new CosmosClient({ endpoint, aadCredentials: new DefaultAzureCredential() });

  const database = client.database(DATABASE_NAME);
  const accounts = database.container('accounts');

  // Check if admin already exists
  const { resources: existing } = await accounts.items
    .query({
      query: 'SELECT * FROM c WHERE c.type = "account" AND c.email = @email',
      parameters: [{ name: '@email', value: ADMIN_EMAIL }],
    })
    .fetchAll();

  if (existing.length > 0) {
    console.log(`Admin account already exists: ${existing[0].id}`);
    console.log('Updating to ensure platform_admin role...');

    const doc = existing[0];
    doc.role = 'platform_admin';
    doc.plan = 'growth'; // Give admin the highest self-serve plan
    doc.updated_at = new Date().toISOString();
    await accounts.items.upsert(doc);

    console.log('Admin account updated.');
    return;
  }

  // Create admin account
  const passwordHash = await hashPassword(ADMIN_PASSWORD);
  const accountId = `acct_${randomBytes(12).toString('hex')}`;

  const adminDoc = {
    id: accountId,
    type: 'account',
    email: ADMIN_EMAIL,
    name: ADMIN_NAME,
    password_hash: passwordHash,
    auth_provider: 'email',
    plan: 'growth',
    role: 'platform_admin',
    email_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  await accounts.items.create(adminDoc);

  // Create a default API key for convenience
  const apiKeyRandom = randomBytes(24).toString('base64url');
  const apiKey = `tc_live_${apiKeyRandom}`;
  const { createHash } = await import('node:crypto');
  const keyHash = createHash('sha256').update(apiKey).digest('hex');

  const keyDoc = {
    id: `key_${randomBytes(8).toString('hex')}`,
    account_id: accountId,
    type: 'api_key',
    name: 'Default Admin Key',
    key_hash: keyHash,
    key_prefix: apiKey.substring(0, 12) + '...',
    environment: 'live',
    created_at: new Date().toISOString(),
    revoked: false,
  };

  await accounts.items.create(keyDoc);

  // Seed initial credit balance
  const creditDoc = {
    id: `credits_${accountId}`,
    account_id: accountId,
    type: 'credit_record',
    plan: 'growth',
    credits_total: 250_000,
    credits_used: 0,
    period_start: new Date().toISOString(),
    period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  };

  await database.container('billing').items.create(creditDoc);

  console.log('='.repeat(60));
  console.log('Platform Super Admin Account Created');
  console.log('='.repeat(60));
  console.log(`  Account ID: ${accountId}`);
  console.log(`  Email:      ${ADMIN_EMAIL}`);
  console.log(`  Password:   ${ADMIN_PASSWORD}`);
  console.log(`  Plan:       growth (250,000 credits/mo)`);
  console.log(`  Role:       platform_admin`);
  console.log(`  API Key:    ${apiKey}`);
  console.log('='.repeat(60));
  console.log('SAVE THE API KEY AND PASSWORD — they cannot be retrieved later.');
  console.log('='.repeat(60));
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
