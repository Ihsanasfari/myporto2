"use client";

import { Briefcase } from "lucide-react";
import useSWR from "swr";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { experiences as fallbackExperiences } from "@/data/portfolio";
import { experiencesApi } from "@/lib/api/experiences";
import type { Experience } from "@/types/api";

export default function Experience() {
  const { data } = useSWR<Experience[]>(
    "experiences",
    () => experiencesApi.list(),
    { revalidateOnFocus: false }
  );

  const experiences = data ?? fallbackExperiences;

  return (
    <section id="experience" aria-label="Experience timeline" className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Career"
          title="Experience"
          description="Roles where I've built and shipped production front-ends."
        />

        <div className="relative flex flex-col gap-8">
          <div
            className="absolute bottom-0 left-[7px] top-2 w-px bg-border"
            aria-hidden="true"
          />
          {experiences.map((exp, index) => (
            <Reveal key={exp.role} delay={index * 0.1}>
              <div className="relative flex gap-5">
                <span className="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <div className="glass flex-1 rounded-2xl p-6 transition-colors hover:border-border-strong">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-display text-base font-semibold">
                      {exp.role}
                    </h3>
                    <span className="flex items-center gap-1.5 text-xs text-muted">
                      <Briefcase size={12} aria-hidden="true" />
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-accent-soft">{exp.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {exp.description}
                  </p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {exp.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan"
                          aria-hidden="true"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
