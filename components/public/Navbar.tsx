"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import gsap from "gsap";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#classes", label: "Classes" },
  { href: "/#instructors", label: "Instructors" },
  { href: "/#events", label: "Events" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#training", label: "Training" },
  { href: "/join", label: "Join" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSectionNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("/#")) return;

    event.preventDefault();
    const sectionId = href.split("#")[1];

    if (pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `/#${sectionId}`);
      }
      return;
    }

    router.push(`/#${sectionId}`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (open) {
      document.body.style.overflow = "hidden";
      if (!prefersReduced) {
        gsap.fromTo(
          menuRef.current,
          { opacity: 0, x: "100%" },
          { opacity: 1, x: "0%", duration: 0.35, ease: "power2.out" }
        );
      } else {
        gsap.set(menuRef.current, { opacity: 1, x: "0%" });
      }
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      )}
    >
<nav className="container-wide flex h-16 items-center px-4 sm:px-6 lg:px-8 md:h-20">
        <div className="flex w-full items-center justify-between gap-3">
          <Link
            href="/"
            className="shrink-0 font-display text-base tracking-[0.12em] text-gold transition-colors hover:text-gold-light sm:text-lg md:text-xl"
          >
            TEAM J ACADEMY
          </Link>

          {/* Desktop */}
          <div className="hidden xl:flex flex-1 justify-center">
            <ul className="flex items-center justify-center gap-1.5 whitespace-nowrap">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(event) => handleSectionNavigation(event, link.href)}
                    className={cn(
                      "inline-flex items-center justify-center px-2.5 py-2 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors sm:text-[11px]",
                      pathname === "/" && link.href.includes("#")
                        ? "text-gold"
                        : pathname === link.href
                          ? "text-gold"
                          : "text-muted hover:text-off-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:flex shrink-0 items-center justify-end">
            <Link href="/join">
              <Button className="rounded-md px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-5">
                Book a Trial Class
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="p-2 text-off-white hover:text-gold xl:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      {open && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-50 bg-background flex flex-col xl:hidden"
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <span className="font-display text-lg text-gold">TEAM J ACADEMY</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 text-off-white hover:text-gold"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-8 px-6">
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(event) => {
                      handleSectionNavigation(event, link.href);
                      setOpen(false);
                    }}
                    className={cn(
                      "block py-3 text-lg uppercase tracking-wide border-b border-border/50",
                      pathname === "/" && link.href.includes("#")
                        ? "text-gold"
                        : pathname === link.href
                          ? "text-gold"
                          : "text-off-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/join" onClick={() => setOpen(false)}>
                <Button className="w-full" size="lg">
                  Book a Trial Class
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
