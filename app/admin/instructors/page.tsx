import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="Instructors"
      description="Edit instructor profiles, specializations, and biographies."
      table="instructors"
      fields={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "bio", label: "Bio", type: "textarea" },
        { key: "experience", label: "Experience" },
        { key: "specialization", label: "Specialization" },
        { key: "training_focus", label: "Training Focus" },
        { key: "achievements", label: "Achievements" },
        { key: "certifications", label: "Certifications" },
        { key: "profile_image_url", label: "Profile Image URL", type: "url" },
        { key: "sort_order", label: "Sort Order", type: "number" },
        { key: "is_published", label: "Published", type: "checkbox" },
      ]}
      defaultRecord={{
        name: "Instructor Name",
        sort_order: 0,
        is_published: true,
      }}
    />
  );
}
