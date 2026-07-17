import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { Craftsman } from "@/types";
import { cn } from "@/lib/utils";

const availabilityDot: Record<Craftsman["availability"], string> = {
  available: "bg-secondary",
  busy: "bg-text-muted",
  away: "bg-outline-variant",
};

export function CraftsmanCard({ craftsman }: { craftsman: Craftsman }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border-light bg-surface-white shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="relative shrink-0">
              <Image
                src={craftsman.avatarUrl}
                alt={craftsman.fullName}
                width={64}
                height={64}
                className="h-16 w-16 rounded-xl border-2 border-surface-container object-cover"
              />
              <span
                className={cn(
                  "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-surface-white",
                  availabilityDot[craftsman.availability],
                )}
                title={craftsman.availability === "available" ? "Dostupan" : "Zauzet"}
              />
            </div>
            <div>
              <h3 className="text-headline-md text-text-main transition-colors group-hover:text-primary">
                {craftsman.fullName}
              </h3>
              <p className="text-body-md text-text-muted">{craftsman.headline}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-label-lg text-amber-700">
            <MaterialIcon name="star" filled className="text-[18px]" />
            {craftsman.rating.toFixed(1)}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {craftsman.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-container-low px-3 py-1 text-label-sm text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border-light pt-6">
          <div>
            <p className="text-label-sm text-text-muted">Cijena od</p>
            <p className="text-headline-md font-bold text-text-main">
              {craftsman.hourlyRateFrom} KM <span className="text-body-md font-normal text-text-muted">/h</span>
            </p>
          </div>
          <Link
            href={`/majstor/${craftsman.id}`}
            className="rounded-lg bg-primary px-6 py-2.5 text-label-lg text-white transition-all hover:bg-primary-container"
          >
            Vidi profil
          </Link>
        </div>
      </div>
    </div>
  );
}
