import { apiFetch } from '../api-client';
import type { Paginated, Project, ProjectCreate, ProjectUpdate } from '@/types/api';

export const projectsApi = {
  list: (page = 1, limit = 100) =>
    apiFetch<Paginated<Project>>(`/api/projects?page=${page}&limit=${limit}`),
  getByIdOrSlug: (idOrSlug: string | number) =>
    apiFetch<Project>(`/api/projects/${idOrSlug}`),
  create: (data: ProjectCreate) =>
    apiFetch<Project>('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: ProjectUpdate) =>
    apiFetch<Project>(`/api/projects/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id: number) =>
    apiFetch<void>(`/api/projects/${id}`, { method: 'DELETE' }),
};
