interface TagPillProps {
  children: string;
  tone?: "default" | "strong";
}

export default function TagPill({ children, tone = "default" }: TagPillProps) {
  return (
    <li
      className={`tag-pill transition-colors duration-200 ${
        tone === "strong"
          ? "bg-gray-200 text-gray-800"
          : "group-hover/card:bg-gray-200"
      }`}
    >
      {children}
    </li>
  );
}
