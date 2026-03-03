import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/config/api';

interface JobItem {
  id: string;
  url: string;
  status: string;
  pages: number;
  createdAt: string;
  completedAt?: string;
}

interface JobsResponse {
  success: boolean;
  jobs: JobItem[];
  total: number;
  page: number;
  limit: number;
}

export function useJobs(page = 1) {
  return useQuery({
    queryKey: ['jobs', page],
    queryFn: () => apiFetch<JobsResponse>(`/v1/jobs?page=${page}`),
  });
}
