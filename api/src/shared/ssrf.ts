// ---------------------------------------------------------------------------
// TheOneCrawl — SSRF protection
// ---------------------------------------------------------------------------

import { lookup } from 'node:dns/promises';

export function isPrivateHost(hostname: string): boolean {
  // Block loopback
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
    return true;
  }

  if (isPrivateIP(hostname)) return true;

  // Block common internal hostnames
  if (/^(internal|intranet|corp|private|local)\./i.test(hostname)) {
    return true;
  }

  // Block cloud metadata endpoints
  if (hostname === '169.254.169.254') return true;
  if (hostname === 'metadata.google.internal') return true;
  if (hostname === 'metadata.google.com') return true;

  return false;
}

/**
 * Resolve hostname and verify the IP is not private.
 * Prevents DNS rebinding attacks where the hostname resolves to a private IP.
 * Fails closed: if DNS resolution fails, the request is blocked.
 */
export async function validateUrlNotPrivate(url: string): Promise<{ valid: boolean; error?: string }> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { valid: false, error: 'Invalid URL' };
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return { valid: false, error: 'URL must use http or https protocol' };
  }

  // Quick hostname check first
  if (isPrivateHost(parsed.hostname)) {
    return { valid: false, error: 'Cannot access private or internal addresses' };
  }

  // DNS resolution check (prevents DNS rebinding) — fail closed
  try {
    const { address } = await lookup(parsed.hostname);
    if (isPrivateIP(address)) {
      return { valid: false, error: 'Cannot access private or internal addresses' };
    }
  } catch {
    // DNS resolution failed — fail closed to prevent SSRF via unresolvable hosts
    return { valid: false, error: 'DNS resolution failed' };
  }

  return { valid: true };
}

/**
 * Follow redirects manually with SSRF validation at each hop.
 * Returns the final response or throws on SSRF violation.
 */
export async function fetchWithSsrfProtection(
  url: string,
  init: RequestInit = {},
  maxRedirects = 5,
): Promise<Response> {
  let currentUrl = url;

  for (let i = 0; i <= maxRedirects; i++) {
    const check = await validateUrlNotPrivate(currentUrl);
    if (!check.valid) {
      throw new Error(check.error ?? 'Cannot access private or internal addresses');
    }

    const resp = await fetch(currentUrl, {
      ...init,
      redirect: 'manual',
    });

    // Not a redirect — return
    if (resp.status < 300 || resp.status >= 400) {
      return resp;
    }

    // Extract Location header for redirect
    const location = resp.headers.get('location');
    if (!location) {
      return resp; // No Location header — return as-is
    }

    // Resolve relative redirects
    currentUrl = new URL(location, currentUrl).href;
  }

  throw new Error('Too many redirects');
}

function isPrivateIP(ip: string): boolean {
  // IPv4 checks
  const parts = ip.split('.').map(Number);
  if (parts.length === 4 && parts.every((p) => !isNaN(p))) {
    const [a, b] = parts;
    if (a === 0) return true; // 0.0.0.0/8
    if (a === 127) return true; // 127.0.0.0/8
    if (a === 10) return true; // 10.0.0.0/8
    if (a === 172 && b !== undefined && b >= 16 && b <= 31) return true; // 172.16.0.0/12
    if (a === 192 && b === 168) return true; // 192.168.0.0/16
    if (a === 169 && b === 254) return true; // 169.254.0.0/16 (link-local)
  }

  // IPv6 loopback and unspecified
  if (ip === '::1' || ip === '::' || ip === '0.0.0.0') return true;

  // IPv4-mapped IPv6 addresses (::ffff:x.x.x.x)
  const v4MappedMatch = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (v4MappedMatch) {
    return isPrivateIP(v4MappedMatch[1]!);
  }

  // Normalize IPv6 for prefix checks
  const lower = ip.toLowerCase();

  // fe80::/10 — link-local
  if (lower.startsWith('fe80:') || lower.startsWith('fe80')) return true;

  // fc00::/7 — unique local (fc00::/8 + fd00::/8)
  if (lower.startsWith('fc') || lower.startsWith('fd')) return true;

  // ::ffff: prefix without dotted-decimal (e.g., ::ffff:7f00:1 = 127.0.0.1)
  const ffmpMatch = lower.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
  if (ffmpMatch) {
    const hi = parseInt(ffmpMatch[1]!, 16);
    const lo = parseInt(ffmpMatch[2]!, 16);
    const a = (hi >> 8) & 0xff;
    const b = hi & 0xff;
    const c = (lo >> 8) & 0xff;
    const d = lo & 0xff;
    return isPrivateIP(`${a}.${b}.${c}.${d}`);
  }

  return false;
}
