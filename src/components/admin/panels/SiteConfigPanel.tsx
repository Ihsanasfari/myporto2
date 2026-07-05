"use client";

import { useState, useEffect } from "react";
import { Save, RotateCcw, Check } from "lucide-react";
import { site as defaultSite } from "@/data/portfolio";
import type { SiteConfig } from "@/types";

const STORAGE_KEY = "admin_site_config";

export default function SiteConfigPanel() {
  const [data, setData] = useState<SiteConfig>(defaultSite);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setData(JSON.parse(stored));
  }, []);

  const update = (field: keyof SiteConfig, value: string | string[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setData(defaultSite);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Site Configuration"
        description="General settings for your portfolio — name, headline, contact info, and tech badges."
      />

      <div className="glass flex flex-col gap-5 rounded-2xl p-6">
        <Field label="Name">
          <Input value={data.name} onChange={(v) => update("name", v)} />
        </Field>

        <Field label="Role / Title">
          <Input value={data.role} onChange={(v) => update("role", v)} />
        </Field>

        <Field label="Headline">
          <Input
            value={data.headline}
            onChange={(v) => update("headline", v)}
          />
        </Field>

        <Field label="Positioning Statement">
          <Textarea
            value={data.positioning}
            onChange={(v) => update("positioning", v)}
            rows={3}
          />
        </Field>

        <Field label="About">
          <Textarea
            value={data.about}
            onChange={(v) => update("about", v)}
            rows={5}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email">
            <Input
              type="email"
              value={data.email}
              onChange={(v) => update("email", v)}
            />
          </Field>

          <Field label="Location">
            <Input
              value={data.location}
              onChange={(v) => update("location", v)}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="LinkedIn URL">
            <Input
              type="url"
              value={data.linkedin}
              onChange={(v) => update("linkedin", v)}
            />
          </Field>

          <Field label="GitHub URL">
            <Input
              type="url"
              value={data.github}
              onChange={(v) => update("github", v)}
            />
          </Field>
        </div>

        <Field label="CV URL">
          <Input value={data.cvUrl} onChange={(v) => update("cvUrl", v)} />
        </Field>

        <Field label="Tech Badges (comma-separated)">
          <Input
            value={data.techBadges.join(", ")}
            onChange={(v) =>
              update(
                "techBadges",
                v
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
        </Field>
      </div>

      <ActionBar onSave={handleSave} onReset={handleReset} saved={saved} />
    </div>
  );
}

export function PanelHeader({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </div>
  );
}

export function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Input({
  value,
  onChange,
  type = "text",
  placeholder
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="focus-ring rounded-lg border border-border bg-white/[0.03] px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted/50"
    />
  );
}

export function Textarea({
  value,
  onChange,
  rows = 3
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="focus-ring resize-y rounded-lg border border-border bg-white/[0.03] px-3 py-2 text-sm leading-relaxed text-foreground transition-colors placeholder:text-muted/50"
    />
  );
}

export function ActionBar({
  onSave,
  onReset,
  saved
}: {
  onSave: () => void;
  onReset: () => void;
  saved: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onSave}
        className="focus-ring flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-soft hover:text-background"
      >
        {saved ? (
          <>
            <Check size={15} />
            Saved
          </>
        ) : (
          <>
            <Save size={15} />
            Save changes
          </>
        )}
      </button>
      <button
        onClick={onReset}
        className="focus-ring flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
      >
        <RotateCcw size={15} />
        Reset to defaults
      </button>
    </div>
  );
}
