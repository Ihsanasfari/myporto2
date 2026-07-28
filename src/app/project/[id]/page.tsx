import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import ProjectMockup from "@/components/ProjectMockup";
import {
  getProjectBySlug,
  projects as fallbackProjects
} from "@/data/portfolio";
import { projectsApi } from "@/lib/api/projects";
import type { Project as ApiProject } from "@/types/api";
import type { ProjectMockup as MockupType } from "@/types";
import type { Metadata } from "next";

const VALID_MOCKUPS: MockupType[] = ["ai-chat", "crm", "booking", "portfolio"];

function toMockupType(value: string | null): MockupType {
  return VALID_MOCKUPS.includes(value as MockupType)
    ? (value as MockupType)
    : "portfolio";
}

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return fallbackProjects.map((project) => ({ id: project.slug }));
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;

  let project: { name: string; description: string } | undefined;
  try {
    const apiProject = await projectsApi.getByIdOrSlug(id);
    project = { name: apiProject.name, description: apiProject.description };
  } catch {
    const fallback = getProjectBySlug(id);
    project = fallback
      ? { name: fallback.name, description: fallback.description }
      : undefined;
  }

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  let project: ApiProject | undefined;
  try {
    project = await projectsApi.getByIdOrSlug(id);
  } catch {
    const fallback = getProjectBySlug(id);
    if (fallback) {
      project = {
        ...fallback,
        id: 0,
        createdAt: "",
        updatedAt: "",
        demoLink: fallback.demoLink ?? null,
        githubLink: fallback.githubLink ?? null,
        image: fallback.image ?? null
      } as ApiProject;
    }
  }

  if (!project) {
    notFound();
  }

  const { caseStudy } = project;

  return (
    <article className="mx-auto w-full max-w-4xl px-5 pb-24 pt-28 sm:px-8">
      <Link
        href="/#projects"
        className="focus-ring mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Back to projects
      </Link>

      <header className="flex flex-col gap-4">
        <span
          className="glass w-fit rounded-full px-3 py-1 text-xs font-medium"
          style={{ color: project.accent }}
        >
          {project.year}
        </span>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.name}
        </h1>
        <p className="text-lg text-accent-soft">{project.tagline}</p>
        <p className="max-w-2xl leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-white/[0.03] px-2.5 py-1 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-soft hover:text-background"
            >
              Live demo
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring glass flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/[0.06]"
            >
              Source code
              <GithubIcon size={14} />
            </a>
          )}
        </div>
      </header>

      <div className="my-10">
        <ProjectMockup
          type={toMockupType(project.mockup)}
          accent={project.accent}
        />
      </div>

      {caseStudy && (
        <section className="flex flex-col gap-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <h2 className="mb-3 font-display text-lg font-semibold">
                Problem
              </h2>
              <p className="text-sm leading-relaxed text-muted">
                {caseStudy.problem}
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h2 className="mb-3 font-display text-lg font-semibold">
                My Role
              </h2>
              <p className="text-sm leading-relaxed text-muted">
                {caseStudy.role}
              </p>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="mb-4 font-display text-lg font-semibold">
              Key Features
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {caseStudy.keyFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-muted"
                >
                  <Check
                    size={15}
                    className="mt-0.5 shrink-0 text-accent-cyan"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="mb-4 font-display text-lg font-semibold">
              Technical Challenges
            </h2>
            <ul className="flex flex-col gap-3">
              {caseStudy.technicalChallenges.map((challenge) => (
                <li
                  key={challenge}
                  className="flex items-start gap-2 text-sm text-muted"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-strong rounded-2xl p-6">
            <h2 className="mb-3 font-display text-lg font-semibold text-accent-soft">
              Result &amp; Impact
            </h2>
            <p className="text-sm leading-relaxed text-foreground">
              {caseStudy.result}
            </p>
          </div>
        </section>
      )}
    </article>
  );
}
