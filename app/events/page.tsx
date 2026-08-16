import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/public/SectionHeading";
import { getEvents } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past Silambam events at Team J Academy.",
};

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    getEvents(true),
    getEvents(false),
  ]);

  return (
    <div className="pt-24 section-padding">
      <div className="container-wide">
        <SectionHeading title="Events" />
        <h3 className="font-display text-2xl text-gold mb-6">Upcoming</h3>
        {upcoming.length === 0 ? (
          <p className="text-muted mb-12">No upcoming events at the moment.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
        <h3 className="font-display text-2xl text-gold mb-6">Past Events</h3>
        {past.length === 0 ? (
          <p className="text-muted">No past events listed yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({
  event,
}: {
  event: Awaited<ReturnType<typeof getEvents>>[0];
}) {
  return (
    <article className="rounded-lg border border-border overflow-hidden bg-charcoal">
      {event.cover_image_url && (
        <div className="relative aspect-[16/9]">
          <Image
            src={event.cover_image_url}
            alt={event.title}
            fill
            className="object-cover"
            sizes="33vw"
          />
        </div>
      )}
      <div className="p-5">
        {event.category && (
          <span className="text-xs text-gold uppercase tracking-wider">
            {event.category}
          </span>
        )}
        <h3 className="font-display text-xl text-off-white mt-1">
          {event.title}
        </h3>
        {event.event_date && (
          <p className="text-sm text-muted mt-2">
            {formatDate(event.event_date)}
            {event.location ? ` · ${event.location}` : ""}
          </p>
        )}
        {event.description && (
          <p className="mt-3 text-sm text-muted line-clamp-3">
            {event.description}
          </p>
        )}
      </div>
    </article>
  );
}
