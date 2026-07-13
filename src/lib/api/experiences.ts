import { apiFetch } from '../api-client';
import type { Experience, ExperienceCreate, ExperienceUpdate } from '@/types/api';

export const experiencesApi = {
  list: () => apiFetch<Experience[]>('/api/experiences'),
  create: (data: ExperienceCreate) =>
    apiFetch<Experience>('/api/experiences', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: ExperienceUpdate) =>
    apiFetch<Experience>(`/api/experiences/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id: number) =>
    apiFetch<void>(`/api/experiences/${id}`, { method: 'DELETE' }),
};
