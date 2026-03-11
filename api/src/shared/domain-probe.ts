// ---------------------------------------------------------------------------
// TheOneCrawl — Domain Intelligence probe
//
// Resolves DNS records, probes HTTP/HTTPS health, follows redirects,
// and attempts TLS certificate introspection.
// ---------------------------------------------------------------------------

import { resolve, resolveMx, resolveTxt } from 'node:dns/promises';
import * as https from 'node:https';
import { fetchWithSsrfProtection } from './ssrf.js';
import { logger } from './logger.js';

export interface DomainIntelligence {
  domain: string;
  provedAt: string;
  // DNS
  aRecords: string[];
  mxRecords: Array<{ exchange: string; priority: number }>;
  txtRecords: string[];
  // HTTP
  httpStatus?: number;
  httpsStatus?: number;
  redirectChain?: Array<{ url: string; status: number }>;
  finalUrl?: string;
  serverHeader?: string;
  poweredByHeader?: string;
  // Certificate (parsed from HTTPS probe)
  certIssuer?: string;
  certExpiry?: string;
  certDaysRemaining?: number;
  certSubjectAlt?: string[];
  // Computed
  hasValidHttps: boolean;
  isOnline: boolean;
  responseTimeMs?: number;
}

// ---------------------------------------------------------------------------
// Main probe function
// ---------------------------------------------------------------------------

export async function probeDomain(domain: string): Promise<DomainIntelligence> {
  const provedAt = new Date().toISOString();

  // Run DNS lookups and HTTP probes concurrently
  const [dnsResult, httpResult, httpsResult] = await Promise.allSettled([
    probeDns(domain),
    probeHttp(domain),
    probeHttps(domain),
  ]);

  const dns = dnsResult.status === 'fulfilled' ? dnsResult.value : { aRecords: [], mxRecords: [], txtRecords: [] };
  const http = httpResult.status === 'fulfilled' ? httpResult.value : null;
  const httpsProbe = httpsResult.status === 'fulfilled' ? httpsResult.value : null;

  const isOnline = (http !== null && (http.status ?? 0) > 0) || (httpsProbe !== null && (httpsProbe.status ?? 0) > 0);

  return {
    domain,
    provedAt,
    // DNS
    aRecords: dns.aRecords,
    mxRecords: dns.mxRecords,
    txtRecords: dns.txtRecords,
    // HTTP
    httpStatus: http?.status,
    httpsStatus: httpsProbe?.status,
    redirectChain: httpsProbe?.redirectChain ?? http?.redirectChain,
    finalUrl: httpsProbe?.finalUrl ?? http?.finalUrl,
    serverHeader: httpsProbe?.serverHeader ?? http?.serverHeader,
    poweredByHeader: httpsProbe?.poweredByHeader ?? http?.poweredByHeader,
    // Certificate
    certIssuer: httpsProbe?.certIssuer,
    certExpiry: httpsProbe?.certExpiry,
    certDaysRemaining: httpsProbe?.certDaysRemaining,
    certSubjectAlt: httpsProbe?.certSubjectAlt,
    // Computed
    hasValidHttps: httpsProbe?.hasValidHttps ?? false,
    isOnline,
    responseTimeMs: httpsProbe?.responseTimeMs ?? http?.responseTimeMs,
  };
}

// ---------------------------------------------------------------------------
// DNS probing
// ---------------------------------------------------------------------------

interface DnsResult {
  aRecords: string[];
  mxRecords: Array<{ exchange: string; priority: number }>;
  txtRecords: string[];
}

async function probeDns(domain: string): Promise<DnsResult> {
  const [aResult, mxResult, txtResult] = await Promise.allSettled([
    resolve(domain),
    resolveMx(domain),
    resolveTxt(domain),
  ]);

  const aRecords = aResult.status === 'fulfilled' ? aResult.value : [];
  const mxRecords =
    mxResult.status === 'fulfilled'
      ? mxResult.value.map((r) => ({ exchange: r.exchange, priority: r.priority }))
      : [];
  const txtRecords =
    txtResult.status === 'fulfilled'
      ? txtResult.value.map((r) => (Array.isArray(r) ? r.join('') : r))
      : [];

  return { aRecords, mxRecords, txtRecords };
}

// ---------------------------------------------------------------------------
// HTTP probe (follows redirects manually, records chain)
// ---------------------------------------------------------------------------

interface HttpProbeResult {
  status?: number;
  redirectChain: Array<{ url: string; status: number }>;
  finalUrl?: string;
  serverHeader?: string;
  poweredByHeader?: string;
  responseTimeMs: number;
}

async function probeHttp(domain: string): Promise<HttpProbeResult> {
  const url = `http://${domain}`;
  return probeWithRedirects(url);
}

