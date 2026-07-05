import Link from "next/link";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ProjectMockup from "./ProjectMockup";
import { projects } from "@/data/portfolio";

export default function Projects() {
  return (
    <section id="projects" aria-label="Featured projects" className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Work"
          title="Featured Projects"
          description="Production work across AI products, dashboards, and booking systems — built with a focus on clean architecture and polished UX."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08}>
                <article className="glass group flex h-full flex-col gap-5 rounded-2xl p-6 transition-all duration-300 hover:border-border-strong hover:bg-white/[0.05]">
                  <ProjectMockup
                    type={project.mockup}
                    accent={project.accent}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {project.name}
                      </h3>
                      <p className="mt-1 text-sm text-accent-soft">
                        {project.tagline}
                      </p>
                    </div>
                    <span className="glass shrink-0 rounded-md px-2 py-1 text-[11px] text-muted">
                      {project.year}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <ul
                    className="flex flex-col gap-1.5"
                    aria-label="Key features"
                  >
                    {project.keyFeatures.slice(0, 3).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <Check
                          size={14}
                          className="mt-0.5 shrink-0 text-accent-cyan"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <ul
                    className="flex flex-wrap gap-1.5"
                    aria-label="Tech stack"
                  >
                    {project.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-border bg-white/[0.03] px-2 py-1 text-[11px] text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-4">
                    <Link
                      href={`/project/${project.slug}`}
                      className="focus-ring flex items-center gap-1.5 text-sm font-medium text-accent-soft transition-colors hover:text-foreground"
                    >
                      Case study
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                      >
                        Live demo
                        <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                      >
                        Source
                        <GithubIcon size={13} />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
