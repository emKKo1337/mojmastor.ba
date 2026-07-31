import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProfileReviews } from "@/components/sections/ProfileReviews";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { craftsmanMobileNav, craftsmanSidebarLinks } from "@/data/navigation";
import { getCraftsmanById } from "@/data/craftsmen";
import { getReviewsForCraftsman } from "@/data/reviews";
import { getAuthenticatedUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Moje recenzije",
  robots: { index: false, follow: false },
};

/** Demo craftsman whose reviews stand in for the logged-in majstor's — the reviews table isn't wired to real accounts yet. */
const DEMO_CRAFTSMAN_ID = "haris-mujkic";

export default async function RecenzijePage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/panel-majstora/recenzije");
  const { profile, craftsmanProfile } = authenticatedUser;
  if (profile.role !== "majstor") redirect("/nadzorna-ploca");

  const craftsman = getCraftsmanById(DEMO_CRAFTSMAN_ID);
  const reviews = getReviewsForCraftsman(DEMO_CRAFTSMAN_ID);
  const rating = craftsman?.rating ?? 0;

  const breakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((review) => review.rating === stars).length;
    return { stars, count, percent: reviews.length ? Math.round((count / reviews.length) * 100) : 0 };
  });

  return (
    <>
      <DashboardSidebar
        width="w-72"
        links={craftsmanSidebarLinks}
        user={{
          name: `${profile.firstName} ${profile.lastName}`.trim(),
          roleLabel: craftsmanProfile?.headline || "Majstor",
          avatarUrl: profile.avatarUrl || "/images/avatars/profil-haris-mujkic.jpg",
        }}
      />

      <main className="min-h-screen pb-24 md:ml-72 md:pb-8">
        <DashboardHeader title="Moje recenzije" />

        <div className="mx-auto max-w-4xl space-y-8 px-margin-mobile py-8 md:px-margin-desktop">
          <div className="grid grid-cols-1 gap-gutter rounded-xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)] md:grid-cols-[auto_1fr]">
            <div className="flex flex-col items-center justify-center gap-1 md:pr-8 md:border-r md:border-border-light">
              <span className="text-display-lg font-bold text-text-main">{rating.toFixed(1)}</span>
              <div className="flex text-tertiary-container" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <MaterialIcon key={i} name="star" filled />
                ))}
              </div>
              <span className="text-label-sm text-text-muted">{reviews.length} recenzije</span>
            </div>
            <div className="flex flex-col justify-center gap-2">
              {breakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="w-3 text-label-sm text-text-muted">{row.stars}</span>
                  <MaterialIcon name="star" filled className="text-[14px] text-tertiary-container" />
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-container">
                    <div className="h-full rounded-full bg-tertiary-container" style={{ width: `${row.percent}%` }} />
                  </div>
                  <span className="w-8 text-right text-label-sm text-text-muted">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          <ProfileReviews reviews={reviews} averageRating={rating} />
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={craftsmanMobileNav} />
    </>
  );
}
