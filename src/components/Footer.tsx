import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Mail } from "lucide-react";
import { site } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="section-container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <Link href="/" className="font-display text-sm font-semibold">
            ihsan<span className="text-accent-soft">.dev</span>
          </Link>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {site.name}. Built with Next.js
            &amp; Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="text-muted transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <Mail size={18} aria-hidden="true" />
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
