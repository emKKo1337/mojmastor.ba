"use client";

import { useMemo, useState } from "react";
import { CraftsmanListingCard } from "@/components/cards/CraftsmanListingCard";
import { CategoryListingFilters, sortOptions, type SortOption } from "@/components/sections/CategoryListingFilters";
import { FilterDrawer } from "@/components/ui/FilterDrawer";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { Category, Craftsman } from "@/types";

const PAGE_SIZE = 6;

interface CategoryListingProps {
  craftsmen: Craftsman[];
  category: Category;
  cities: readonly string[];
}

export function CategoryListing({ craftsmen, category, cities }: CategoryListingProps) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtersActive = query.trim() !== "" || city !== "" || minRating > 0 || sortBy !== "rating";

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    const filtered = craftsmen.filter((craftsman) => {
      if (term && !craftsman.fullName.toLowerCase().includes(term)) return false;
      if (city && craftsman.city !== city) return false;
      if (craftsman.rating < minRating) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "reviews") {
        return b.reviewCount - a.reviewCount;
      }
      return b.rating - a.rating || b.reviewCount - a.reviewCount;
    });
  }, [craftsmen, query, city, minRating, sortBy]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function resetFilters() {
    setQuery("");
    setCity("");
    setMinRating(0);
    setSortBy("rating");
    setPage(1);
  }

  function goToPage(nextPage: number) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const filterProps = {
    query,
    onQueryChange: (value: string) => {
      setQuery(value);
      setPage(1);
    },
    city,
    onCityChange: (value: string) => {
      setCity(value);
      setPage(1);
    },
    minRating,
    onMinRatingChange: (value: number) => {
      setMinRating(value);
      setPage(1);
    },
    sortBy,
    onSortByChange: (value: SortOption) => {
      setSortBy(value);
      setPage(1);
    },
    cities,
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-headline-lg">
            Pronađeno {results.length} {results.length === 1 ? "majstor" : "majstora"}
          </h2>
          <p className="mt-1 text-body-md text-text-muted">
            Sortirano po: {sortOptions.find((option) => option.value === sortBy)?.label}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0 lg:hidden"
          onClick={() => setDrawerOpen(true)}
        >
          <MaterialIcon name="tune" className="text-[18px]" />
          Filteri
          {filtersActive ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
        </Button>
      </div>

      <div className="mb-8 hidden rounded-xl border border-border-light bg-surface-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)] lg:block">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-label-lg text-text-main">Filteri</h3>
          {filtersActive ? (
            <button type="button" onClick={resetFilters} className="text-label-sm text-primary hover:underline">
              Očisti sve
            </button>
          ) : null}
        </div>
        <CategoryListingFilters {...filterProps} />
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filteri"
        footer={
          <div className="flex gap-3">
            <Button type="button" variant="subtle" size="md" fullWidth onClick={resetFilters}>
              Očisti
            </Button>
            <Button type="button" variant="primary" size="md" fullWidth onClick={() => setDrawerOpen(false)}>
              Prikaži rezultate ({results.length})
            </Button>
          </div>
        }
      >
        <CategoryListingFilters {...filterProps} />
      </FilterDrawer>

      {pageItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {pageItems.map((craftsman) => (
            <CraftsmanListingCard key={craftsman.id} craftsman={craftsman} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-xl border border-dashed border-border-light bg-surface-white px-6 py-20 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary">
            <MaterialIcon name="person_search" className="text-4xl" />
          </div>
          <h3 className="mb-2 text-headline-md text-text-main">Nema majstora koji odgovaraju filterima</h3>
          <p className="mb-6 max-w-md text-body-md text-text-muted">
            Pokušajte proširiti pretragu ili promijeniti odabrane filtere kako biste pronašli {category.pluralName.toLowerCase()} u
            vašoj blizini.
          </p>
          <Button type="button" variant="outline" onClick={resetFilters}>
            Očisti filtere
          </Button>
        </div>
      )}

      {totalPages > 1 ? (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} className="mt-12" />
      ) : null}
    </>
  );
}
