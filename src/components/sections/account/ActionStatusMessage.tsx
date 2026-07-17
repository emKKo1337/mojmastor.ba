import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";
import type { ActionState } from "@/lib/action-state";

export function ActionStatusMessage({ state }: { state: ActionState }) {
  if (state.status === "idle" || !state.message) return null;
  const isError = state.status === "error";

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-2 rounded-lg px-4 py-3 text-label-sm",
        isError ? "bg-error-container text-on-error-container" : "bg-secondary-container/30 text-on-secondary-container",
      )}
    >
      <MaterialIcon name={isError ? "error" : "check_circle"} className="mt-0.5 text-[18px]" />
      {state.message}
    </div>
  );
}
