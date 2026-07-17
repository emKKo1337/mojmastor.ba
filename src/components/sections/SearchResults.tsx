"use client";

import { useMemo, useState } from "react";
import { CraftsmanCard } from "@/components/cards/CraftsmanCard";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Pagination } from "@/components/ui/Pagination";
import type { Craftsman } from "@/types";

const PAGE_SIZE = 6;

interface SearchResultsProps {
  craftsmen: Craftsman[];
  locationLabel: string;
  categoryLabel?: string;
}

export function SearchResults({ craftsmen, locationLabel, categoryLabel }: SearchResultsProps) {
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return craftsmen.filter((craftsman) => {
      if (craftsman.rating < minRating) return false;
      if (craftsman.hourlyRateFrom > maxPrice) return false;
      if (verifiedOnly && !craftsman.verified) return false;
      return true;
    });
  }, [craftsmen, minRating, maxPrice, verifiedOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function resetFilters() {
    setMinRating(0);
    setMaxPrice(200);
    setVerifiedOnly(false);
    setPage(1);
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="text-headline-lg">
          Pronađeno {filtered.length} {filtered.length === 1 ? "majstor" : "majstora"}
          {categoryLabel ? ` u kategoriji ${categoryLabel}` : ` u ${locationLabel}`}
        </h1>
        <p className="mt-2 text-body-md text-text-muted">
          Prikazujemo provjerene profesionalce u vašoj blizini koji su spremni za rad.
        </p>
      </div>

      <div className="flex flex-col gap-gutter md:flex-row">
        <aside className="w-full shrink-0 md:w-72">
          <div className="sticky top-28 rounded-xl border border-border-light bg-surface-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-label-lg text-text-main">Filteri</h2>
              <button type="button" onClick={resetFilters} className="text-label-sm text-primary hover:underline">
                Očisti sve
              </button>
            </div>

            <div className="mb-8">
              <span className="mb-3 block text-label-lg">Ocjena</span>
              <div className="space-y-2">
                {[4.5, 4.0].map((value) => (
                  <label key={value} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={minRating === value}
                      onChange={() => setMinRating(minRating === value ? 0 : value)}
                      className="h-5 w-5 rounded border-border-light text-primary focus:ring-primary"
                    />
                    <span className="flex items-center gap-1 text-body-md">
                      {value.toFixed(1)}+ <MaterialIcon name="star" filled className="text-amber-500" />
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="price-range" className="mb-3 block text-label-lg">
                Cijena (po satu)
              </label>
              <input
                id="price-range"
                type="range"
                min={10}
                max={200}
                step={5}
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-container accent-primary"
              />
              <div className="mt-4 flex justify-between text-label-sm text-text-muted">
                <span>10 KM</span>
                <span>{maxPrice} KM</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border-light pt-4">
              <span className="text-label-lg text-text-main">Samo provjereni</span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(event) => setVerifiedOnly(event.target.checked)}
                  className="peer sr-only"
                />
                <div className="h-6 w-11 rounded-full bg-surface-container-highest transition-colors peer-checked:bg-primary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
              </label>
            </div>
          </div>
        </aside>

        <section className="flex-1">
          {pageItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {pageItems.map((craftsman) => (
                <CraftsmanCard key={craftsman.id} craftsman={craftsman} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border-light bg-surface-white p-12 text-center text-body-md text-text-muted">
              Nema majstora koji odgovaraju odabranim filterima.
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} className="mt-12" />
        </section>
      </div>
    </>
  );
}
