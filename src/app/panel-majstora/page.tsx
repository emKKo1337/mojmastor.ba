import type { Metadata } from "next";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { craftsmanMobileNav, craftsmanSidebarLinks } from "@/data/navigation";
import { incomingJobRequests } from "@/data/job-requests";
import { getReviewsForCraftsman } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Nadzorna ploča majstora",
  robots: { index: false, follow: false },
};

export default function PanelMajstoraPage() {
  const recentReviews = getReviewsForCraftsman("haris-mujkic").slice(-2);

  return (
    <>
      <DashboardSidebar
        width="w-72"
        links={craftsmanSidebarLinks}
        user={{ name: "Haris Mujić", roleLabel: "Vodoinstalater", avatarUrl: "/images/avatars/profil-haris-mujkic.jpg" }}
      />

      <main className="min-h-screen pb-24 md:ml-72 md:pb-8">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-surface-white px-margin-mobile md:px-margin-desktop">
          <div className="md:hidden">
            <MaterialIcon name="construction" className="text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-headline-md text-text-main">Nadzorna ploča</h1>
            <span className="ml-2 rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-bold uppercase text-on-secondary-container">
              Online
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-container"
              aria-label="Poruke"
            >
              <MaterialIcon name="mail" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error" />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-container"
              aria-label="Postavke"
            >
              <MaterialIcon name="settings" />
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-container-max space-y-10 px-margin-mobile py-8 md:px-margin-desktop">
          <section className="grid grid-cols-1 gap-gutter md:grid-cols-4">
            <div className="group relative overflow-hidden rounded-xl bg-primary p-8 shadow-lg md:col-span-2">
              <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <p className="mb-1 text-label-lg text-white/80">Ukupna zarada (danas)</p>
                  <h2 className="text-[40px] font-bold leading-tight text-white">145.50 KM</h2>
                </div>
                <div className="mt-8 flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">
                  <MaterialIcon name="trending_up" className="text-sm" />
                  <span>+12% u odnosu na jučer</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-container/20 text-secondary">
                  <MaterialIcon name="engineering" />
                </div>
                <p className="mb-1 text-label-lg text-text-muted">Aktivni poslovi</p>
              </div>
              <h2 className="text-headline-lg font-bold text-text-main">4</h2>
            </div>

            <div className="flex flex-col justify-between rounded-xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary-fixed/30 text-tertiary">
                  <MaterialIcon name="star" filled />
                </div>
                <p className="mb-1 text-label-lg text-text-muted">Prosječna ocjena</p>
              </div>
              <h2 className="text-headline-lg font-bold text-text-main">4.98</h2>
            </div>
          </section>

          <section className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-3 text-headline-md text-text-main">
                  Novi upiti
                  <span className="rounded-full bg-error px-2 py-0.5 text-xs text-white">
                    {incomingJobRequests.length} nova
                  </span>
                </h3>
                <button type="button" className="text-label-lg text-primary transition-all hover:underline">
                  Prikaži sve
                </button>
              </div>

              {incomingJobRequests.map((job) => (
                <div
                  key={job.id}
                  className="group rounded-xl border border-border-light bg-surface-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MaterialIcon name="person" className="text-3xl" />
                      </div>
                      <div>
                        <h4 className="text-headline-md text-text-main transition-colors group-hover:text-primary">
                          {job.title}
                        </h4>
                        <p className="mb-2 flex items-center gap-1 text-sm text-text-muted">
                          <MaterialIcon name="location_on" className="text-sm" />
                          {job.neighborhood} • {job.createdAgo}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-surface-container px-3 py-1 text-xs font-medium text-text-muted">
                            {job.urgent ? "Hitno" : "Renovacija"}
                          </span>
                          {job.preferredDate ? (
                            <span className="rounded-full bg-surface-container px-3 py-1 text-xs font-medium text-text-muted">
                              {job.preferredDate}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-right">
                      <p className="text-headline-md font-bold text-text-main">{job.budgetFrom?.toFixed(2)} KM</p>
                      <p className="text-xs text-text-muted">
                        {job.budgetFrom && job.budgetFrom > 100 ? "Ponuda klijenta" : "Procjenjena cijena"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      type="button"
                      className="flex-1 rounded-xl bg-primary py-3 text-label-lg text-white transition-colors hover:bg-primary/90 active:scale-95"
                    >
                      {job.budgetFrom && job.budgetFrom > 100 ? "Pošalji ponudu" : "Prihvati posao"}
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-border-light px-6 py-3 text-label-lg text-text-muted transition-colors hover:bg-surface-container-low"
                    >
                      {job.budgetFrom && job.budgetFrom > 100 ? "Detalji" : "Odbij"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div className="rounded-xl bg-surface-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
                <h3 className="mb-6 text-headline-md text-text-main">Zadnje recenzije</h3>
                <div className="space-y-6">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="flex gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-surface-container text-sm font-bold text-primary">
                        {review.authorInitials}
                      </div>
                      <div>
                        <div className="mb-1 flex text-tertiary" aria-hidden="true">
                          {Array.from({ length: review.rating }, (_, i) => (
                            <MaterialIcon key={i} name="star" filled className="text-base" />
                          ))}
                        </div>
                        <p className="mb-1 text-sm italic text-text-muted">&ldquo;{review.comment}&rdquo;</p>
                        <p className="text-xs font-bold text-text-main">
                          {review.authorName} • {review.createdAgo}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="mt-6 w-full rounded-lg py-2 text-sm text-primary transition-colors hover:bg-primary/5">
                  Sve recenzije
                </button>
              </div>

              <div className="rounded-xl bg-surface-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-headline-md text-text-main">Tvoj napredak</h3>
                  <span className="text-xs font-bold text-primary">Nivo 4</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="text-text-muted">Do sljedećeg nivoa</span>
                      <span className="font-bold">85%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
                      <div className="h-full w-[85%] rounded-full bg-primary" />
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-text-muted">
                    Odlično radiš! Prihvati još 3 posla sa ocjenom 5.0 da postaneš &ldquo;Super Majstor&rdquo;.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={craftsmanMobileNav} />
    </>
  );
}
