"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import useSWR from "swr";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { projects as fallbackProjects } from "@/data/portfolio";
import { projectsApi } from "@/lib/api/projects";
import type { Project as ApiProject, Paginated } from "@/types/api";

export default function CaseStudies() {
  const { data } = useSWR<Paginated<ApiProject>>(
    "projects",
    () => projectsApi.list(1, 100),
    { revalidateOnFocus: false }
  );

  const projects = data?.data ?? fallbackProjects;

  return (
    <section
      id="case-studies"
      aria-label="Case studies"
      className="border-y border-border bg-surface/50 py-24"
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="Deep dives"
          title="Case Studies"
          description="A closer look at the problems, decisions, and outcomes behind each project."
        />

        <div className="flex flex-col gap-4">
          {projects
            .filter((project) => project.caseStudy)
            .map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <Link
                  href={`/project/${project.slug}`}
                  className="focus-ring glass group flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:border-border-strong hover:bg-white/[0.05] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: project.accent }}
                        aria-hidden="true"
                      />
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {project.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted">
                      {project.caseStudy!.problem}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-accent-soft transition-colors group-hover:text-foreground">
                    Read case study
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
