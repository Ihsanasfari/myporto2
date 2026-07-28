import Link from "next/link";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import TagPill from "./TagPill";

interface ProjectCardProps {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  year: string;
  techStack: string[];
  keyFeatures: string[];
  demoLink?: string | null;
  githubLink?: string | null;
  problem?: string | null;
}

export default function ProjectCard({
  slug,
  name,
  tagline,
  description,
  year,
  techStack,
  keyFeatures,
  demoLink,
  githubLink,
  problem
}: ProjectCardProps) {
  return (
    <article className="group/card relative flex flex-col gap-5 rounded-card border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-soft sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
            {name}
          </h3>
          <p className="text-sm font-medium text-gray-600">{tagline}</p>
        </div>
        <span className="shrink-0 rounded-full bg-gray-150 px-3 py-1 text-xs font-medium text-gray-600">
          {year}
        </span>
      </div>

      <p className="text-base leading-relaxed text-gray-500">{description}</p>

      {keyFeatures.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label="Key features">
          {keyFeatures.slice(0, 3).map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600"
            >
              <Check
                size={15}
                className="mt-0.5 shrink-0 text-gray-700"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {problem && (
        <div className="rounded-2xl bg-surface-alt p-5">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
            The problem
          </p>
          <p className="text-sm leading-relaxed text-gray-700">{problem}</p>
        </div>
      )}

      {techStack.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
          {techStack.map((tech) => (
            <TagPill key={tech}>{tech}</TagPill>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-5 border-t border-border pt-5">
        <Link
          href={`/project/${slug}`}
          className="focus-ring link-underline text-sm font-semibold text-foreground"
        >
          Read case study
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        {demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring link-underline text-sm text-gray-500 transition-colors hover:text-foreground"
          >
            Live demo
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring link-underline text-sm text-gray-500 transition-colors hover:text-foreground"
          >
            Source
            <GithubIcon size={14} />
          </a>
        )}
      </div>
    </article>
  );
}
