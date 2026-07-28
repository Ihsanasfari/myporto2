import Section from "../Section";
import WritingCard from "../WritingCard";
import { writing } from "@/data/portfolio";

export default function WritingSection() {
  if (writing.length === 0) return null;

  return (
    <Section
      id="writing"
      label="Notes"
      title="Writing"
      description="Lessons and patterns I've picked up shipping front-ends for AI products and dashboards."
    >
      <ul className="flex flex-col gap-5">
        {writing.map((entry) => (
          <WritingCard key={entry.slug} {...entry} />
        ))}
      </ul>
    </Section>
  );
}
