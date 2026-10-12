const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)
  ?? (import.meta.env.PROD ? 'https://admin.sudiptawebsolutions.com/api' : 'http://127.0.0.1:8080/api');

export type ApiResponse = {
  ok: boolean;
  message: string;
  id?: number;
  [key: string]: unknown;
};

type RequestOptions = {
  method?: 'GET' | 'POST';
  payload?: unknown;
  token?: string;
};

async function apiRequest(path: string, options: RequestOptions = {}): Promise<ApiResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
    headers['X-Admin-Key'] = options.token;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.payload !== undefined ? JSON.stringify(options.payload) : undefined,
  });

  const data = (await response.json().catch(() => null)) as ApiResponse | null;

  if (!response.ok) {
    throw new Error(data?.message ?? 'Request failed');
  }

  if (!data) {
    throw new Error('Empty response from API');
  }

  return data;
}

export async function apiPost(path: string, payload: unknown, token?: string): Promise<ApiResponse> {
  return apiRequest(path, { method: 'POST', payload, token });
}

export async function apiGet(path: string, token?: string): Promise<ApiResponse> {
  return apiRequest(path, { method: 'GET', token });
}
