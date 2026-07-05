"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { projects as defaultProjects } from "@/data/portfolio";
import type { Project } from "@/types";
import { PanelHeader, Field, Input, Textarea, ActionBar } from "./SiteConfigPanel";

const STORAGE_KEY = "admin_projects";

const emptyProject: Project = {
  slug: "",
  name: "",
  tagline: "",
  description: "",
  year: "",
  techStack: [],
  keyFeatures: [],
  mockup: "ai-chat",
  accent: "#6366f1",
  featured: true,
  demoLink: "",
  githubLink: "",
  image: "",
  caseStudy: {
    problem: "",
    role: "",
    keyFeatures: [],
    technicalChallenges: [],
    result: ""
  }
};

export default function ProjectsPanel() {
  const [items, setItems] = useState<Project[]>(defaultProjects);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setItems(defaultProjects);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateItem = (index: number, patch: Partial<Project>) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  };

  const updateCaseStudy = (index: number, patch: Partial<Project["caseStudy"]>) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, caseStudy: { ...item.caseStudy, ...patch } }
          : item
      )
    );
  };

  const addProject = () => {
    setItems((prev) => [...prev, { ...emptyProject, slug: `new-project-${prev.length}` }]);
    setExpanded(items.length);
  };

  const removeProject = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setExpanded(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Projects"
        description="Add, edit, or remove featured projects. Each project includes a full case study."
      />

      <div className="flex flex-col gap-3">
        {items.map((project, index) => (
          <div key={index} className="glass rounded-2xl">
            {/* Collapsed header */}
            <button
              onClick={() => setExpanded(expanded === index ? null : index)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <GripVertical size={15} className="text-muted/40" />
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: project.accent }}
                />
                <span className="text-sm font-medium">
                  {project.name || "Untitled project"}
                </span>
                {project.featured && (
                  <span className="rounded-md bg-accent/15 px-2 py-0.5 text-xs text-accent-soft">
                    Featured
                  </span>
                )}
              </div>
              {expanded === index ? (
                <ChevronUp size={16} className="text-muted" />
              ) : (
                <ChevronDown size={16} className="text-muted" />
              )}
            </button>

            {/* Expanded form */}
            {expanded === index && (
              <div className="flex flex-col gap-5 border-t border-border p-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name">
                    <Input
                      value={project.name}
                      onChange={(v) => updateItem(index, { name: v })}
                    />
                  </Field>
                  <Field label="Slug (URL)">
                    <Input
                      value={project.slug}
                      onChange={(v) => updateItem(index, { slug: v })}
                    />
                  </Field>
                </div>

                <Field label="Tagline">
                  <Input
                    value={project.tagline}
                    onChange={(v) => updateItem(index, { tagline: v })}
                  />
                </Field>

                <Field label="Description">
                  <Textarea
                    value={project.description}
                    onChange={(v) => updateItem(index, { description: v })}
                    rows={3}
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="Year">
                    <Input
                      value={project.year}
                      onChange={(v) => updateItem(index, { year: v })}
                    />
                  </Field>
                  <Field label="Accent Color">
                    <Input
                      value={project.accent}
                      onChange={(v) => updateItem(index, { accent: v })}
                    />
                  </Field>
                  <Field label="Mockup Type">
                    <select
                      value={project.mockup}
                      onChange={(e) =>
                        updateItem(index, {
                          mockup: e.target.value as Project["mockup"]
                        })
                      }
                      className="focus-ring rounded-lg border border-border bg-white/[0.03] px-3 py-2 text-sm text-foreground"
                    >
                      <option value="ai-chat">AI Chat</option>
                      <option value="crm">CRM</option>
                      <option value="booking">Booking</option>
                      <option value="portfolio">Portfolio</option>
                    </select>
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Tech Stack (comma-separated)">
                    <Input
                      value={project.techStack.join(", ")}
                      onChange={(v) =>
                        updateItem(index, {
                          techStack: v.split(",").map((s) => s.trim()).filter(Boolean)
                        })
                      }
                    />
                  </Field>
                  <Field label="Key Features (comma-separated)">
                    <Input
                      value={project.keyFeatures.join(", ")}
                      onChange={(v) =>
                        updateItem(index, {
                          keyFeatures: v.split(",").map((s) => s.trim()).filter(Boolean)
                        })
                      }
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Demo Link">
                    <Input
                      value={project.demoLink || ""}
                      onChange={(v) => updateItem(index, { demoLink: v })}
                    />
                  </Field>
                  <Field label="GitHub Link">
                    <Input
                      value={project.githubLink || ""}
                      onChange={(v) => updateItem(index, { githubLink: v })}
                    />
                  </Field>
                </div>

                <label className="flex items-center gap-2 text-sm text-muted">
                  <input
                    type="checkbox"
                    checked={project.featured}
                    onChange={(e) =>
                      updateItem(index, { featured: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-border accent-accent"
                  />
                  Featured project
                </label>

                {/* Case Study section */}
                <div className="rounded-xl border border-border bg-white/[0.02] p-5">
                  <h4 className="mb-4 font-display text-sm font-semibold text-accent-soft">
                    Case Study
                  </h4>
                  <div className="flex flex-col gap-4">
                    <Field label="Problem">
                      <Textarea
                        value={project.caseStudy.problem}
                        onChange={(v) => updateCaseStudy(index, { problem: v })}
                        rows={2}
                      />
                    </Field>
                    <Field label="Role">
                      <Textarea
                        value={project.caseStudy.role}
                        onChange={(v) => updateCaseStudy(index, { role: v })}
                        rows={2}
                      />
                    </Field>
                    <Field label="Case Study Key Features (comma-separated)">
                      <Input
                        value={project.caseStudy.keyFeatures.join(", ")}
                        onChange={(v) =>
                          updateCaseStudy(index, {
                            keyFeatures: v.split(",").map((s) => s.trim()).filter(Boolean)
                          })
                        }
                      />
                    </Field>
                    <Field label="Technical Challenges (comma-separated)">
                      <Input
                        value={project.caseStudy.technicalChallenges.join(", ")}
                        onChange={(v) =>
                          updateCaseStudy(index, {
                            technicalChallenges: v.split(",").map((s) => s.trim()).filter(Boolean)
                          })
                        }
                      />
                    </Field>
                    <Field label="Result & Impact">
                      <Textarea
                        value={project.caseStudy.result}
                        onChange={(v) => updateCaseStudy(index, { result: v })}
                        rows={3}
                      />
                    </Field>
                  </div>
                </div>

                <button
                  onClick={() => removeProject(index)}
                  className="flex items-center gap-2 self-start text-sm text-red-400/80 transition-colors hover:text-red-400"
                >
                  <Trash2 size={14} />
                  Delete project
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addProject}
        className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-dashed border-border px-5 py-3 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
      >
        <Plus size={16} />
        Add new project
      </button>

      <ActionBar onSave={handleSave} onReset={handleReset} saved={saved} />
    </div>
  );
}
