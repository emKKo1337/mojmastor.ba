import type { ReactNode } from "react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { getCategoryBySlug } from "@/data/categories";
import type { JobRequest, JobRequestStatus } from "@/types";

const statusMeta: Record<JobRequestStatus, { label: string; tone: BadgeTone }> = {
  pending: { label: "Na čekanju", tone: "neutral" },
  offer_received: { label: "Ponuda poslana", tone: "primary" },
  accepted: { label: "U toku", tone: "warning" },
  completed: { label: "Završeno", tone: "success" },
  cancelled: { label: "Otkazano", tone: "error" },
};

interface JobRequestCardProps {
  job: JobRequest;
  actions?: ReactNode;
}

/** Job request card reused across the majstor's poslovi queues and the korisnik's zahtjevi list. */
export function JobRequestCard({ job, actions }: JobRequestCardProps) {
  const category = getCategoryBySlug(job.categorySlug);
  const status = statusMeta[job.status];

  return (
    <div className="rounded-xl border border-border-light bg-surface-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MaterialIcon name={category?.icon ?? "handyman"} className="text-2xl" />
          </div>
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h3 className="text-headline-md text-text-main">{job.title}</h3>
              {job.urgent ? (
                <Badge tone="error" icon="bolt">
                  Hitno
                </Badge>
              ) : null}
            </div>
            <p className="mb-2 flex items-center gap-1 text-sm text-text-muted">
              <MaterialIcon name="location_on" className="text-sm" />
              {job.neighborhood} • {job.createdAgo}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge tone={status.tone}>{status.label}</Badge>
              {job.preferredDate ? (
                <span className="rounded-full bg-surface-container px-3 py-1 text-xs font-medium text-text-muted">
                  {job.preferredDate}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {job.budgetFrom ? (
          <div className="text-left md:text-right">
            <p className="text-headline-md font-bold text-text-main">
              {job.budgetFrom.toFixed(2)}
              {job.budgetTo ? ` – ${job.budgetTo.toFixed(2)}` : ""} KM
            </p>
            <p className="text-xs text-text-muted">{job.budgetTo ? "Raspon cijene" : "Procijenjena cijena"}</p>
          </div>
        ) : null}
      </div>

      <p className="mt-4 text-body-md text-text-muted">{job.description}</p>

      {actions ? <div className="mt-6 flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
