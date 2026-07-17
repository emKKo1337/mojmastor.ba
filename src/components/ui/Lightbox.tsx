"use client";

import { useEffect } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/** Generic full-screen image viewer with keyboard navigation, used for gallery previews. */
export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const open = index !== null && images.length > 0;
  const current = open ? images[index] : null;
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!open || index === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (hasMultiple && event.key === "ArrowRight") {
        onIndexChange(((index as number) + 1) % images.length);
      }
      if (hasMultiple && event.key === "ArrowLeft") {
        onIndexChange(((index as number) - 1 + images.length) % images.length);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, index, images.length, hasMultiple, onClose, onIndexChange]);

  if (!open || !current || index === null) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.caption ?? current.alt}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      <button
        type="button"
        onClick={onClose}
        aria-label="Zatvori pregled slike"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <MaterialIcon name="close" />
      </button>

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={() => onIndexChange((index - 1 + images.length) % images.length)}
            aria-label="Prethodna slika"
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
          >
            <MaterialIcon name="chevron_left" />
          </button>
          <button
            type="button"
            onClick={() => onIndexChange((index + 1) % images.length)}
            aria-label="Sljedeća slika"
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
          >
            <MaterialIcon name="chevron_right" />
          </button>
        </>
      ) : null}

      <div className="relative z-10 w-full max-w-4xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/20">
          <Image src={current.src} alt={current.alt} fill className="object-contain" sizes="(min-width: 768px) 800px, 100vw" />
        </div>
        {current.caption ? <p className="mt-4 text-center text-body-md text-white/80">{current.caption}</p> : null}
        {hasMultiple ? (
          <p className="mt-1 text-center text-label-sm text-white/50">
            {index + 1} / {images.length}
          </p>
        ) : null}
      </div>
    </div>
  );
}
