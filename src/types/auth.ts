/**
 * Types describing real authenticated accounts (Supabase Auth + the
 * `profiles`/`craftsman_profiles` tables). Kept separate from the
 * pre-existing `types/index.ts` domain, which describes the static demo
 * marketplace data still used by the public directory pages.
 */

export type AccountRole = "korisnik" | "majstor";

export interface Profile {
  id: string;
  role: AccountRole;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
}

export interface CraftsmanProfile {
  profileId: string;
  headline: string;
  bio: string;
  hourlyRateFrom: number | null;
  yearsExperience: number;
  workingCities: string[];
  categorySlugs: string[];
  verified: boolean;
  updatedAt: string;
}

export interface GalleryImage {
  id: string;
  profileId: string;
  storagePath: string;
  publicUrl: string;
  caption: string;
  position: number;
  createdAt: string;
}

export interface Favourite {
  userId: string;
  craftsmanRef: string;
  createdAt: string;
}

/** The current signed-in user's profile, plus their craftsman extension if role is "majstor". */
export interface AuthenticatedUser {
  profile: Profile;
  craftsmanProfile: CraftsmanProfile | null;
}
