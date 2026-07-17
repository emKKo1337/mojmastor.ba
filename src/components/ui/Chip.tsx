import { cn } from "@/lib/utils";

export type ChipTone = "neutral" | "primary";

const toneClasses: Record<ChipTone, string> = {
  neutral: "bg-surface-container-low text-text-muted",
  primary: "bg-primary/5 text-primary",
};

interface ChipProps {
  children: React.ReactNode;
  tone?: ChipTone;
  className?: string;
}

/** Small pill used for tags, skills, and service badges. */
export function Chip({ children, tone = "neutral", className }: ChipProps) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-label-sm", toneClasses[tone], className)}>
      {children}
    </span>
  );
}
