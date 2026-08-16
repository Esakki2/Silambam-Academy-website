import type { Metadata } from "next";
import { SectionHeading } from "@/components/public/SectionHeading";
import { TrialForm } from "@/components/public/TrialForm";

export const metadata: Metadata = {
  title: "Book a Trial Class",
  description:
    "Register for a trial Silambam class at Team J Academy. Experience traditional martial arts training.",
};

export default function JoinPage() {
  return (
    <div className="pt-24 section-padding">
      <div className="container-narrow max-w-2xl">
        <SectionHeading
          title="Book a Trial Class"
          subtitle="Take the first step into traditional Silambam training"
        />
        <TrialForm />
      </div>
    </div>
  );
}
