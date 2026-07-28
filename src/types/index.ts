export interface CaseStudy {
  problem: string;
  role: string;
  keyFeatures: string[];
  technicalChallenges: string[];
  result: string;
}

export type ProjectMockup = "ai-chat" | "crm" | "booking" | "portfolio";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  year: string;
  techStack: string[];
  keyFeatures: string[];
  mockup: ProjectMockup;
  accent: string;
  featured: boolean;
  demoLink?: string;
  githubLink?: string;
  image?: string;
  caseStudy: CaseStudy;
}

export interface SkillGroup {
  title: string;
  icon: string;
  skills: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface WritingEntry {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  blurb: string;
  tags: string[];
  href?: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  headline: string;
  positioning: string;
  location: string;
  about: string;
  email: string;
  cvUrl: string;
  linkedin: string;
  github: string;
  techBadges: string[];
}
