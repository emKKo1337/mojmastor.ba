import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardEmptyState } from "@/components/layout/DashboardEmptyState";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { craftsmanMobileNav, craftsmanSidebarLinks } from "@/data/navigation";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Zarada",
  robots: { index: false, follow: false },
};

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"];

export default async function ZaradaPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/panel-majstora/zarada");
  const { profile, craftsmanProfile } = authenticatedUser;
  if (profile.role !== "majstor") redirect("/nadzorna-ploca");

  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("job_requests")
    .select("*")
    .eq("status", "completed")
    .eq("craftsman_id", profile.id)
    .order("updated_at", { ascending: false });

  const completedJobs = rows ?? [];
  const totalEarnings = completedJobs.reduce((sum, job) => sum + (job.budget_from ?? 0), 0);

  const now = new Date();
  const monthlyEarnings = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const amount = completedJobs
      .filter((job) => {
        const completedAt = new Date(job.updated_at);
        return completedAt.getFullYear() === date.getFullYear() && completedAt.getMonth() === date.getMonth();
      })
      .reduce((sum, job) => sum + (job.budget_from ?? 0), 0);
    return { label: MONTH_LABELS[date.getMonth()], amount };
  });
  const maxMonthlyEarnings = Math.max(1, ...monthlyEarnings.map((month) => month.amount));

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
        <DashboardHeader title="Zarada" />

        <div className="mx-auto max-w-4xl space-y-8 px-margin-mobile py-8 md:px-margin-desktop">
          <div className="relative overflow-hidden rounded-xl bg-primary p-8 shadow-lg md:p-10">
            <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-white/10" />
            <div className="relative z-10">
              <p className="mb-1 text-label-lg text-white/80">Ukupna zarada (svi poslovi)</p>
              <h2 className="text-[40px] font-bold leading-tight text-white">{totalEarnings.toFixed(2)} KM</h2>
              <div className="mt-4 flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">
                <MaterialIcon name="task_alt" className="text-sm" />
                {completedJobs.length} završenih poslova
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
            <h2 className="mb-6 text-headline-md text-text-main">Zarada po mjesecu</h2>
            <div className="flex h-48 items-end gap-4">
              {monthlyEarnings.map((month, index) => (
                <div key={`${month.label}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-secondary/80 transition-all"
                    style={{ height: `${(month.amount / maxMonthlyEarnings) * 100}%` }}
                    title={`${month.amount.toFixed(2)} KM`}
                  />
                  <span className="text-label-sm text-text-muted">{month.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
            <h2 className="mb-6 text-headline-md text-text-main">Isplaćeni poslovi</h2>
            {completedJobs.length > 0 ? (
              <div className="divide-y divide-border-light">
                {completedJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-label-lg text-text-main">{job.title}</p>
                      <p className="text-label-sm text-text-muted">
                        {job.neighborhood || job.city} • {new Date(job.updated_at).toLocaleDateString("bs-BA")}
                      </p>
                    </div>
                    <p className="whitespace-nowrap text-label-lg font-bold text-text-main">
                      {(job.budget_from ?? 0).toFixed(2)} KM
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <DashboardEmptyState icon="payments" title="Još nemate isplaćenih poslova" />
            )}
          </div>
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={craftsmanMobileNav} />
    </>
  );
}
