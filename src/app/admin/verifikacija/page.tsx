import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { VerificationToggle } from "@/components/sections/admin/VerificationToggle";
import { Badge } from "@/components/ui/Badge";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { isAdminEmail } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Verifikacija majstora",
  robots: { index: false, follow: false },
};

export default async function AdminVerifikacijaPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/admin/verifikacija");
  if (!isAdminEmail(authenticatedUser.profile.email)) notFound();

  const supabase = await createClient();
  const { data: craftsmanProfiles } = await supabase
    .from("craftsman_profiles")
    .select("*")
    .order("updated_at", { ascending: false });

  const profileIds = (craftsmanProfiles ?? []).map((row) => row.profile_id);
  const { data: profiles } = profileIds.length
    ? await supabase.from("profiles").select("*").in("id", profileIds)
    : { data: [] };
  const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile]));

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop">
        <h1 className="mb-2 text-headline-lg">Verifikacija majstora</h1>
        <p className="mb-8 text-body-md text-text-muted">
          Označite majstore čije ste kvalifikacije i identitet provjerili kao verifikovane.
        </p>

        <div className="overflow-hidden rounded-xl border border-border-light bg-surface-white">
          {(craftsmanProfiles ?? []).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-body-md">
                <thead className="bg-surface-container-low text-label-sm text-text-muted">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Majstor</th>
                    <th className="px-6 py-4 font-semibold">Telefon</th>
                    <th className="px-6 py-4 font-semibold">Usluge</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Akcija</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {(craftsmanProfiles ?? []).map((craftsmanProfile) => {
                    const profile = profileById.get(craftsmanProfile.profile_id);
                    if (!profile) return null;
                    return (
                      <tr key={craftsmanProfile.profile_id}>
                        <td className="whitespace-nowrap px-6 py-4 font-semibold text-text-main">
                          {profile.first_name} {profile.last_name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-text-muted">{profile.phone}</td>
                        <td className="px-6 py-4 text-text-muted">{craftsmanProfile.category_slugs.length} usluga</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {craftsmanProfile.verified ? (
                            <Badge tone="success" icon="verified">
                              Verifikovan
                            </Badge>
                          ) : (
                            <Badge tone="neutral">Nije verifikovan</Badge>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <VerificationToggle profileId={craftsmanProfile.profile_id} verified={craftsmanProfile.verified} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-8 text-center text-body-md text-text-muted">Nema registrovanih majstora.</p>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
