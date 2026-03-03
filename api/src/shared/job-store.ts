// ---------------------------------------------------------------------------
// TheOneCrawl — Job persistence store (Cosmos DB)
// ---------------------------------------------------------------------------

import { cosmosUpsert, cosmosRead, cosmosQuery, cosmosDelete } from './cosmos.js';
import type { CrawlJob } from '../engine/types.js';

const CONTAINER = 'jobs';

interface CrawlJobDocument extends CrawlJob {
  [key: string]: unknown;
  account_id: string;
  type: 'crawl_job';
}

export class JobStore {
  async save(job: CrawlJob): Promise<void> {
    try {
      const doc: CrawlJobDocument = {
        ...job,
        account_id: job.accountId,
        type: 'crawl_job',
      };
      await cosmosUpsert(CONTAINER, doc);
    } catch (err) {
      console.error(`[job-store] Failed to save job ${job.id}:`, err);
    }
  }

  async get(jobId: string, accountId: string): Promise<CrawlJob | null> {
    try {
      return await cosmosRead<CrawlJob>(CONTAINER, jobId, accountId);
    } catch (err) {
      console.error(`[job-store] Failed to get job ${jobId}:`, err);
      return null;
    }
  }

  async getForAccount(accountId: string): Promise<CrawlJob[]> {
    try {
      return await cosmosQuery<CrawlJob>(
        CONTAINER,
        `SELECT * FROM c WHERE c.type = 'crawl_job' AND c.account_id = @accountId
         ORDER BY c.createdAt DESC`,
        [{ name: '@accountId', value: accountId }],
      );
    } catch (err) {
      console.error(`[job-store] Failed to get jobs for account ${accountId}:`, err);
      return [];
    }
  }

  async loadPendingJobs(): Promise<CrawlJob[]> {
    try {
      return await cosmosQuery<CrawlJob>(
        CONTAINER,
        `SELECT * FROM c WHERE c.type = 'crawl_job' AND c.status = 'queued'`,
      );
    } catch (err) {
      console.error('[job-store] Failed to load pending jobs:', err);
      return [];
    }
  }

  async delete(jobId: string, accountId: string): Promise<void> {
    try {
      await cosmosDelete(CONTAINER, jobId, accountId);
    } catch (err) {
      const code = (err as { code?: number }).code;
      if (code !== 404) {
        console.error(`[job-store] Failed to delete job ${jobId}:`, err);
      }
    }
  }
}
