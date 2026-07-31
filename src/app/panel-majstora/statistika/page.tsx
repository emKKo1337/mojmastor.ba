import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { craftsmanMobileNav, craftsmanSidebarLinks } from "@/data/navigation";
import { getCraftsmanById } from "@/data/craftsmen";
import { getAuthenticatedUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Statistika",
  robots: { index: false, follow: false },
};

const monthlyJobs = [
  { label: "Feb", count: 8 },
  { label: "Mar", count: 12 },
  { label: "Apr", count: 10 },
  { label: "Maj", count: 15 },
  { label: "Jun", count: 13 },
  { label: "Jul", count: 18 },
];

const categoryBreakdown = [
  { label: "Vodoinstalacije", percent: 62 },
  { label: "Postavljanje keramike", percent: 28 },
  { label: "Ostalo", percent: 10 },
];

export default async function StatistikaPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/panel-majstora/statistika");
  const { profile, craftsmanProfile } = authenticatedUser;
  if (profile.role !== "majstor") redirect("/nadzorna-ploca");

  const craftsman = getCraftsmanById("haris-mujkic");
  const maxMonthlyJobs = Math.max(...monthlyJobs.map((month) => month.count));

  const kpis = [
    { icon: "construction", label: "Ukupno poslova", value: "76" },
    { icon: "star", label: "Prosječna ocjena", value: (craftsman?.rating ?? 0).toFixed(1) },
    { icon: "task_alt", label: "Stopa prihvatanja", value: "89%" },
    { icon: "bolt", label: "Vrijeme odgovora", value: craftsman?.responseTime ?? "—" },
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
              {monthlyJobs.map((month) => (
                <div key={month.label} className="flex flex-1 flex-col items-center gap-2">
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
          </div>
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={craftsmanMobileNav} />
    </>
  );
}
