import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="Training Content"
      description="Update educational and training-related content that appears on the site."
      table="homepage_content"
      fields={[
        { key: "hero_title", label: "Hero Title" },
        { key: "hero_subtitle", label: "Hero Subtitle" },
        { key: "hero_description", label: "Hero Description", type: "textarea" },
        { key: "hero_image_url", label: "Hero Image URL", type: "url" },
        { key: "primary_cta_text", label: "Primary CTA Text" },
        { key: "primary_cta_url", label: "Primary CTA URL" },
        { key: "secondary_cta_text", label: "Secondary CTA Text" },
        { key: "secondary_cta_url", label: "Secondary CTA URL" },
        { key: "is_published", label: "Published", type: "checkbox" },
      ]}
      defaultRecord={{
        hero_title: "Train with Purpose",
        is_published: true,
      }}
    />
  );
}