async function probeWithRedirects(startUrl: string, maxHops = 5): Promise<HttpProbeResult> {
  const redirectChain: Array<{ url: string; status: number }> = [];
  let currentUrl = startUrl;
  const start = Date.now();

  for (let i = 0; i <= maxHops; i++) {
    let resp: Response;
    try {
      resp = await fetchWithSsrfProtection(currentUrl, {
        method: 'HEAD',
        headers: { 'User-Agent': 'TheOneCrawl/1.0 (+https://theonecrawl.app/bot; compatible)' },
        redirect: 'manual',
        signal: AbortSignal.timeout(10_000),
      } as RequestInit, 0);
    } catch {
      break;
    }

    redirectChain.push({ url: currentUrl, status: resp.status });

    if (resp.status >= 300 && resp.status < 400) {
      const location = resp.headers.get('location');
      if (!location) break;
      currentUrl = new URL(location, currentUrl).href;
      continue;
    }

    // Final response
    const serverHeader = resp.headers.get('server') ?? undefined;
    const poweredByHeader = resp.headers.get('x-powered-by') ?? undefined;

    return {
      status: resp.status,
      redirectChain,
      finalUrl: currentUrl,
      serverHeader,
      poweredByHeader,
      responseTimeMs: Date.now() - start,
    };
  }

  // Could not get final response
  const last = redirectChain[redirectChain.length - 1];
  return {
    status: last?.status,
    redirectChain,
    finalUrl: currentUrl,
    responseTimeMs: Date.now() - start,
  };
}

// ---------------------------------------------------------------------------
// HTTPS probe (TLS certificate introspection)
// ---------------------------------------------------------------------------

interface HttpsProbeResult extends HttpProbeResult {
  certIssuer?: string;
  certExpiry?: string;
  certDaysRemaining?: number;
  certSubjectAlt?: string[];
  hasValidHttps: boolean;
}

async function probeHttps(domain: string): Promise<HttpsProbeResult> {
  const start = Date.now();

  // Step 1: Get TLS certificate info via native https.request
  const certInfo = await getCertInfo(domain);

  // Step 2: Probe HTTP with redirect tracking
  let httpResult: HttpProbeResult;
  try {
    httpResult = await probeWithRedirects(`https://${domain}`);
  } catch {
    return {
      redirectChain: [],
      responseTimeMs: Date.now() - start,
      ...certInfo,
      hasValidHttps: false,
    };
  }

  return {
    ...httpResult,
    hasValidHttps: certInfo.hasValidHttps,
    certIssuer: certInfo.certIssuer,
    certExpiry: certInfo.certExpiry,
    certDaysRemaining: certInfo.certDaysRemaining,
    certSubjectAlt: certInfo.certSubjectAlt,
  };
}

// ---------------------------------------------------------------------------
// TLS certificate parsing
// ---------------------------------------------------------------------------

interface CertResult {
  certIssuer?: string;
  certExpiry?: string;
  certDaysRemaining?: number;
  certSubjectAlt?: string[];
  hasValidHttps: boolean;
}

function getCertInfo(domain: string): Promise<CertResult> {
  return new Promise((resolve) => {
    try {
      const req = https.request(
        {
          hostname: domain,
          port: 443,
          path: '/',
          method: 'HEAD',
          timeout: 10_000,
          headers: {
            'User-Agent': 'TheOneCrawl/1.0 (+https://theonecrawl.app/bot; compatible)',
          },
          // Allow checking expired/self-signed certs without throwing before we inspect
          rejectUnauthorized: false,
        },
        (res) => {
          try {
            const socket = res.socket as import('node:tls').TLSSocket;
            const cert = socket.getPeerCertificate(false);

            if (!cert || !cert.valid_to) {
              res.destroy();
              return resolve({ hasValidHttps: false });
            }

            const expiry = new Date(cert.valid_to);
            const now = new Date();
            const daysRemaining = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            const hasValidHttps = daysRemaining > 0 && socket.authorized;

            // Extract SANs (subjectaltname is a comma-separated string like "DNS:example.com, DNS:*.example.com")
            const sanRaw: string = (cert.subjectaltname as string | undefined) ?? '';
            const certSubjectAlt = sanRaw
              .split(',')
              .map((s) => s.replace(/^DNS:|^IP Address:/i, '').trim())
              .filter(Boolean);

            // Issuer organization
            const issuerO = (cert.issuer as Record<string, string> | undefined)?.O ?? undefined;

            res.destroy();
            resolve({
              hasValidHttps,
              certIssuer: issuerO,
              certExpiry: expiry.toISOString(),
              certDaysRemaining: daysRemaining,
              certSubjectAlt: certSubjectAlt.length > 0 ? certSubjectAlt : undefined,
            });
          } catch (err) {
            logger.debug('Cert parse error', { domain, error: err instanceof Error ? err.message : String(err) });
            res.destroy();
            resolve({ hasValidHttps: false });
          }
        },
      );

      req.on('error', () => resolve({ hasValidHttps: false }));
      req.on('timeout', () => {
        req.destroy();
        resolve({ hasValidHttps: false });
      });
      req.end();
    } catch {
      resolve({ hasValidHttps: false });
    }
  });
}
