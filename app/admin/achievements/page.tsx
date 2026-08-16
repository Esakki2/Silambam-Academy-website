import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="Achievements"
      description="Update championships, milestones, and recognition highlights."
      table="achievements"
      fields={[
        { key: "title", label: "Title" },
        { key: "person_or_team", label: "Person or Team" },
        { key: "event_name", label: "Event Name" },
        { key: "achievement_date", label: "Achievement Date" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "award_position", label: "Award Position" },
        { key: "type", label: "Type" },
        { key: "image_url", label: "Image URL", type: "url" },
        { key: "certificate_url", label: "Certificate URL", type: "url" },
        { key: "is_published", label: "Published", type: "checkbox" },
      ]}
      defaultRecord={{
        title: "Achievement",
        is_published: true,
      }}
    />
  );
}
