"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { translateAuthError } from "@/lib/auth/errors";
import { validatePassword, validatePasswordConfirmation, validatePhone, validateRequired } from "@/lib/validation";
import type { ActionState } from "@/lib/action-state";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, userId: null as string | null, error: "Morate biti prijavljeni." };
  return { supabase, userId: user.id, error: null as string | null };
}

/** Updates `profiles` contact fields. Works for any authenticated account — korisnik or majstor. */
export async function updateContactInfoAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  const error = validateRequired(firstName, "Ime") ?? validateRequired(lastName, "Prezime") ?? validatePhone(phone);
  if (error) return { status: "error", message: error };

  const { supabase, userId, error: authError } = await requireUser();
  if (authError || !userId) return { status: "error", message: authError ?? "Došlo je do greške." };

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ first_name: firstName, last_name: lastName, phone })
    .eq("id", userId);

  if (updateError) return { status: "error", message: "Nije moguće sačuvati podatke. Pokušajte ponovo." };

  revalidatePath("/nadzorna-ploca/postavke");
  revalidatePath("/panel-majstora/profil");
  return { status: "success", message: "Kontakt informacije su sačuvane." };
}

export async function updatePasswordAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const error = validatePassword(password) ?? validatePasswordConfirmation(password, confirmPassword);
  if (error) return { status: "error", message: error };

  const { supabase, userId, error: authError } = await requireUser();
  if (authError || !userId) return { status: "error", message: authError ?? "Došlo je do greške." };

  const { error: updateError } = await supabase.auth.updateUser({ password });
  if (updateError) return { status: "error", message: translateAuthError(updateError.message) };

  return { status: "success", message: "Lozinka je uspješno promijenjena." };
}
