import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="Benefits"
      description="Edit the values and training advantages displayed on the homepage."
      table="benefits"
      fields={[
        { key: "title", label: "Title" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "icon", label: "Icon Key" },
        { key: "sort_order", label: "Sort Order", type: "number" },
        { key: "is_published", label: "Published", type: "checkbox" },
      ]}
      defaultRecord={{
        title: "Discipline & Focus",
        icon: "Dumbbell",
        sort_order: 0,
        is_published: true,
      }}
    />
  );
}
