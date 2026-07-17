import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CraftsmanListingCard } from "@/components/cards/CraftsmanListingCard";
import { FavouriteButton } from "@/components/sections/FavouriteButton";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { customerMobileNav, customerSidebarLinks } from "@/data/navigation";
import { getCraftsmanById } from "@/data/craftsmen";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sačuvani majstori",
  robots: { index: false, follow: false },
};

export default async function SacuvaniMajstoriPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/nadzorna-ploca/sacuvani");
  const { profile } = authenticatedUser;

  const supabase = await createClient();
  const { data: favouriteRows } = await supabase.from("favourites").select("craftsman_ref").eq("user_id", profile.id);

  const savedCraftsmen = (favouriteRows ?? [])
    .map((row) => getCraftsmanById(row.craftsman_ref))
    .filter((craftsman): craftsman is NonNullable<typeof craftsman> => Boolean(craftsman));

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
          <h1 className="text-headline-md text-text-main">Sačuvani majstori</h1>
        </header>

        <div className="mx-auto max-w-container-max px-margin-mobile py-8 md:px-margin-desktop">
          {savedCraftsmen.length > 0 ? (
            <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
              {savedCraftsmen.map((craftsman) => (
                <div key={craftsman.id} className="flex flex-col gap-3">
                  <CraftsmanListingCard craftsman={craftsman} />
                  <FavouriteButton
                    craftsmanId={craftsman.id}
                    userId={profile.id}
                    initialFavourited
                    size="sm"
                    className="self-start"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border-light bg-surface-white p-12 text-center">
              <MaterialIcon name="bookmark_border" className="text-4xl text-text-muted" />
              <p className="text-body-md text-text-muted">Još niste sačuvali nijednog majstora.</p>
              <Button href="/pretraga" variant="outline" size="sm">
                Pretraži majstore
              </Button>
            </div>
          )}
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={customerMobileNav} />
    </>
  );
}
