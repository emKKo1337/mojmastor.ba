import type { ReactNode } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface DashboardEmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

/** Empty-state placeholder reused across dashboard list pages. */
export function DashboardEmptyState({ icon, title, description, action }: DashboardEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border-light bg-surface-white p-12 text-center">
      <MaterialIcon name={icon} className="text-4xl text-text-muted" />
      <h3 className="text-headline-md text-text-main">{title}</h3>
      {description ? <p className="max-w-sm text-body-md text-text-muted">{description}</p> : null}
      {action}
    </div>
  );
}
