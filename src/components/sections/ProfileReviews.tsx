import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { StarRating } from "@/components/ui/StarRating";
import type { Review } from "@/types";

interface ProfileReviewsProps {
  reviews: Review[];
  averageRating: number;
}

/** Reviews list with an average-rating/total-count header and an empty state. */
export function ProfileReviews({ reviews, averageRating }: ProfileReviewsProps) {
  return (
    <div className="rounded-3xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-headline-md">
          <MaterialIcon name="reviews" className="text-primary" />
          Recenzije
        </h2>
        <StarRating rating={averageRating} reviewCount={reviews.length} />
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-border-light pb-6 last:border-0 last:pb-0">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container font-bold text-primary">
                    {review.authorInitials}
                  </div>
                  <div>
                    <h4 className="text-label-lg text-text-main">{review.authorName}</h4>
                    <p className="text-label-sm text-text-muted">{review.createdAgo}</p>
                  </div>
                </div>
                <div className="flex shrink-0 text-tertiary-container" aria-hidden="true">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <MaterialIcon key={i} name="star" filled className="text-[18px]" />
                  ))}
                </div>
              </div>
              <p className="text-body-md text-text-muted">&ldquo;{review.comment}&rdquo;</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border-light bg-surface-container-lowest px-6 py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary">
            <MaterialIcon name="rate_review" className="text-3xl" />
          </div>
          <p className="text-body-md text-text-muted">Ovaj majstor još uvijek nema recenzija.</p>
        </div>
      )}
    </div>
  );
}
