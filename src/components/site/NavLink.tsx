"use client";

interface NavLinkProps {
  id: string;
  label: string;
  isActive: boolean;
  onNavigate?: () => void;
}

export default function NavLink({
  id,
  label,
  isActive,
  onNavigate
}: NavLinkProps) {
  return (
    <a
      href={`#${id}`}
      onClick={onNavigate}
      aria-current={isActive ? "true" : undefined}
      className="focus-ring group flex items-center gap-4 rounded-full py-2 pr-3"
    >
      <span
        aria-hidden="true"
        className={`h-[2px] rounded-full transition-all duration-300 ${
          isActive
            ? "w-14 bg-accent"
            : "w-7 bg-gray-300 group-hover:w-14 group-hover:bg-gray-500"
        }`}
      />
      <span
        className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
          isActive
            ? "text-foreground"
            : "text-gray-500 group-hover:text-foreground"
        }`}
      >
        {label}
      </span>
    </a>
  );
}
