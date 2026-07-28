"use client";

import { useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Loader2,
  Save,
  Upload
} from "lucide-react";
import { projectsApi } from "@/lib/api/projects";
import { uploadImageToCloudinary } from "@/lib/api/uploads";
import type { Project, ProjectCreate, CaseStudy } from "@/types/api";
import { PanelHeader, Field, Input, Textarea } from "./SiteConfigPanel";

const emptyProject: ProjectCreate = {
  slug: "",
  name: "",
  tagline: "",
  description: "",
  year: "",
  techStack: [],
  keyFeatures: [],
  mockup: null,
  accent: "#6366f1",
  featured: true,
  demoLink: null,
  githubLink: null,
  image: null,
  caseStudy: {
    problem: "",
    role: "",
    keyFeatures: [],
    technicalChallenges: [],
    result: ""
  }
};

export default function ProjectsPanel() {
  const { data, isLoading, mutate } = useSWR("projects", () =>
    projectsApi.list(1, 100)
  );
  const [expanded, setExpanded] = useState<number | null>(null);

  const items = data?.data ?? [];

  const addProject = async () => {
    try {
      const created = await projectsApi.create({
        ...emptyProject,
        slug: `new-project-${Date.now()}`,
        name: "Untitled project"
      });
      await mutate();
      setExpanded(created.id);
      toast.success("Project created");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create");
    }
  };

  const removeProject = async (id: number) => {
    try {
      await projectsApi.remove(id);
      await mutate();
      setExpanded(null);
      toast.success("Project deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={20} className="animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Projects"
        description="Add, edit, or remove featured projects. Each project includes a full case study."
      />

      <div className="flex flex-col gap-3">
        {items.map((project) => (
          <div key={project.id} className="glass rounded-2xl">
            <ProjectRow
              key={project.id}
              project={project}
              expanded={expanded === project.id}
              onToggle={() =>
                setExpanded(expanded === project.id ? null : project.id)
              }
              onDelete={() => removeProject(project.id)}
              onUpdated={(updated) => {
                mutate(
                  (prev) =>
                    prev
                      ? {
                          ...prev,
                          data: prev.data.map((p) =>
                            p.id === updated.id ? updated : p
                          )
                        }
                      : prev,
                  false
                );
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={addProject}
        className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-dashed border-border px-5 py-3 text-sm text-gray-500 transition-colors hover:border-border-strong hover:text-foreground"
      >
        <Plus size={16} />
        Add new project
      </button>
    </div>
  );
}

function ProjectRow({
  project,
  expanded,
  onToggle,
  onDelete,
  onUpdated
}: {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onUpdated: (p: Project) => void;
}) {
  const [draft, setDraft] = useState<Project>(project);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const update = (patch: Partial<Project>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  };

  const updateCaseStudy = (patch: Partial<CaseStudy>) => {
    setDraft((prev) => ({
      ...prev,
      caseStudy: prev.caseStudy
        ? { ...prev.caseStudy, ...patch }
        : ({ ...patch } as CaseStudy)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { id, createdAt, updatedAt, caseStudy, ...rest } = draft;
      void id;
      void createdAt;
      void updatedAt;
      const updated = await projectsApi.update(draft.id, {
        ...rest,
        caseStudy: caseStudy ?? undefined
      });
      setDraft(updated);
      onUpdated(updated);
      toast.success("Project saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file, "projects", draft.slug);
      update({ image: url });
      const updated = await projectsApi.update(draft.id, { image: url });
      setDraft(updated);
      onUpdated(updated);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* Collapsed header */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <GripVertical size={15} className="text-gray-500/40" />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: draft.accent }}
          />
          <span className="text-sm font-medium">
            {draft.name || "Untitled project"}
          </span>
          {draft.featured && (
            <span className="rounded-md bg-accent-soft px-2 py-0.5 text-xs text-gray-900">
              Featured
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp size={16} className="text-gray-500" />
        ) : (
          <ChevronDown size={16} className="text-gray-500" />
        )}
      </button>

      {/* Expanded form */}
      {expanded && (
        <div className="flex flex-col gap-5 border-t border-border p-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name">
              <Input value={draft.name} onChange={(v) => update({ name: v })} />
            </Field>
            <Field label="Slug (URL)">
              <Input value={draft.slug} onChange={(v) => update({ slug: v })} />
            </Field>
          </div>

          <Field label="Tagline">
            <Input
              value={draft.tagline}
              onChange={(v) => update({ tagline: v })}
            />
          </Field>

          <Field label="Description">
            <Textarea
              value={draft.description}
              onChange={(v) => update({ description: v })}
              rows={3}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Year">
              <Input value={draft.year} onChange={(v) => update({ year: v })} />
            </Field>
            <Field label="Accent Color">
              <Input
                value={draft.accent}
                onChange={(v) => update({ accent: v })}
              />
            </Field>
            <Field label="Mockup Type">
              <select
                value={draft.mockup || ""}
                onChange={(e) => update({ mockup: e.target.value || null })}
                className="focus-ring rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground"
              >
                <option value="">None</option>
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
                value={draft.techStack.join(", ")}
                onChange={(v) =>
                  update({
                    techStack: v
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  })
                }
              />
            </Field>
            <Field label="Key Features (comma-separated)">
              <Input
                value={draft.keyFeatures.join(", ")}
                onChange={(v) =>
                  update({
                    keyFeatures: v
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  })
                }
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Demo Link">
              <Input
                value={draft.demoLink || ""}
                onChange={(v) => update({ demoLink: v || null })}
              />
            </Field>
            <Field label="GitHub Link">
              <Input
                value={draft.githubLink || ""}
                onChange={(v) => update({ githubLink: v || null })}
              />
            </Field>
          </div>

          {/* Image upload */}
          <Field label="Project Image">
            <div className="flex items-center gap-3">
              {draft.image && (
                <img
                  src={draft.image}
                  alt="Project"
                  className="h-12 w-12 rounded-lg object-cover"
                />
              )}
              <label className="focus-ring flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-gray-500 transition-colors hover:text-foreground">
                {uploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={14} />
                    Upload image
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          </Field>

          <label className="flex items-center gap-2 text-sm text-gray-500">
            <input
              type="checkbox"
              checked={draft.featured}
              onChange={(e) => update({ featured: e.target.checked })}
              className="h-4 w-4 rounded border-border accent-accent"
            />
            Featured project
          </label>

          {/* Case Study section */}
          <div className="rounded-xl border border-border bg-gray-100 p-5">
            <h4 className="mb-4 font-display text-sm font-semibold text-gray-700">
              Case Study
            </h4>
            <div className="flex flex-col gap-4">
              <Field label="Problem">
                <Textarea
                  value={draft.caseStudy?.problem || ""}
                  onChange={(v) => updateCaseStudy({ problem: v })}
                  rows={2}
                />
              </Field>
              <Field label="Role">
                <Textarea
                  value={draft.caseStudy?.role || ""}
                  onChange={(v) => updateCaseStudy({ role: v })}
                  rows={2}
                />
              </Field>
              <Field label="Case Study Key Features (comma-separated)">
                <Input
                  value={draft.caseStudy?.keyFeatures.join(", ") || ""}
                  onChange={(v) =>
                    updateCaseStudy({
                      keyFeatures: v
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    })
                  }
                />
              </Field>
              <Field label="Technical Challenges (comma-separated)">
                <Input
                  value={draft.caseStudy?.technicalChallenges.join(", ") || ""}
                  onChange={(v) =>
                    updateCaseStudy({
                      technicalChallenges: v
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    })
                  }
                />
              </Field>
              <Field label="Result & Impact">
                <Textarea
                  value={draft.caseStudy?.result || ""}
                  onChange={(v) => updateCaseStudy({ result: v })}
                  rows={3}
                />
              </Field>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="focus-ring flex items-center gap-2 rounded-xl btn-primary disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={15} />
                  Save project
                </>
              )}
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-2 text-sm text-red-400/80 transition-colors hover:text-red-400"
            >
              <Trash2 size={14} />
              Delete project
            </button>
          </div>
        </div>
      )}
    </>
  );
}
