"use client";

import useSWR from "swr";
import Section from "../Section";
import ProjectCard from "../ProjectCard";
import { projects as fallbackProjects } from "@/data/portfolio";
import { projectsApi } from "@/lib/api/projects";
import type { Project as ApiProject, Paginated } from "@/types/api";

export default function ProjectsSection() {
  const { data } = useSWR<Paginated<ApiProject>>(
    "projects",
    () => projectsApi.list(1, 100),
    { revalidateOnFocus: false }
  );

  const projects = (data?.data ?? fallbackProjects).filter((p) => p.featured);

  return (
    <Section
      id="projects"
      label="Work"
      title="Featured Projects"
      description="Production work across AI products, dashboards, and booking systems — built with a focus on clean architecture and polished UX."
    >
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            name={project.name}
            tagline={project.tagline}
            description={project.description}
            year={project.year}
            techStack={project.techStack}
            keyFeatures={project.keyFeatures}
            demoLink={project.demoLink}
            githubLink={project.githubLink}
            problem={project.caseStudy?.problem ?? null}
          />
        ))}
      </div>
    </Section>
  );
}
