import type { Metadata } from "next";
import { SectionHeading } from "@/components/public/SectionHeading";
import { InstructorCard } from "@/components/public/InstructorCard";
import { getAboutSections, getBenefits, getInstructors } from "@/lib/data";
import { Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Team J Academy – mission, values, history of Silambam and our training philosophy.",
};

export default async function AboutPage() {
  const [about, benefits, instructors] = await Promise.all([
    getAboutSections(),
    getBenefits(),
    getInstructors(),
  ]);

  const mission = about.find((a) => a.section_key === "mission");
  const history = about.find((a) => a.section_key === "history");
  const philosophy = about.find((a) => a.section_key === "philosophy");

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading title="Our Academy" />
          {mission && (
            <div className="mb-16">
              <h3 className="font-display text-2xl text-gold mb-4">
                {mission.title}
              </h3>
              <p className="text-muted text-lg leading-relaxed whitespace-pre-line">
                {mission.content}
              </p>
            </div>
          )}
          {philosophy && (
            <div className="mb-16">
              <h3 className="font-display text-2xl text-gold mb-4">
                {philosophy.title}
              </h3>
              <p className="text-muted text-lg leading-relaxed whitespace-pre-line">
                {philosophy.content}
              </p>
            </div>
          )}
        </div>
      </section>

      {history && (
        <section className="section-padding bg-charcoal">
          <div className="container-narrow">
            <SectionHeading title={history.title || "History of Silambam"} />
            <p className="text-muted text-lg leading-relaxed whitespace-pre-line max-w-3xl mx-auto text-center">
              {history.content}
            </p>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading title="Benefits of Learning Silambam" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div
                key={b.id}
                className="rounded-lg border border-border bg-charcoal p-6"
              >
                <Target className="h-7 w-7 text-gold mb-3" />
                <h3 className="font-display text-xl text-off-white mb-2">
                  {b.title}
                </h3>
                {b.description && (
                  <p className="text-muted text-sm">{b.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <SectionHeading title="Instructors" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {instructors.map((i) => (
              <InstructorCard key={i.id} instructor={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
