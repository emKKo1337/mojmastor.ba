"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button, type ButtonSize } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

interface FavouriteButtonProps {
  craftsmanId: string;
  userId: string | null;
  initialFavourited: boolean;
  size?: ButtonSize;
  className?: string;
}

/** Toggles a `favourites` row for the current korisnik. Redirects guests to login instead of mutating. */
export function FavouriteButton({ craftsmanId, userId, initialFavourited, size = "lg", className }: FavouriteButtonProps) {
  const router = useRouter();
  const [favourited, setFavourited] = useState(initialFavourited);
  const [pending, setPending] = useState(false);

  async function toggle() {
    if (!userId) {
      router.push(`/prijava?redirect=/majstor/${craftsmanId}`);
      return;
    }

    setPending(true);
    const supabase = createClient();

    if (favourited) {
      const { error } = await supabase
        .from("favourites")
        .delete()
        .eq("user_id", userId)
        .eq("craftsman_ref", craftsmanId);
      if (!error) {
        setFavourited(false);
        router.refresh();
      }
    } else {
      const { error } = await supabase.from("favourites").insert({ user_id: userId, craftsman_ref: craftsmanId });
      if (!error) {
        setFavourited(true);
        router.refresh();
      }
    }
    setPending(false);
  }

  return (
    <Button
      type="button"
      variant={favourited ? "primary" : "outline"}
      size={size}
      onClick={toggle}
      disabled={pending}
      aria-pressed={favourited}
      className={className}
    >
      <MaterialIcon name="bookmark" filled={favourited} />
      {favourited ? "Sačuvano" : "Sačuvaj majstora"}
    </Button>
  );
}
