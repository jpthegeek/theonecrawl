import { writeAudit, extractAuditContext, diffChanges } from '@theonefamily/audit';
import type { WriteAuditOptions } from '@theonefamily/audit';
import { cosmosCreate } from './cosmos.js';

export { extractAuditContext, diffChanges };

const cosmosWrite = (container: string, doc: Record<string, unknown>) =>
  cosmosCreate(container, doc as any);

export function auditLog(options: Omit<WriteAuditOptions, 'source'>): void {
  writeAudit(cosmosWrite, { ...options, source: 'crawl' }).catch(() => {});
}
