// ---------------------------------------------------------------------------
// TheOneCrawl — Browser actions (Firecrawl-compatible)
// ---------------------------------------------------------------------------

import { z } from 'zod';
import type { Page } from 'playwright';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BrowserActionType =
  | 'wait'
  | 'click'
  | 'write'
  | 'press'
  | 'scroll'
  | 'screenshot'
  | 'executeJavascript'
  | 'scrape';

export interface BrowserAction {
  type: BrowserActionType;
  /** CSS selector (click, write) */
  selector?: string;
  /** Milliseconds (wait) */
  milliseconds?: number;
  /** Text to type (write) */
  text?: string;
  /** Key name (press) — e.g. "Enter", "Tab" */
  key?: string;
  /** Scroll direction */
  direction?: 'up' | 'down';
  /** Scroll amount in pixels */
  amount?: number;
  /** JavaScript code to execute */
  script?: string;
}

export interface ActionResult {
  type: BrowserActionType;
  success: boolean;
  /** Screenshot as base64 data URL (screenshot action) */
  screenshot?: string;
  /** Page HTML after action (scrape action) */
  html?: string;
  /** JS execution result (executeJavascript action) */
  result?: unknown;
  /** Error message if action failed */
  error?: string;
}

// ---------------------------------------------------------------------------
// Zod schema with type-specific refinements
// ---------------------------------------------------------------------------

export const browserActionSchema = z
  .object({
    type: z.enum([
      'wait',
      'click',
      'write',
      'press',
      'scroll',
      'screenshot',
      'executeJavascript',
      'scrape',
    ]),
    selector: z.string().max(500).optional(),
    milliseconds: z.number().int().min(0).max(30000).optional(),
    text: z.string().max(5000).optional(),
    key: z.string().max(50).optional(),
    direction: z.enum(['up', 'down']).optional(),
    amount: z.number().int().min(0).max(10000).optional(),
    script: z.string().max(10000).optional(),
  })
  .superRefine((action, ctx) => {
    switch (action.type) {
      case 'wait':
        if (action.milliseconds == null) {
          ctx.addIssue({ code: 'custom', message: 'wait action requires milliseconds', path: ['milliseconds'] });
        }
        break;
      case 'click':
        if (!action.selector) {
          ctx.addIssue({ code: 'custom', message: 'click action requires selector', path: ['selector'] });
        }
        break;
      case 'write':
        if (!action.selector) {
          ctx.addIssue({ code: 'custom', message: 'write action requires selector', path: ['selector'] });
        }
        if (action.text == null) {
          ctx.addIssue({ code: 'custom', message: 'write action requires text', path: ['text'] });
        }
        break;
      case 'press':
        if (!action.key) {
          ctx.addIssue({ code: 'custom', message: 'press action requires key', path: ['key'] });
        }
        break;
      case 'scroll':
        // direction defaults to 'down', amount defaults to 300
        break;
      case 'executeJavascript':
        if (!action.script) {
          ctx.addIssue({ code: 'custom', message: 'executeJavascript action requires script', path: ['script'] });
        }
        break;
      // screenshot and scrape have no required fields
    }
  });

// ---------------------------------------------------------------------------
// Headers sanitization
// ---------------------------------------------------------------------------

const BLOCKED_HEADERS = new Set([
  'host',
  'origin',
  'content-length',
  'content-encoding',
  'transfer-encoding',
  'connection',
  'upgrade',
]);

const BLOCKED_HEADER_PREFIXES = ['proxy-', 'sec-'];

export function sanitizeHeaders(headers: Record<string, string>): Record<string, string> {
  const cleaned: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    const lower = key.toLowerCase();
    if (BLOCKED_HEADERS.has(lower)) continue;
    if (BLOCKED_HEADER_PREFIXES.some((p) => lower.startsWith(p))) continue;
    cleaned[key] = value;
  }
  return cleaned;
}

// ---------------------------------------------------------------------------
// Action executor
// ---------------------------------------------------------------------------

export async function executeActions(
  page: Page,
  actions: BrowserAction[],
): Promise<ActionResult[]> {
  const results: ActionResult[] = [];

  for (const action of actions) {
    try {
      const result = await executeSingleAction(page, action);
      results.push(result);
    } catch (err) {
      results.push({
        type: action.type,
        success: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return results;
}

async function executeSingleAction(page: Page, action: BrowserAction): Promise<ActionResult> {
  switch (action.type) {
    case 'wait': {
      await page.waitForTimeout(action.milliseconds ?? 1000);
      return { type: 'wait', success: true };
    }

    case 'click': {
      await page.click(action.selector!, { timeout: 10_000 });
      // Brief wait for any resulting navigation/animation
      await page.waitForTimeout(300);
      return { type: 'click', success: true };
    }

    case 'write': {
      await page.fill(action.selector!, action.text!);
      return { type: 'write', success: true };
    }

    case 'press': {
      await page.keyboard.press(action.key!);
      await page.waitForTimeout(200);
      return { type: 'press', success: true };
    }

    case 'scroll': {
      const direction = action.direction ?? 'down';
      const amount = action.amount ?? 300;
      const delta = direction === 'down' ? amount : -amount;
      await page.evaluate((d) => window.scrollBy(0, d), delta);
      await page.waitForTimeout(200);
      return { type: 'scroll', success: true };
    }

    case 'screenshot': {
      const buffer = await page.screenshot({ type: 'jpeg', quality: 80, fullPage: false });
      const screenshot = `data:image/jpeg;base64,${buffer.toString('base64')}`;
      return { type: 'screenshot', success: true, screenshot };
    }

    case 'executeJavascript': {
      // Hard 5-second timeout to prevent infinite loops / resource exhaustion
      const JS_TIMEOUT = 5_000;
      const result = await Promise.race([
        page.evaluate(action.script!),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Script execution timed out (5s limit)')), JS_TIMEOUT),
        ),
      ]);
      return { type: 'executeJavascript', success: true, result };
    }

    case 'scrape': {
      const html = await page.content();
      return { type: 'scrape', success: true, html };
    }
  }
}
