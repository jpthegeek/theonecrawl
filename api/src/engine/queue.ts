// ---------------------------------------------------------------------------
// TheOneCrawl — Job queue with Redis coordination + in-memory fallback
// ---------------------------------------------------------------------------

import { nanoid } from 'nanoid';
import { crawlWebsite } from './crawler.js';
import { downloadMedia } from './media-processor.js';
import { convertToHeaderBlock, convertToFooterBlock, generateThemeSuggestion } from './converter.js';
import { toMarkdown } from './markdown-converter.js';
import { consumeCredit, recordUsageEvent, ensureHydrated, refundCredit, refundCredits } from '../billing/credits.js';
import { sendWebhook } from '../shared/webhooks.js';
import { logger } from '../shared/logger.js';
import { isRedisAvailable, getRedisClient, getInstanceId } from '../shared/redis.js';
import type {
  CrawlJob,
  CrawlOptions,
  CrawlProgress,
} from './types.js';
import type { JobStore } from '../shared/job-store.js';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { mkdir, rm } from 'node:fs/promises';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const MAX_QUEUE_SIZE = 100;
const WORKER_POLL_INTERVAL_MS = 500;
const MAX_CONCURRENT_JOBS = 3;
const JOB_RETENTION_MS = 30 * 60 * 1000; // 30 minutes
const MAX_JOBS_PER_ACCOUNT = 10;
const MAX_RESULT_SIZE = 5 * 1024 * 1024; // 5 MB
const JOB_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
const BATCH_HARD_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const REDIS_JOB_TTL = 12 * 60 * 60; // 12 hours
const REDIS_RESULT_TTL = 30 * 60; // 30 minutes
const REDIS_ACCOUNT_JOBS_TTL = 24 * 60 * 60; // 24 hours

// ---------------------------------------------------------------------------
// In-memory storage (always maintained for local job tracking)
// ---------------------------------------------------------------------------

const jobs = new Map<string, CrawlJob>();
const queue: string[] = [];
let activeJobCount = 0;
let workerRunning = false;
let jobStore: JobStore | null = null;

export function setJobStore(store: JobStore): void {
  jobStore = store;
}

export async function loadPendingJobs(): Promise<number> {
  if (!jobStore) return 0;
  const pending = await jobStore.loadPendingJobs();
  let count = 0;
  for (const job of pending) {
    if (!jobs.has(job.id)) {
      jobs.set(job.id, job);
      if (isRedisAvailable()) {
        await redisEnqueueJob(job);
      } else {
        queue.push(job.id);
      }
      count++;
    }
  }
  if (count > 0) {
    startWorker();
    logger.info('Restored pending jobs from Cosmos DB', { count });
  }
  return count;
}

export async function recoverInterruptedJobs(): Promise<number> {
  if (!jobStore) return 0;
  const interrupted = await jobStore.loadInterruptedJobs();
  let count = 0;
  for (const job of interrupted) {
    job.status = 'failed';
    job.error = 'Process restarted — job interrupted';
    job.updatedAt = new Date().toISOString();
    jobs.set(job.id, job);
    await jobStore.save(job);
    count++;
  }
  if (count > 0) {
    logger.info('Recovered interrupted jobs as failed', { count });
  }
  return count;
}

/**
 * Recover jobs owned by dead instances (no heartbeat).
 * Called on startup when Redis is available.
 */
export async function recoverDeadInstanceJobs(): Promise<number> {
  const redis = getRedisClient();
  if (!redis) return 0;

  let recovered = 0;
  try {
    // Get all active job IDs
    const activeIds = await redis.smembers('toc:jobs:active');
    for (const jobId of activeIds) {
      const jobData = await redis.hgetall(`toc:job:${jobId}`);
      if (!jobData || !jobData['instanceId']) continue;

      // Check if owning instance is alive
      const heartbeat = await redis.get(`toc:instance:${jobData['instanceId']}:heartbeat`);
      if (!heartbeat) {
        // Instance is dead — mark job as failed or re-enqueue
        logger.warn('Found orphaned job from dead instance', {
          jobId,
          deadInstance: jobData['instanceId'],
        });
        await redis.srem('toc:jobs:active', jobId);
        await redis.srem(`toc:instance:${jobData['instanceId']}:jobs`, jobId);

        // Mark as failed (re-crawling could cause duplicate charges)
        await redis.hset(`toc:job:${jobId}`, {
          status: 'failed',
          error: 'Owning instance died — job orphaned',
          updatedAt: new Date().toISOString(),
        });
        recovered++;
      }
    }
  } catch (err) {
    logger.error('Failed to recover dead instance jobs', {
      error: err instanceof Error ? err.message : String(err),
    });
  }
  return recovered;
}

