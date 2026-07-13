# Frontend Integration Guide (for AI coding agents)

This document is written for an AI coding assistant working in the **Next.js frontend** repo that
consumes this backend. It contains everything needed to wire up every service correctly: base
config, auth, request/response shapes, and ready-to-paste TypeScript client code.

Source of truth: `d:\@repo\backend-porto2\src`. Live interactive docs are also served by this
backend at `GET /docs` (Swagger UI) and `GET /docs.json` (raw OpenAPI spec) — prefer re-generating
types from `/docs.json` if the backend changes.

---

## 1. Base setup

| Item | Value |
|---|---|
| Base URL (dev) | `http://localhost:4000` |
| Base URL (prod) | value of backend's `BACKEND_URL` |
| Auth mechanism | HTTP session cookie (`portfolio_admin_sid`), **not** bearer tokens |
| CORS | Only origins listed in backend's `NEXT_PUBLIC_FRONTEND_URL` (comma-separated) are allowed, `credentials: true` |

**Every request from the frontend must be sent with credentials so the session cookie is
attached.** Without this, `authRequired` endpoints will always return `401`.

```ts
// fetch
fetch(`${API_BASE_URL}/api/projects`, { credentials: 'include' });

// axios
axios.create({ baseURL: API_BASE_URL, withCredentials: true });
```

Frontend env var to add (Next.js):

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 2. Auth flow (Google OAuth, cookie session)

There is **no login form and no JWT**. Auth is a redirect-based OAuth flow:

1. Frontend links/redirects the browser to `GET {API_BASE_URL}/auth/google` (full page
   navigation, not `fetch`).
2. User authenticates with Google. Backend verifies the email against its admin whitelist.
3. On success, backend sets the session cookie and redirects the browser to
   `{FRONTEND_URL}/admin?auth=success`.
4. On failure (email not whitelisted), redirects to `{FRONTEND_URL}/admin?auth=failed`.
5. Frontend calls `GET /auth/me` (with credentials) on mount to check current session.
6. Frontend calls `POST /auth/logout` (with credentials) to log out.

### Endpoints

| Method | Path | Auth | Notes |
|---|---|---|---|
| `GET` | `/auth/google` | — | Full-page redirect, do not `fetch` |
| `GET` | `/auth/google/callback` | — | Handled entirely by backend |
| `GET` | `/auth/me` | — | Returns `{ user: null }` if not logged in |
| `POST` | `/auth/logout` | — | Destroys session, clears cookie |

`GET /auth/me` response:

```ts
interface AuthMeResponse {
  user: {
    email: string;
    name: string;
    image: string | null;
    role: 'admin';
  } | null;
}
```

### Suggested frontend usage

```ts
// components should NOT fetch /auth/google — use a plain <a href> or window.location
<a href={`${API_BASE_URL}/auth/google`}>Sign in with Google</a>

async function getCurrentUser(): Promise<AuthMeResponse['user']> {
  const res = await fetch(`${API_BASE_URL}/auth/me`, { credentials: 'include' });
  const data: AuthMeResponse = await res.json();
  return data.user;
}

async function logout(): Promise<void> {
  await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
}
```

Any endpoint marked **admin** below requires this session cookie. If missing/expired, the backend
returns `401 UNAUTHORIZED`; if the session exists but the user isn't admin, `403 FORBIDDEN`.

---

## 3. Error shape (applies to every endpoint)

```ts
interface ApiErrorResponse {
  error: {
    message: string;
    code: 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'CONFLICT'
        | 'DB_ERROR' | 'VALIDATION_ERROR' | 'INTERNAL_ERROR';
    details?: unknown;
  };
}
```

| Code | HTTP status | Meaning |
|---|---|---|
| `BAD_REQUEST` / `VALIDATION_ERROR` | 400 | Zod validation failed — check `details` |
| `UNAUTHORIZED` | 401 | No session / not logged in |
| `FORBIDDEN` | 403 | Logged in but not an admin |
| `NOT_FOUND` | 404 | Resource / route not found |
| `CONFLICT` | 409 | Unique constraint violation (e.g. duplicate slug) |
| `DB_ERROR` / `INTERNAL_ERROR` | 400 / 500 | Server-side failure |

Recommended shared client helper:

