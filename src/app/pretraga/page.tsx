import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SearchResults } from "@/components/sections/SearchResults";
import { craftsmen } from "@/data/craftsmen";
import { getCategoryBySlug } from "@/data/categories";
import { getRealCraftsmen } from "@/lib/marketplace/craftsmen";

export const metadata: Metadata = {
  title: "Rezultati pretrage",
  description: "Pregledajte provjerene majstore u vašoj blizini na MojMajstor.ba i pronađite pravog stručnjaka za vaš posao.",
};

interface PretragaPageProps {
  searchParams: Promise<{ kategorija?: string; grad?: string; q?: string }>;
}

export default async function PretragaPage({ searchParams }: PretragaPageProps) {
  const params = await searchParams;
  const category = params.kategorija ? getCategoryBySlug(params.kategorija) : undefined;
  const locationLabel = params.grad?.trim() || "Sarajevu";

  const realCraftsmen = await getRealCraftsmen();
  const allCraftsmen = [...realCraftsmen, ...craftsmen];
  const results = category
    ? allCraftsmen.filter((craftsman) => craftsman.categorySlugs.includes(category.slug))
    : allCraftsmen;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop">
        <SearchResults craftsmen={results} locationLabel={locationLabel} categoryLabel={category?.name} />
      </main>
      <SiteFooter />
    </>
  );
}
