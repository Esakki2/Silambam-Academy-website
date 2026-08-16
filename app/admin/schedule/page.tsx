import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="Schedule"
      description="Manage session timing, day slots, and availability information."
      table="schedules"
      fields={[
        { key: "class_id", label: "Class ID" },
        { key: "instructor_id", label: "Instructor ID" },
        { key: "day_of_week", label: "Day of Week" },
        { key: "start_time", label: "Start Time" },
        { key: "end_time", label: "End Time" },
        { key: "location", label: "Location" },
        { key: "status", label: "Status" },
        { key: "is_published", label: "Published", type: "checkbox" },
      ]}
      defaultRecord={{
        day_of_week: "Monday",
        status: "available",
        is_published: true,
      }}
    />
  );
}
