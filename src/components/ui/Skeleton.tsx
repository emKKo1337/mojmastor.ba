import { cn } from "@/lib/utils";

/** Pulsing placeholder block used to compose loading-state skeletons. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-lg bg-surface-container-highest", className)} />;
}
