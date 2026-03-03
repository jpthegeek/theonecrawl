import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock cosmos before importing credits
vi.mock('../../shared/cosmos.js', () => ({
  cosmosUpsert: vi.fn().mockResolvedValue({}),
  cosmosRead: vi.fn().mockResolvedValue(null),
  isCosmosConfigured: vi.fn().mockReturnValue(true),
}));

// Mock nanoid
vi.mock('nanoid', () => ({
  nanoid: () => 'test1234567890ab',
}));

import { recordUsageEvent } from '../credits.js';
import { cosmosUpsert, isCosmosConfigured } from '../../shared/cosmos.js';

describe('recordUsageEvent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (isCosmosConfigured as ReturnType<typeof vi.fn>).mockReturnValue(true);
    (cosmosUpsert as ReturnType<typeof vi.fn>).mockResolvedValue({});
  });

  it('writes a usage_event document to the billing container', async () => {
    recordUsageEvent('acct_123', 'scrape', 1, 'https://example.com');

    // Allow the fire-and-forget promise to resolve
    await vi.waitFor(() => {
      expect(cosmosUpsert).toHaveBeenCalledTimes(1);
    });

    const [container, doc] = (cosmosUpsert as ReturnType<typeof vi.fn>).mock.calls[0]!;
    expect(container).toBe('billing');
    expect(doc).toMatchObject({
      id: expect.stringContaining('usage_'),
      account_id: 'acct_123',
      type: 'usage_event',
      operation: 'scrape',
      credits: 1,
      url: 'https://example.com',
      created_at: expect.any(String),
    });
  });

  it('writes without url when not provided', async () => {
    recordUsageEvent('acct_123', 'map', 1);

    await vi.waitFor(() => {
      expect(cosmosUpsert).toHaveBeenCalledTimes(1);
    });

    const [, doc] = (cosmosUpsert as ReturnType<typeof vi.fn>).mock.calls[0]!;
    expect(doc.url).toBeUndefined();
    expect(doc.operation).toBe('map');
  });

  it('skips write when Cosmos is not configured', () => {
    (isCosmosConfigured as ReturnType<typeof vi.fn>).mockReturnValue(false);
    recordUsageEvent('acct_123', 'scrape', 1, 'https://example.com');
    expect(cosmosUpsert).not.toHaveBeenCalled();
  });

  it('does not throw when cosmosUpsert fails', async () => {
    (cosmosUpsert as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Cosmos error'));

    // Should not throw
    expect(() => recordUsageEvent('acct_123', 'scrape', 1)).not.toThrow();

    // Allow the promise to settle
    await new Promise((resolve) => setTimeout(resolve, 10));
  });

  it('records correct credits for extract operation', async () => {
    recordUsageEvent('acct_456', 'extract', 5, 'https://example.com');

    await vi.waitFor(() => {
      expect(cosmosUpsert).toHaveBeenCalledTimes(1);
    });

    const [, doc] = (cosmosUpsert as ReturnType<typeof vi.fn>).mock.calls[0]!;
    expect(doc.credits).toBe(5);
    expect(doc.operation).toBe('extract');
  });
});
