import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardEmptyState } from "@/components/layout/DashboardEmptyState";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { customerMobileNav, customerSidebarLinks } from "@/data/navigation";
import { notifications } from "@/data/notifications";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Obavještenja",
  robots: { index: false, follow: false },
};

export default async function ObavjestenjaPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/nadzorna-ploca/obavjestenja");
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
        <DashboardHeader title="Obavještenja" />

        <div className="mx-auto max-w-3xl px-margin-mobile py-8 md:px-margin-desktop">
          {notifications.length > 0 ? (
            <div className="divide-y divide-border-light overflow-hidden rounded-xl bg-surface-white shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              {notifications.map((notification) => (
                <div key={notification.id} className={cn("flex gap-4 p-6", !notification.read && "bg-primary/5")}>
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                      notification.read ? "bg-surface-container text-text-muted" : "bg-primary/10 text-primary",
                    )}
                  >
                    <MaterialIcon name={notification.icon} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-start justify-between gap-4">
                      <h3 className="text-label-lg text-text-main">{notification.title}</h3>
                      {!notification.read ? <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" /> : null}
                    </div>
                    <p className="mb-1 text-body-md text-text-muted">{notification.description}</p>
                    <p className="text-label-sm text-text-muted">{notification.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <DashboardEmptyState icon="notifications_none" title="Nemate novih obavještenja" />
          )}
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={customerMobileNav} />
    </>
  );
}
