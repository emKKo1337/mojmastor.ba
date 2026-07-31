import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { craftsmanMobileNav, craftsmanSidebarLinks } from "@/data/navigation";
import { jobRequests } from "@/data/job-requests";
import { getAuthenticatedUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Zarada",
  robots: { index: false, follow: false },
};

const monthlyEarnings = [
  { label: "Feb", amount: 620 },
  { label: "Mar", amount: 890 },
  { label: "Apr", amount: 740 },
  { label: "Maj", amount: 1120 },
  { label: "Jun", amount: 980 },
  { label: "Jul", amount: 1450 },
];

export default async function ZaradaPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/panel-majstora/zarada");
  const { profile, craftsmanProfile } = authenticatedUser;
  if (profile.role !== "majstor") redirect("/nadzorna-ploca");

  const completedJobs = jobRequests.filter((job) => job.status === "completed" && job.budgetFrom);
  const totalEarnings = completedJobs.reduce((sum, job) => sum + (job.budgetFrom ?? 0), 0);
  const maxMonthlyEarnings = Math.max(...monthlyEarnings.map((month) => month.amount));

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
              {monthlyEarnings.map((month) => (
                <div key={month.label} className="flex flex-1 flex-col items-center gap-2">
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
            <div className="divide-y divide-border-light">
              {completedJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-label-lg text-text-main">{job.title}</p>
                    <p className="text-label-sm text-text-muted">
                      {job.neighborhood} • {job.createdAgo}
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-label-lg font-bold text-text-main">
                    {job.budgetFrom?.toFixed(2)} KM
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={craftsmanMobileNav} />
    </>
  );
}
