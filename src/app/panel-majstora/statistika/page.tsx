import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { craftsmanMobileNav, craftsmanSidebarLinks } from "@/data/navigation";
import { getCategoryBySlug } from "@/data/categories";
import { getCraftsmanById } from "@/data/craftsmen";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Statistika",
  robots: { index: false, follow: false },
};

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"];

/** Rating and response time aren't tied to real accounts yet (no per-user reviews table) — same demo stand-in used on /panel-majstora/recenzije. */
const DEMO_CRAFTSMAN_ID = "haris-mujkic";

export default async function StatistikaPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/panel-majstora/statistika");
  const { profile, craftsmanProfile } = authenticatedUser;
  if (profile.role !== "majstor") redirect("/nadzorna-ploca");

  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("job_requests")
    .select("*")
    .eq("craftsman_id", profile.id)
    .in("status", ["accepted", "completed"]);

  const jobs = rows ?? [];
  const demoCraftsman = getCraftsmanById(DEMO_CRAFTSMAN_ID);

  const now = new Date();
  const monthlyJobs = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const count = jobs.filter((job) => {
      const createdAt = new Date(job.created_at);
      return createdAt.getFullYear() === date.getFullYear() && createdAt.getMonth() === date.getMonth();
    }).length;
    return { label: MONTH_LABELS[date.getMonth()], count };
  });
  const maxMonthlyJobs = Math.max(1, ...monthlyJobs.map((month) => month.count));

  const categoryTotals = new Map<string, number>();
  jobs.forEach((job) => {
    categoryTotals.set(job.category_slug, (categoryTotals.get(job.category_slug) ?? 0) + 1);
  });
  const categoryBreakdown = Array.from(categoryTotals.entries())
    .map(([slug, count]) => ({
      label: getCategoryBySlug(slug)?.name ?? slug,
      percent: jobs.length ? Math.round((count / jobs.length) * 100) : 0,
    }))
    .sort((a, b) => b.percent - a.percent);

  const acceptedOrCompleted = jobs.length;
  const completed = jobs.filter((job) => job.status === "completed").length;
  const acceptanceRate = acceptedOrCompleted ? Math.round((completed / acceptedOrCompleted) * 100) : 0;

  const kpis = [
    { icon: "construction", label: "Ukupno poslova", value: String(acceptedOrCompleted) },
    { icon: "star", label: "Prosječna ocjena", value: (demoCraftsman?.rating ?? 0).toFixed(1) },
    { icon: "task_alt", label: "Stopa završetka", value: `${acceptanceRate}%` },
    { icon: "bolt", label: "Vrijeme odgovora", value: demoCraftsman?.responseTime ?? "—" },
  ];

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
        <DashboardHeader title="Statistika" />

        <div className="mx-auto max-w-4xl space-y-8 px-margin-mobile py-8 md:px-margin-desktop">
          <div className="grid grid-cols-2 gap-gutter lg:grid-cols-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-xl bg-surface-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MaterialIcon name={kpi.icon} />
                </div>
                <p className="text-headline-lg font-bold text-text-main">{kpi.value}</p>
                <p className="text-label-sm text-text-muted">{kpi.label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
            <h2 className="mb-6 text-headline-md text-text-main">Poslovi po mjesecu</h2>
            <div className="flex h-48 items-end gap-4">
              {monthlyJobs.map((month, index) => (
                <div key={`${month.label}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-primary/80 transition-all"
                    style={{ height: `${(month.count / maxMonthlyJobs) * 100}%` }}
                    title={`${month.count} poslova`}
                  />
                  <span className="text-label-sm text-text-muted">{month.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
            <h2 className="mb-6 text-headline-md text-text-main">Poslovi po usluzi</h2>
            {categoryBreakdown.length > 0 ? (
              <div className="space-y-4">
                {categoryBreakdown.map((row) => (
                  <div key={row.label}>
                    <div className="mb-1.5 flex justify-between text-label-sm">
                      <span className="text-text-main">{row.label}</span>
                      <span className="font-bold text-text-muted">{row.percent}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${row.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-body-md text-text-muted">Nema podataka još uvijek.</p>
            )}
          </div>
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={craftsmanMobileNav} />
    </>
  );
}
