import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/config/api';

export function useCheckout() {
  return useMutation({
    mutationFn: async (plan: string) => {
      const res = await apiFetch<{ success: boolean; url: string }>('/v1/billing/checkout', {
        method: 'POST',
        json: { plan },
      });
      if (res.url) window.location.href = res.url;
      return res;
    },
  });
}

export function useBillingPortal() {
  return useMutation({
    mutationFn: async () => {
      const res = await apiFetch<{ success: boolean; url: string }>('/v1/billing/portal', {
        method: 'POST',
      });
      if (res.url) window.location.href = res.url;
      return res;
    },
  });
}
