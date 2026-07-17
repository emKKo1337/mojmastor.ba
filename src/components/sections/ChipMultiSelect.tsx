"use client";

import { useId, useState } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

interface ChipOption {
  value: string;
  label: string;
}

interface ChipMultiSelectProps {
  name: string;
  options: ChipOption[];
  defaultSelected: string[];
  searchPlaceholder: string;
  emptyMessage: string;
}

/**
 * Searchable grid of checkbox "chips" that still submits as plain form data
 * (each option is a real `<input type="checkbox">`, just styled as a pill).
 * Filtering only hides non-matching options — it never unmounts them, so a
 * checked-then-filtered-out option isn't silently dropped from the form.
 */
export function ChipMultiSelect({ name, options, defaultSelected, searchPlaceholder, emptyMessage }: ChipMultiSelectProps) {
  const groupId = useId();
  const [query, setQuery] = useState("");
  const [selectedCount, setSelectedCount] = useState(defaultSelected.length);
  const term = query.trim().toLowerCase();
  const hasVisibleMatch = term === "" || options.some((option) => option.label.toLowerCase().includes(term));

  return (
    <div>
      <div className="relative mb-4">
        <MaterialIcon
          name="search"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          className="h-12 w-full rounded-lg border border-border-light bg-surface-white pl-11 pr-4 text-body-md outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="custom-scrollbar max-h-72 overflow-y-auto rounded-lg border border-border-light p-4">
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const matches = term === "" || option.label.toLowerCase().includes(term);
            const inputId = `${groupId}-${option.value}`;
            return (
              <div key={option.value} className={matches ? undefined : "hidden"}>
                <input
                  id={inputId}
                  type="checkbox"
                  name={name}
                  value={option.value}
                  defaultChecked={defaultSelected.includes(option.value)}
                  className="peer sr-only"
                  onChange={(event) =>
                    setSelectedCount((count) => (event.target.checked ? count + 1 : Math.max(0, count - 1)))
                  }
                />
                <label
                  htmlFor={inputId}
                  className={cn(
                    "block cursor-pointer select-none rounded-full border px-4 py-2 text-label-sm transition-colors",
                    "border-border-light bg-surface-white text-text-main hover:border-primary/40",
                    "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white",
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40",
                  )}
                >
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
        {!hasVisibleMatch ? <p className="text-body-md text-text-muted">{emptyMessage}</p> : null}
      </div>

      <p className="mt-2 text-label-sm text-text-muted">{selectedCount} odabrano</p>
    </div>
  );
}
