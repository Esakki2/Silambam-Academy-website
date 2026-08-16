import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="Weapons"
      description="Update traditional instruments, histories, and training notes."
      table="weapons"
      fields={[
        { key: "name", label: "Weapon Name" },
        { key: "short_description", label: "Short Description" },
        { key: "full_description", label: "Full Description", type: "textarea" },
        { key: "historical_context", label: "Historical Context", type: "textarea" },
        { key: "cultural_significance", label: "Cultural Significance", type: "textarea" },
        { key: "training_level", label: "Training Level" },
        { key: "safety_note", label: "Safety Note", type: "textarea" },
        { key: "image_url", label: "Image URL", type: "url" },
        { key: "sort_order", label: "Sort Order", type: "number" },
        { key: "is_published", label: "Published", type: "checkbox" },
      ]}
      defaultRecord={{
        name: "Silambam",
        sort_order: 0,
        is_published: true,
      }}
    />
  );
}
