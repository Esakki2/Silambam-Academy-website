import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="About / History"
      description="Manage the key narrative sections displayed on the public site."
      table="about_content"
      fields={[
        { key: "section_key", label: "Section Key" },
        { key: "title", label: "Title" },
        { key: "content", label: "Content", type: "textarea" },
        { key: "image_url", label: "Image URL", type: "url" },
        { key: "is_published", label: "Published", type: "checkbox" },
      ]}
      defaultRecord={{
        section_key: "history",
        title: "History of Silambam",
        is_published: true,
      }}
    />
  );
}
