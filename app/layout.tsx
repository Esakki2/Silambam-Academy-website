import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";
import { getSettings } from "@/lib/data";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "TEAM J ACADEMY | Silambam Martial Arts Training",
    template: "%s | TEAM J ACADEMY",
  },
  description:
    "Team J Academy – Traditional Silambam martial arts training in Chennai. Discipline. Tradition. Strength. Book a trial class today.",
  keywords: [
    "Team J Academy",
    "Silambam",
    "Silambam Academy",
    "Silambam classes",
    "Tamil martial arts",
    "traditional martial arts Chennai",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "TEAM J ACADEMY",
    title: "TEAM J ACADEMY | Silambam Martial Arts",
    description:
      "Learn the ancient art of Silambam. Build discipline, confidence, agility and strength.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cinzel.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-background text-foreground antialiased"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <WhatsAppButton number={settings.whatsapp} />
        <Toaster theme="dark" position="top-right" richColors />
      </body>
    </html>
  );
}
