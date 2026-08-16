import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="Trial Registrations"
      description="Review and update trial class registrations submitted by parents and students."
      table="trial_registrations"
      fields={[
        { key: "student_name", label: "Student Name" },
        { key: "date_of_birth", label: "Date of Birth" },
        { key: "age", label: "Age", type: "number" },
        { key: "parent_guardian_name", label: "Parent / Guardian Name" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
        { key: "preferred_class", label: "Preferred Class" },
        { key: "preferred_day_time", label: "Preferred Day / Time" },
        { key: "previous_experience", label: "Previous Experience" },
        { key: "message", label: "Message", type: "textarea" },
        { key: "status", label: "Status" },
        { key: "consent", label: "Consent", type: "checkbox" },
      ]}
      defaultRecord={{
        student_name: "Student Name",
        consent: true,
        status: "NEW",
      }}
    />
  );
}
