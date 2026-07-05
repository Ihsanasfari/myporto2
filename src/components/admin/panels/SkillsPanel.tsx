"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { skillGroups as defaultSkills } from "@/data/portfolio";
import type { SkillGroup } from "@/types";
import { PanelHeader, Field, Input, ActionBar } from "./SiteConfigPanel";

const STORAGE_KEY = "admin_skills";

const emptyGroup: SkillGroup = {
  title: "",
  icon: "code",
  skills: []
};

export default function SkillsPanel() {
  const [items, setItems] = useState<SkillGroup[]>(defaultSkills);
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
    setItems(defaultSkills);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateItem = (index: number, patch: Partial<SkillGroup>) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  };

  const addGroup = () => {
    setItems((prev) => [...prev, { ...emptyGroup, title: "New Group" }]);
  };

  const removeGroup = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Skills & Tooling"
        description="Organize your skills into groups. Each group has an icon and a list of technologies."
      />

      <div className="flex flex-col gap-3">
        {items.map((group, index) => (
          <div key={index} className="glass rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <Field label="Group Title">
                  <Input
                    value={group.title}
                    onChange={(v) => updateItem(index, { title: v })}
                  />
                </Field>
                <Field label="Icon">
                  <select
                    value={group.icon}
                    onChange={(e) => updateItem(index, { icon: e.target.value })}
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
                onClick={() => removeGroup(index)}
                className="mt-6 text-red-400/80 transition-colors hover:text-red-400"
                aria-label="Delete group"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="mt-4">
              <Field label="Skills (comma-separated)">
                <Input
                  value={group.skills.join(", ")}
                  onChange={(v) =>
                    updateItem(index, {
                      skills: v.split(",").map((s) => s.trim()).filter(Boolean)
                    })
                  }
                />
              </Field>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addGroup}
        className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-dashed border-border px-5 py-3 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
      >
        <Plus size={16} />
        Add skill group
      </button>

      <ActionBar onSave={handleSave} onReset={handleReset} saved={saved} />
    </div>
  );
}
