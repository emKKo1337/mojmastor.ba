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
