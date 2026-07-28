"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";

/**
 * Global chrome (top navbar, scroll progress bar, command palette) that lives
 * in the root layout. Hidden on the home route since it has its own Sidebar
 * and MobileNav.
 */
export default function GlobalChrome() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) return null;

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <CommandPalette />
    </>
  );
}
