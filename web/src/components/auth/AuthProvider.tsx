import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { apiFetch } from '@/config/api';

interface Account {
  id: string;
  email: string;
  name: string;
  plan: string;
}

interface AuthState {
  account: Account | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await apiFetch<{ success: boolean; account: Account }>('/v1/auth/me');
      if (res.success) setAccount(res.account);
      else setAccount(null);
    } catch {
      setAccount(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = async (email: string, password: string) => {
    const res = await apiFetch<{ success: boolean; account: Account }>('/v1/auth/login', {
      method: 'POST',
      json: { email, password },
    });
    setAccount(res.account);
  };

  const register = async (email: string, password: string, name: string) => {
    const res = await apiFetch<{ success: boolean; account: Account }>('/v1/auth/register', {
      method: 'POST',
      json: { email, password, name },
    });
    setAccount(res.account);
  };

  const logout = async () => {
    await apiFetch('/v1/auth/logout', { method: 'POST' });
    setAccount(null);
  };

  return (
    <AuthContext.Provider value={{ account, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
