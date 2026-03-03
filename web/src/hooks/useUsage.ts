import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/config/api';

interface UsageData {
  success: boolean;
  credits: {
    total: number;
    used: number;
    remaining: number;
    resetDate: string;
    plan: string;
  };
  dailyUsage: Array<{
    date: string;
    scrape: number;
    crawl: number;
    map: number;
    extract: number;
  }>;
}

export function useUsage() {
  return useQuery({
    queryKey: ['usage'],
    queryFn: () => apiFetch<UsageData>('/v1/usage'),
  });
}
