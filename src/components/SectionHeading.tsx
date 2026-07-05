import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 flex flex-col items-start gap-3">
      <span className="glass rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent-soft">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
