"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import DashboardPreview from "./DashboardPreview";
import { site } from "@/data/portfolio";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: prefersReducedMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay }
  });

  return (
    <section
      aria-label="Introduction"
      className="relative overflow-hidden pb-20 pt-32 sm:pt-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-accent-cyan/10 blur-[120px]" />
      </div>

      <div className="section-container relative grid items-center gap-14 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <motion.span
            {...fadeUp(0)}
            className="glass flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-accent-soft"
          >
            <Sparkles size={13} aria-hidden="true" />
            Front-End Developer · AI Product UI
          </motion.span>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            I build clean, scalable interfaces for{" "}
            <span className="text-gradient">AI-powered products</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {site.positioning} Currently shipping enterprise AI chat interfaces,
            document intelligence tools, and dashboard systems at Projected AI.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
            <Link
              href="/#projects"
              className="focus-ring group flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-soft hover:text-background"
            >
              View Projects
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href={site.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring glass flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-white/[0.06]"
            >
              <Download size={16} aria-hidden="true" />
              Download CV
            </a>
          </motion.div>

          <motion.ul
            {...fadeUp(0.4)}
            className="mt-2 flex flex-wrap gap-2"
            aria-label="Technologies"
          >
            {site.techBadges.map((badge) => (
              <li
                key={badge}
                className="glass rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
              >
                {badge}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="hidden justify-center lg:flex">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
