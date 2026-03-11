// ---------------------------------------------------------------------------
// TheOneCrawl — Monitor scheduler
//
// In-process scheduler that polls every 60 seconds for monitors that are due,
// runs the crawl, compares content hashes, and fires webhooks on changes.
//
// For single-replica deployments (current). For multi-replica, a Redis-based
// distributed lock would be needed (tracked as future tech debt).
// ---------------------------------------------------------------------------

import { createHash } from 'node:crypto';
import { nanoid } from 'nanoid';
import { loadDueMonitors, saveMonitor, saveMonitorCheck } from '../shared/monitor-store.js';
import { sendWebhook } from '../shared/webhooks.js';
import { crawlSinglePage } from './crawler.js';
import { toMarkdown } from './markdown-converter.js';
import { consumeCredits, checkCredits, ensureHydrated, refundCredits } from '../billing/credits.js';
import { logger } from '../shared/logger.js';
import { CREDIT_COSTS, MONITOR_FREQUENCY_MS } from '../shared/constants.js';
import { getGateway, CLAUDE_MODEL } from '../shared/anthropic.js';
import type { Monitor, MonitorCheck } from './types.js';

// ---------------------------------------------------------------------------
// Scheduler state
// ---------------------------------------------------------------------------

let schedulerTimer: ReturnType<typeof setInterval> | null = null;
const POLL_INTERVAL_MS = 60_000; // Check every 60 seconds
const MAX_CONTENT_HASH_LENGTH = 50_000; // 50 KB max stored markdown

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function startMonitorScheduler(): void {
  if (schedulerTimer) return;

  // Run immediately on start, then every 60s
  void runDueMonitors();
  schedulerTimer = setInterval(() => {
    void runDueMonitors();
  }, POLL_INTERVAL_MS);

  logger.info('Monitor scheduler started');
}

export function stopMonitorScheduler(): void {
  if (schedulerTimer) {
    clearInterval(schedulerTimer);
    schedulerTimer = null;
    logger.info('Monitor scheduler stopped');
  }
}

// ---------------------------------------------------------------------------
// Core scheduler loop
// ---------------------------------------------------------------------------

async function runDueMonitors(): Promise<void> {
  const nowIso = new Date().toISOString();
  let dueMonitors: Monitor[];

  try {
    dueMonitors = await loadDueMonitors(nowIso);
  } catch (err) {
    logger.error('Monitor scheduler: failed to load due monitors', {
      error: err instanceof Error ? err.message : String(err),
    });
    return;
  }

  if (dueMonitors.length === 0) return;

  logger.info(`Monitor scheduler: processing ${dueMonitors.length} due monitor(s)`);

  // Run monitors serially to avoid overwhelming the crawler
  for (const monitor of dueMonitors) {
    await checkMonitor(monitor);
  }
}

// ---------------------------------------------------------------------------
// Per-monitor check
// ---------------------------------------------------------------------------

