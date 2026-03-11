// ---------------------------------------------------------------------------
// TheOneCrawl — Monitor persistence store (Cosmos DB)
// ---------------------------------------------------------------------------

import { cosmosUpsert, cosmosRead, cosmosQuery, cosmosDelete } from './cosmos.js';
import { logger } from './logger.js';
import type { Monitor, MonitorCheck } from '../engine/types.js';

const MONITOR_CONTAINER = 'monitors';

// ---------------------------------------------------------------------------
// Monitor CRUD
// ---------------------------------------------------------------------------

export async function saveMonitor(monitor: Monitor): Promise<void> {
  try {
    await cosmosUpsert(MONITOR_CONTAINER, {
      ...monitor,
      account_id: monitor.accountId,
      type: 'monitor',
    });
  } catch (err) {
    logger.error('Failed to save monitor', { monitorId: monitor.id, error: err instanceof Error ? err.message : String(err) });
    throw err;
  }
}

export async function getMonitor(monitorId: string, accountId: string): Promise<Monitor | null> {
  try {
    return await cosmosRead<Monitor>(MONITOR_CONTAINER, monitorId, accountId);
  } catch (err) {
    logger.error('Failed to get monitor', { monitorId, error: err instanceof Error ? err.message : String(err) });
    return null;
  }
}

export async function listMonitors(accountId: string): Promise<Monitor[]> {
  try {
    return await cosmosQuery<Monitor>(
      MONITOR_CONTAINER,
      `SELECT * FROM c WHERE c.type = 'monitor' AND c.account_id = @accountId ORDER BY c.createdAt DESC`,
      [{ name: '@accountId', value: accountId }],
    );
  } catch (err) {
    logger.error('Failed to list monitors', { accountId, error: err instanceof Error ? err.message : String(err) });
    return [];
  }
}

export async function deleteMonitor(monitorId: string, accountId: string): Promise<void> {
  try {
    await cosmosDelete(MONITOR_CONTAINER, monitorId, accountId);
  } catch (err) {
    const code = (err as { code?: number }).code;
    if (code !== 404) {
      logger.error('Failed to delete monitor', { monitorId, error: err instanceof Error ? err.message : String(err) });
      throw err;
    }
  }
}

export async function countMonitors(accountId: string): Promise<number> {
  try {
    // VALUE COUNT(1) returns a scalar number array
    const results = await cosmosQuery<number>(
      MONITOR_CONTAINER,
      `SELECT VALUE COUNT(1) FROM c WHERE c.type = 'monitor' AND c.account_id = @accountId`,
      [{ name: '@accountId', value: accountId }],
    );
    return results[0] ?? 0;
  } catch (err) {
    logger.error('Failed to count monitors', { accountId, error: err instanceof Error ? err.message : String(err) });
    return 0;
  }
}

// ---------------------------------------------------------------------------
// Scheduler support — load monitors that are due for checking
// ---------------------------------------------------------------------------

export async function loadActiveMonitors(): Promise<Monitor[]> {
  try {
    return await cosmosQuery<Monitor>(
      MONITOR_CONTAINER,
      `SELECT * FROM c WHERE c.type = 'monitor' AND c.status = 'active'`,
    );
  } catch (err) {
    logger.error('Failed to load active monitors', { error: err instanceof Error ? err.message : String(err) });
    return [];
  }
}

export async function loadDueMonitors(nowIso: string): Promise<Monitor[]> {
  try {
    return await cosmosQuery<Monitor>(
      MONITOR_CONTAINER,
      `SELECT * FROM c WHERE c.type = 'monitor' AND c.status = 'active' AND c.nextCheckAt <= @now`,
      [{ name: '@now', value: nowIso }],
    );
  } catch (err) {
    logger.error('Failed to load due monitors', { error: err instanceof Error ? err.message : String(err) });
    return [];
  }
}

// ---------------------------------------------------------------------------
// Monitor check history
// ---------------------------------------------------------------------------

export async function saveMonitorCheck(check: MonitorCheck): Promise<void> {
  try {
    await cosmosUpsert(MONITOR_CONTAINER, {
      ...check,
      account_id: check.accountId,
    });
  } catch (err) {
    logger.error('Failed to save monitor check', { checkId: check.id, error: err instanceof Error ? err.message : String(err) });
    // Non-fatal — history loss is acceptable
  }
}

export async function getMonitorHistory(monitorId: string, accountId: string, limit = 30): Promise<MonitorCheck[]> {
  // Cosmos SQL TOP does not support parameters — cap limit to safe integer
  const safeLimit = Math.min(Math.max(1, Math.floor(limit)), 100);
  try {
    return await cosmosQuery<MonitorCheck>(
      MONITOR_CONTAINER,
      `SELECT TOP ${safeLimit} * FROM c WHERE c.type = 'monitor_check' AND c.monitorId = @monitorId AND c.account_id = @accountId ORDER BY c.checkedAt DESC`,
      [
        { name: '@monitorId', value: monitorId },
        { name: '@accountId', value: accountId },
      ],
    );
  } catch (err) {
    logger.error('Failed to get monitor history', { monitorId, error: err instanceof Error ? err.message : String(err) });
    return [];
  }
}
