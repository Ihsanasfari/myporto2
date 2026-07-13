import { apiFetch, API_BASE_URL, ApiError } from '../api-client';
import type { AuthMeResponse, AuthUser } from '@/types/api';

export function getLoginUrl() {
  return `${API_BASE_URL}/auth/google`;
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
