import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/public/SectionHeading";
import { getGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from training, classes and events at Team J Academy.",
};

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <div className="pt-24 section-padding">
      <div className="container-wide">
        <SectionHeading title="Gallery" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((g) => (
            <figure
              key={g.id}
              className="relative aspect-square rounded-md overflow-hidden border border-border group"
            >
              <Image
                src={g.image_url}
                alt={g.caption || "Gallery image"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {g.caption && (
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  {g.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
