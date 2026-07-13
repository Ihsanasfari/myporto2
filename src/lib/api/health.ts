import { apiFetch } from '../api-client';
import type { HealthResponse } from '@/types/api';

export const healthApi = {
  check: () => apiFetch<HealthResponse>('/health'),
};
