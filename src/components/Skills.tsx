import { Code2, Database, Layout, Sparkles, Wrench } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { skillGroups } from "@/data/portfolio";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 size={18} aria-hidden="true" />,
  database: <Database size={18} aria-hidden="true" />,
  layout: <Layout size={18} aria-hidden="true" />,
  sparkles: <Sparkles size={18} aria-hidden="true" />,
  wrench: <Wrench size={18} aria-hidden="true" />
};

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills & Tooling"
          description="The technologies and disciplines I use to ship production-grade front-ends."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08}>
              <div className="glass h-full rounded-2xl p-6 transition-colors hover:border-border-strong">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-soft">
                    {iconMap[group.icon]}
                  </span>
                  <h3 className="font-display text-base font-semibold">
                    {group.title}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-border bg-white/[0.03] px-2.5 py-1 text-xs text-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
