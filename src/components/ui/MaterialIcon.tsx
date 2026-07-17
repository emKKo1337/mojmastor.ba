import { cn } from "@/lib/utils";

interface MaterialIconProps {
  name: string;
  filled?: boolean;
  className?: string;
  "aria-label"?: string;
}

/** Renders a Material Symbols Outlined glyph loaded via the root layout's font link. */
export function MaterialIcon({ name, filled, className, "aria-label": ariaLabel }: MaterialIconProps) {
  return (
    <span
      className={cn("material-symbols-outlined", filled && "icon-fill", className)}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      {name}
    </span>
  );
}
