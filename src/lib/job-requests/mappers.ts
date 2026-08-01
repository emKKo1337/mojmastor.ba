import { formatRelativeTime } from "@/lib/utils";
import type { Database } from "@/types/supabase";
import type { JobRequest } from "@/types";

type JobRequestRow = Database["public"]["Tables"]["job_requests"]["Row"];

export function toJobRequest(row: JobRequestRow): JobRequest {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    categorySlug: row.category_slug,
    city: row.city,
    neighborhood: row.neighborhood || row.city,
    budgetFrom: row.budget_from ?? undefined,
    budgetTo: row.budget_to ?? undefined,
    preferredDate: row.preferred_date || undefined,
    status: row.status,
    createdAgo: formatRelativeTime(row.created_at),
    urgent: row.urgent,
  };
}
