"use client";

import useSWR from "swr";
import Section from "../Section";
import TagPill from "../TagPill";
import { site as fallbackSite } from "@/data/portfolio";
import { siteApi } from "@/lib/api/site";
import type { SiteConfig } from "@/types/api";

export default function AboutSection() {
  const { data: site = fallbackSite } = useSWR<SiteConfig>(
    "site",
    () => siteApi.get(),
    { fallbackData: fallbackSite, revalidateOnFocus: false }
  );

  const facts = [
    { label: "Currently", value: "Front-End Developer at Projected AI" },
    { label: "Focus", value: "AI product UI, dashboards, component systems" },
    { label: "Based in", value: site.location }
  ];

  return (
    <Section
      id="about"
      label="About"
      title="Front-end developer focused on AI products & dashboards"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-base leading-relaxed text-gray-500">
            {site.about}
          </p>
          <p className="text-base leading-relaxed text-gray-500">
            My day-to-day work involves translating complex product requirements
            into clean, maintainable interfaces — from streaming AI chat to
            configurable dashboards. I care about performance, accessibility, and
            code that other developers can build on.
          </p>
        </div>

        <dl className="grid gap-3 rounded-card bg-surface-alt p-6 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1.5">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                {fact.label}
              </dt>
              <dd className="text-sm font-medium leading-relaxed text-gray-800">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="flex flex-wrap gap-2" aria-label="Core technologies">
          {site.techBadges.map((badge) => (
            <TagPill key={badge} tone="strong">
              {badge}
            </TagPill>
          ))}
        </ul>
      </div>
    </Section>
  );
}
