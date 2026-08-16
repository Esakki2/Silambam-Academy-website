import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="Events"
      description="Edit upcoming events and community programs."
      table="events"
      fields={[
        { key: "title", label: "Title" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "cover_image_url", label: "Cover Image URL", type: "url" },
        { key: "event_date", label: "Event Date" },
        { key: "event_time", label: "Event Time" },
        { key: "location", label: "Location" },
        { key: "category", label: "Category" },
        { key: "registration_status", label: "Registration Status" },
        { key: "registration_link", label: "Registration Link", type: "url" },
        { key: "is_published", label: "Published", type: "checkbox" },
      ]}
      defaultRecord={{
        title: "Upcoming Event",
        is_published: true,
      }}
    />
  );
}
