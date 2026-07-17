import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export type BadgeTone = "primary" | "success" | "warning" | "neutral" | "error";

const toneClasses: Record<BadgeTone, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-secondary/10 text-secondary",
  warning: "bg-tertiary-container/10 text-tertiary",
  neutral: "bg-surface-container-highest text-text-muted",
  error: "bg-error-container text-on-error-container",
};

interface BadgeProps {
  tone?: BadgeTone;
  icon?: string;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ tone = "neutral", icon, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
        toneClasses[tone],
        className,
      )}
    >
      {icon ? <MaterialIcon name={icon} filled className="text-[12px]" /> : null}
      {children}
    </span>
  );
}
