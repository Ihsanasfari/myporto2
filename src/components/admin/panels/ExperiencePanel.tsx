"use client";

import { useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { Plus, Trash2, Loader2, Save } from "lucide-react";
import { experiencesApi } from "@/lib/api/experiences";
import type { Experience } from "@/types/api";
import { PanelHeader, Field, Input, Textarea } from "./SiteConfigPanel";

const emptyExperience: Omit<Experience, "id"> = {
  role: "",
  company: "",
  period: "",
  description: "",
  highlights: [],
  sortOrder: 0
};

export default function ExperiencePanel() {
  const { data, isLoading, mutate } = useSWR("experiences", () =>
    experiencesApi.list()
  );

  const addExperience = async () => {
    try {
      const sortOrder = data?.length ?? 0;
      await experiencesApi.create({
        ...emptyExperience,
        role: "New Role",
        sortOrder
      });
      await mutate();
      toast.success("Experience created");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create");
    }
  };

  const removeExperience = async (id: number) => {
    try {
      await experiencesApi.remove(id);
      await mutate();
      toast.success("Experience deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={20} className="animate-spin text-muted" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Experience"
        description="Manage your work history entries — roles, companies, periods, and highlights."
      />

      <div className="flex flex-col gap-3">
        {(data ?? []).map((exp) => (
          <ExperienceRow
            key={exp.id}
            exp={exp}
            onDelete={() => removeExperience(exp.id)}
            onUpdated={(updated) => {
              mutate(
                (prev) => prev?.map((e) => (e.id === updated.id ? updated : e)),
                false
              );
            }}
          />
        ))}
      </div>

      <button
        onClick={addExperience}
        className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-dashed border-border px-5 py-3 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
      >
        <Plus size={16} />
        Add experience
      </button>
    </div>
  );
}

function ExperienceRow({
  exp,
  onDelete,
  onUpdated
}: {
  exp: Experience;
  onDelete: () => void;
  onUpdated: (e: Experience) => void;
}) {
  const [draft, setDraft] = useState<Experience>(exp);
  const [saving, setSaving] = useState(false);

  const update = (patch: Partial<Experience>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { id, ...rest } = draft;
      void id;
      const updated = await experiencesApi.update(draft.id, rest);
      setDraft(updated);
      onUpdated(updated);
      toast.success("Experience saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          <Field label="Role">
            <Input value={draft.role} onChange={(v) => update({ role: v })} />
          </Field>
          <Field label="Company">
            <Input
              value={draft.company}
              onChange={(v) => update({ company: v })}
            />
          </Field>
        </div>
        <button
          onClick={onDelete}
          className="mt-6 text-red-400/80 transition-colors hover:text-red-400"
          aria-label="Delete experience"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-4">
        <Field label="Period">
          <Input
            value={draft.period}
            onChange={(v) => update({ period: v })}
            placeholder="e.g. Jan 2024 - Present"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Description">
          <Textarea
            value={draft.description}
            onChange={(v) => update({ description: v })}
            rows={3}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Highlights (comma-separated)">
          <Input
            value={draft.highlights.join(", ")}
            onChange={(v) =>
              update({
                highlights: v
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              })
            }
          />
        </Field>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="focus-ring flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-soft hover:text-background disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={14} />
              Save
            </>
          )}
        </button>
      </div>
    </div>
  );
}
