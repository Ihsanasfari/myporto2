"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollSpyOptions {
  /**
   * Shrinks the observation root to a horizontal band, so a section counts as
   * "active" only once it reaches the reading area of the viewport.
   */
  rootMargin?: string;
}

/**
 * Highlights the section currently in the reading band of the viewport.
 * Falls back to the last section when the page is scrolled to the very bottom,
 * which otherwise never enters the band if the final section is short.
 */
export function useScrollSpy(
  ids: string[],
  { rootMargin = "-25% 0px -55% 0px" }: ScrollSpyOptions = {}
): string {
  const [activeId, setActiveId] = useState(ids[0] ?? "");
  const key = ids.join("|");
  const idsRef = useRef(ids);
  idsRef.current = ids;

  useEffect(() => {
    const orderedIds = idsRef.current;
    const elements = orderedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const resolveActive = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (atBottom) {
        setActiveId(orderedIds[orderedIds.length - 1]);
        return;
      }

      const next = orderedIds.find((id) => visible.has(id));
      if (next) setActiveId(next);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        resolveActive();
      },
      { rootMargin, threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", resolveActive, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", resolveActive);
    };
  }, [key, rootMargin]);

  return activeId;
}
