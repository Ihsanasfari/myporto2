"use client";

import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  LayoutDashboard,
  FolderKanban,
  Layers,
  Briefcase,
  Settings,
  LogOut,
  ExternalLink,
  Loader2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AdminLogin from "./AdminLogin";
import SiteConfigPanel from "./panels/SiteConfigPanel";
import ProjectsPanel from "./panels/ProjectsPanel";
import SkillsPanel from "./panels/SkillsPanel";
import ExperiencePanel from "./panels/ExperiencePanel";

type Tab = "site" | "projects" | "skills" | "experience";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "site", label: "Site Config", icon: <Settings size={17} /> },
  { id: "projects", label: "Projects", icon: <FolderKanban size={17} /> },
  { id: "skills", label: "Skills", icon: <Layers size={17} /> },
  { id: "experience", label: "Experience", icon: <Briefcase size={17} /> }
];

export default function AdminShell() {
  const { user, isLoading, isAuthenticated, logout, refresh } = useAuth();
  const [active, setActive] = useState<Tab>("site");
  const [authParam, setAuthParam] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get("auth");
    if (auth) {
      setAuthParam(auth);
      const url = new URL(window.location.href);
      url.searchParams.delete("auth");
      window.history.replaceState({}, "", url.toString());
      if (auth === "success") {
        refresh();
      }
    }
  }, [refresh]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 size={24} className="animate-spin text-gray-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-center" />
        <AdminLogin authError={authParam} />
      </>
    );
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex min-h-screen pt-10">
      <Toaster position="top-center" />

      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-surface p-4 sm:flex">
        <div className="mb-8 flex items-center gap-2 px-2">
          <LayoutDashboard size={18} className="text-gray-700" />
          <span className="font-display text-sm font-semibold">
            Admin Panel
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active === tab.id
                  ? "bg-accent-soft text-gray-900"
                  : "text-gray-500 hover:bg-gray-100 hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-2 border-t border-border pt-4">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-gray-500 transition-colors hover:text-foreground"
          >
            <ExternalLink size={14} />
            View portfolio
          </a>
          <div className="flex items-center justify-between rounded-lg px-3 py-2">
            <span className="truncate text-xs text-gray-500">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="shrink-0 text-gray-500 transition-colors hover:text-foreground"
              aria-label="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:hidden">
        <span className="font-display text-sm font-semibold">Admin</span>
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`rounded-lg p-2 transition-colors ${
                active === tab.id
                  ? "bg-accent-soft text-gray-900"
                  : "text-gray-500"
              }`}
            >
              {tab.icon}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="rounded-lg p-2 text-gray-500"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-5 pb-24 pt-20 sm:px-8 sm:pt-8">
        <div className="mx-auto max-w-3xl">
          {active === "site" && <SiteConfigPanel />}
          {active === "projects" && <ProjectsPanel />}
          {active === "skills" && <SkillsPanel />}
          {active === "experience" && <ExperiencePanel />}
        </div>
      </main>
    </div>
  );
}
