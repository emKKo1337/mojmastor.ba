"use client";

import { useMemo, useState } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { CategoryCardDetailed } from "@/components/cards/CategoryCard";
import type { Category } from "@/types";

export function CategorySearchGrid({ categories }: { categories: Category[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return categories;
    return categories.filter((category) => category.name.toLowerCase().includes(term));
  }, [categories, query]);

  return (
    <>
      <div className="group relative mx-auto mt-12 max-w-3xl">
        <MaterialIcon
          name="search"
          className="pointer-events-none absolute inset-y-0 left-6 flex items-center text-text-muted"
        />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Koju vrstu majstora trebate?"
          className="h-16 w-full rounded-xl border-border-light pl-16 pr-4 text-body-lg shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="mt-16 grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((category) => (
            <CategoryCardDetailed key={category.slug} category={category} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-body-md text-text-muted">
          Nema kategorija koje odgovaraju pretrazi &ldquo;{query}&rdquo;.
        </p>
      )}
    </>
  );
}
