"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";
import type { Craftsman } from "@/types";

const galleryLayout = ["md:col-span-2 md:row-span-2", "", "", "md:col-span-2"];

interface ProfileGalleryProps {
  gallery: Craftsman["gallery"];
  craftsmanName: string;
}

/** Responsive bento gallery grid with click-to-open lightbox and an empty state. */
export function ProfileGallery({ gallery, craftsmanName }: ProfileGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (gallery.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border-light bg-surface-container-lowest px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary">
          <MaterialIcon name="photo_library" className="text-3xl" />
        </div>
        <p className="text-body-md text-text-muted">Ovaj majstor još nije dodao fotografije svojih radova.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[200px]">
        {gallery.map((item, index) => (
          <button
            type="button"
            key={item.src}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "group relative overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              galleryLayout[index] ?? "",
            )}
            aria-label={`Otvori sliku: ${item.caption || craftsmanName}`}
          >
            <Image
              src={item.src}
              alt={item.caption || `Rad majstora ${craftsmanName}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-sm text-white">{item.caption}</p>
            </div>
            <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <MaterialIcon name="zoom_in" className="text-[18px]" />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={gallery.map((item) => ({
          src: item.src,
          alt: item.caption || `Rad majstora ${craftsmanName}`,
          caption: item.caption,
        }))}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onIndexChange={setActiveIndex}
      />
    </>
  );
}
