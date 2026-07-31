import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardEmptyState } from "@/components/layout/DashboardEmptyState";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JobRequestCard } from "@/components/sections/JobRequestCard";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { customerMobileNav, customerSidebarLinks } from "@/data/navigation";
import { jobRequests } from "@/data/job-requests";
import { getAuthenticatedUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Moji zahtjevi",
  robots: { index: false, follow: false },
};

export default async function MojiZahtjeviPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/nadzorna-ploca/zahtjevi");
  const { profile } = authenticatedUser;

  return (
    <>
      <DashboardSidebar
        links={customerSidebarLinks}
        user={{
          name: `${profile.firstName} ${profile.lastName}`.trim(),
          roleLabel: "Korisnik",
          avatarUrl: profile.avatarUrl || "/images/avatars/haris-korisnik.jpg",
        }}
      />

      <main className="min-h-screen pb-24 md:ml-64 md:pb-8">
        <DashboardHeader title="Moji zahtjevi" />

        <div className="mx-auto max-w-4xl space-y-4 px-margin-mobile py-8 md:px-margin-desktop">
          <div className="flex justify-end">
            <Button href="/novi-zahtjev" size="sm">
              <MaterialIcon name="add" />
              Novi zahtjev
            </Button>
          </div>

          {jobRequests.length > 0 ? (
            jobRequests.map((job) => <JobRequestCard key={job.id} job={job} />)
          ) : (
            <DashboardEmptyState
              icon="pending_actions"
              title="Još niste poslali nijedan zahtjev"
              description="Objavite zahtjev za posao i pronađite majstora u par minuta."
              action={
                <Button href="/novi-zahtjev" size="sm">
                  Pošalji prvi zahtjev
                </Button>
              }
            />
          )}
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={customerMobileNav} />
    </>
  );
}
