import type { ApiErrorResponse, ApiErrorCode } from '@/types/api';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export class ApiError extends Error {
  code: ApiErrorCode;
  status: number;
  details?: unknown;

  constructor(message: string, code: ApiErrorCode, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as ApiErrorResponse | null;
    const message = body?.error?.message ?? `Request failed with ${res.status}`;
    const code = body?.error?.code ?? 'INTERNAL_ERROR';
    throw new ApiError(message, code, res.status, body?.error?.details);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  return handleResponse<T>(res);
}
