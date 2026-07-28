import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { site } from "@/data/portfolio";

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 py-12 lg:py-14"
    >
      <div className="flex flex-col items-start gap-6 rounded-card-lg bg-surface-alt p-8 sm:p-12">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
          Contact
        </span>
        <h2
          id="contact-heading"
          className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Let&apos;s build something together
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-gray-500">
          I&apos;m open to front-end roles and freelance projects involving AI
          products, dashboards, and complex web apps. Feel free to reach out.
        </p>

        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${site.email}`} className="btn-primary">
            <Mail size={16} aria-hidden="true" />
            Email me
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <LinkedinIcon size={16} />
            LinkedIn
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
        </div>

        <p className="text-sm text-gray-500">{site.email}</p>
      </div>
    </section>
  );
}
