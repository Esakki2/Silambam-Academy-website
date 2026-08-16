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
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 hover:scale-105 transition-transform focus-visible:ring-2 focus-visible:ring-gold"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  );
}
