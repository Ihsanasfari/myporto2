export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface Paginated<T> {
  data: T[];
  pagination: Pagination;
}

export interface AuthUser {
  email: string;
  name: string;
  image: string | null;
  role: 'admin';
}

export interface AuthMeResponse {
  user: AuthUser | null;
}

export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'DB_ERROR'
  | 'VALIDATION_ERROR'
  | 'INTERNAL_ERROR';

export interface ApiErrorResponse {
  error: {
    message: string;
    code: ApiErrorCode;
    details?: unknown;
  };
}

export interface SiteConfig {
  name: string;
  role: string;
  headline: string;
  positioning: string;
  about: string;
  email: string;
  location: string;
  cvUrl: string | null;
  linkedin: string | null;
  github: string | null;
  techBadges: string[];
}
export type SiteConfigUpdate = Partial<SiteConfig>;

export interface CaseStudy {
  problem: string;
  role: string;
  keyFeatures: string[];
  technicalChallenges: string[];
  result: string;
}

export interface Project {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  year: string;
  techStack: string[];
  keyFeatures: string[];
  mockup: string | null;
  accent: string;
  featured: boolean;
  demoLink: string | null;
  githubLink: string | null;
  image: string | null;
  caseStudy: CaseStudy | null;
  createdAt: string;
  updatedAt: string;
}
export type ProjectCreate = Omit<Project, 'id' | 'caseStudy' | 'createdAt' | 'updatedAt'> & {
  caseStudy?: CaseStudy;
};
export type ProjectUpdate = Partial<ProjectCreate>;

export interface SkillGroup {
  id: number;
  title: string;
  icon: string;
  skills: string[];
  sortOrder: number;
}
export type SkillGroupCreate = Omit<SkillGroup, 'id'>;
export type SkillGroupUpdate = Partial<SkillGroupCreate>;

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  sortOrder: number;
}
export type ExperienceCreate = Omit<Experience, 'id'>;
export type ExperienceUpdate = Partial<ExperienceCreate>;

export interface UploadSignRequest {
  folder: string;
  public_id?: string;
}
export interface UploadSignResponse {
  signature: string;
  timestamp: number;
  api_key: string;
  cloud_name: string;
  folder: string;
  public_id?: string;
}

export interface HealthResponse {
  status: 'ok';
  timestamp: string;
}
