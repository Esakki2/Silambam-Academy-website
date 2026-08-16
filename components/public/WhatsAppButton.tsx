"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  number: string | null | undefined;
}

export function WhatsAppButton({ number }: WhatsAppButtonProps) {
  if (!number) return null;

  const clean = number.replace(/\D/g, "");
  const href = `https://wa.me/${clean}?text=${encodeURIComponent(
    "Hello Team J Academy, I am interested in Silambam classes."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-[#1b9d53] bg-[#25D366] text-white shadow-[0_10px_22px_rgba(37,211,102,0.35)] transition-all duration-200 hover:scale-105 hover:shadow-[0_12px_26px_rgba(37,211,102,0.45)] focus-visible:ring-2 focus-visible:ring-gold"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2.2} fill="currentColor" />
    </a>
  );
}
