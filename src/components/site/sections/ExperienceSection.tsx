"use client";

import { ArrowUpRight } from "lucide-react";
import useSWR from "swr";
import Section from "../Section";
import ExperienceItem from "../ExperienceItem";
import {
  experiences as fallbackExperiences,
  site as fallbackSite
} from "@/data/portfolio";
import { experiencesApi } from "@/lib/api/experiences";
import type { Experience } from "@/types/api";

export default function ExperienceSection() {
  const { data } = useSWR<Experience[]>(
    "experiences",
    () => experiencesApi.list(),
    { revalidateOnFocus: false }
  );

  const experiences = data ?? fallbackExperiences;

  return (
    <Section
      id="experience"
      label="Career"
      title="Experience"
      description="Roles where I've built and shipped production front-ends."
    >
      <div className="flex flex-col gap-6">
        <ul className="-mx-1 flex flex-col gap-2">
          {experiences.map((exp) => (
            <ExperienceItem
              key={`${exp.company}-${exp.role}`}
              role={exp.role}
              company={exp.company}
              period={exp.period}
              description={exp.description}
              highlights={exp.highlights}
            />
          ))}
        </ul>

        <a
          href={fallbackSite.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring link-underline ml-6 text-sm font-semibold text-foreground"
        >
          View full résumé
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}
