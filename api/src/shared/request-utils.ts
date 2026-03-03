// ---------------------------------------------------------------------------
// TheOneCrawl — Shared request utilities
// ---------------------------------------------------------------------------

/**
 * Extract the client IP from the X-Forwarded-For header.
 * Uses the LAST entry (set by the trusted proxy / Azure Container App LB),
 * not the first (which is client-controlled and spoofable).
 */
export function extractClientIp(c: { req: { header: (name: string) => string | undefined } }): string {
  const xff = c.req.header('x-forwarded-for');
  if (xff) {
    const parts = xff.split(',').map((s) => s.trim()).filter(Boolean);
    // Last entry is set by the trusted proxy
    return parts[parts.length - 1] || 'unknown';
  }
  return 'unknown';
}
