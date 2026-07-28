import TagPill from "./TagPill";

interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  tags?: string[];
}

export default function ExperienceItem({
  role,
  company,
  period,
  description,
  highlights,
  tags
}: ExperienceItemProps) {
  return (
    <li>
      <article className="group/card grid gap-4 rounded-card border border-transparent p-6 transition-all duration-300 hover:border-border hover:bg-surface hover:shadow-soft sm:grid-cols-[8rem_1fr] sm:gap-6 sm:p-7">
        <p className="pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
          {period}
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
              {role}
            </h3>
            <p className="text-sm font-medium text-gray-600">{company}</p>
          </div>

          <p className="text-base leading-relaxed text-gray-500">
            {description}
          </p>

          {highlights.length > 0 && (
            <ul className="flex flex-col gap-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600"
                >
                  <span
                    className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          {tags && tags.length > 0 && (
            <ul className="mt-1 flex flex-wrap gap-2" aria-label="Tech used">
              {tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </ul>
          )}
        </div>
      </article>
    </li>
  );
}
