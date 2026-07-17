import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button, type ButtonSize } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ProfileContactActionsProps {
  phone: string;
  craftsmanId: string;
  layout?: "stack" | "row";
  size?: ButtonSize;
  className?: string;
}

/** The "Pozovi" + "Pošalji poruku" pair, reused across the hero, sticky sidebar, and mobile action bar. */
export function ProfileContactActions({
  phone,
  craftsmanId,
  layout = "stack",
  size = "lg",
  className,
}: ProfileContactActionsProps) {
  return (
    <div className={cn(layout === "stack" ? "flex flex-col gap-3" : "flex gap-3", className)}>
      <Button
        href={`tel:${phone.replace(/\s+/g, "")}`}
        variant="outline"
        size={size}
        className={layout === "row" ? "flex-1" : undefined}
      >
        <MaterialIcon name="call" />
        Pozovi
      </Button>
      <Button
        href={`/poruke?majstor=${craftsmanId}`}
        size={size}
        className={layout === "row" ? "flex-1" : undefined}
      >
        <MaterialIcon name="send" />
        Pošalji poruku
      </Button>
    </div>
  );
}
