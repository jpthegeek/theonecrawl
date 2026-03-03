const API_URL = import.meta.env.VITE_API_URL || '';

interface FetchOptions extends RequestInit {
  json?: unknown;
}

export async function apiFetch<T = unknown>(path: string, options: FetchOptions = {}): Promise<T> {
  const { json, headers: extraHeaders, ...rest } = options;

  const headers: Record<string, string> = {
    ...(extraHeaders as Record<string, string>),
  };

  let body: string | undefined;
  if (json) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(json);
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers,
    body,
    credentials: 'include',
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new ApiError(data.error || `Request failed (${res.status})`, res.status);
  }

  return res.json() as Promise<T>;
}

export class ApiError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}
