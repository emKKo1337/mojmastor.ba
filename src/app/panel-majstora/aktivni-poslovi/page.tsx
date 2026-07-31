import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardEmptyState } from "@/components/layout/DashboardEmptyState";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JobRequestCard } from "@/components/sections/JobRequestCard";
import { Button } from "@/components/ui/Button";
import { craftsmanMobileNav, craftsmanSidebarLinks } from "@/data/navigation";
import { jobRequests } from "@/data/job-requests";
import { getAuthenticatedUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Aktivni poslovi",
  robots: { index: false, follow: false },
};

export default async function AktivniPosloviPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/panel-majstora/aktivni-poslovi");
  const { profile, craftsmanProfile } = authenticatedUser;
  if (profile.role !== "majstor") redirect("/nadzorna-ploca");

  const activeJobs = jobRequests.filter((job) => job.status === "accepted");

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
        <DashboardHeader title="Aktivni poslovi" />

        <div className="mx-auto max-w-4xl space-y-4 px-margin-mobile py-8 md:px-margin-desktop">
          {activeJobs.length > 0 ? (
            activeJobs.map((job) => (
              <JobRequestCard
                key={job.id}
                job={job}
                actions={
                  <>
                    <button
                      type="button"
                      className="flex-1 rounded-xl bg-primary py-3 text-label-lg text-white transition-colors hover:bg-primary/90 active:scale-95"
                    >
                      Označi kao završeno
                    </button>
                    <Button href="/poruke" variant="outline" className="flex-1">
                      Pošalji poruku
                    </Button>
                  </>
                }
              />
            ))
          ) : (
            <DashboardEmptyState
              icon="construction"
              title="Nemate aktivnih poslova"
              description="Poslovi koje prihvatite pojavit će se ovdje dok ih ne označite kao završene."
            />
          )}
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={craftsmanMobileNav} />
    </>
  );
}