// ---------------------------------------------------------------------------
// Redis queue helpers
// ---------------------------------------------------------------------------

async function redisEnqueueJob(job: CrawlJob): Promise<void> {
  const redis = getRedisClient()!;
  const pipeline = redis.pipeline();

  // Store job as hash
  pipeline.hset(`toc:job:${job.id}`, {
    id: job.id,
    accountId: job.accountId,
    url: job.url,
    status: job.status,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    options: JSON.stringify(job.options),
    webhookUrl: job.webhookUrl || '',
    webhookSecret: job.webhookSecret || '',
    creditsPrepaid: job.creditsPrepaid ? '1' : '0',
  });
  pipeline.expire(`toc:job:${job.id}`, REDIS_JOB_TTL);

  // Add to per-account job set
  pipeline.sadd(`toc:jobs:account:${job.accountId}`, job.id);
  pipeline.expire(`toc:jobs:account:${job.accountId}`, REDIS_ACCOUNT_JOBS_TTL);

  // Push to FIFO queue (LPUSH — workers use RPOP)
  pipeline.lpush('toc:queue', job.id);

  await pipeline.exec();
}

async function redisDequeueJob(): Promise<string | null> {
  const redis = getRedisClient();
  if (!redis) return null;
  return redis.rpop('toc:queue');
}

async function redisMarkActive(jobId: string): Promise<void> {
  const redis = getRedisClient();
  if (!redis) return;
  const instanceId = getInstanceId();
  const pipeline = redis.pipeline();
  pipeline.sadd('toc:jobs:active', jobId);
  pipeline.sadd(`toc:instance:${instanceId}:jobs`, jobId);
  pipeline.hset(`toc:job:${jobId}`, 'instanceId', instanceId, 'status', 'crawling');
  await pipeline.exec();
}

async function redisMarkComplete(jobId: string, accountId: string): Promise<void> {
  const redis = getRedisClient();
  if (!redis) return;
  const instanceId = getInstanceId();
  const pipeline = redis.pipeline();
  pipeline.srem('toc:jobs:active', jobId);
  pipeline.srem(`toc:instance:${instanceId}:jobs`, jobId);
  pipeline.srem(`toc:jobs:account:${accountId}`, jobId);
  pipeline.expire(`toc:job:${jobId}`, REDIS_RESULT_TTL);
  await pipeline.exec();
}

async function redisGetQueueLength(): Promise<number> {
  const redis = getRedisClient();
  if (!redis) return 0;
  return redis.llen('toc:queue');
}

