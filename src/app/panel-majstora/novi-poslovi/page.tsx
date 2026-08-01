import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardEmptyState } from "@/components/layout/DashboardEmptyState";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JobRequestCard } from "@/components/sections/JobRequestCard";
import { AcceptDeclineActions } from "@/components/sections/JobRequestActions";
import { craftsmanMobileNav, craftsmanSidebarLinks } from "@/data/navigation";
import { toJobRequest } from "@/lib/job-requests/mappers";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Novi poslovi",
  robots: { index: false, follow: false },
};

export default async function NoviPosloviPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/panel-majstora/novi-poslovi");
  const { profile, craftsmanProfile } = authenticatedUser;
  if (profile.role !== "majstor") redirect("/nadzorna-ploca");

  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("job_requests")
    .select("*")
    .eq("status", "pending")
    .is("craftsman_id", null)
    .not("declined_by", "cs", `{${profile.id}}`)
    .order("created_at", { ascending: false });

  const newJobs = (rows ?? []).map(toJobRequest);

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
            newJobs.map((job) => <JobRequestCard key={job.id} job={job} actions={<AcceptDeclineActions jobId={job.id} />} />)
          ) : (
            <DashboardEmptyState
              icon="inbox"
              title="Trenutno nemate novih upita"
              description="Novi upiti za posao će se pojaviti ovdje čim ih korisnici pošalju za usluge koje nudite."
            />
          )}
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={craftsmanMobileNav} />
    </>
  );
}
