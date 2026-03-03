// ---------------------------------------------------------------------------
// TheOneCrawl — SSRF protection
// ---------------------------------------------------------------------------

export function isPrivateHost(hostname: string): boolean {
  // Block loopback
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
    return true;
  }

  // Block private IPv4 ranges
  const parts = hostname.split('.').map(Number);
  if (parts.length === 4 && parts.every((p) => !isNaN(p))) {
    const [a, b] = parts;
    if (a === 10) return true; // 10.0.0.0/8
    if (a === 172 && b !== undefined && b >= 16 && b <= 31) return true; // 172.16.0.0/12
    if (a === 192 && b === 168) return true; // 192.168.0.0/16
    if (a === 169 && b === 254) return true; // 169.254.0.0/16 (link-local)
    if (a === 0) return true; // 0.0.0.0/8
  }

  // Block common internal hostnames
  if (/^(internal|intranet|corp|private|local)\./i.test(hostname)) {
    return true;
  }

  // Block cloud metadata endpoints
  if (hostname === '169.254.169.254') return true;
  if (hostname === 'metadata.google.internal') return true;

  return false;
}
