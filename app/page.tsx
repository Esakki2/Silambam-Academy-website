import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/public/Hero";
import { SectionHeading } from "@/components/public/SectionHeading";
import { WeaponCard } from "@/components/public/WeaponCard";
import { InstructorCard } from "@/components/public/InstructorCard";
import { Button } from "@/components/ui/Button";
import {
  getHomepage,
  getFeatured,
  getAboutSections,
  getBenefits,
  getGrades,
  getWeapons,
  getInstructors,
  getClasses,
  getEvents,
  getAchievements,
  getGallery,
} from "@/lib/data";
import {
  Dumbbell,
  Activity,
  Zap,
  Target,
  Shield,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Dumbbell,
  Activity,
  Zap,
  Target,
  Shield,
  Landmark,
};

export default async function HomePage() {
  const [
    homepage,
    featured,
    about,
    benefits,
    grades,
    weapons,
    instructors,
    classes,
    events,
    achievements,
    gallery,
  ] = await Promise.all([
    getHomepage(),
    getFeatured(),
    getAboutSections(),
    getBenefits(),
    getGrades(),
    getWeapons(),
    getInstructors(),
    getClasses(),
    getEvents(true),
    getAchievements(),
    getGallery(),
  ]);

  const history = about.find((a) => a.section_key === "history");
  const mission = about.find((a) => a.section_key === "mission");

  return (
    <>
      <Hero content={homepage} />

      {featured && (
        <section id="featured" className="section-padding bg-charcoal">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {featured.image_url && (
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border">
                  <Image
                    src={featured.image_url}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}
              <div>
                {featured.category && (
                  <span className="text-gold text-sm uppercase tracking-widest">
                    {featured.category}
                  </span>
                )}
                <h2 className="font-display text-3xl md:text-4xl text-off-white mt-2">
                  {featured.title}
                </h2>
                {featured.description && (
                  <p className="mt-4 text-muted leading-relaxed">
                    {featured.description}
                  </p>
                )}
                {featured.cta_text && featured.cta_url && (
                  <Link href={featured.cta_url} className="inline-block mt-6">
                    <Button variant="outline">{featured.cta_text}</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {mission && (
        <section id="about" className="section-padding">
          <div className="container-narrow text-center">
            <SectionHeading title="About Team J Academy" />
            <p className="text-muted text-lg leading-relaxed max-w-3xl mx-auto">
              {mission.content}
            </p>
            <Link href="/about" className="inline-block mt-8">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </section>
      )}

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
          <SectionHeading
            title="Benefits of Learning Silambam"
            subtitle="Physical skill, mental strength and cultural connection"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => {
              const Icon = (b.icon && ICON_MAP[b.icon]) || Target;
              return (
                <div
                  key={b.id}
                  className="rounded-lg border border-border bg-charcoal p-6 hover:border-gold/40 transition-colors"
                >
                  <Icon className="h-8 w-8 text-gold mb-4" />
                  <h3 className="font-display text-xl text-off-white mb-2">
                    {b.title}
                  </h3>
                  {b.description && (
                    <p className="text-muted text-sm leading-relaxed">
                      {b.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <SectionHeading
            title="Grades & Levels"
            subtitle="Team J Silambam Academy grading pathway"
          />
          <div className="grade-timeline">
            <div className="grade-track" />
            <div className="grade-grid">
              {grades.map((g, i) => {
                const stripeCount = i >= 7 ? i - 6 : 0;

                return (
                  <div key={g.id} className="grade-node">
                    <div
                      className="grade-belt"
                      style={{
                        background: g.color || "#c9a227",
                        boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 12px 24px rgba(0,0,0,0.18)`,
                      }}
                    >
                      <span className="grade-belt-inner">
                        {Array.from({ length: stripeCount }).map((_, stripeIndex) => (
                          <span key={`${g.id}-stripe-${stripeIndex}`} className="grade-belt-stripe" />
                        ))}
                      </span>
                    </div>
                    <h3 className="grade-name">{g.name}</h3>
                    {g.description && (
                      <p className="grade-description">{g.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="weapons" className="section-padding">
        <div className="container-wide">
          <SectionHeading
            title="Traditional Weapons"
            subtitle="Silambam · Maankombu · Soorul"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {weapons.map((w, i) => (
              <WeaponCard key={w.id} weapon={w} featured={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <section id="classes" className="section-padding bg-charcoal">
        <div className="container-wide">
          <SectionHeading title="Classes" subtitle="Programs for every age and level" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((c) => (
              <div
                key={c.id}
                className="rounded-lg border border-border overflow-hidden bg-background card-interactive"
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
                <div className="p-5">
                  <h3 className="font-display text-xl text-gold">{c.name}</h3>
                  {c.age_group && (
                    <p className="text-xs text-muted mt-1">{c.age_group}</p>
                  )}
                  {c.description && (
                    <p className="mt-3 text-sm text-muted line-clamp-3">
                      {c.description}
                    </p>
                  )}
                  <Link href="/join" className="inline-block mt-4">
                    <Button size="sm">Book a Trial</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/classes">
              <Button variant="outline">View All Classes</Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="instructors" className="section-padding">
        <div className="container-wide">
          <SectionHeading title="Instructors" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {instructors.map((inst) => (
              <InstructorCard key={inst.id} instructor={inst} />
            ))}
          </div>
        </div>
      </section>

      {events.length > 0 && (
        <section id="events" className="section-padding bg-charcoal">
          <div className="container-wide">
            <SectionHeading title="Upcoming Events" />
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {events.slice(0, 2).map((e) => (
                <div
                  key={e.id}
                  className="rounded-lg border border-border overflow-hidden bg-background"
                >
                  {e.cover_image_url && (
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={e.cover_image_url}
                        alt={e.title}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    {e.category && (
                      <span className="text-xs text-gold uppercase tracking-wider">
                        {e.category}
                      </span>
                    )}
                    <h3 className="font-display text-xl text-off-white mt-1">
                      {e.title}
                    </h3>
                    {e.event_date && (
                      <p className="text-sm text-muted mt-2">
                        {formatDate(e.event_date)}
                        {e.location ? ` · ${e.location}` : ""}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/events">
                <Button variant="outline">All Events</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {achievements.length > 0 && (
        <section id="achievements" className="section-padding">
          <div className="container-narrow">
            <SectionHeading title="Achievements" />
            <div className="space-y-6">
              {achievements.slice(0, 3).map((a) => (
                <div key={a.id} className="border-l-2 border-gold pl-6 py-2">
                  <h3 className="font-display text-xl text-off-white">
                    {a.title}
                  </h3>
                  {a.person_or_team && (
                    <p className="text-gold text-sm mt-1">{a.person_or_team}</p>
                  )}
                  {a.event_name && (
                    <p className="text-muted text-sm">{a.event_name}</p>
                  )}
                  {a.description && (
                    <p className="text-muted text-sm mt-2 leading-relaxed">
                      {a.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/achievements">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section id="gallery" className="section-padding bg-charcoal">
          <div className="container-wide">
            <SectionHeading title="Gallery" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.slice(0, 4).map((g) => (
                <div
                  key={g.id}
                  className="relative aspect-square rounded-md overflow-hidden border border-border"
                >
                  <Image
                    src={g.image_url}
                    alt={g.caption || "Gallery"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/gallery">
                <Button variant="outline">View Gallery</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section id="training" className="section-padding">
        <div className="container-narrow text-center">
          <h2 className="font-display text-3xl md:text-4xl text-gold">
            Ready to Begin?
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            Book a trial class and experience traditional Silambam training at
            Team J Academy.
          </p>
          <Link href="/join" className="inline-block mt-8">
            <Button size="lg">Book a Trial Class</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
