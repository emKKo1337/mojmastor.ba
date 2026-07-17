import { createClient } from "@/lib/supabase/server";
import type { AuthenticatedUser, CraftsmanProfile, Profile } from "@/types/auth";
import type { Database } from "@/types/supabase";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type CraftsmanProfileRow = Database["public"]["Tables"]["craftsman_profiles"]["Row"];

function toProfile(row: ProfileRow, email: string): Profile {
  return {
    id: row.id,
    role: row.role,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    email,
    avatarUrl: row.avatar_url,
    createdAt: row.created_at,
  };
}

function toCraftsmanProfile(row: CraftsmanProfileRow): CraftsmanProfile {
  return {
    profileId: row.profile_id,
    headline: row.headline,
    bio: row.bio,
    hourlyRateFrom: row.hourly_rate_from,
    yearsExperience: row.years_experience,
    workingCities: row.working_cities,
    categorySlugs: row.category_slugs,
    verified: row.verified,
    updatedAt: row.updated_at,
  };
}

/**
 * Server-side helper for reading the current signed-in user's full profile.
 * Returns null when signed out. Use in Server Components/Actions — for
 * Client Components, read the user via the browser Supabase client instead.
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profileRow } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (!profileRow) return null;

    const profile = toProfile(profileRow, user.email ?? "");

    let craftsmanProfile: CraftsmanProfile | null = null;
    if (profile.role === "majstor") {
      const { data: craftsmanRow } = await supabase
        .from("craftsman_profiles")
        .select("*")
        .eq("profile_id", user.id)
        .single();
      if (craftsmanRow) craftsmanProfile = toCraftsmanProfile(craftsmanRow);
    }

    return { profile, craftsmanProfile };
  } catch {
    // Supabase unreachable (e.g. credentials not configured yet) — treat as signed out
    // rather than failing every page that renders the header.
    return null;
  }
}
