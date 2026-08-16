import Link from "next/link";
import type { AcademySettings } from "@/types";

interface FooterProps {
  settings: AcademySettings;
}

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/instructors", label: "Instructors" },
  { href: "/schedule", label: "Schedule" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/join", label: "Join Us" },
  { href: "/contact", label: "Contact" },
];

export function Footer({ settings }: FooterProps) {
  const year = "2026";

  return (
    <footer className="border-t border-border bg-charcoal">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display text-xl text-gold mb-3">
              {settings.academy_name}
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              {settings.tagline}
            </p>
            <p className="text-muted text-sm">
              Traditional Silambam martial arts training rooted in Tamil culture
              and modern discipline.
            </p>
          </div>

          <div>
            <h4 className="text-off-white font-medium mb-4 uppercase tracking-wider text-sm">
              Explore
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted hover:text-gold text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-off-white font-medium mb-4 uppercase tracking-wider text-sm">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              {settings.address && <li>{settings.address}</li>}
              {settings.phone && (
                <li>
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="hover:text-gold transition-colors"
                  >
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:text-gold transition-colors"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-off-white font-medium mb-4 uppercase tracking-wider text-sm">
              Training Hours
            </h4>
            <p className="text-sm text-muted whitespace-pre-line">
              {settings.training_hours || "Contact us for schedule"}
            </p>
            {settings.social_links && (
              <div className="flex gap-4 mt-6">
                {Object.entries(settings.social_links).map(([key, url]) =>
                  url ? (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-gold text-sm capitalize transition-colors"
                    >
                      {key}
                    </a>
                  ) : null
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted">
          <p>
            © {year} {settings.academy_name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
