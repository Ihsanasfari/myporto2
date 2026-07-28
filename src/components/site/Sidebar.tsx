"use client";

import { Download, Mail, MapPin } from "lucide-react";
import useSWR from "swr";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import NavLink from "./NavLink";
import { NAV_IDS, NAV_SECTIONS } from "./nav";
import { useScrollSpy } from "./useScrollSpy";
import { site as fallbackSite } from "@/data/portfolio";
import { siteApi } from "@/lib/api/site";
import type { SiteConfig } from "@/types/api";

export default function Sidebar() {
  const { data: site = fallbackSite } = useSWR<SiteConfig>(
    "site",
    () => siteApi.get(),
    { fallbackData: fallbackSite, revalidateOnFocus: false }
  );

  const activeId = useScrollSpy(NAV_IDS);

  const socials = [
    {
      label: "Email",
      href: `mailto:${site.email}`,
      icon: <Mail size={18} aria-hidden="true" />
    },
    {
      label: "GitHub",
      href: site.github ?? fallbackSite.github,
      icon: <GithubIcon size={18} />
    },
    {
      label: "LinkedIn",
      href: site.linkedin ?? fallbackSite.linkedin,
      icon: <LinkedinIcon size={18} />
    }
  ];

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen lg:flex-col lg:justify-between lg:py-20">
      <div className="flex flex-col gap-5">
        <p className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={15} className="text-gray-400" aria-hidden="true" />
          {site.location}
        </p>

        <div className="flex flex-col gap-3">
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            {site.name}
          </h1>
          <p className="text-lg font-medium text-gray-700">
            {site.role}
            <span className="text-gray-400"> · AI Product UI</span>
          </p>
        </div>

        <p className="max-w-sm text-base leading-relaxed text-gray-500">
          {site.positioning}
        </p>

        <nav aria-label="Section navigation" className="mt-6 hidden lg:block">
          <ul className="flex flex-col gap-1">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <NavLink
                  id={section.id}
                  label={section.label}
                  isActive={activeId === section.id}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-10 flex flex-col gap-6">
        <a
          href={site.cvUrl ?? fallbackSite.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent w-fit"
        >
          <Download size={16} aria-hidden="true" />
          Download Résumé
        </a>

        <ul className="flex items-center gap-2" aria-label="Social links">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={
                  social.href.startsWith("mailto:") ? undefined : "_blank"
                }
                rel="noopener noreferrer"
                aria-label={social.label}
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-border text-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-accent-soft hover:text-gray-900"
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
