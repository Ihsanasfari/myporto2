"use client";

import { NAV_IDS, NAV_SECTIONS } from "./nav";
import { useScrollSpy } from "./useScrollSpy";

/**
 * Single-column fallback for the sticky sidebar nav: a horizontally scrollable
 * pill bar that pins to the top of the viewport below the `lg` breakpoint.
 */
export default function MobileNav() {
  const activeId = useScrollSpy(NAV_IDS);

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-0 z-40 -mx-5 mt-10 border-y border-border bg-background/90 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:hidden"
    >
      <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {NAV_SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`focus-ring block whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
                  isActive
                    ? "bg-accent text-gray-900"
                    : "bg-gray-150 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
