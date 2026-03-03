// ---------------------------------------------------------------------------
// TheOneCrawl — In-memory job queue with worker loop
// ---------------------------------------------------------------------------

import { nanoid } from 'nanoid';
import { crawlWebsite } from './crawler.js';
import { downloadMedia } from './media-processor.js';
import { convertToHeaderBlock, convertToFooterBlock, generateThemeSuggestion } from './converter.js';
import { toMarkdown } from './markdown-converter.js';
import { consumeCredit } from '../billing/credits.js';
import { sendWebhook } from '../shared/webhooks.js';
import type {
  CrawlJob,
  CrawlOptions,
  CrawlProgress,
} from './types.js';
import type { JobStore } from '../shared/job-store.js';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { mkdir } from 'node:fs/promises';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const MAX_QUEUE_SIZE = 100;
const WORKER_POLL_INTERVAL_MS = 500;
const MAX_CONCURRENT_JOBS = 3;
const JOB_RETENTION_MS = 60 * 60 * 1000; // 1 hour

// ---------------------------------------------------------------------------
// In-memory storage
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
      queue.push(job.id);
      count++;
    }
  }
  if (count > 0) {
    startWorker();
    console.info(`[queue] Restored ${count} pending jobs from Cosmos DB`);
  }
  return count;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function enqueue(
  accountId: string,
  url: string,
  options: CrawlOptions,
  webhookUrl?: string,
): string {
  if (queue.length >= MAX_QUEUE_SIZE) {
    throw new Error('Queue is full. Please try again later.');
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
  queue.push(id);

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
}

export function deleteJob(jobId: string): boolean {
  const job = jobs.get(jobId);
  if (!job) return false;

  const queueIndex = queue.indexOf(jobId);
  if (queueIndex !== -1) {
    queue.splice(queueIndex, 1);
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

      while (activeJobCount < MAX_CONCURRENT_JOBS && queue.length > 0) {
        const jobId = queue.shift();
        if (!jobId) break;

        const job = jobs.get(jobId);
        if (!job || job.status !== 'queued') continue;

        activeJobCount++;
        processJob(job).finally(() => {
          activeJobCount--;
        });
      }

      if (queue.length === 0 && activeJobCount === 0) {
        workerRunning = false;
        break;
      }

      await sleep(WORKER_POLL_INTERVAL_MS);
    }
  };

  loop().catch((err) => {
    console.error('[queue] Worker loop crashed:', err);
    workerRunning = false;
  });
}

export function stopWorker(): void {
  workerRunning = false;
}

// ---------------------------------------------------------------------------
// Job processing
// ---------------------------------------------------------------------------

async function processJob(job: CrawlJob): Promise<void> {
  const startTime = Date.now();

  // Send started webhook
  if (job.webhookUrl) {
    void sendWebhook(job.webhookUrl, 'crawl.started', {
      id: job.id,
      url: job.url,
    });
  }

  try {
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
        });
      }
      return;
    }

    // Phase 1: Crawling
    updateJob(job.id, { status: 'crawling' });

    const result = await crawlWebsite(
      job.url,
      job.options,
      (progress: CrawlProgress) => {
        updateJob(job.id, { progress });

        // Send page webhook
        if (job.webhookUrl && progress.pagesCompleted > 0) {
          void sendWebhook(job.webhookUrl, 'crawl.page', {
            id: job.id,
            completed: progress.pagesCompleted,
            total: progress.pagesQueued,
          });
        }
      },
    );

    const currentJob = getJob(job.id);
    if (!currentJob || currentJob.status === 'failed') return;

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
    if (!currentJob2 || currentJob2.status === 'failed') return;

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

    // Phase 4: Complete
    updateJob(job.id, {
      status: 'complete',
      result,
      completedAt: new Date().toISOString(),
    });

    const duration = Date.now() - startTime;
    console.info(
      `[queue] Job ${job.id} completed in ${duration}ms — ` +
      `${result.pages.length} pages, ${result.media.length} media assets`,
    );

    // Send completed webhook
    if (job.webhookUrl) {
      void sendWebhook(job.webhookUrl, 'crawl.completed', {
        id: job.id,
        status: 'completed',
        total: result.pages.length,
      });
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error during crawl';

    console.error(`[queue] Job ${job.id} failed:`, err);
    updateJob(job.id, {
      status: 'failed',
      error: errorMessage,
    });

    if (job.webhookUrl) {
      void sendWebhook(job.webhookUrl, 'crawl.failed', {
        id: job.id,
        error: errorMessage,
      });
    }
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

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
