"use client";

import Image from "next/image";
import { useState } from "react";
import type { Weapon } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

interface WeaponCardProps {
  weapon: Weapon;
  featured?: boolean;
}

export function WeaponCard({ weapon, featured }: WeaponCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative w-full text-left overflow-hidden rounded-lg border border-border bg-charcoal card-interactive focus-visible:ring-2 focus-visible:ring-gold",
          featured ? "md:col-span-2 md:row-span-1" : ""
        )}
        aria-label={`View details for ${weapon.name}`}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            featured ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/3]"
          )}
        >
          {weapon.image_url ? (
            <Image
              src={weapon.image_url}
              alt={weapon.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-charcoal-light" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-colors pointer-events-none rounded-lg" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <h3 className="font-display text-xl md:text-2xl text-gold">
            {weapon.name}
          </h3>
          {weapon.short_description && (
            <p className="mt-2 text-sm text-muted line-clamp-2 group-hover:text-off-white transition-colors">
              {weapon.short_description}
            </p>
          )}
          <span className="mt-3 inline-block text-xs uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity">
            View Details →
          </span>
        </div>
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title={weapon.name} size="xl">
        <div className="grid md:grid-cols-2 gap-8">
          {weapon.image_url && (
            <div className="relative aspect-[4/3] rounded-md overflow-hidden">
              <Image
                src={weapon.image_url}
                alt={weapon.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          <div className="space-y-5 text-sm md:text-base">
            {weapon.short_description && (
              <p className="text-off-white text-lg leading-relaxed">
                {weapon.short_description}
              </p>
            )}
            {weapon.full_description && (
              <div>
                <h4 className="text-gold text-sm uppercase tracking-wider mb-2">
                  Description
                </h4>
                <p className="text-muted leading-relaxed">{weapon.full_description}</p>
              </div>
            )}
            {weapon.historical_context && (
              <div>
                <h4 className="text-gold text-sm uppercase tracking-wider mb-2">
                  Historical Context
                </h4>
                <p className="text-muted leading-relaxed">{weapon.historical_context}</p>
              </div>
            )}
            {weapon.cultural_significance && (
              <div>
                <h4 className="text-gold text-sm uppercase tracking-wider mb-2">
                  Cultural Significance
                </h4>
                <p className="text-muted leading-relaxed">
                  {weapon.cultural_significance}
                </p>
              </div>
            )}
            {weapon.training_level && (
              <div>
                <h4 className="text-gold text-sm uppercase tracking-wider mb-2">
                  Training Level
                </h4>
                <p className="text-muted">{weapon.training_level}</p>
              </div>
            )}
            {weapon.safety_note && (
              <div className="rounded-md border border-earth-red/40 bg-earth-red/10 p-4">
                <h4 className="text-earth-red text-sm uppercase tracking-wider mb-1">
                  Safety Note
                </h4>
                <p className="text-muted text-sm">{weapon.safety_note}</p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
