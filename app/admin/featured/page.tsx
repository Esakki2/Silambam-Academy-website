import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="Featured Content"
      description="Edit the hero feature block shown on the homepage."
      table="featured_content"
      fields={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "image_url", label: "Image URL", type: "url" },
        { key: "cta_text", label: "CTA Text" },
        { key: "cta_url", label: "CTA URL" },
        { key: "sort_order", label: "Sort Order", type: "number" },
        { key: "is_published", label: "Published", type: "checkbox" },
      ]}
      defaultRecord={{
        title: "Featured content",
        category: "Workshop",
        is_published: true,
        sort_order: 0,
      }}
    />
  );
}
