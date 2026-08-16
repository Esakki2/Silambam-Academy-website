import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/public/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getClasses } from "@/lib/data";

export const metadata: Metadata = {
  title: "Classes",
  description: "Silambam classes for kids, teens, adults, beginners and advanced students at Team J Academy.",
};

export default async function ClassesPage() {
  const classes = await getClasses();

  return (
    <div className="pt-24 section-padding">
      <div className="container-wide">
        <SectionHeading
          title="Classes"
          subtitle="Find the right program for your age and experience level"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((c) => (
            <article
              key={c.id}
              className="rounded-lg border border-border overflow-hidden bg-charcoal card-interactive"
            >
              {c.image_url && (
                <div className="relative aspect-[16/10]">
                  <Image
                    src={c.image_url}
                    alt={c.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="font-display text-2xl text-gold">{c.name}</h2>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted">
                  {c.age_group && <span>{c.age_group}</span>}
                  {c.skill_level && <span>· {c.skill_level}</span>}
                </div>
                {c.description && (
                  <p className="mt-4 text-sm text-muted leading-relaxed">
                    {c.description}
                  </p>
                )}
                {c.days && c.days.length > 0 && (
                  <p className="mt-3 text-sm text-off-white">
                    {c.days.join(", ")}
                    {c.start_time ? ` · ${c.start_time}` : ""}
                    {c.end_time ? `–${c.end_time}` : ""}
                  </p>
                )}
                {c.location && (
                  <p className="text-xs text-muted mt-1">{c.location}</p>
                )}
                <Link href="/join" className="inline-block mt-5">
                  <Button size="sm">Book a Trial</Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
