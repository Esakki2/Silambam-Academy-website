import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="Classes"
      description="Manage class lineup, schedules, and sessions for each program."
      table="classes"
      fields={[
        { key: "name", label: "Class Name" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "age_group", label: "Age Group" },
        { key: "skill_level", label: "Skill Level" },
        { key: "instructor_id", label: "Instructor ID" },
        { key: "location", label: "Location" },
        { key: "capacity", label: "Capacity", type: "number" },
        { key: "fee", label: "Fee" },
        { key: "image_url", label: "Image URL", type: "url" },
        { key: "is_featured", label: "Featured", type: "checkbox" },
        { key: "is_active", label: "Active", type: "checkbox" },
      ]}
      defaultRecord={{
        name: "Silambam Foundation",
        is_active: true,
        is_featured: false,
      }}
    />
  );
}
