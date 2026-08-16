import { CrudEditor } from "@/components/admin/CrudEditor";

export default function Page() {
  return (
    <CrudEditor
      title="Academy Settings"
      description="Update academy details used across the public site."
      table="academy_settings"
      fields={[
        { key: "academy_name", label: "Academy Name" },
        { key: "tagline", label: "Tagline" },
        { key: "address", label: "Address" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
        { key: "whatsapp", label: "WhatsApp" },
        { key: "training_hours", label: "Training Hours" },
        { key: "map_embed_url", label: "Map Embed URL", type: "url" },
        { key: "logo_url", label: "Logo URL", type: "url" },
      ]}
      defaultRecord={{
        academy_name: "TEAM J ACADEMY",
        tagline: "Discipline. Tradition. Strength.",
      }}
    />
  );
}
