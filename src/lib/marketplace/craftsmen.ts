import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { getCategoryBySlug } from "@/data/categories";
import type { Database } from "@/types/supabase";
import type { Craftsman } from "@/types";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type CraftsmanProfileRow = Database["public"]["Tables"]["craftsman_profiles"]["Row"];
type GalleryRow = Database["public"]["Tables"]["craftsman_gallery"]["Row"];

/**
 * Maps a real registered majstor onto the same `Craftsman` shape the public
 * marketplace pages already render from mock data, so both can be listed
 * side by side. Fields with no real backing data yet (rating, tags,
 * response time, working hours) get honest, neutral defaults rather than
 * invented numbers — a brand-new real majstor legitimately has 0 reviews.
 */
function toCraftsman(
  profile: ProfileRow,
  craftsmanProfile: CraftsmanProfileRow,
  gallery: GalleryRow[],
  supabase: SupabaseClient<Database>,
): Craftsman {
  const categoryNames = craftsmanProfile.category_slugs
    .map((slug) => getCategoryBySlug(slug)?.name)
    .filter((name): name is string => Boolean(name));
  const primaryCity = craftsmanProfile.working_cities[0] ?? "Sarajevo";

  return {
    id: profile.id,
    fullName: `${profile.first_name} ${profile.last_name}`.trim(),
    email: "",
    avatarUrl: profile.avatar_url || "/images/avatars/haris-korisnik.jpg",
    city: primaryCity,
    role: "craftsman",
    createdAt: profile.created_at,
    headline: craftsmanProfile.headline || "Majstor",
    categorySlugs: craftsmanProfile.category_slugs,
    bio: craftsmanProfile.bio ? craftsmanProfile.bio.split("\n").filter(Boolean) : [],
    rating: 0,
    reviewCount: 0,
    hourlyRateFrom: craftsmanProfile.hourly_rate_from ?? 0,
    yearsExperience: craftsmanProfile.years_experience,
    verified: craftsmanProfile.verified,
    availability: "available",
    tags: [],
    skills: categoryNames,
    neighborhood: primaryCity,
    phone: profile.phone,
    responseTime: "nekoliko sati",
    gallery: [...gallery]
      .sort((a, b) => a.position - b.position)
      .map((image) => ({
        src: supabase.storage.from("craftsman-gallery").getPublicUrl(image.storage_path).data.publicUrl,
        caption: image.caption,
      })),
    workingHours: [],
  };
}

/** All real registered majstori, mapped to the mock marketplace's Craftsman shape. */
export async function getRealCraftsmen(): Promise<Craftsman[]> {
  const supabase = await createClient();
  const { data: craftsmanProfiles } = await supabase.from("craftsman_profiles").select("*");
  if (!craftsmanProfiles || craftsmanProfiles.length === 0) return [];

  const profileIds = craftsmanProfiles.map((row) => row.profile_id);
  const [{ data: profiles }, { data: galleryRows }] = await Promise.all([
    supabase.from("profiles").select("*").in("id", profileIds),
    supabase.from("craftsman_gallery").select("*").in("profile_id", profileIds),
  ]);

  const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile]));
  const galleryByProfile = new Map<string, GalleryRow[]>();
  (galleryRows ?? []).forEach((row) => {
    const list = galleryByProfile.get(row.profile_id) ?? [];
    list.push(row);
    galleryByProfile.set(row.profile_id, list);
  });

  return craftsmanProfiles
    .map((craftsmanProfile) => {
      const profile = profileById.get(craftsmanProfile.profile_id);
      if (!profile) return null;
      return toCraftsman(profile, craftsmanProfile, galleryByProfile.get(craftsmanProfile.profile_id) ?? [], supabase);
    })
    .filter((craftsman): craftsman is Craftsman => craftsman !== null);
}

/** A single real majstor by profile id, or null if none exists (e.g. the id is a mock craftsman's). */
export async function getRealCraftsmanById(id: string): Promise<Craftsman | null> {
  const supabase = await createClient();
  const { data: craftsmanProfile } = await supabase.from("craftsman_profiles").select("*").eq("profile_id", id).maybeSingle();
  if (!craftsmanProfile) return null;

  const [{ data: profile }, { data: galleryRows }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", id).maybeSingle(),
    supabase.from("craftsman_gallery").select("*").eq("profile_id", id).order("position", { ascending: true }),
  ]);
  if (!profile) return null;

  return toCraftsman(profile, craftsmanProfile, galleryRows ?? [], supabase);
}
