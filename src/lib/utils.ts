type ClassValue = string | number | null | undefined | false | ClassValue[];

function flatten(values: ClassValue[], out: string[]) {
  for (const value of values) {
    if (!value && value !== 0) continue;
    if (Array.isArray(value)) {
      flatten(value, out);
    } else {
      out.push(String(value));
    }
  }
}

/** Joins conditional class names, skipping falsy values. */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  flatten(values, out);
  return out.join(" ");
}

export function formatKM(amount: number): string {
  return `${amount.toFixed(2).replace(/\.00$/, "")} KM`;
}

/** Formats an ISO timestamp as a short Bosnian relative-time string, e.g. "Prije 15 min". */
export function formatRelativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffMinutes = Math.round(diffMs / 60_000);

  if (diffMinutes < 1) return "Upravo sada";
  if (diffMinutes < 60) return `Prije ${diffMinutes} min`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `Prije ${diffHours} ${diffHours === 1 ? "sat" : "sata"}`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays === 1) return "Jučer";
  if (diffDays < 7) return `Prije ${diffDays} dana`;

  const diffWeeks = Math.round(diffDays / 7);
  if (diffWeeks < 5) return `Prije ${diffWeeks} ${diffWeeks === 1 ? "sedmicu" : "sedmice"}`;

  const diffMonths = Math.round(diffDays / 30);
  return `Prije ${diffMonths} ${diffMonths === 1 ? "mjesec" : "mjeseci"}`;
}
