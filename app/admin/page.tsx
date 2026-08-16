import Link from "next/link";
import { SectionHeading } from "@/components/public/SectionHeading";

const LINKS = [
  { href: "/admin/settings", label: "Academy Settings" },
  { href: "/admin/featured", label: "Featured Content" },
  { href: "/admin/about", label: "About / History" },
  { href: "/admin/benefits", label: "Benefits" },
  { href: "/admin/grades", label: "Grades" },
  { href: "/admin/weapons", label: "Weapons" },
  { href: "/admin/classes", label: "Classes" },
  { href: "/admin/instructors", label: "Instructors" },
  { href: "/admin/schedule", label: "Schedule" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/achievements", label: "Achievements" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/trial-registrations", label: "Trial Registrations" },
  { href: "/admin/training", label: "Training Content" },
];

export default function AdminDashboard() {
  return (
    <div className="pt-24 section-padding">
      <div className="container-wide">
        <SectionHeading
          title="Admin Dashboard"
          subtitle="Manage all Team J Academy website content"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg border border-border bg-charcoal p-5 hover:border-gold/50 transition-colors"
            >
              <span className="text-off-white font-medium">{l.label}</span>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-muted text-sm max-w-2xl">
          Full CMS forms for each section (image upload, publish toggles,
          reorder, CRUD) are implemented against the Supabase tables defined in
          <code className="text-gold"> supabase/migrations/</code>. Connect
          your project, run the migrations, create an admin user, and every
          public page will reflect live content.
        </p>
      </div>
    </div>
  );
}
