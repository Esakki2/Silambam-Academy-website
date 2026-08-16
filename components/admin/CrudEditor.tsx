"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export type AdminField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "url";
  placeholder?: string;
  rows?: number;
};

type CrudEditorProps = {
  title: string;
  description?: string;
  table: string;
  fields: AdminField[];
  defaultRecord?: Record<string, any>;
  arrayFields?: string[];
};

export function CrudEditor({
  title,
  description,
  table,
  fields,
  defaultRecord,
  arrayFields = [],
}: CrudEditorProps) {
  const [record, setRecord] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        setRecord(defaultRecord ?? {});
        setLoading(false);
        toast.error("Supabase is not configured yet.");
        return;
      }

      const supabase = createClient();
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        toast.error(`Unable to load ${title}.`);
        setLoading(false);
        return;
      }

      const initialValue = {
        ...(defaultRecord ?? {}),
        ...(data ?? {}),
      };

      setRecord(initialValue);
      setLoading(false);
    }

    load();
  }, [defaultRecord, table, title]);

  function updateField(key: string, value: string | number | boolean) {
    setRecord((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);

    try {
      const supabase = createClient();
      const payload: Record<string, any> = { ...record };

      for (const key of arrayFields) {
        const value = payload[key];
        if (typeof value === "string") {
          payload[key] = value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        }
      }

      if (!payload.id) {
        delete payload.id;
      }

      const { error } = await supabase
        .from(table)
        .upsert(payload, { onConflict: "id" });

      if (error) {
        toast.error(error.message || "Could not save changes.");
        return;
      }

      toast.success(`${title} updated successfully.`);
    } catch (error) {
      toast.error("Unexpected error while saving.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="pt-24 section-padding">
        <div className="container-wide">
          <div className="rounded-lg border border-border bg-charcoal p-8 text-muted">
            Loading {title}...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 section-padding">
      <div className="container-wide max-w-4xl">
        <div className="mb-8">
          <p className="text-gold text-sm uppercase tracking-[0.2em]">Admin</p>
          <h1 className="font-display text-3xl md:text-4xl text-off-white mt-2">
            {title}
          </h1>
          {description && <p className="text-muted mt-2">{description}</p>}
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-border bg-charcoal p-6 md:p-8 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-5">
            {fields.map((field) => {
              const value = record[field.key] ?? "";

              if (field.type === "checkbox") {
                return (
                  <label
                    key={field.key}
                    className="md:col-span-2 flex items-center gap-3 rounded-md border border-border bg-background px-4 py-3 text-off-white"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(value)}
                      onChange={(event) =>
                        updateField(field.key, event.target.checked)
                      }
                      className="h-4 w-4 accent-gold"
                    />
                    <span className="text-sm text-muted">{field.label}</span>
                  </label>
                );
              }

              if (field.type === "textarea") {
                return (
                  <div key={field.key} className="md:col-span-2">
                    <label className="block text-sm text-muted mb-2">
                      {field.label}
                    </label>
                    <textarea
                      rows={field.rows ?? 5}
                      value={String(value ?? "")}
                      onChange={(event) => updateField(field.key, event.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-md border border-border bg-background px-4 py-3 text-off-white placeholder:text-muted focus:border-gold focus:outline-none"
                    />
                  </div>
                );
              }

              return (
                <div key={field.key} className={field.type === "number" ? "" : ""}>
                  <label className="block text-sm text-muted mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
                    value={field.type === "number" ? Number(value ?? 0) : String(value ?? "")}
                    onChange={(event) => updateField(field.key, event.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-off-white placeholder:text-muted focus:border-gold focus:outline-none"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
