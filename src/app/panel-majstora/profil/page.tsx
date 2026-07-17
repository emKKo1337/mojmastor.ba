import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactInfoForm } from "@/components/sections/account/ContactInfoForm";
import { PasswordForm } from "@/components/sections/account/PasswordForm";
import { AboutForm } from "@/components/sections/majstor-profile/AboutForm";
import { ServicesForm } from "@/components/sections/majstor-profile/ServicesForm";
import { CitiesForm } from "@/components/sections/majstor-profile/CitiesForm";
import { GalleryManager } from "@/components/sections/majstor-profile/GalleryManager";
import { craftsmanMobileNav, craftsmanSidebarLinks } from "@/data/navigation";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import type { GalleryImage } from "@/types/auth";

export const metadata: Metadata = {
  title: "Uredi profil",
  robots: { index: false, follow: false },
};

function ProfileSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
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

export default async function MajstorProfilPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/panel-majstora/profil");
  const { profile, craftsmanProfile } = authenticatedUser;
  if (profile.role !== "majstor" || !craftsmanProfile) redirect("/nadzorna-ploca");

  const supabase = await createClient();
  const { data: galleryRows } = await supabase
    .from("craftsman_gallery")
    .select("*")
    .eq("profile_id", profile.id)
    .order("position", { ascending: true });

  const galleryImages: GalleryImage[] = (galleryRows ?? []).map((row) => ({
    id: row.id,
    profileId: row.profile_id,
    storagePath: row.storage_path,
    publicUrl: supabase.storage.from("craftsman-gallery").getPublicUrl(row.storage_path).data.publicUrl,
    caption: row.caption,
    position: row.position,
    createdAt: row.created_at,
  }));

  return (
    <>
      <DashboardSidebar
        width="w-72"
        links={craftsmanSidebarLinks}
        user={{
          name: `${profile.firstName} ${profile.lastName}`.trim(),
          roleLabel: craftsmanProfile.headline || "Majstor",
          avatarUrl: profile.avatarUrl || "/images/avatars/profil-haris-mujkic.jpg",
        }}
      />

      <main className="min-h-screen pb-24 md:ml-72 md:pb-8">
        <header className="sticky top-0 z-30 flex h-20 items-center bg-surface-white px-margin-mobile md:px-margin-desktop">
          <h1 className="text-headline-md text-text-main">Uredi profil</h1>
        </header>

        <div className="mx-auto max-w-3xl space-y-8 px-margin-mobile py-8 md:px-margin-desktop">
          <ProfileSection title="Kontakt informacije" description="Ovi podaci se koriste za komunikaciju sa klijentima.">
            <ContactInfoForm
              defaultFirstName={profile.firstName}
              defaultLastName={profile.lastName}
              defaultPhone={profile.phone}
              email={profile.email}
            />
          </ProfileSection>

          <ProfileSection title="O meni" description="Predstavite sebe i svoje iskustvo potencijalnim klijentima.">
            <AboutForm
              defaultHeadline={craftsmanProfile.headline}
              defaultBio={craftsmanProfile.bio}
              defaultYearsExperience={craftsmanProfile.yearsExperience}
              defaultHourlyRateFrom={craftsmanProfile.hourlyRateFrom}
            />
          </ProfileSection>

          <ProfileSection title="Usluge" description="Odaberite kategorije usluga koje nudite.">
            <ServicesForm defaultCategorySlugs={craftsmanProfile.categorySlugs} />
          </ProfileSection>

          <ProfileSection title="Gradovi u kojima radim" description="Odaberite gradove u kojima ste dostupni za posao.">
            <CitiesForm defaultCities={craftsmanProfile.workingCities} />
          </ProfileSection>

          <ProfileSection title="Galerija" description="Dodajte fotografije vaših prethodnih radova.">
            <GalleryManager images={galleryImages} />
          </ProfileSection>

          <ProfileSection title="Sigurnost" description="Promijenite lozinku za prijavu na svoj račun.">
            <PasswordForm />
          </ProfileSection>
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={craftsmanMobileNav} />
    </>
  );
}
