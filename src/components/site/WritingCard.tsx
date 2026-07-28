import { ArrowUpRight } from "lucide-react";
import TagPill from "./TagPill";
import type { WritingEntry } from "@/types";

export default function WritingCard({
  title,
  date,
  readingTime,
  blurb,
  tags,
  href
}: WritingEntry) {
  const heading = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring link-underline font-display text-lg font-semibold tracking-tight text-foreground"
    >
      {title}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  ) : (
    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
      {title}
    </h3>
  );

  return (
    <li>
      <article className="group/card flex flex-col gap-3 rounded-card border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-soft">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.14em] text-gray-400">
          <span>{date}</span>
          <span aria-hidden="true">·</span>
          <span>{readingTime}</span>
        </div>

        {heading}

        <p className="text-base leading-relaxed text-gray-500">{blurb}</p>

        {tags.length > 0 && (
          <ul className="mt-1 flex flex-wrap gap-2" aria-label="Topics">
            {tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </ul>
        )}
      </article>
    </li>
  );
}
