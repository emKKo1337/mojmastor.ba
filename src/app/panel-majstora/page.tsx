import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JobRequestCard } from "@/components/sections/JobRequestCard";
import { AcceptDeclineActions } from "@/components/sections/JobRequestActions";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { craftsmanMobileNav, craftsmanSidebarLinks } from "@/data/navigation";
import { getCraftsmanById } from "@/data/craftsmen";
import { getReviewsForCraftsman } from "@/data/reviews";
import { toJobRequest } from "@/lib/job-requests/mappers";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Nadzorna ploča majstora",
  robots: { index: false, follow: false },
};

/** Reviews aren't tied to real accounts yet — same demo stand-in used on /panel-majstora/recenzije. */
const DEMO_CRAFTSMAN_ID = "haris-mujkic";

export default async function PanelMajstoraPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/panel-majstora");
  const { profile, craftsmanProfile } = authenticatedUser;

  const supabase = await createClient();
  const [{ data: newJobRows }, { data: activeJobRows }, { data: completedJobRows }] = await Promise.all([
    supabase
      .from("job_requests")
      .select("*")
      .eq("status", "pending")
      .is("craftsman_id", null)
      .not("declined_by", "cs", `{${profile.id}}`)
      .order("created_at", { ascending: false })
      .limit(3),
    supabase.from("job_requests").select("id").eq("status", "accepted").eq("craftsman_id", profile.id),
    supabase.from("job_requests").select("budget_from, updated_at").eq("status", "completed").eq("craftsman_id", profile.id),
  ]);

  const newJobs = (newJobRows ?? []).map(toJobRequest);
  const activeJobsCount = (activeJobRows ?? []).length;
  const todayEarnings = (completedJobRows ?? [])
    .filter((job) => new Date(job.updated_at).toDateString() === new Date().toDateString())
    .reduce((sum, job) => sum + (job.budget_from ?? 0), 0);

  const demoCraftsman = getCraftsmanById(DEMO_CRAFTSMAN_ID);
  const recentReviews = getReviewsForCraftsman(DEMO_CRAFTSMAN_ID).slice(-2);

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
            <Link
              href="/poruke"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-container"
              aria-label="Poruke"
            >
              <MaterialIcon name="mail" />
            </Link>
            <Link
              href="/panel-majstora/profil"
              className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-container"
              aria-label="Postavke"
            >
              <MaterialIcon name="settings" />
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-container-max space-y-10 px-margin-mobile py-8 md:px-margin-desktop">
          <section className="grid grid-cols-1 gap-gutter md:grid-cols-4">
            <div className="group relative overflow-hidden rounded-xl bg-primary p-8 shadow-lg md:col-span-2">
              <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <p className="mb-1 text-label-lg text-white/80">Ukupna zarada (danas)</p>
                  <h2 className="text-[40px] font-bold leading-tight text-white">{todayEarnings.toFixed(2)} KM</h2>
                </div>
                <Link
                  href="/panel-majstora/zarada"
                  className="mt-8 flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white/90 hover:bg-white/20"
                >
                  <MaterialIcon name="trending_up" className="text-sm" />
                  <span>Pregled zarade</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-container/20 text-secondary">
                  <MaterialIcon name="engineering" />
                </div>
                <p className="mb-1 text-label-lg text-text-muted">Aktivni poslovi</p>
              </div>
              <h2 className="text-headline-lg font-bold text-text-main">{activeJobsCount}</h2>
            </div>

            <div className="flex flex-col justify-between rounded-xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary-fixed/30 text-tertiary">
                  <MaterialIcon name="star" filled />
                </div>
                <p className="mb-1 text-label-lg text-text-muted">Prosječna ocjena</p>
              </div>
              <h2 className="text-headline-lg font-bold text-text-main">{(demoCraftsman?.rating ?? 0).toFixed(2)}</h2>
            </div>
          </section>

          <section className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-3 text-headline-md text-text-main">
                  Novi upiti
                  {newJobs.length > 0 ? (
                    <span className="rounded-full bg-error px-2 py-0.5 text-xs text-white">{newJobs.length} nova</span>
                  ) : null}
                </h3>
                <Link href="/panel-majstora/novi-poslovi" className="text-label-lg text-primary transition-all hover:underline">
                  Prikaži sve
                </Link>
              </div>

              {newJobs.length > 0 ? (
                newJobs.map((job) => (
                  <JobRequestCard key={job.id} job={job} actions={<AcceptDeclineActions jobId={job.id} />} />
                ))
              ) : (
                <p className="rounded-xl border border-dashed border-border-light bg-surface-white p-8 text-center text-body-md text-text-muted">
                  Trenutno nemate novih upita.
                </p>
              )}
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
                <Link
                  href="/panel-majstora/recenzije"
                  className="mt-6 block w-full rounded-lg py-2 text-center text-sm text-primary transition-colors hover:bg-primary/5"
                >
                  Sve recenzije
                </Link>
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