async function checkMonitor(monitor: Monitor): Promise<void> {
  const checkedAt = new Date().toISOString();
  let creditsUsed = 0;

  try {
    // Ensure credits are loaded
    await ensureHydrated(monitor.accountId);

    const credits = checkCredits(monitor.accountId);
    const needed = CREDIT_COSTS.monitor_check;

    if (credits.remaining < needed) {
      logger.warn('Monitor paused: insufficient credits', { monitorId: monitor.id, accountId: monitor.accountId });
      await pauseMonitor(monitor, 'Insufficient credits for scheduled check');
      return;
    }

    // Consume credits before crawl
    const consumed = consumeCredits(monitor.accountId, needed);
    if (consumed < needed) {
      await pauseMonitor(monitor, 'Insufficient credits for scheduled check');
      return;
    }
    creditsUsed += consumed;

    // Crawl the URL
    let pageMarkdown: string;
    try {
      const page = await crawlSinglePage(monitor.url, {
        maxPages: 1,
        maxDepth: 0,
        extractMedia: false,
        convertToBlocks: false,
        waitForJs: true,
        viewport: { width: 1440, height: 900 },
        timeout: 30_000,
        respectRobotsTxt: true,
        userAgent: 'TheOneCrawl/1.0 (+https://theonecrawl.app/bot; compatible)',
        onlyMainContent: true,
        formats: ['markdown'],
      });
      pageMarkdown = toMarkdown(page.extractedContent, { onlyMainContent: true });
    } catch (err) {
      creditsUsed = 0;
      refundCredits(monitor.accountId, consumed);
      await handleMonitorError(monitor, checkedAt, err instanceof Error ? err.message : String(err));
      return;
    }

    // Compute content hash
    const contentHash = createHash('sha256').update(pageMarkdown).digest('hex');
    const previousHash = monitor.lastContentHash;
    const changed = previousHash !== undefined && contentHash !== previousHash;

    // Determine what kind of change
    let changeDetected: MonitorCheck['changeDetected'] | undefined;
    let keywordsMatched: string[] | undefined;
    let diffSummary: string | undefined;

    if (changed || previousHash === undefined) {
      if (previousHash !== undefined) {
        // Detect change type
        if (monitor.changeType === 'keyword_alert' && monitor.keywords && monitor.keywords.length > 0) {
          const prevMarkdownLower = (monitor.lastMarkdown ?? '').toLowerCase();
          const newMarkdownLower = pageMarkdown.toLowerCase();

          const appeared = monitor.keywords.filter(
            (kw) => !prevMarkdownLower.includes(kw.toLowerCase()) && newMarkdownLower.includes(kw.toLowerCase()),
          );
          const disappeared = monitor.keywords.filter(
            (kw) => prevMarkdownLower.includes(kw.toLowerCase()) && !newMarkdownLower.includes(kw.toLowerCase()),
          );

          if (appeared.length > 0) {
            changeDetected = 'keyword_appeared';
            keywordsMatched = appeared;
          } else if (disappeared.length > 0) {
            changeDetected = 'keyword_disappeared';
            keywordsMatched = disappeared;
          }
          // No keyword change → don't treat as significant even if hash changed
        } else if (monitor.changeType === 'significant_change') {
          // Use AI to determine if the change is significant
          const aiResult = await analyzeChangeSignificance(
            monitor,
            monitor.lastMarkdown ?? '',
            pageMarkdown,
          );
          if (aiResult.significant) {
            changeDetected = 'significant_change';
            diffSummary = aiResult.summary;
            creditsUsed += CREDIT_COSTS.monitor_ai_analysis;
          }
        } else {
          // any_change
          changeDetected = 'content_change';
          const prevLines = (monitor.lastMarkdown ?? '').split('\n').length;
          const newLines = pageMarkdown.split('\n').length;
          diffSummary = `Content changed: ${prevLines} → ${newLines} lines`;
        }
      }
    }

    // Save check record
    const checkRecord: MonitorCheck = {
      id: `chk_${nanoid()}`,
      monitorId: monitor.id,
      accountId: monitor.accountId,
      type: 'monitor_check',
      checkedAt,
      contentHash,
      changed: changeDetected !== undefined,
      changeDetected,
      keywordsMatched,
      diffSummary,
      creditsUsed,
    };
    await saveMonitorCheck(checkRecord);

    // Update monitor state
    const nextCheckAt = computeNextCheckAt(monitor.frequency);
    const updatedMonitor: Monitor = {
      ...monitor,
      lastCheckedAt: checkedAt,
      lastContentHash: contentHash,
      lastMarkdown: pageMarkdown.slice(0, MAX_CONTENT_HASH_LENGTH),
      nextCheckAt,
      errorCount: 0,
      lastError: undefined,
      updatedAt: checkedAt,
      ...(changeDetected ? { lastChangedAt: checkedAt } : {}),
    };
    await saveMonitor(updatedMonitor);

    // Fire webhook if change detected
    if (changeDetected && monitor.webhookUrl) {
      const event = changeDetected === 'keyword_appeared' || changeDetected === 'keyword_disappeared'
        ? 'monitor.keyword_alert' as const
        : 'monitor.changed' as const;

      void sendWebhook(
        monitor.webhookUrl,
        event,
        {
          monitorId: monitor.id,
          url: monitor.url,
          name: monitor.name,
          changeType: changeDetected,
          keywordsMatched,
          diffSummary,
          checkedAt,
          checkId: checkRecord.id,
        },
        monitor.webhookSecret,
        monitor.accountId,
      ).catch((err) => {
        logger.error('Monitor webhook delivery failed', {
          monitorId: monitor.id,
          error: err instanceof Error ? err.message : String(err),
        });
      });
    }

  } catch (err) {
    logger.error('Monitor check failed unexpectedly', {
      monitorId: monitor.id,
      error: err instanceof Error ? err.message : String(err),
    });
    await handleMonitorError(monitor, checkedAt, err instanceof Error ? err.message : String(err));
  }
}

// ---------------------------------------------------------------------------
// AI significance analysis
// ---------------------------------------------------------------------------

