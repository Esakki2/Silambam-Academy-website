import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="Gallery"
      description="Add or update visual media for the academy gallery."
      table="gallery_items"
      fields={[
        { key: "image_url", label: "Image URL", type: "url" },
        { key: "caption", label: "Caption" },
        { key: "category", label: "Category" },
        { key: "sort_order", label: "Sort Order", type: "number" },
        { key: "is_published", label: "Published", type: "checkbox" },
      ]}
      defaultRecord={{
        caption: "Gallery image",
        sort_order: 0,
        is_published: true,
      }}
    />
  );
}
