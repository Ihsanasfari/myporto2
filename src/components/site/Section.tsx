import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function Section({
  id,
  label,
  title,
  description,
  children
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-24 py-12 lg:py-14"
    >
      <div className="mb-8 flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
          {label}
        </span>
        <h2
          id={headingId}
          className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {title}
        </h2>
        {description && (
          <p className="max-w-prose text-base leading-relaxed text-gray-500">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
