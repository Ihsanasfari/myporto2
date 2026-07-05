import { MapPin } from "lucide-react";
import Reveal from "./Reveal";
import { site } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" aria-label="About me" className="py-24">
      <div className="section-container">
        <div className="glass-strong grid gap-8 rounded-3xl p-8 sm:p-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <span className="glass w-fit rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent-soft">
              About
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Front-end developer focused on AI products &amp; dashboards
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{site.about}</p>
            <p className="mt-4 leading-relaxed text-muted">
              My day-to-day work involves translating complex product
              requirements into clean, maintainable interfaces — from streaming
              AI chat to configurable dashboards. I care about performance,
              accessibility, and code that other developers can build on.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin size={15} className="text-accent-soft" aria-hidden="true" />
                {site.location}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wider text-muted">
                  Currently
                </span>
                <p className="text-sm font-medium text-foreground">
                  Front-End Developer at Projected AI
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wider text-muted">
                  Focus
                </span>
                <p className="text-sm font-medium text-foreground">
                  AI product UI, dashboards, component systems
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wider text-muted">
                  Stack
                </span>
                <p className="text-sm font-medium text-foreground">
                  Next.js, TypeScript, Tailwind CSS, Redux Toolkit
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
