import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardEmptyState } from "@/components/layout/DashboardEmptyState";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JobRequestCard } from "@/components/sections/JobRequestCard";
import { craftsmanMobileNav, craftsmanSidebarLinks } from "@/data/navigation";
import { jobRequests } from "@/data/job-requests";
import { getAuthenticatedUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Novi poslovi",
  robots: { index: false, follow: false },
};

export default async function NoviPosloviPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/panel-majstora/novi-poslovi");
  const { profile, craftsmanProfile } = authenticatedUser;
  if (profile.role !== "majstor") redirect("/nadzorna-ploca");

  const newJobs = jobRequests.filter((job) => job.status === "pending" || job.status === "offer_received");

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
        <DashboardHeader title="Novi poslovi" />

        <div className="mx-auto max-w-4xl space-y-4 px-margin-mobile py-8 md:px-margin-desktop">
          {newJobs.length > 0 ? (
            newJobs.map((job) => (
              <JobRequestCard
                key={job.id}
                job={job}
                actions={
                  <>
                    <button
                      type="button"
                      className="flex-1 rounded-xl bg-primary py-3 text-label-lg text-white transition-colors hover:bg-primary/90 active:scale-95"
                    >
                      Prihvati posao
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-border-light px-6 py-3 text-label-lg text-text-muted transition-colors hover:bg-surface-container-low"
                    >
                      Odbij
                    </button>
                  </>
                }
              />
            ))
          ) : (
            <DashboardEmptyState
              icon="inbox"
              title="Trenutno nemate novih upita"
              description="Novi upiti za posao će se pojaviti ovdje čim ih korisnici pošalju."
            />
          )}
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={craftsmanMobileNav} />
    </>
  );
}
