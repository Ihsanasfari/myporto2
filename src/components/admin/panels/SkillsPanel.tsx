"use client";

import { useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { Plus, Trash2, Loader2, Save } from "lucide-react";
import { skillsApi } from "@/lib/api/skills";
import type { SkillGroup } from "@/types/api";
import { PanelHeader, Field, Input } from "./SiteConfigPanel";

const emptyGroup: Omit<SkillGroup, "id"> = {
  title: "",
  icon: "code",
  skills: [],
  sortOrder: 0
};

export default function SkillsPanel() {
  const { data, isLoading, mutate } = useSWR("skills", () => skillsApi.list());

  const addGroup = async () => {
    try {
      const sortOrder = data?.length ?? 0;
      await skillsApi.create({
        ...emptyGroup,
        title: "New Group",
        sortOrder
      });
      await mutate();
      toast.success("Skill group created");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create");
    }
  };

  const removeGroup = async (id: number) => {
    try {
      await skillsApi.remove(id);
      await mutate();
      toast.success("Skill group deleted");
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
        title="Skills & Tooling"
        description="Organize your skills into groups. Each group has an icon and a list of technologies."
      />

      <div className="flex flex-col gap-3">
        {(data ?? []).map((group) => (
          <SkillRow
            key={group.id}
            group={group}
            onDelete={() => removeGroup(group.id)}
            onUpdated={(updated) => {
              mutate(
                (prev) => prev?.map((s) => (s.id === updated.id ? updated : s)),
                false
              );
            }}
          />
        ))}
      </div>

      <button
        onClick={addGroup}
        className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-dashed border-border px-5 py-3 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
      >
        <Plus size={16} />
        Add skill group
      </button>
    </div>
  );
}

function SkillRow({
  group,
  onDelete,
  onUpdated
}: {
  group: SkillGroup;
  onDelete: () => void;
  onUpdated: (s: SkillGroup) => void;
}) {
  const [draft, setDraft] = useState<SkillGroup>(group);
  const [saving, setSaving] = useState(false);

  const update = (patch: Partial<SkillGroup>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { id, ...rest } = draft;
      void id;
      const updated = await skillsApi.update(draft.id, rest);
      setDraft(updated);
      onUpdated(updated);
      toast.success("Skill group saved");
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
          <Field label="Group Title">
            <Input value={draft.title} onChange={(v) => update({ title: v })} />
          </Field>
          <Field label="Icon">
            <select
              value={draft.icon}
              onChange={(e) => update({ icon: e.target.value })}
              className="focus-ring rounded-lg border border-border bg-white/[0.03] px-3 py-2 text-sm text-foreground"
            >
              <option value="code">Code</option>
              <option value="database">Database</option>
              <option value="layout">Layout</option>
              <option value="sparkles">Sparkles</option>
              <option value="wrench">Wrench</option>
            </select>
          </Field>
        </div>
        <button
          onClick={onDelete}
          className="mt-6 text-red-400/80 transition-colors hover:text-red-400"
          aria-label="Delete group"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="mt-4">
        <Field label="Skills (comma-separated)">
          <Input
            value={draft.skills.join(", ")}
            onChange={(v) =>
              update({
                skills: v
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
