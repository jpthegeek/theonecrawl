import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/config/api';

interface AccountData {
  success: boolean;
  account: {
    id: string;
    email: string;
    name: string;
    plan: string;
    email_verified: boolean;
    stripe_customer_id?: string;
    created_at: string;
    updated_at: string;
  };
}

export function useAccount() {
  return useQuery({
    queryKey: ['account'],
    queryFn: () => apiFetch<AccountData>('/v1/account'),
    select: (data) => data.account,
  });
}

export function useUpdateAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { name?: string; password?: string }) =>
      apiFetch<AccountData>('/v1/account', { method: 'PATCH', json: body }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['account'] }),
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: () =>
      apiFetch<{ success: boolean }>('/v1/account', { method: 'DELETE' }),
  });
}
