"use client";

import Image from "next/image";
import { useState } from "react";
import type { Instructor } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative w-full text-left overflow-hidden rounded-lg border border-border bg-charcoal card-interactive focus-visible:ring-2 focus-visible:ring-gold"
        aria-label={`View profile of ${instructor.name}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          {instructor.profile_image_url ? (
            <Image
              src={instructor.profile_image_url}
              alt={instructor.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-charcoal-light flex items-center justify-center text-muted text-4xl font-display">
              {instructor.name.charAt(0)}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
          <div className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-colors pointer-events-none rounded-lg" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-xl text-gold">{instructor.name}</h3>
          {instructor.role && (
            <p className="text-sm text-muted mt-1">{instructor.role}</p>
          )}
          <span className="mt-3 inline-block text-xs uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity">
            View Profile →
          </span>
        </div>
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={instructor.name}
        size="xl"
      >
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          <div>
            {instructor.profile_image_url ? (
              <div className="relative aspect-[3/4] rounded-md overflow-hidden">
                <Image
                  src={instructor.profile_image_url}
                  alt={instructor.name}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
            ) : null}
            {instructor.role && (
              <p className="mt-4 text-gold text-center md:text-left font-medium">
                {instructor.role}
              </p>
            )}
          </div>
          <div className="space-y-5 text-sm md:text-base">
            {instructor.bio && (
              <div>
                <h4 className="text-gold text-sm uppercase tracking-wider mb-2">
                  Biography
                </h4>
                <p className="text-muted leading-relaxed whitespace-pre-line">
                  {instructor.bio}
                </p>
              </div>
            )}
            {instructor.experience && (
              <div>
                <h4 className="text-gold text-sm uppercase tracking-wider mb-2">
                  Experience
                </h4>
                <p className="text-muted leading-relaxed">{instructor.experience}</p>
              </div>
            )}
            {instructor.specialization && (
              <div>
                <h4 className="text-gold text-sm uppercase tracking-wider mb-2">
                  Specialization
                </h4>
                <p className="text-muted">{instructor.specialization}</p>
              </div>
            )}
            {instructor.training_focus && (
              <div>
                <h4 className="text-gold text-sm uppercase tracking-wider mb-2">
                  Training Focus
                </h4>
                <p className="text-muted">{instructor.training_focus}</p>
              </div>
            )}
            {instructor.achievements && (
              <div>
                <h4 className="text-gold text-sm uppercase tracking-wider mb-2">
                  Achievements
                </h4>
                <p className="text-muted leading-relaxed whitespace-pre-line">
                  {instructor.achievements}
                </p>
              </div>
            )}
            {instructor.certifications && (
              <div>
                <h4 className="text-gold text-sm uppercase tracking-wider mb-2">
                  Certifications
                </h4>
                <p className="text-muted">{instructor.certifications}</p>
              </div>
            )}
            {instructor.social_links &&
              Object.keys(instructor.social_links).length > 0 && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {Object.entries(instructor.social_links).map(
                    ([key, url]) =>
                      url && (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:text-gold-light text-sm capitalize"
                        >
                          {key}
                        </a>
                      )
                  )}
                </div>
              )}
          </div>
        </div>
      </Modal>
    </>
  );
}
