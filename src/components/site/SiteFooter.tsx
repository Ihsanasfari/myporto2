import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { Mail } from "lucide-react";
import { site } from "@/data/portfolio";

export default function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border py-10">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          <Link href="/" className="font-display text-sm font-semibold">
            ihsan<span className="text-gray-400">.dev</span>
          </Link>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {site.name}. Built with Next.js
            &amp; Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border text-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-accent-soft hover:text-gray-900"
            aria-label="Email"
          >
            <Mail size={17} aria-hidden="true" />
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border text-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-accent-soft hover:text-gray-900"
            aria-label="GitHub"
          >
            <GithubIcon size={17} />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border text-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-accent-soft hover:text-gray-900"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