async function redisGetAccountJobCount(accountId: string): Promise<number> {
  const redis = getRedisClient();
  if (!redis) return 0;
  return redis.scard(`toc:jobs:account:${accountId}`);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

function countPendingJobsForAccount(accountId: string): number {
  let count = 0;
  for (const job of jobs.values()) {
    if (job.accountId === accountId && (job.status === 'queued' || job.status === 'crawling' || job.status === 'extracting' || job.status === 'converting')) {
      count++;
    }
  }
  return count;
}

export async function enqueue(
  accountId: string,
  url: string,
  options: CrawlOptions,
  webhookUrl?: string,
  webhookSecret?: string,
  creditsPrepaid?: boolean,
): Promise<string> {
  // Check queue capacity
  if (isRedisAvailable()) {
    const queueLen = await redisGetQueueLength();
    if (queueLen >= MAX_QUEUE_SIZE) {
      throw new Error('Queue is full. Please try again later.');
    }
    const accountJobs = await redisGetAccountJobCount(accountId);
    if (accountJobs >= MAX_JOBS_PER_ACCOUNT) {
      throw new Error(`Maximum ${MAX_JOBS_PER_ACCOUNT} pending jobs per account. Wait for current jobs to complete.`);
    }
  } else {
    if (queue.length >= MAX_QUEUE_SIZE) {
      throw new Error('Queue is full. Please try again later.');
    }
    if (countPendingJobsForAccount(accountId) >= MAX_JOBS_PER_ACCOUNT) {
      throw new Error(`Maximum ${MAX_JOBS_PER_ACCOUNT} pending jobs per account. Wait for current jobs to complete.`);
    }
  }

  const id = `crawl_${nanoid(12)}`;
  const now = new Date().toISOString();

  const job: CrawlJob = {
    id,
    accountId,
    url,
    status: 'queued',
    options,
    webhookUrl,
    webhookSecret,
    creditsPrepaid,
    createdAt: now,
    updatedAt: now,
    progress: {
      pagesQueued: 1,
      pagesCompleted: 0,
      pagesFailed: 0,
      currentUrl: url,
    },
  };

  jobs.set(id, job);

  if (isRedisAvailable()) {
    await redisEnqueueJob(job);
  } else {
    queue.push(id);
  }

  if (jobStore) void jobStore.save(job);

  startWorker();
  return id;
}

export function getJob(jobId: string): CrawlJob | null {
  return jobs.get(jobId) ?? null;
}

export function getJobsForAccount(accountId: string): CrawlJob[] {
  return Array.from(jobs.values())
    .filter((j) => j.accountId === accountId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function updateJob(
  jobId: string,
  updates: Partial<Pick<CrawlJob, 'status' | 'result' | 'error' | 'progress' | 'completedAt'>>,
): void {
  const job = jobs.get(jobId);
  if (!job) return;

  Object.assign(job, updates, { updatedAt: new Date().toISOString() });
  jobs.set(jobId, job);

  if (jobStore) void jobStore.save(job);

  // Update status in Redis (fire-and-forget)
  if (isRedisAvailable() && updates.status) {
    const redis = getRedisClient();
    if (redis) {
      redis.hset(`toc:job:${jobId}`, 'status', updates.status, 'updatedAt', job.updatedAt).catch(() => {});
    }
  }
}

export function deleteJob(jobId: string): boolean {
  const job = jobs.get(jobId);
  if (!job) return false;

  // Remove from in-memory queue
  const queueIndex = queue.indexOf(jobId);
  if (queueIndex !== -1) {
    queue.splice(queueIndex, 1);
  }

  // Remove from Redis queue (best-effort)
  if (isRedisAvailable()) {
    const redis = getRedisClient();
    if (redis) {
      redis.lrem('toc:queue', 1, jobId).catch(() => {});
      redis.srem(`toc:jobs:account:${job.accountId}`, jobId).catch(() => {});
    }
  }

  if (job.status === 'crawling' || job.status === 'extracting' || job.status === 'converting') {
    job.status = 'failed';
    job.error = 'Job cancelled by user';
    job.updatedAt = new Date().toISOString();
    jobs.set(jobId, job);
  } else {
    jobs.delete(jobId);
  }

  return true;
}

export function getQueueStats(): {
  queued: number;
  active: number;
  totalJobs: number;
} {
  return {
    queued: queue.length,
    active: activeJobCount,
    totalJobs: jobs.size,
  };
}

// ---------------------------------------------------------------------------
// Worker loop
// ---------------------------------------------------------------------------

function startWorker(): void {
  if (workerRunning) return;
  workerRunning = true;

  const loop = async () => {
    while (workerRunning) {
      cleanupOldJobs();
      cleanupOldBatches();

      while (activeJobCount < MAX_CONCURRENT_JOBS) {
        let jobId: string | null | undefined = null;

        if (isRedisAvailable()) {
          // Redis: atomic dequeue — only one instance wins
          jobId = await redisDequeueJob();
        } else {
          jobId = queue.shift();
        }

        if (!jobId) break;

        const job = jobs.get(jobId);
        if (!job || job.status !== 'queued') {
          // Job might have been loaded from Redis but not in local map
          // (only possible if another instance enqueued it)
          continue;
        }

        activeJobCount++;
        if (isRedisAvailable()) {
          void redisMarkActive(jobId);
        }
        processJob(job).finally(() => {
          activeJobCount--;
          if (isRedisAvailable()) {
            void redisMarkComplete(job.id, job.accountId);
          }
        });
      }

      if (!isRedisAvailable() && queue.length === 0 && activeJobCount === 0) {
        workerRunning = false;
        break;
      }

      // With Redis, keep polling even if local queue is empty
      // (other instances may enqueue jobs)
      if (isRedisAvailable() && activeJobCount === 0) {
        // Check if Redis queue has items
        const redisLen = await redisGetQueueLength();
        if (redisLen === 0) {
          workerRunning = false;
          break;
        }
      }

      await sleep(WORKER_POLL_INTERVAL_MS);
    }
  };

  loop().catch((err) => {
    logger.error('Worker loop crashed, restarting in 1s', { error: err instanceof Error ? err.message : String(err) });
    workerRunning = false;
    setTimeout(() => {
      if (queue.length > 0 || activeJobCount > 0) {
        startWorker();
      }
    }, 1000);
  });
}

export function stopWorker(): void {
  workerRunning = false;
}

/** Wait for all active jobs to finish (for graceful shutdown). */
export async function waitForDrain(timeoutMs = 30_000): Promise<void> {
  workerRunning = false;
  const deadline = Date.now() + timeoutMs;
  while (activeJobCount > 0 && Date.now() < deadline) {
    await sleep(250);
  }
  if (activeJobCount > 0) {
    logger.warn('Drain timeout — forcing shutdown with active jobs', { activeJobCount });
  }
}

// ---------------------------------------------------------------------------
// Job processing
// ---------------------------------------------------------------------------

/**
 * Trim stored results to stay under MAX_RESULT_SIZE.
 */
function trimResults(job: CrawlJob): void {
  if (!job.result?.pages) return;

  for (const page of job.result.pages) {
    page.screenshot = undefined;
  }

  const serialized = JSON.stringify(job.result);
  if (serialized.length > MAX_RESULT_SIZE) {
    for (const page of job.result.pages) {
      if (page.html && page.html.length > 50_000) {
        page.html = page.html.slice(0, 50_000) + '<!-- truncated -->';
      }
    }
  }
}

async function processJob(job: CrawlJob): Promise<void> {
  const startTime = Date.now();

  const timeoutId = setTimeout(() => {
    if (job.status !== 'complete' && job.status !== 'failed') {
      logger.warn('Job timeout exceeded', { jobId: job.id, timeoutMs: JOB_TIMEOUT_MS });
      updateJob(job.id, { status: 'failed', error: 'Job timed out' });
      if (job.webhookUrl) {
        void sendWebhook(job.webhookUrl, 'crawl.failed', {
          id: job.id,
          error: 'Job timed out',
        }, job.webhookSecret, job.accountId);
      }
    }
  }, JOB_TIMEOUT_MS);

  if (job.webhookUrl) {
    void sendWebhook(job.webhookUrl, 'crawl.started', {
      id: job.id,
      url: job.url,
    }, job.webhookSecret, job.accountId);
  }

  let creditConsumed = false;

  try {
    if (!job.creditsPrepaid) {
      await ensureHydrated(job.accountId);
      const hasCredit = consumeCredit(job.accountId);
      if (!hasCredit) {
        updateJob(job.id, {
          status: 'failed',
          error: 'Insufficient credits. Upgrade your plan or wait for the monthly reset.',
        });
        if (job.webhookUrl) {
          void sendWebhook(job.webhookUrl, 'crawl.failed', {
            id: job.id,
            error: 'Insufficient credits',
          }, job.webhookSecret, job.accountId);
        }
        return;
      }
      creditConsumed = true;
      recordUsageEvent(job.accountId, 'crawl', 1, job.url);
    }

    // Phase 1: Crawling
    updateJob(job.id, { status: 'crawling' });

    const result = await crawlWebsite(
      job.url,
      job.options,
      (progress: CrawlProgress) => {
        updateJob(job.id, { progress });

        if (job.webhookUrl && progress.pagesCompleted > 0) {
          void sendWebhook(job.webhookUrl, 'crawl.page', {
            id: job.id,
            completed: progress.pagesCompleted,
            total: progress.pagesQueued,
          }, job.webhookSecret, job.accountId);
        }
      },
    );

    const currentJob = getJob(job.id);
    if (!currentJob || currentJob.status === 'failed') {
      if (creditConsumed) refundCredit(job.accountId);
      return;
    }

    // Phase 2: Media extraction
    if (job.options.extractMedia && result.pages.length > 0) {
      updateJob(job.id, { status: 'extracting' });

      const allImageUrls: string[] = [];
      for (const page of result.pages) {
        for (const img of page.extractedContent.images) {
          allImageUrls.push(img.src);
        }
      }

      if (allImageUrls.length > 0) {
        const mediaDir = join(tmpdir(), 'crawl-media', job.id);
        await mkdir(mediaDir, { recursive: true });
        result.media = await downloadMedia(allImageUrls, mediaDir);
      }
    }

    const currentJob2 = getJob(job.id);
    if (!currentJob2 || currentJob2.status === 'failed') {
      if (creditConsumed) refundCredit(job.accountId);
      return;
    }

    // Phase 3: Block conversion + markdown
    if (job.options.convertToBlocks) {
      updateJob(job.id, { status: 'converting' });

      const firstPage = result.pages[0];
      if (firstPage) {
        const headerBlock = convertToHeaderBlock(firstPage.extractedContent, result.siteMetadata);
        const footerBlock = convertToFooterBlock(firstPage.extractedContent, result.siteMetadata);
        const themeSuggestion = generateThemeSuggestion(firstPage.extractedContent, result.siteMetadata);

        result.themeSuggestion = themeSuggestion;
        result.headerBlock = headerBlock;
        result.footerBlock = footerBlock;
      }
    }

    // Generate markdown for each page
    for (const page of result.pages) {
      page.markdown = toMarkdown(page.extractedContent, {
        onlyMainContent: job.options.onlyMainContent,
      });
    }

    // Trim results
    const completeJob = jobs.get(job.id);
    if (completeJob) {
      completeJob.result = result;
      trimResults(completeJob);
    }

    // Phase 4: Complete
    updateJob(job.id, {
      status: 'complete',
      result: completeJob?.result ?? result,
      completedAt: new Date().toISOString(),
    });

    const duration = Date.now() - startTime;
    logger.info('Job completed', {
      jobId: job.id,
      durationMs: duration,
      pages: result.pages.length,
      media: result.media.length,
    });

    // Track avg duration in Redis
    if (isRedisAvailable()) {
      const redis = getRedisClient();
      if (redis) {
        // Simple exponential moving average
        const prev = await redis.get('toc:metrics:avg_duration');
        const prevVal = prev ? parseFloat(prev) : duration;
        const newAvg = prevVal * 0.8 + duration * 0.2;
        redis.set('toc:metrics:avg_duration', newAvg.toString(), 'EX', 86400).catch(() => {});
      }
    }

    if (job.webhookUrl) {
      void sendWebhook(job.webhookUrl, 'crawl.completed', {
        id: job.id,
        status: 'completed',
        total: result.pages.length,
      }, job.webhookSecret, job.accountId);
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error during crawl';

    if (creditConsumed) {
      refundCredit(job.accountId);
    }

    logger.error('Job failed', { jobId: job.id, error: errorMessage });
    updateJob(job.id, {
      status: 'failed',
      error: errorMessage,
    });

    if (job.webhookUrl) {
      void sendWebhook(job.webhookUrl, 'crawl.failed', {
        id: job.id,
        error: errorMessage,
      }, job.webhookSecret, job.accountId);
    }
  } finally {
    clearTimeout(timeoutId);
    if (job.options.extractMedia) {
      const mediaDir = join(tmpdir(), 'crawl-media', job.id);
      rm(mediaDir, { recursive: true, force: true }).catch(() => {});
    }
  }
}

// ---------------------------------------------------------------------------
// Batch support
// ---------------------------------------------------------------------------

export interface BatchMeta {
  id: string;
  accountId: string;
  urls: string[];
  options: CrawlOptions;
  webhookUrl?: string;
  webhookSecret?: string;
  status: 'scraping' | 'completed' | 'failed';
  jobIds: string[];
  completedCount: number;
  failedCount: number;
  results: Array<{
    url: string;
    markdown?: string;
    html?: string;
    metadata: Record<string, unknown>;
    links?: unknown[];
  }>;
  createdAt: string;
  completedAt?: string;
}

const batches = new Map<string, BatchMeta>();

export async function enqueueBatch(
  accountId: string,
  urls: string[],
  options: CrawlOptions,
  webhookUrl?: string,
  webhookSecret?: string,
): Promise<string> {
  // Per-account check for batch
  let pendingCount: number;
  if (isRedisAvailable()) {
    pendingCount = await redisGetAccountJobCount(accountId);
  } else {
    pendingCount = countPendingJobsForAccount(accountId);
  }

  if (pendingCount + urls.length > MAX_JOBS_PER_ACCOUNT) {
    throw new Error(
      `Would exceed per-account limit of ${MAX_JOBS_PER_ACCOUNT} pending jobs. ` +
      `Currently have ${pendingCount}, requesting ${urls.length}.`,
    );
  }

  const batchId = `batch_${nanoid(12)}`;
  const now = new Date().toISOString();

  const batch: BatchMeta = {
    id: batchId,
    accountId,
    urls,
    options,
    webhookUrl,
    webhookSecret,
    status: 'scraping',
    jobIds: [],
    completedCount: 0,
    failedCount: 0,
    results: [],
    createdAt: now,
  };

  // Store batch metadata in Redis
  if (isRedisAvailable()) {
    const redis = getRedisClient();
    if (redis) {
      await redis.hset(`toc:batch:${batchId}`, {
        id: batchId,
        accountId,
        status: 'scraping',
        total: urls.length.toString(),
        createdAt: now,
      });
      await redis.expire(`toc:batch:${batchId}`, REDIS_JOB_TTL);
    }
  }

  for (const url of urls) {
    const jobId = await enqueue(accountId, url, {
      ...options,
      maxPages: 1,
      maxDepth: 0,
    }, undefined, undefined, true);
    batch.jobIds.push(jobId);
  }

  batches.set(batchId, batch);

  void monitorBatch(batch);

  return batchId;
}

export function getBatch(batchId: string): BatchMeta | null {
  return batches.get(batchId) ?? null;
}

async function monitorBatch(batch: BatchMeta): Promise<void> {
  if (batch.webhookUrl) {
    void sendWebhook(batch.webhookUrl, 'batch.started', {
      id: batch.id,
      total: batch.urls.length,
    }, batch.webhookSecret, batch.accountId);
  }

  const startTime = Date.now();

  while (batch.completedCount + batch.failedCount < batch.jobIds.length) {
    if (Date.now() - startTime > BATCH_HARD_TIMEOUT_MS) {
      logger.warn('Batch hard timeout reached', { batchId: batch.id });
      batch.status = 'failed';
      batch.completedAt = new Date().toISOString();
      if (batch.webhookUrl) {
        void sendWebhook(batch.webhookUrl, 'batch.failed', {
          id: batch.id,
          error: 'Batch timed out after 30 minutes',
        }, batch.webhookSecret, batch.accountId);
      }
      return;
    }

    await sleep(1000);

    let completed = 0;
    let failed = 0;

    for (const jobId of batch.jobIds) {
      const job = getJob(jobId);
      if (!job) { failed++; continue; }
      if (job.status === 'complete') completed++;
      else if (job.status === 'failed') failed++;
    }

    if (completed > batch.completedCount && batch.webhookUrl) {
      void sendWebhook(batch.webhookUrl, 'batch.url_completed', {
        id: batch.id,
        completed,
        total: batch.jobIds.length,
      }, batch.webhookSecret, batch.accountId);
    }

    batch.completedCount = completed;
    batch.failedCount = failed;
  }

  // Build results
  for (const jobId of batch.jobIds) {
    const job = getJob(jobId);
    if (job?.result?.pages?.[0]) {
      const page = job.result.pages[0];
      batch.results.push({
        url: page.url,
        markdown: page.markdown ?? toMarkdown(page.extractedContent, {
          onlyMainContent: batch.options.onlyMainContent,
        }),
        html: page.html,
        metadata: {
          title: page.title,
          description: page.description,
          sourceURL: page.url,
          statusCode: page.statusCode,
        },
        links: page.extractedContent.links,
      });
    }
  }

  batch.status = batch.failedCount === batch.jobIds.length ? 'failed' : 'completed';
  batch.completedAt = new Date().toISOString();

  if (batch.failedCount > 0) {
    refundCredits(batch.accountId, batch.failedCount);
    logger.info('Refunded credits for failed batch URLs', {
      batchId: batch.id,
      refunded: batch.failedCount,
    });
  }

  if (batch.webhookUrl) {
    void sendWebhook(batch.webhookUrl, batch.status === 'failed' ? 'batch.failed' : 'batch.completed', {
      id: batch.id,
      status: batch.status,
      total: batch.jobIds.length,
      completed: batch.completedCount,
    }, batch.webhookSecret, batch.accountId);
  }
}

// ---------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------

function cleanupOldJobs(): void {
  const now = Date.now();
  for (const [id, job] of jobs.entries()) {
    if (
      (job.status === 'complete' || job.status === 'failed') &&
      now - new Date(job.updatedAt).getTime() > JOB_RETENTION_MS
    ) {
      jobs.delete(id);
    }
  }
}

function cleanupOldBatches(): void {
  const now = Date.now();
  for (const [id, batch] of batches.entries()) {
    if (
      (batch.status === 'completed' || batch.status === 'failed') &&
      batch.completedAt &&
      now - new Date(batch.completedAt).getTime() > JOB_RETENTION_MS
    ) {
      batches.delete(id);
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
