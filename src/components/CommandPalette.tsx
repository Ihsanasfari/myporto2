"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Download,
  FileText,
  FolderKanban,
  Home,
  Layers,
  Mail,
  Search,
  User
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { site, projects } from "@/data/portfolio";

interface PaletteAction {
  id: string;
  label: string;
  group: string;
  icon: React.ReactNode;
  perform: () => void;
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const actions = useMemo<PaletteAction[]>(() => {
    const go = (href: string) => () => {
      close();
      router.push(href);
    };
    const external = (href: string) => () => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    };

    return [
      {
        id: "home",
        label: "Home",
        group: "Navigate",
        icon: <Home size={16} />,
        perform: go("/")
      },
      {
        id: "projects",
        label: "Featured Projects",
        group: "Navigate",
        icon: <FolderKanban size={16} />,
        perform: go("/#projects")
      },
      {
        id: "case-studies",
        label: "Case Studies",
        group: "Navigate",
        icon: <FileText size={16} />,
        perform: go("/#case-studies")
      },
      {
        id: "skills",
        label: "Skills",
        group: "Navigate",
        icon: <Layers size={16} />,
        perform: go("/#skills")
      },
      {
        id: "experience",
        label: "Experience",
        group: "Navigate",
        icon: <Briefcase size={16} />,
        perform: go("/#experience")
      },
      {
        id: "about",
        label: "About",
        group: "Navigate",
        icon: <User size={16} />,
        perform: go("/#about")
      },
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        label: project.name,
        group: "Projects",
        icon: <FolderKanban size={16} />,
        perform: go(`/project/${project.slug}`)
      })),
      {
        id: "cv",
        label: "Download CV",
        group: "Actions",
        icon: <Download size={16} />,
        perform: external(site.cvUrl)
      },
      {
        id: "email",
        label: "Send Email",
        group: "Actions",
        icon: <Mail size={16} />,
        perform: external(`mailto:${site.email}`)
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        group: "Actions",
        icon: <LinkedinIcon size={16} />,
        perform: external(site.linkedin)
      },
      {
        id: "github",
        label: "Open GitHub",
        group: "Actions",
        icon: <GithubIcon size={16} />,
        perform: external(site.github)
      }
    ];
  }, [close, router]);

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    const q = query.toLowerCase();
    return actions.filter(
      (action) =>
        action.label.toLowerCase().includes(q) ||
        action.group.toLowerCase().includes(q)
    );
  }, [actions, query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape") close();
    };
    const onOpenEvent = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, [close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const onInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter" && filtered[activeIndex]) {
      event.preventDefault();
      filtered[activeIndex].perform();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18 }}
            className="glass-strong w-full max-w-lg overflow-hidden rounded-card bg-surface shadow-lift"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search size={16} className="text-gray-400" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search sections, projects, actions..."
                className="w-full bg-transparent py-4 text-sm text-foreground placeholder:text-gray-400 focus:outline-none"
                aria-label="Search commands"
              />
              <kbd className="rounded bg-gray-150 px-1.5 py-0.5 text-[10px] text-gray-500">
                Esc
              </kbd>
            </div>

            <ul className="max-h-72 overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-gray-500">
                  No results found
                </li>
              )}
              {filtered.map((action, index) => (
                <li
                  key={action.id}
                  role="option"
                  aria-selected={index === activeIndex}
                >
                  <button
                    type="button"
                    onClick={action.perform}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      index === activeIndex
                        ? "bg-accent-soft text-gray-900"
                        : "text-gray-500 hover:text-foreground"
                    }`}
                  >
                    <span className="text-gray-700">{action.icon}</span>
                    <span className="flex-1">{action.label}</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">
                      {action.group}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
