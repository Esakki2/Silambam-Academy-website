"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import type { HomepageContent } from "@/types";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  content: HomepageContent;
}

export function Hero({ content }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.45 }
      );
      gsap.fromTo(
        ".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.65 }
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.85 }
      );
      gsap.fromTo(
        ".hero-image",
        { scale: 1.08, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 1.6, ease: "power2.out" }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {content.hero_image_url && (
        <div className="absolute inset-0 hero-image">
          <Image
            src={content.hero_image_url}
            alt="Team J Academy Silambam training"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
        </div>
      )}

      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center md:text-left">
        <p className="hero-sub text-gold uppercase tracking-[0.3em] text-sm md:text-base mb-4">
          {content.hero_subtitle || "Traditional Tamil Martial Art"}
        </p>
        <h1 className="hero-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-off-white leading-tight max-w-4xl">
          {content.hero_title || "TEAM J ACADEMY"}
        </h1>
        <p className="hero-desc mt-6 text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
          {content.hero_description ||
            "Learn the ancient art of Silambam. Build discipline, confidence, agility and strength."}
        </p>
        <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link href={content.primary_cta_url || "/join"}>
            <Button size="lg">{content.primary_cta_text || "Book a Trial Class"}</Button>
          </Link>
          <Link href={content.secondary_cta_url || "/about"}>
            <Button variant="outline" size="lg">
              {content.secondary_cta_text || "Explore Silambam"}
            </Button>
          </Link>
        </div>
      </div>

      <a
        href="#featured"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-gold transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </section>
  );
}
