import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { Craftsman } from "@/types";

/** Compact card used for "similar craftsmen" style listings: photo, name, rating, city, and a profile link. */
export function CraftsmanMiniCard({ craftsman }: { craftsman: Craftsman }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border-light bg-surface-white p-6 text-center shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Image
        src={craftsman.avatarUrl}
        alt={craftsman.fullName}
        width={80}
        height={80}
        className="mb-4 h-20 w-20 rounded-full border-2 border-surface-container object-cover"
      />
      <h3 className="text-label-lg text-text-main">{craftsman.fullName}</h3>
      <div className="mt-1 flex items-center gap-1 text-tertiary-container">
        <MaterialIcon name="star" filled className="text-[16px]" />
        <span className="text-sm font-bold text-text-main">{craftsman.rating.toFixed(1)}</span>
      </div>
      <p className="mt-1 flex items-center gap-1 text-label-sm text-text-muted">
        <MaterialIcon name="location_on" className="text-[16px]" />
        {craftsman.city}
      </p>
      <Button href={`/majstor/${craftsman.id}`} variant="outline" size="sm" fullWidth className="mt-5">
        Pogledaj profil
      </Button>
    </div>
  );
}
