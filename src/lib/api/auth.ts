import { apiFetch, API_BASE_URL, ApiError } from '../api-client';
import type { AuthMeResponse, AuthUser } from '@/types/api';

export function getLoginUrl() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const params = new URLSearchParams();
  if (origin) params.set("redirect", origin);
  const query = params.toString();
  return `${API_BASE_URL}/auth/google${query ? `?${query}` : ""}`;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const data = await apiFetch<AuthMeResponse>('/auth/me');
    return data.user;
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      return null;
    }
    console.error('[auth] getCurrentUser failed:', err);
    return null;
  }
}

export async function logout(): Promise<void> {
  await apiFetch<void>('/auth/logout', { method: 'POST' });
}
