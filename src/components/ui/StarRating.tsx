import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}

export function StarRating({ rating, reviewCount, size = "md", className }: StarRatingProps) {
  const stars = [0, 1, 2, 3, 4];
  const iconSize = size === "sm" ? "text-[16px]" : "text-[20px]";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex text-tertiary-container" aria-hidden="true">
        {stars.map((index) => (
          <MaterialIcon key={index} name="star" filled className={iconSize} />
        ))}
      </div>
      <span className="font-bold text-text-main">{rating.toFixed(1)}</span>
      {reviewCount !== undefined ? (
        <span className="text-text-muted text-label-sm">({reviewCount} recenzije)</span>
      ) : null}
    </div>
  );
}
