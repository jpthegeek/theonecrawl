// ---------------------------------------------------------------------------
// TheOneCrawl — Credit management
// ---------------------------------------------------------------------------

import type { CrawlCredits, CrawlPlan } from '../engine/types.js';
import { PLAN_CREDITS } from '../shared/constants.js';
import { cosmosUpsert, cosmosRead, isCosmosConfigured } from '../shared/cosmos.js';

// ---------------------------------------------------------------------------
// In-memory store (backed by Cosmos DB in production)
// ---------------------------------------------------------------------------

interface CreditRecord {
  accountId: string;
  plan: CrawlPlan;
  used: number;
  resetDate: string;
}

const store = new Map<string, CreditRecord>();

// ---------------------------------------------------------------------------
// Cosmos persistence
// ---------------------------------------------------------------------------

interface CreditDocument {
  [key: string]: unknown;
  id: string;
  account_id: string;
  type: 'credit_record';
  plan: CrawlPlan;
  used: number;
  resetDate: string;
  updated_at: string;
}

async function persistCredits(record: CreditRecord): Promise<void> {
  if (!isCosmosConfigured()) return;
  try {
    const doc: CreditDocument = {
      id: `credits_${record.accountId}`,
      account_id: record.accountId,
      type: 'credit_record',
      plan: record.plan,
      used: record.used,
      resetDate: record.resetDate,
      updated_at: new Date().toISOString(),
    };
    await cosmosUpsert('billing', doc);
  } catch (err) {
    console.error(`[credits] Failed to persist credits for ${record.accountId}:`, err);
  }
}

async function loadCredits(accountId: string): Promise<CreditRecord | null> {
  if (!isCosmosConfigured()) return null;
  try {
    const doc = await cosmosRead<CreditDocument>(
      'billing',
      `credits_${accountId}`,
      accountId,
    );
    if (!doc) return null;
    return { accountId, plan: doc.plan, used: doc.used, resetDate: doc.resetDate };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function checkCredits(accountId: string): CrawlCredits {
  const record = getOrCreateRecord(accountId);
  maybeResetCredits(record);

  const total = PLAN_CREDITS[record.plan] ?? PLAN_CREDITS['free']!;
  const remaining = Math.max(0, total - record.used);

  return {
    accountId: record.accountId,
    total,
    used: record.used,
    remaining,
    resetDate: record.resetDate,
    plan: record.plan,
  };
}

export function consumeCredit(accountId: string): boolean {
  const record = getOrCreateRecord(accountId);
  maybeResetCredits(record);

  const total = PLAN_CREDITS[record.plan] ?? PLAN_CREDITS['free']!;
  if (record.used >= total) return false;

  record.used++;
  store.set(accountId, record);
  void persistCredits(record);
  return true;
}

export function consumeCredits(accountId: string, count: number): number {
  const record = getOrCreateRecord(accountId);
  maybeResetCredits(record);

  const total = PLAN_CREDITS[record.plan] ?? PLAN_CREDITS['free']!;
  const remaining = Math.max(0, total - record.used);
  const consumed = Math.min(remaining, count);

  record.used += consumed;
  store.set(accountId, record);
  void persistCredits(record);
  return consumed;
}

export function getCreditsForPlan(plan: CrawlPlan): number {
  return PLAN_CREDITS[plan] ?? PLAN_CREDITS['free']!;
}

export function setPlan(accountId: string, plan: CrawlPlan): void {
  const record = getOrCreateRecord(accountId);
  record.plan = plan;
  store.set(accountId, record);
  void persistCredits(record);
}

export function resetCredits(accountId: string): CrawlCredits {
  const record = getOrCreateRecord(accountId);
  record.used = 0;
  record.resetDate = computeNextResetDate();
  store.set(accountId, record);
  void persistCredits(record);
  return checkCredits(accountId);
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function getOrCreateRecord(accountId: string): CreditRecord {
  let record = store.get(accountId);
  if (!record) {
    record = {
      accountId,
      plan: 'free',
      used: 0,
      resetDate: computeNextResetDate(),
    };
    store.set(accountId, record);

    // Hydrate from Cosmos (async, best-effort)
    void loadCredits(accountId).then((saved) => {
      if (saved) {
        const existing = store.get(accountId);
        if (existing && existing.used === 0) {
          existing.plan = saved.plan;
          existing.used = saved.used;
          existing.resetDate = saved.resetDate;
          store.set(accountId, existing);
        }
      }
    });
  }
  return record;
}

function maybeResetCredits(record: CreditRecord): void {
  const now = new Date();
  const resetDate = new Date(record.resetDate);
  if (now >= resetDate) {
    record.used = 0;
    record.resetDate = computeNextResetDate();
    store.set(record.accountId, record);
    void persistCredits(record);
  }
}

function computeNextResetDate(): string {
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  return next.toISOString();
}
