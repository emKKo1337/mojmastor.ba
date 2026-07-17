import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/pretraga?kategorija=${category.slug}`}
      className="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-transparent bg-surface p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/10 hover:shadow-lg"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <MaterialIcon name={category.icon} className="text-[32px]" />
      </div>
      <span className="text-label-lg">{category.name}</span>
    </Link>
  );
}

export function CategoryCardDetailed({ category }: { category: Category }) {
  return (
    <Link
      href={`/pretraga?kategorija=${category.slug}`}
      className="group cursor-pointer rounded-xl border border-transparent bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-container/20"
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary-container/10 text-primary transition-all duration-300">
        <MaterialIcon name={category.icon} className="text-3xl" />
      </div>
      <h3 className="mb-2 text-headline-md transition-colors group-hover:text-primary">{category.name}</h3>
      <p className="flex items-center gap-2 text-body-md text-text-muted">
        <span className="h-2 w-2 rounded-full bg-secondary" />
        {category.craftsmanCount} majstora
      </p>
    </Link>
  );
}
