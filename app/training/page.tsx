import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/public/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getAboutSections } from "@/lib/data";

export const metadata: Metadata = {
  title: "Training",
  description:
    "Training philosophy and member resources at Team J Academy Silambam.",
};

export default async function TrainingPage() {
  const about = await getAboutSections();
  const philosophy = about.find((a) => a.section_key === "philosophy");

  return (
    <div className="pt-24 section-padding">
      <div className="container-narrow">
        <SectionHeading
          title="Training"
          subtitle="Our approach to Silambam practice"
        />
        {philosophy && (
          <p className="text-muted text-lg leading-relaxed whitespace-pre-line mb-12">
            {philosophy.content}
          </p>
        )}
        <div className="rounded-lg border border-border bg-charcoal p-8 text-center">
          <h3 className="font-display text-2xl text-gold mb-3">
            Members Area
          </h3>
          <p className="text-muted mb-6 max-w-md mx-auto">
            Training videos, practice resources, progress tracking and
            certificates will be available for enrolled members. Authentication
            foundation is in place for future expansion.
          </p>
          <Link href="/join">
            <Button>Join a Class</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
