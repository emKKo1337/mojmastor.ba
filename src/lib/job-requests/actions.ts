"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { validateRequired } from "@/lib/validation";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import type { ActionState } from "@/lib/action-state";

const VALID_CATEGORY_SLUGS = new Set(categories.map((category) => category.slug));
const VALID_CITIES = new Set<string>(cities);

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, userId: null as string | null, error: "Morate biti prijavljeni." };
  return { supabase, userId: user.id, error: null as string | null };
}

export async function createJobRequestAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const title = String(formData.get("naslov") ?? "").trim();
  const description = String(formData.get("opis") ?? "").trim();
  const categorySlug = String(formData.get("kategorija") ?? "");
  const city = String(formData.get("grad") ?? "");
  const neighborhood = String(formData.get("naselje") ?? "").trim();
  const preferredDate = String(formData.get("datum") ?? "").trim();
  const urgent = formData.get("hitno") === "on";
  const budgetFromRaw = String(formData.get("budzet") ?? "").trim();

  const error =
    validateRequired(title, "Naslov zahtjeva") ??
    validateRequired(description, "Opis problema") ??
    (VALID_CATEGORY_SLUGS.has(categorySlug) ? null : 'Polje "Usluga" je obavezno.') ??
    (VALID_CITIES.has(city) ? null : 'Polje "Grad" je obavezno.');
  if (error) return { status: "error", message: error };

  const budgetFrom = budgetFromRaw === "" ? null : Number(budgetFromRaw);
  if (budgetFrom !== null && (Number.isNaN(budgetFrom) || budgetFrom < 0)) {
    return { status: "error", message: "Unesite ispravan budžet." };
  }

  const { supabase, userId, error: authError } = await requireUser();
  if (authError || !userId) return { status: "error", message: authError ?? "Došlo je do greške." };

  const { error: insertError } = await supabase.from("job_requests").insert({
    customer_id: userId,
    title,
    description,
    category_slug: categorySlug,
    city,
    neighborhood,
    preferred_date: preferredDate,
    urgent,
    budget_from: budgetFrom,
  });

  if (insertError) return { status: "error", message: "Nije moguće poslati zahtjev. Pokušajte ponovo." };

  revalidatePath("/nadzorna-ploca/zahtjevi");
  revalidatePath("/panel-majstora/novi-poslovi");
  return { status: "success", message: "Zahtjev je uspješno poslan." };
}

export async function acceptJobRequestAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const jobId = String(formData.get("jobId") ?? "");
  if (!jobId) return { status: "error", message: "Nevažeći zahtjev." };

  const { supabase, userId, error: authError } = await requireUser();
  if (authError || !userId) return { status: "error", message: authError ?? "Došlo je do greške." };

  const { data: job, error: updateError } = await supabase
    .from("job_requests")
    .update({ craftsman_id: userId, status: "accepted" })
    .eq("id", jobId)
    .eq("status", "pending")
    .is("craftsman_id", null)
    .select("customer_id")
    .single();

  if (updateError || !job) {
    return { status: "error", message: "Nije moguće prihvatiti posao. Možda ga je već prihvatio neko drugi." };
  }

  // Opens a message thread with the customer — ignore conflicts, since a
  // thread may already exist from a previous job with the same customer.
  await supabase
    .from("conversations")
    .insert({ customer_id: job.customer_id, craftsman_id: userId })
    .select()
    .maybeSingle();

  revalidatePath("/panel-majstora/novi-poslovi");
  revalidatePath("/panel-majstora/aktivni-poslovi");
  revalidatePath("/nadzorna-ploca/zahtjevi");
  revalidatePath("/poruke");
  return { status: "success", message: "Posao je prihvaćen." };
}

export async function declineJobRequestAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const jobId = String(formData.get("jobId") ?? "");
  if (!jobId) return { status: "error", message: "Nevažeći zahtjev." };

  const { supabase, userId, error: authError } = await requireUser();
  if (authError || !userId) return { status: "error", message: authError ?? "Došlo je do greške." };

  const { data: job } = await supabase.from("job_requests").select("declined_by").eq("id", jobId).single();
  if (!job) return { status: "error", message: "Zahtjev nije pronađen." };

  const declinedBy = job.declined_by.includes(userId) ? job.declined_by : [...job.declined_by, userId];

  const { error: updateError } = await supabase.from("job_requests").update({ declined_by: declinedBy }).eq("id", jobId);

  if (updateError) return { status: "error", message: "Došlo je do greške. Pokušajte ponovo." };

  revalidatePath("/panel-majstora/novi-poslovi");
  return { status: "success", message: "Posao je odbijen." };
}

export async function completeJobRequestAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const jobId = String(formData.get("jobId") ?? "");
  if (!jobId) return { status: "error", message: "Nevažeći zahtjev." };

  const { supabase, userId, error: authError } = await requireUser();
  if (authError || !userId) return { status: "error", message: authError ?? "Došlo je do greške." };

  const { error: updateError } = await supabase
    .from("job_requests")
    .update({ status: "completed" })
    .eq("id", jobId)
    .eq("craftsman_id", userId);

  if (updateError) return { status: "error", message: "Došlo je do greške. Pokušajte ponovo." };

  revalidatePath("/panel-majstora/aktivni-poslovi");
  revalidatePath("/panel-majstora/zavrseni-poslovi");
  revalidatePath("/panel-majstora/zarada");
  revalidatePath("/panel-majstora/statistika");
  revalidatePath("/nadzorna-ploca/zahtjevi");
  return { status: "success", message: "Posao je označen kao završen." };
}

export async function cancelJobRequestAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const jobId = String(formData.get("jobId") ?? "");
  if (!jobId) return { status: "error", message: "Nevažeći zahtjev." };

  const { supabase, userId, error: authError } = await requireUser();
  if (authError || !userId) return { status: "error", message: authError ?? "Došlo je do greške." };

  const { error: updateError } = await supabase
    .from("job_requests")
    .update({ status: "cancelled" })
    .eq("id", jobId)
    .eq("customer_id", userId)
    .eq("status", "pending");

  if (updateError) return { status: "error", message: "Došlo je do greške. Pokušajte ponovo." };

  revalidatePath("/nadzorna-ploca/zahtjevi");
  return { status: "success", message: "Zahtjev je otkazan." };
}
