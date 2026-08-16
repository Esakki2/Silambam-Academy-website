import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="Grades & Levels"
      description="Manage the progression levels and certifications shown on the site."
      table="grades"
      fields={[
        { key: "name", label: "Grade Name" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "level", label: "Level", type: "number" },
        { key: "color", label: "Color" },
        { key: "image_url", label: "Image URL", type: "url" },
        { key: "requirements", label: "Requirements", type: "textarea" },
        { key: "sort_order", label: "Sort Order", type: "number" },
        { key: "is_published", label: "Published", type: "checkbox" },
      ]}
      defaultRecord={{
        name: "Foundation",
        level: 1,
        sort_order: 0,
        is_published: true,
      }}
    />
  );
}
