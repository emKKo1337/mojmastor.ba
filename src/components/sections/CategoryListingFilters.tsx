import { Label, Select, TextField } from "@/components/ui/form";

export type SortOption = "rating" | "newest" | "reviews";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "rating", label: "Najbolje ocijenjeni" },
  { value: "newest", label: "Najnoviji" },
  { value: "reviews", label: "Najviše recenzija" },
];

const minRatingOptions = [
  { value: 0, label: "Sve ocjene" },
  { value: 4.5, label: "4.5+" },
  { value: 4.0, label: "4.0+" },
  { value: 3.5, label: "3.5+" },
];

interface CategoryListingFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
  minRating: number;
  onMinRatingChange: (value: number) => void;
  sortBy: SortOption;
  onSortByChange: (value: SortOption) => void;
  cities: readonly string[];
}

/** Filter fields shared between the desktop inline bar and the mobile filter drawer. */
export function CategoryListingFilters({
  query,
  onQueryChange,
  city,
  onCityChange,
  minRating,
  onMinRatingChange,
  sortBy,
  onSortByChange,
  cities,
}: CategoryListingFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <Label htmlFor="filter-query">Pretraga po imenu</Label>
        <TextField
          id="filter-query"
          icon="search"
          placeholder="Ime majstora..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="filter-city">Grad</Label>
        <Select id="filter-city" value={city} onChange={(event) => onCityChange(event.target.value)}>
          <option value="">Svi gradovi</option>
          {cities.map((cityOption) => (
            <option key={cityOption} value={cityOption}>
              {cityOption}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="filter-rating">Minimalna ocjena</Label>
        <Select
          id="filter-rating"
          value={minRating}
          onChange={(event) => onMinRatingChange(Number(event.target.value))}
        >
          {minRatingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="filter-sort">Sortiraj po</Label>
        <Select
          id="filter-sort"
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value as SortOption)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
