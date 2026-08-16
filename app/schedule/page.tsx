import type { Metadata } from "next";
import { SectionHeading } from "@/components/public/SectionHeading";
import { getClasses } from "@/lib/data";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Class schedule at Team J Academy Silambam.",
};

export default async function SchedulePage() {
  const classes = await getClasses();

  return (
    <div className="pt-24 section-padding">
      <div className="container-wide">
        <SectionHeading
          title="Schedule"
          subtitle="Weekly class timetable"
        />
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-charcoal text-gold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Days</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">Location</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c) => (
                <tr key={c.id} className="border-t border-border">
                  <td className="px-4 py-3 text-off-white font-medium">
                    {c.name}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {c.days?.join(", ") || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {c.start_time || "—"}
                    {c.end_time ? ` – ${c.end_time}` : ""}
                  </td>
                  <td className="px-4 py-3 text-muted">{c.skill_level || "—"}</td>
                  <td className="px-4 py-3 text-muted">{c.location || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {classes.map((c) => (
            <div
              key={c.id}
              className="rounded-lg border border-border bg-charcoal p-4"
            >
              <h3 className="font-display text-lg text-gold">{c.name}</h3>
              <dl className="mt-3 space-y-1 text-sm text-muted">
                <div>
                  <dt className="inline text-off-white">Days: </dt>
                  <dd className="inline">{c.days?.join(", ") || "—"}</dd>
                </div>
                <div>
                  <dt className="inline text-off-white">Time: </dt>
                  <dd className="inline">
                    {c.start_time || "—"}
                    {c.end_time ? ` – ${c.end_time}` : ""}
                  </dd>
                </div>
                <div>
                  <dt className="inline text-off-white">Level: </dt>
                  <dd className="inline">{c.skill_level || "—"}</dd>
                </div>
                <div>
                  <dt className="inline text-off-white">Location: </dt>
                  <dd className="inline">{c.location || "—"}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
