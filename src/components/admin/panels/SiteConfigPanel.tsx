"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { Save, RotateCcw, Check, Loader2 } from "lucide-react";
import { siteApi } from "@/lib/api/site";
import type { SiteConfig as ApiSiteConfig } from "@/types/api";

export default function SiteConfigPanel() {
  const { data, isLoading, mutate } = useSWR<ApiSiteConfig>("site-config", () =>
    siteApi.get()
  );
  const [draft, setDraft] = useState<ApiSiteConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data && !draft) setDraft(data);
  }, [data, draft]);

  const update = (field: keyof ApiSiteConfig, value: string | string[]) => {
    setDraft((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const updated = await siteApi.update(draft);
      await mutate(updated, false);
      setDraft(updated);
      setSaved(true);
      toast.success("Site config saved");
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (data) {
      setDraft(data);
      toast("Reverted to saved values");
    }
  };

  if (isLoading || !draft) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={20} className="animate-spin text-muted" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Site Configuration"
        description="General settings for your portfolio — name, headline, contact info, and tech badges."
      />

      <div className="glass flex flex-col gap-5 rounded-2xl p-6">
        <Field label="Name">
          <Input value={draft.name} onChange={(v) => update("name", v)} />
        </Field>

        <Field label="Role / Title">
          <Input value={draft.role} onChange={(v) => update("role", v)} />
        </Field>

        <Field label="Headline">
          <Input
            value={draft.headline}
            onChange={(v) => update("headline", v)}
          />
        </Field>

        <Field label="Positioning Statement">
          <Textarea
            value={draft.positioning}
            onChange={(v) => update("positioning", v)}
            rows={3}
          />
        </Field>

        <Field label="About">
          <Textarea
            value={draft.about}
            onChange={(v) => update("about", v)}
            rows={5}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email">
            <Input
              type="email"
              value={draft.email}
              onChange={(v) => update("email", v)}
            />
          </Field>

          <Field label="Location">
            <Input
              value={draft.location}
              onChange={(v) => update("location", v)}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="LinkedIn URL">
            <Input
              type="url"
              value={draft.linkedin || ""}
              onChange={(v) => update("linkedin", v)}
            />
          </Field>

          <Field label="GitHub URL">
            <Input
              type="url"
              value={draft.github || ""}
              onChange={(v) => update("github", v)}
            />
          </Field>
        </div>

        <Field label="CV URL">
          <Input
            value={draft.cvUrl || ""}
            onChange={(v) => update("cvUrl", v)}
          />
        </Field>

        <Field label="Tech Badges (comma-separated)">
          <Input
            value={draft.techBadges.join(", ")}
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

      <ActionBar
        onSave={handleSave}
        onReset={handleReset}
        saved={saved}
        saving={saving}
      />
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
  saved,
  saving
}: {
  onSave: () => void;
  onReset: () => void;
  saved: boolean;
  saving?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onSave}
        disabled={saving}
        className="focus-ring flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-soft hover:text-background disabled:opacity-50"
      >
        {saving ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Saving...
          </>
        ) : saved ? (
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
        disabled={saving}
        className="focus-ring flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:opacity-50"
      >
        <RotateCcw size={15} />
        Reset to saved
      </button>
    </div>
  );
}
