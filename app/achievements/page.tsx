import type { Metadata } from "next";
import { SectionHeading } from "@/components/public/SectionHeading";
import { getAchievements } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Student and academy achievements at Team J Academy.",
};

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="pt-24 section-padding">
      <div className="container-narrow">
        <SectionHeading title="Achievements" />
        <div className="space-y-8">
          {achievements.map((a) => (
            <article
              key={a.id}
              className="border-l-2 border-gold pl-6 py-2"
            >
              <h2 className="font-display text-2xl text-off-white">{a.title}</h2>
              {a.person_or_team && (
                <p className="text-gold mt-1">{a.person_or_team}</p>
              )}
              <div className="text-sm text-muted mt-1 space-x-2">
                {a.event_name && <span>{a.event_name}</span>}
                {a.achievement_date && (
                  <span>· {formatDate(a.achievement_date)}</span>
                )}
                {a.award_position && <span>· {a.award_position}</span>}
              </div>
              {a.description && (
                <p className="mt-3 text-muted leading-relaxed">{a.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
