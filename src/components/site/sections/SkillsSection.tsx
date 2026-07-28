"use client";

import useSWR from "swr";
import Section from "../Section";
import TagPill from "../TagPill";
import { skillGroups as fallbackGroups } from "@/data/portfolio";
import { skillsApi } from "@/lib/api/skills";
import type { SkillGroup } from "@/types/api";

export default function SkillsSection() {
  const { data } = useSWR<SkillGroup[]>("skills", () => skillsApi.list(), {
    revalidateOnFocus: false
  });

  const groups = data ?? fallbackGroups;

  return (
    <Section
      id="skills"
      label="Capabilities"
      title="Skills & Tooling"
      description="The technologies and disciplines I use to ship production-grade front-ends."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.title}
            className="group/card flex flex-col gap-4 rounded-card border border-border bg-surface p-6 transition-all duration-300 hover:border-border-strong hover:shadow-soft"
          >
            <h3 className="font-display text-base font-semibold text-foreground">
              {group.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <TagPill key={skill}>{skill}</TagPill>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