```ts
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? `Request failed with ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}
```

---

## 4. Shared types (mirror Prisma models + Zod schemas)

```ts
// types/api.ts

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
  slug: string; // lowercase, alphanumeric, hyphens only: /^[a-z0-9-]+$/
  name: string;
  tagline: string;
  description: string;
  year: string;
  techStack: string[];
  keyFeatures: string[];
  mockup: string | null;
  accent: string; // hex color, default '#6366f1'
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
  folder: string; // lowercase, alphanumeric, slashes, hyphens: /^[a-z0-9/_-]+$/
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
```

---

## 5. Service reference

Base client used in every example below:

```ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  return handleResponse<T>(res); // see error handling helper above
}
```

### 5.1 Site config — singleton, public read / admin write

| Method | Path | Auth |
|---|---|---|
| `GET` | `/api/site` | — |
| `PATCH` | `/api/site` | admin |

```ts
export const siteApi = {
  get: () => apiFetch<SiteConfig>('/api/site'),
  update: (data: SiteConfigUpdate) =>
    apiFetch<SiteConfig>('/api/site', { method: 'PATCH', body: JSON.stringify(data) }),
};
```

### 5.2 Projects — paginated list, CRUD

| Method | Path | Auth | Notes |
|---|---|---|---|
| `GET` | `/api/projects?page=1&limit=20` | — | `limit` max 100 |
| `GET` | `/api/projects/:idOrSlug` | — | accepts numeric id or slug |
| `POST` | `/api/projects` | admin | `409` if slug exists |
| `PATCH` | `/api/projects/:id` | admin | id must be numeric |
| `DELETE` | `/api/projects/:id` | admin | hard delete, returns `204` |

```ts
export const projectsApi = {
  list: (page = 1, limit = 20) =>
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
```

### 5.3 Skills — flat list, CRUD (no update to reorder besides `sortOrder`)

| Method | Path | Auth |
|---|---|---|
| `GET` | `/api/skills` | — |
| `POST` | `/api/skills` | admin |
| `PATCH` | `/api/skills/:id` | admin |
| `DELETE` | `/api/skills/:id` | admin |

```ts
export const skillsApi = {
  list: () => apiFetch<SkillGroup[]>('/api/skills'),
  create: (data: SkillGroupCreate) =>
    apiFetch<SkillGroup>('/api/skills', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: SkillGroupUpdate) =>
    apiFetch<SkillGroup>(`/api/skills/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id: number) =>
    apiFetch<void>(`/api/skills/${id}`, { method: 'DELETE' }),
};
```

### 5.4 Experiences — flat list, CRUD

| Method | Path | Auth |
|---|---|---|
| `GET` | `/api/experiences` | — |
| `POST` | `/api/experiences` | admin |
| `PATCH` | `/api/experiences/:id` | admin |
| `DELETE` | `/api/experiences/:id` | admin |

```ts
export const experiencesApi = {
  list: () => apiFetch<Experience[]>('/api/experiences'),
  create: (data: ExperienceCreate) =>
    apiFetch<Experience>('/api/experiences', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: ExperienceUpdate) =>
    apiFetch<Experience>(`/api/experiences/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id: number) =>
    apiFetch<void>(`/api/experiences/${id}`, { method: 'DELETE' }),
};
```

### 5.5 Uploads — Cloudinary signed direct upload (admin only)

This is a **3-step flow**. The backend never receives the file itself.

1. Frontend asks backend to sign an upload: `POST /api/uploads/sign` `{ folder, public_id? }`.
2. Frontend uploads the file directly to Cloudinary using the returned signature.
3. Frontend saves the resulting Cloudinary `secure_url` into the relevant resource
   (e.g. `PATCH /api/projects/:id` with `{ image: url }`).

```ts
export const uploadsApi = {
  sign: (data: UploadSignRequest) =>
    apiFetch<UploadSignResponse>('/api/uploads/sign', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export async function uploadImageToCloudinary(
  file: File,
  folder: string,
  publicId?: string,
): Promise<string> {
  const sig = await uploadsApi.sign({ folder, public_id: publicId });

  const form = new FormData();
  form.append('file', file);
  form.append('api_key', sig.api_key);
  form.append('timestamp', String(sig.timestamp));
  form.append('signature', sig.signature);
  form.append('folder', sig.folder);
  if (sig.public_id) form.append('public_id', sig.public_id);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloud_name}/auto/upload`,
    { method: 'POST', body: form },
  );
  if (!res.ok) throw new Error('Cloudinary upload failed');
  const json = await res.json();
  return json.secure_url as string; // save this URL via the relevant PATCH endpoint
}
```

`folder` must match `/^[a-z0-9/_-]+$/` (lowercase, digits, `/`, `_`, `-`).

### 5.6 Health check

`GET /health` → `{ status: 'ok', timestamp: string }`. No auth. Useful for a frontend
"backend is reachable" indicator.

---

## 6. Validation constraints worth mirroring in frontend forms

| Field | Constraint |
|---|---|
| `Project.slug` | 1–120 chars, `/^[a-z0-9-]+$/` |
| `Project.name` | 1–120 chars |
| `Project.tagline` | 1–200 chars |
| `Project.description` | 1–5000 chars |
| `Project.accent` | hex color `/^#[0-9a-fA-F]{3,8}$/`, default `#6366f1` |
| `Project.mockup` / `demoLink` / `githubLink` / `image` | valid URL or `null` |
| `SiteConfig.email` | valid email |
| `SiteConfig.about` | 1–5000 chars |
| `SiteConfig.headline` | 1–200 chars |
| `SiteConfig.positioning` | 1–500 chars |
| `SkillGroup.title` | 1–100 chars |
| `SkillGroup.icon` | 1–50 chars |
| `Experience.description` | 1–2000 chars |
| `Upload.folder` | 1–200 chars, `/^[a-z0-9/_-]+$/` |

`PATCH` endpoints accept **partial** objects (all fields optional) — only send fields being
changed.

---

## 7. Quick checklist for wiring a new frontend page

1. Add `NEXT_PUBLIC_API_URL` to frontend `.env.local`.
2. Reuse `apiFetch` + the typed `*Api` objects from Section 5 (copy into
   `lib/api/*.ts` in the frontend repo).
3. Always pass `credentials: 'include'`.
4. Gate admin-only UI using `GET /auth/me` (`user?.role === 'admin'`).
5. For image fields, use `uploadImageToCloudinary` then `PATCH` the resource with the returned URL.
6. Surface `error.message` from `ApiErrorResponse` in UI; branch on `error.code` for
   special handling (e.g. redirect to login on `UNAUTHORIZED`).
