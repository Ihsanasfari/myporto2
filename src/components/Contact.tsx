import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import { site } from "@/data/portfolio";

export default function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="py-24">
      <div className="section-container">
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-3xl p-8 text-center sm:p-16">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
            >
              <div className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
            </div>

            <div className="relative flex flex-col items-center gap-6">
              <span className="glass rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent-soft">
                Contact
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s build something together
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                I&apos;m open to front-end roles and freelance projects involving
                AI products, dashboards, and complex web apps. Feel free to
                reach out.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="focus-ring flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-soft hover:text-background"
                >
                  <Mail size={16} aria-hidden="true" />
                  Email me
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring glass flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-colors hover:bg-white/[0.06]"
                >
                  <LinkedinIcon size={16} />
                  LinkedIn
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring glass flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-colors hover:bg-white/[0.06]"
                >
                  <GithubIcon size={16} />
                  GitHub
                </a>
              </div>

              <p className="text-sm text-muted">{site.email}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
