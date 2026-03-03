import { describe, it, expect, vi } from 'vitest';
import { isPrivateHost, validateUrlNotPrivate } from '../ssrf.js';

describe('isPrivateHost', () => {
  it('blocks localhost', () => {
    expect(isPrivateHost('localhost')).toBe(true);
  });

  it('blocks 127.0.0.1', () => {
    expect(isPrivateHost('127.0.0.1')).toBe(true);
  });

  it('blocks ::1', () => {
    expect(isPrivateHost('::1')).toBe(true);
  });

  it('blocks 10.x.x.x', () => {
    expect(isPrivateHost('10.0.0.1')).toBe(true);
  });

  it('blocks 172.16-31.x.x', () => {
    expect(isPrivateHost('172.16.0.1')).toBe(true);
    expect(isPrivateHost('172.31.255.255')).toBe(true);
  });

  it('allows 172.32.x.x', () => {
    expect(isPrivateHost('172.32.0.1')).toBe(false);
  });

  it('blocks 192.168.x.x', () => {
    expect(isPrivateHost('192.168.1.1')).toBe(true);
  });

  it('blocks 169.254.x.x (link-local)', () => {
    expect(isPrivateHost('169.254.169.254')).toBe(true);
  });

  it('blocks 0.0.0.0', () => {
    expect(isPrivateHost('0.0.0.0')).toBe(true);
  });

  it('blocks internal hostname patterns', () => {
    expect(isPrivateHost('internal.corp.com')).toBe(true);
    expect(isPrivateHost('private.domain.com')).toBe(true);
  });

  it('blocks cloud metadata endpoints', () => {
    expect(isPrivateHost('metadata.google.internal')).toBe(true);
  });

  it('allows public IPs', () => {
    expect(isPrivateHost('8.8.8.8')).toBe(false);
    expect(isPrivateHost('1.1.1.1')).toBe(false);
  });

  it('allows public domains', () => {
    expect(isPrivateHost('example.com')).toBe(false);
    expect(isPrivateHost('api.theonecrawl.app')).toBe(false);
  });
});

describe('validateUrlNotPrivate', () => {
  it('rejects non-http protocols', async () => {
    const result = await validateUrlNotPrivate('ftp://example.com');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('http');
  });

  it('rejects invalid URLs', async () => {
    const result = await validateUrlNotPrivate('not a url');
    expect(result.valid).toBe(false);
  });

  it('rejects private hosts', async () => {
    const result = await validateUrlNotPrivate('http://localhost:3000');
    expect(result.valid).toBe(false);
  });

  it('rejects 10.x.x.x', async () => {
    const result = await validateUrlNotPrivate('http://10.0.0.1');
    expect(result.valid).toBe(false);
  });

  it('rejects 0.0.0.0', async () => {
    const result = await validateUrlNotPrivate('http://0.0.0.0');
    expect(result.valid).toBe(false);
  });

  it('allows public URLs', async () => {
    const result = await validateUrlNotPrivate('https://example.com');
    expect(result.valid).toBe(true);
  });

  it('rejects on DNS resolution failure (fail closed)', async () => {
    const result = await validateUrlNotPrivate('https://this-domain-does-not-exist-xyz123456.com');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('DNS resolution failed');
  });
});

describe('isPrivateIP — IPv6 coverage', () => {
  it('blocks IPv4-mapped loopback (::ffff:127.0.0.1)', () => {
    expect(isPrivateHost('::ffff:127.0.0.1')).toBe(true);
  });

  it('blocks IPv4-mapped 10.x.x.x (::ffff:10.0.0.1)', () => {
    expect(isPrivateHost('::ffff:10.0.0.1')).toBe(true);
  });

  it('blocks IPv4-mapped 172.16.x.x (::ffff:172.16.0.1)', () => {
    expect(isPrivateHost('::ffff:172.16.0.1')).toBe(true);
  });

  it('blocks IPv4-mapped 192.168.x.x (::ffff:192.168.1.1)', () => {
    expect(isPrivateHost('::ffff:192.168.1.1')).toBe(true);
  });

  it('blocks IPv4-mapped metadata (::ffff:169.254.169.254)', () => {
    expect(isPrivateHost('::ffff:169.254.169.254')).toBe(true);
  });

  it('allows IPv4-mapped public IP (::ffff:8.8.8.8)', () => {
    expect(isPrivateHost('::ffff:8.8.8.8')).toBe(false);
  });

  it('blocks fe80:: (link-local)', () => {
    expect(isPrivateHost('fe80::1')).toBe(true);
    expect(isPrivateHost('fe80::')).toBe(true);
  });

  it('blocks fc00:: (unique local)', () => {
    expect(isPrivateHost('fc00::1')).toBe(true);
  });

  it('blocks fd00:: (unique local)', () => {
    expect(isPrivateHost('fd12:3456::1')).toBe(true);
  });
});
