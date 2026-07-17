import { getAuthenticatedUser } from "@/lib/auth/session";
import { SiteHeaderClient } from "@/components/layout/SiteHeaderClient";

/** Server wrapper that resolves the current user once per request and hands it to the interactive header. */
export async function SiteHeader() {
  const authenticatedUser = await getAuthenticatedUser();
  return <SiteHeaderClient profile={authenticatedUser?.profile ?? null} />;
}
