"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { experiences as defaultExperiences } from "@/data/portfolio";
import type { Experience } from "@/types";
import { PanelHeader, Field, Input, Textarea, ActionBar } from "./SiteConfigPanel";

const STORAGE_KEY = "admin_experiences";

const emptyExperience: Experience = {
  role: "",
  company: "",
  period: "",
  description: "",
  highlights: []
};

export default function ExperiencePanel() {
  const [items, setItems] = useState<Experience[]>(defaultExperiences);
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
    setItems(defaultExperiences);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateItem = (index: number, patch: Partial<Experience>) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  };

  const addExperience = () => {
    setItems((prev) => [...prev, { ...emptyExperience, role: "New Role" }]);
  };

  const removeExperience = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Experience"
        description="Manage your work history entries — roles, companies, periods, and highlights."
      />

      <div className="flex flex-col gap-3">
        {items.map((exp, index) => (
          <div key={index} className="glass rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <Field label="Role">
                  <Input
                    value={exp.role}
                    onChange={(v) => updateItem(index, { role: v })}
                  />
                </Field>
                <Field label="Company">
                  <Input
                    value={exp.company}
                    onChange={(v) => updateItem(index, { company: v })}
                  />
                </Field>
              </div>
              <button
                onClick={() => removeExperience(index)}
                className="mt-6 text-red-400/80 transition-colors hover:text-red-400"
                aria-label="Delete experience"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="mt-4">
              <Field label="Period">
                <Input
                  value={exp.period}
                  onChange={(v) => updateItem(index, { period: v })}
                  placeholder="e.g. Jan 2024 - Present"
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Description">
                <Textarea
                  value={exp.description}
                  onChange={(v) => updateItem(index, { description: v })}
                  rows={3}
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Highlights (comma-separated)">
                <Input
                  value={exp.highlights.join(", ")}
                  onChange={(v) =>
                    updateItem(index, {
                      highlights: v.split(",").map((s) => s.trim()).filter(Boolean)
                    })
                  }
                />
              </Field>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addExperience}
        className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-dashed border-border px-5 py-3 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
      >
        <Plus size={16} />
        Add experience
      </button>

      <ActionBar onSave={handleSave} onReset={handleReset} saved={saved} />
    </div>
  );
}
