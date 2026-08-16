import type { Metadata } from "next";
import { SectionHeading } from "@/components/public/SectionHeading";
import { InstructorCard } from "@/components/public/InstructorCard";
import { getInstructors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Instructors",
  description: "Meet the instructors at Team J Academy Silambam.",
};

export default async function InstructorsPage() {
  const instructors = await getInstructors();

  return (
    <div className="pt-24 section-padding">
      <div className="container-wide">
        <SectionHeading
          title="Instructors"
          subtitle="Experienced teachers dedicated to traditional Silambam"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {instructors.map((i) => (
            <InstructorCard key={i.id} instructor={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
