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

const IMAGE_FIELD_KEYWORDS = [
  "image",
  "logo",
  "cover",
  "photo",
  "avatar",
  "certificate",
  "hero",
];

function isImageFieldKey(key: string) {
  const normalized = key.toLowerCase();
  return IMAGE_FIELD_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

function getStorageBucketForField(key: string) {
  const normalized = key.toLowerCase();

  if (normalized.includes("profile") || normalized.includes("avatar")) {
    return "instructor-images";
  }

  if (normalized.includes("cover") || normalized.includes("event")) {
    return "event-images";
  }

  if (normalized.includes("certificate")) {
    return "achievement-images";
  }

  if (normalized.includes("logo") || normalized.includes("hero")) {
    return "academy-images";
  }

  if (normalized.includes("gallery")) {
    return "gallery";
  }

  return "academy-images";
}

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
  const [records, setRecords] = useState<Record<string, any>[]>([]);
  const [record, setRecord] = useState<Record<string, any>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  function makeBlankRecord() {
    const base: Record<string, any> = { ...(defaultRecord ?? {}) };
    fields.forEach((field) => {
      if (field.type === "checkbox" && base[field.key] === undefined) {
        base[field.key] = false;
      }
    });
    return base;
  }

  async function loadRecords() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const initial = makeBlankRecord();
      setRecords([]);
      setRecord(initial);
      setSelectedId(null);
      setLoading(false);
      toast.error("Supabase is not configured yet.");
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("sort_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(`Unable to load ${title}.`);
      setLoading(false);
      return;
    }

    const nextRecords = data ?? [];
    setRecords(nextRecords);

    if (nextRecords.length > 0) {
      const first = nextRecords[0];
      setRecord(first);
      setSelectedId(first.id ?? null);
    } else {
      const blank = makeBlankRecord();
      setRecord(blank);
      setSelectedId(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadRecords();
  }, [defaultRecord, table, title]);

  function updateField(key: string, value: string | number | boolean) {
    setRecord((current) => ({ ...current, [key]: value }));
  }

  async function handleImageUpload(fieldKey: string, file: File | null) {
    if (!file) return;

    const supabase = createClient();
    const bucket = getStorageBucketForField(fieldKey);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${fieldKey}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safeName}`;

    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          upsert: true,
          cacheControl: "3600",
          contentType: file.type || "application/octet-stream",
        });

      if (error) {
        toast.error(error.message || "Image upload failed.");
        return;
      }

      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
      updateField(fieldKey, publicUrlData.publicUrl);
      toast.success("Image uploaded successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Unexpected image upload error.");
    }
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

      if (selectedId) {
        payload.id = selectedId;
      }

      const { data, error } = await supabase
        .from(table)
        .upsert(payload, { onConflict: "id" })
        .select();

      if (error) {
        toast.error(error.message || "Could not save changes.");
        return;
      }

      const saved = data?.[0] ?? payload;
      setSelectedId(saved.id ?? selectedId ?? null);
      setRecord(saved);
      setRecords((current) => {
        const next = current.filter((item) => item.id !== saved.id);
        return [saved, ...next];
      });

      toast.success(`${title} saved successfully.`);
    } catch (error) {
      toast.error("Unexpected error while saving.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!record.id && !selectedId) return;

    const idToDelete = record.id ?? selectedId;
    if (!idToDelete) return;

    try {
      const supabase = createClient();
      const shouldSoftDelete = Object.prototype.hasOwnProperty.call(record, "is_published");

      if (shouldSoftDelete) {
        const { error } = await supabase
          .from(table)
          .update({ is_published: false })
          .eq("id", idToDelete);

        if (error) {
          toast.error(error.message || "Could not delete item.");
          return;
        }
      } else {
        const { error } = await supabase.from(table).delete().eq("id", idToDelete);

        if (error) {
          toast.error(error.message || "Could not delete item.");
          return;
        }
      }

      setRecords((current) => current.filter((item) => (item.id ?? selectedId) !== idToDelete));
      setSelectedId(null);
      setRecord(makeBlankRecord());
      toast.success(`${title} removed successfully.`);
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error while deleting.");
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
      <div className="container-wide max-w-6xl">
        <div className="mb-8">
          <p className="text-gold text-sm uppercase tracking-[0.2em]">Admin</p>
          <h1 className="font-display text-3xl md:text-4xl text-off-white mt-2">
            {title}
          </h1>
          {description && <p className="text-muted mt-2">{description}</p>}
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-xl border border-border bg-charcoal p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-display text-off-white">Entries</h2>
              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  setRecord(makeBlankRecord());
                }}
                className="text-sm text-gold hover:text-gold-light"
              >
                + New
              </button>
            </div>

            <div className="space-y-2">
              {records.length === 0 ? (
                <p className="text-sm text-muted">No items yet.</p>
              ) : (
                records.map((entry) => {
                  const label =
                    entry.name ||
                    entry.title ||
                    entry.email ||
                    entry.phone ||
                    entry.id ||
                    "Untitled item";

                  return (
                    <button
                      key={entry.id ?? `${table}-${label}`}
                      type="button"
                      onClick={() => {
                        setSelectedId(entry.id ?? null);
                        setRecord(entry);
                      }}
                      className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                        selectedId === entry.id
                          ? "border-gold bg-gold/10 text-off-white"
                          : "border-border bg-background text-muted hover:border-gold/50 hover:text-off-white"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })
              )}
            </div>
          </aside>

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
                        onChange={(event) => updateField(field.key, event.target.checked)}
                        className="h-4 w-4 accent-gold"
                      />
                      <span className="text-sm text-muted">{field.label}</span>
                    </label>
                  );
                }

                if (field.type === "textarea") {
                  return (
                    <div key={field.key} className="md:col-span-2">
                      <label className="block text-sm text-muted mb-2">{field.label}</label>
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

                const isImageInput = field.type === "url" && isImageFieldKey(field.key);

                if (isImageInput) {
                  return (
                    <div key={field.key} className="md:col-span-2">
                      <label className="block text-sm text-muted mb-2">{field.label}</label>

                      <div className="space-y-3 rounded-md border border-border bg-background p-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            handleImageUpload(field.key, file);
                          }}
                          className="block w-full text-sm text-off-white file:mr-3 file:rounded-md file:border-0 file:bg-gold file:px-3 file:py-2 file:text-sm file:font-medium file:text-charcoal hover:file:bg-gold-light"
                        />

                        {value ? (
                          <div className="overflow-hidden rounded-md border border-border bg-charcoal p-2">
                            <img
                              src={String(value)}
                              alt={field.label}
                              className="h-28 w-full object-cover rounded-md"
                            />
                          </div>
                        ) : null}

                        <input
                          type="url"
                          value={String(value ?? "")}
                          onChange={(event) => updateField(field.key, event.target.value)}
                          placeholder={field.placeholder || "Or paste the image URL here"}
                          className="w-full rounded-md border border-border bg-charcoal px-4 py-3 text-off-white placeholder:text-muted focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={field.key}>
                    <label className="block text-sm text-muted mb-2">{field.label}</label>
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

            <div className="flex items-center justify-end gap-3 pt-2">
              {record.id && (
                <Button type="button" variant="secondary" onClick={handleDelete}>
                  Delete
                </Button>
              )}
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
