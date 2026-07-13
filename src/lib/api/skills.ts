import { apiFetch } from '../api-client';
import type { SkillGroup, SkillGroupCreate, SkillGroupUpdate } from '@/types/api';

export const skillsApi = {
  list: () => apiFetch<SkillGroup[]>('/api/skills'),
  create: (data: SkillGroupCreate) =>
    apiFetch<SkillGroup>('/api/skills', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: SkillGroupUpdate) =>
    apiFetch<SkillGroup>(`/api/skills/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id: number) =>
    apiFetch<void>(`/api/skills/${id}`, { method: 'DELETE' }),
};
