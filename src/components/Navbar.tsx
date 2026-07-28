"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Command, Menu, X } from "lucide-react";
import { site } from "@/data/portfolio";

const navItems = [
  { label: "Projects", href: "/#projects" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="focus-ring font-display text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          ihsan<span className="text-gray-400">.dev</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-lg px-3 py-2 text-sm text-gray-500 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            className="focus-ring glass hidden items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-gray-500 transition-colors hover:text-foreground sm:flex"
            aria-label="Open command palette"
          >
            <Command size={13} aria-hidden="true" />
            <span>Ctrl K</span>
          </button>

          <a
            href={site.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-background transition-colors hover:bg-ink-tertiary lg:block"
          >
            Download CV
          </a>

          <button
            type="button"
            className="focus-ring glass rounded-lg p-2 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-b border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-lg px-3 py-2.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-2 rounded-full bg-ink px-4 py-2.5 text-center text-sm font-medium text-background"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
