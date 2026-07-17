import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { ProfileContactActions } from "@/components/sections/ProfileContactActions";
import { FavouriteButton } from "@/components/sections/FavouriteButton";
import type { Craftsman } from "@/types";

interface ProfileSidebarProps {
  craftsman: Craftsman;
  showFavourite: boolean;
  userId: string | null;
  initialFavourited: boolean;
}

/** Sticky desktop contact card: photo, rating, verification, and the Pozovi/Poruka actions. */
export function ProfileSidebar({ craftsman, showFavourite, userId, initialFavourited }: ProfileSidebarProps) {
  return (
    <div className="lg:sticky lg:top-28">
      <div className="flex flex-col items-center rounded-3xl bg-surface-white p-8 text-center shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
        <Image
          src={craftsman.avatarUrl}
          alt={craftsman.fullName}
          width={96}
          height={96}
          className="mb-4 h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-lg"
        />
        <h3 className="text-headline-md text-text-main">{craftsman.fullName}</h3>
        <p className="mb-3 text-body-md text-text-muted">{craftsman.headline}</p>
        {craftsman.verified ? (
          <Badge tone="success" icon="verified" className="mb-4">
            Verifikovan
          </Badge>
        ) : null}
        <StarRating rating={craftsman.rating} reviewCount={craftsman.reviewCount} className="mb-6" />
        <ProfileContactActions phone={craftsman.phone} craftsmanId={craftsman.id} className="w-full" />
        {showFavourite ? (
          <FavouriteButton
            craftsmanId={craftsman.id}
            userId={userId}
            initialFavourited={initialFavourited}
            className="mt-3 w-full"
          />
        ) : null}
      </div>
    </div>
  );
}
