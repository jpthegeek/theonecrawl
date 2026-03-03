import { useMutation, useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/config/api';

export function useApiQuery<T>(key: string[], path: string, enabled = true) {
  return useQuery<T>({
    queryKey: key,
    queryFn: () => apiFetch<T>(path),
    enabled,
  });
}

export function useApiMutation<TData = unknown, TBody = unknown>(
  path: string,
  method: 'POST' | 'PATCH' | 'DELETE' = 'POST',
) {
  return useMutation<TData, Error, TBody>({
    mutationFn: (body) =>
      apiFetch<TData>(path, {
        method,
        json: method !== 'DELETE' ? body : undefined,
      }),
  });
}
