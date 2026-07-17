"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { validateRequired } from "@/lib/validation";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import type { ActionState } from "@/lib/action-state";

const PROFILE_PATH = "/panel-majstora/profil";
const VALID_CATEGORY_SLUGS = new Set(categories.map((category) => category.slug));
const VALID_CITIES = new Set<string>(cities);

/** Every mutation here re-checks the caller is an authenticated majstor — RLS enforces it too, but failing fast with a clear message is better UX. */
async function requireCraftsman() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, userId: null as string | null, error: "Morate biti prijavljeni." };
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (!profile || profile.role !== "majstor") {
    return { supabase, userId: null as string | null, error: "Samo majstori mogu uređivati ovaj profil." };
  }

  return { supabase, userId: user.id, error: null as string | null };
}

export async function updateAboutAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const headline = String(formData.get("headline") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const yearsExperienceRaw = String(formData.get("yearsExperience") ?? "");
  const hourlyRateRaw = String(formData.get("hourlyRateFrom") ?? "");

  const error = validateRequired(headline, "Zanimanje");
  if (error) return { status: "error", message: error };

  const yearsExperience = Math.max(0, Math.trunc(Number(yearsExperienceRaw) || 0));
  const hourlyRateFrom = hourlyRateRaw.trim() === "" ? null : Math.max(0, Number(hourlyRateRaw));
  if (hourlyRateFrom !== null && Number.isNaN(hourlyRateFrom)) {
    return { status: "error", message: "Unesite ispravnu cijenu." };
  }

  const { supabase, userId, error: authError } = await requireCraftsman();
  if (authError || !userId) return { status: "error", message: authError ?? "Došlo je do greške." };

  const { error: updateError } = await supabase
    .from("craftsman_profiles")
    .update({ headline, bio, years_experience: yearsExperience, hourly_rate_from: hourlyRateFrom })
    .eq("profile_id", userId);

  if (updateError) return { status: "error", message: "Nije moguće sačuvati podatke. Pokušajte ponovo." };

  revalidatePath(PROFILE_PATH);
  return { status: "success", message: "Podaci 'O meni' su sačuvani." };
}

export async function updateServicesAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const selected = formData.getAll("categorySlugs").map(String).filter((slug) => VALID_CATEGORY_SLUGS.has(slug));

  const { supabase, userId, error: authError } = await requireCraftsman();
  if (authError || !userId) return { status: "error", message: authError ?? "Došlo je do greške." };

  const { error: updateError } = await supabase
    .from("craftsman_profiles")
    .update({ category_slugs: selected })
    .eq("profile_id", userId);

  if (updateError) return { status: "error", message: "Nije moguće sačuvati usluge. Pokušajte ponovo." };

  revalidatePath(PROFILE_PATH);
  return { status: "success", message: "Usluge su sačuvane." };
}

export async function updateWorkingCitiesAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const selected = formData.getAll("workingCities").map(String).filter((city) => VALID_CITIES.has(city));

  const { supabase, userId, error: authError } = await requireCraftsman();
  if (authError || !userId) return { status: "error", message: authError ?? "Došlo je do greške." };

  const { error: updateError } = await supabase
    .from("craftsman_profiles")
    .update({ working_cities: selected })
    .eq("profile_id", userId);

  if (updateError) return { status: "error", message: "Nije moguće sačuvati gradove. Pokušajte ponovo." };

  revalidatePath(PROFILE_PATH);
  return { status: "success", message: "Gradovi u kojima radite su sačuvani." };
}

const MAX_GALLERY_FILE_BYTES = 8 * 1024 * 1024;
const ALLOWED_GALLERY_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function uploadGalleryImageAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const file = formData.get("file");
  const caption = String(formData.get("caption") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Odaberite fotografiju za dodavanje." };
  }
  if (!ALLOWED_GALLERY_TYPES.has(file.type)) {
    return { status: "error", message: "Dozvoljeni formati su JPG, PNG i WEBP." };
  }
  if (file.size > MAX_GALLERY_FILE_BYTES) {
    return { status: "error", message: "Fotografija ne smije biti veća od 8 MB." };
  }

  const { supabase, userId, error: authError } = await requireCraftsman();
  if (authError || !userId) return { status: "error", message: authError ?? "Došlo je do greške." };

  const extension = file.name.split(".").pop() || "jpg";
  const storagePath = `${userId}/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage.from("craftsman-gallery").upload(storagePath, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) return { status: "error", message: "Slanje fotografije nije uspjelo. Pokušajte ponovo." };

  const { error: insertError } = await supabase
    .from("craftsman_gallery")
    .insert({ profile_id: userId, storage_path: storagePath, caption });

  if (insertError) {
    await supabase.storage.from("craftsman-gallery").remove([storagePath]);
    return { status: "error", message: "Nije moguće sačuvati fotografiju. Pokušajte ponovo." };
  }

  revalidatePath(PROFILE_PATH);
  return { status: "success", message: "Fotografija je dodana." };
}

export async function deleteGalleryImageAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const imageId = String(formData.get("imageId") ?? "");
  const storagePath = String(formData.get("storagePath") ?? "");
  if (!imageId || !storagePath) return { status: "error", message: "Nevažeća fotografija." };

  const { supabase, userId, error: authError } = await requireCraftsman();
  if (authError || !userId) return { status: "error", message: authError ?? "Došlo je do greške." };

  await supabase.storage.from("craftsman-gallery").remove([storagePath]);
  const { error: deleteError } = await supabase
    .from("craftsman_gallery")
    .delete()
    .eq("id", imageId)
    .eq("profile_id", userId);

  if (deleteError) return { status: "error", message: "Brisanje fotografije nije uspjelo." };

  revalidatePath(PROFILE_PATH);
  return { status: "success", message: "Fotografija je obrisana." };
}
