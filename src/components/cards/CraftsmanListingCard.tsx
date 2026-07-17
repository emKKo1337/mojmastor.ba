import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { StarRating } from "@/components/ui/StarRating";
import type { Craftsman } from "@/types";
import { cn } from "@/lib/utils";

const availabilityDot: Record<Craftsman["availability"], string> = {
  available: "bg-secondary",
  busy: "bg-text-muted",
  away: "bg-outline-variant",
};

const availabilityLabel: Record<Craftsman["availability"], string> = {
  available: "Dostupan",
  busy: "Zauzet",
  away: "Odsutan",
};

/** Rich craftsman card for category listing pages — photo, verification, rating, tags, and contact actions. */
export function CraftsmanListingCard({ craftsman }: { craftsman: Craftsman }) {
  return (
    <div className="group flex flex-col rounded-xl border border-border-light bg-surface-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
      <div className="flex gap-4">
        <div className="relative shrink-0 overflow-hidden rounded-xl">
          <Image
            src={craftsman.avatarUrl}
            alt={craftsman.fullName}
            width={64}
            height={64}
            className="h-16 w-16 rounded-xl border-2 border-surface-container object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className={cn(
              "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-surface-white",
              availabilityDot[craftsman.availability],
            )}
            title={availabilityLabel[craftsman.availability]}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-headline-md text-text-main transition-colors group-hover:text-primary">
              {craftsman.fullName}
            </h3>
            {craftsman.verified ? (
              <Badge tone="success" icon="verified">
                Verifikovan
              </Badge>
            ) : null}
          </div>
          <p className="text-body-md text-text-muted">{craftsman.headline}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-label-sm text-text-muted">
            <span className="flex items-center gap-1">
              <MaterialIcon name="location_on" className="text-[16px]" />
              {craftsman.city}
            </span>
            <span className="flex items-center gap-1">
              <MaterialIcon name="work_history" className="text-[16px]" />
              {craftsman.yearsExperience}+ god. iskustva
            </span>
          </div>
        </div>
      </div>

      <StarRating rating={craftsman.rating} reviewCount={craftsman.reviewCount} size="sm" className="mt-4" />

      <p className="mt-4 line-clamp-2 text-body-md text-text-muted">{craftsman.bio[0]}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {craftsman.tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-label-sm text-secondary">
        <MaterialIcon name="bolt" filled className="text-[16px]" />
        Odgovara za {craftsman.responseTime}
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-border-light pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-label-lg text-text-main">
          <MaterialIcon name="call" className="text-primary" />
          {craftsman.phone}
        </div>
        <div className="flex gap-3">
          <Button href={`tel:${craftsman.phone.replace(/\s+/g, "")}`} variant="outline" size="sm" className="flex-1">
            Pozovi
          </Button>
          <Button href={`/majstor/${craftsman.id}`} variant="primary" size="sm" className="flex-1">
            Pogledaj profil
          </Button>
        </div>
      </div>
    </div>
  );
}
