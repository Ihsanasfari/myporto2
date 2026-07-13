import { apiFetch } from '../api-client';
import type { SiteConfig, SiteConfigUpdate } from '@/types/api';

export const siteApi = {
  get: () => apiFetch<SiteConfig>('/api/site'),
  update: (data: SiteConfigUpdate) =>
    apiFetch<SiteConfig>('/api/site', { method: 'PATCH', body: JSON.stringify(data) }),
};
