import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactInfoForm } from "@/components/sections/account/ContactInfoForm";
import { PasswordForm } from "@/components/sections/account/PasswordForm";
import { customerMobileNav, customerSidebarLinks } from "@/data/navigation";
import { getAuthenticatedUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Postavke",
  robots: { index: false, follow: false },
};

function SettingsSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-surface-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)] md:p-8">
      <div className="mb-6">
        <h2 className="text-headline-md text-text-main">{title}</h2>
        <p className="mt-1 text-body-md text-text-muted">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default async function PostavkePage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/nadzorna-ploca/postavke");
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
        <header className="sticky top-0 z-30 flex h-20 items-center bg-surface-white px-margin-mobile md:px-margin-desktop">
          <h1 className="text-headline-md text-text-main">Postavke</h1>
        </header>

        <div className="mx-auto max-w-3xl space-y-8 px-margin-mobile py-8 md:px-margin-desktop">
          <SettingsSection title="Lični podaci" description="Uredite svoje kontakt informacije.">
            <ContactInfoForm
              defaultFirstName={profile.firstName}
              defaultLastName={profile.lastName}
              defaultPhone={profile.phone}
              email={profile.email}
            />
          </SettingsSection>

          <SettingsSection title="Sigurnost" description="Promijenite lozinku za prijavu na svoj račun.">
            <PasswordForm />
          </SettingsSection>
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={customerMobileNav} />
    </>
  );
}
