import type { Metadata } from "next";
import { SectionHeading } from "@/components/public/SectionHeading";
import { getSettings } from "@/lib/data";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Team J Academy for Silambam classes in Chennai.",
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="pt-24 section-padding">
      <div className="container-narrow">
        <SectionHeading title="Contact Us" />
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {settings.address && (
              <div className="flex gap-4">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-off-white font-medium">Address</h3>
                  <p className="text-muted text-sm mt-1">{settings.address}</p>
                </div>
              </div>
            )}
            {settings.phone && (
              <div className="flex gap-4">
                <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-off-white font-medium">Phone</h3>
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="text-muted text-sm mt-1 hover:text-gold"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>
            )}
            {settings.email && (
              <div className="flex gap-4">
                <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-off-white font-medium">Email</h3>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-muted text-sm mt-1 hover:text-gold"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>
            )}
            {settings.training_hours && (
              <div className="flex gap-4">
                <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-off-white font-medium">Training Hours</h3>
                  <p className="text-muted text-sm mt-1 whitespace-pre-line">
                    {settings.training_hours}
                  </p>
                </div>
              </div>
            )}
            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 rounded-md bg-[#25D366] px-5 py-2.5 text-white font-medium hover:opacity-90"
              >
                Chat on WhatsApp
              </a>
            )}
          </div>
          <div className="rounded-lg border border-border bg-charcoal p-6 text-muted text-sm">
            <p>
              For class enquiries, trial bookings or any other questions, reach
              out by phone, WhatsApp or email. We look forward to welcoming you
              to Team J Academy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
