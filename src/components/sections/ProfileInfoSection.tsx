import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";
import type { Craftsman } from "@/types";

interface InfoItem {
  icon: string;
  label: string;
  value: string;
}

/** "Informacije" card: Grad, Radno područje, Telefon, Email, Godine iskustva, and Radno vrijeme. */
export function ProfileInfoSection({ craftsman }: { craftsman: Craftsman }) {
  const items: InfoItem[] = [
    { icon: "location_city", label: "Grad", value: craftsman.city },
    { icon: "map", label: "Radno područje", value: craftsman.neighborhood },
    { icon: "call", label: "Telefon", value: craftsman.phone },
    { icon: "mail", label: "Email", value: craftsman.email },
    { icon: "work_history", label: "Godine iskustva", value: `${craftsman.yearsExperience} godina` },
  ];

  return (
    <div className="rounded-3xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
      <h2 className="mb-6 flex items-center gap-2 text-headline-md">
        <MaterialIcon name="info" className="text-primary" />
        Informacije
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MaterialIcon name={item.icon} className="text-[20px]" />
            </div>
            <div className="min-w-0">
              <p className="text-label-sm text-text-muted">{item.label}</p>
              <p className="break-words text-body-md font-semibold text-text-main">{item.value}</p>
            </div>
          </div>
        ))}

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MaterialIcon name="schedule" className="text-[20px]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-label-sm text-text-muted">Radno vrijeme</p>
              <div className="space-y-2">
                {craftsman.workingHours.map((entry) => (
                  <div
                    key={entry.days}
                    className={cn("flex justify-between text-body-md", entry.closed && "font-semibold text-error")}
                  >
                    <span className={entry.closed ? undefined : "text-text-muted"}>{entry.days}</span>
                    <span className={entry.closed ? undefined : "font-semibold text-text-main"}>
                      {entry.closed ? "Zatvoreno" : entry.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