async function analyzeChangeSignificance(
  monitor: Monitor,
  previousMarkdown: string,
  newMarkdown: string,
): Promise<{ significant: boolean; summary?: string }> {
  const gateway = getGateway();
  if (!gateway) {
    // If AI not configured, treat all changes as significant
    return { significant: true, summary: 'Content changed (AI analysis unavailable)' };
  }

  const credits = checkCredits(monitor.accountId);
  if (credits.remaining < CREDIT_COSTS.monitor_ai_analysis) {
    return { significant: true, summary: 'Content changed (AI analysis skipped: low credits)' };
  }

  // Consume AI credits before call
  const consumed = consumeCredits(monitor.accountId, CREDIT_COSTS.monitor_ai_analysis);
  if (consumed < CREDIT_COSTS.monitor_ai_analysis) {
    return { significant: true, summary: 'Content changed (AI analysis skipped: low credits)' };
  }

  try {
    const prevSnippet = previousMarkdown.slice(0, 8_000);
    const newSnippet = newMarkdown.slice(0, 8_000);

    const response = await gateway.chat({
      tenantId: monitor.accountId,
      feature: 'monitor-significance',
      provider: 'anthropic',
      system: 'You are a web change analyst. Determine if a page change is significant (meaningful content change vs trivial noise like ad rotation, timestamps, minor copy tweaks). Return JSON: {"significant": boolean, "summary": "brief one-sentence description of what changed or why it is not significant"}',
      messages: [{
        role: 'user',
        content: `URL: ${monitor.url}\n\nPREVIOUS CONTENT:\n${prevSnippet}\n\nNEW CONTENT:\n${newSnippet}`,
      }],
      model: CLAUDE_MODEL,
      maxTokens: 256,
    });

    try {
      const raw = response.content;
      const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/) ?? [null, raw];
      const parsed = JSON.parse(jsonMatch[1]?.trim() ?? raw) as { significant: boolean; summary?: string };
      return { significant: !!parsed.significant, summary: parsed.summary };
    } catch {
      return { significant: true, summary: response.content.slice(0, 200) };
    }
  } catch (err) {
    // Refund AI credits on failure
    refundCredits(monitor.accountId, CREDIT_COSTS.monitor_ai_analysis);
    logger.error('Monitor AI significance analysis failed', {
      monitorId: monitor.id,
      error: err instanceof Error ? err.message : String(err),
    });
    return { significant: true, summary: 'Content changed (AI analysis failed)' };
  }
}

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------

const MAX_CONSECUTIVE_ERRORS = 5;

async function handleMonitorError(monitor: Monitor, checkedAt: string, errorMessage: string): Promise<void> {
  const newErrorCount = monitor.errorCount + 1;
  const shouldPause = newErrorCount >= MAX_CONSECUTIVE_ERRORS;

  const updatedMonitor: Monitor = {
    ...monitor,
    errorCount: newErrorCount,
    lastError: errorMessage,
    lastCheckedAt: checkedAt,
    nextCheckAt: computeNextCheckAt(monitor.frequency),
    status: shouldPause ? 'error' : monitor.status,
    updatedAt: checkedAt,
  };

  await saveMonitor(updatedMonitor).catch((e) => {
    logger.error('Failed to save monitor error state', {
      monitorId: monitor.id,
      error: e instanceof Error ? e.message : String(e),
    });
  });

  if (shouldPause && monitor.webhookUrl) {
    void sendWebhook(
      monitor.webhookUrl,
      'monitor.error',
      {
        monitorId: monitor.id,
        url: monitor.url,
        name: monitor.name,
        error: errorMessage,
        consecutiveErrors: newErrorCount,
        checkedAt,
      },
      monitor.webhookSecret,
      monitor.accountId,
    ).catch(() => {
      // Non-fatal
    });
  }
}

async function pauseMonitor(monitor: Monitor, reason: string): Promise<void> {
  const updatedMonitor: Monitor = {
    ...monitor,
    status: 'paused',
    lastError: reason,
    updatedAt: new Date().toISOString(),
  };
  await saveMonitor(updatedMonitor).catch(() => {
    // Non-fatal
  });
}

// ---------------------------------------------------------------------------
// Scheduling helpers
// ---------------------------------------------------------------------------

function computeNextCheckAt(frequency: Monitor['frequency']): string {
  const intervalMs = MONITOR_FREQUENCY_MS[frequency];
  return new Date(Date.now() + intervalMs).toISOString();
}
