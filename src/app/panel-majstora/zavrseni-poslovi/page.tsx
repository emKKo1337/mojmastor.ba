import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardEmptyState } from "@/components/layout/DashboardEmptyState";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JobRequestCard } from "@/components/sections/JobRequestCard";
import { craftsmanMobileNav, craftsmanSidebarLinks } from "@/data/navigation";
import { toJobRequest } from "@/lib/job-requests/mappers";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Završeni poslovi",
  robots: { index: false, follow: false },
};

export default async function ZavrseniPosloviPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/panel-majstora/zavrseni-poslovi");
  const { profile, craftsmanProfile } = authenticatedUser;
  if (profile.role !== "majstor") redirect("/nadzorna-ploca");

  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("job_requests")
    .select("*")
    .eq("status", "completed")
    .eq("craftsman_id", profile.id)
    .order("updated_at", { ascending: false });

  const completedJobs = (rows ?? []).map(toJobRequest);

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
        <DashboardHeader title="Završeni poslovi" />

        <div className="mx-auto max-w-4xl space-y-4 px-margin-mobile py-8 md:px-margin-desktop">
          {completedJobs.length > 0 ? (
            completedJobs.map((job) => <JobRequestCard key={job.id} job={job} />)
          ) : (
            <DashboardEmptyState
              icon="task_alt"
              title="Još nemate završenih poslova"
              description="Poslovi koje uspješno završite pojavit će se ovdje kao istorija."
            />
          )}
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={craftsmanMobileNav} />
    </>
  );
}
