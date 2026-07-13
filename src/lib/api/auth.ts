import { apiFetch, API_BASE_URL } from '../api-client';
import type { AuthMeResponse, AuthUser } from '@/types/api';

export function getLoginUrl() {
  return `${API_BASE_URL}/auth/google`;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const data = await apiFetch<AuthMeResponse>('/auth/me');
  return data.user;
}

export async function logout(): Promise<void> {
  await apiFetch<void>('/auth/logout', { method: 'POST' });
}
