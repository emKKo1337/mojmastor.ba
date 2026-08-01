"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth/admin";
import type { ActionState } from "@/lib/action-state";

export async function toggleVerificationAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const profileId = String(formData.get("profileId") ?? "");
  const nextValue = formData.get("nextValue") === "true";
  if (!profileId) return { status: "error", message: "Nevažeći profil." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return { status: "error", message: "Nemate ovlaštenje za ovu akciju." };
  }

  const { error } = await supabase.rpc("set_craftsman_verified", {
    target_profile_id: profileId,
    verified_value: nextValue,
  });

  if (error) return { status: "error", message: "Došlo je do greške. Pokušajte ponovo." };

  revalidatePath("/admin/verifikacija");
  return { status: "success", message: nextValue ? "Majstor je verifikovan." : "Verifikacija je uklonjena." };
}
