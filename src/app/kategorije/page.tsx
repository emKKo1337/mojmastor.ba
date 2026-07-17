import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CategorySearchGrid } from "@/components/sections/CategorySearchGrid";
import { BecomeCraftsmanCta } from "@/components/sections/BecomeCraftsmanCta";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Kategorije majstora",
  description:
    "Pregledajte sve dostupne kategorije majstora i usluga na MojMajstor.ba — od vodoinstalatera do stolara, provjereni lokalni profesionalci za svaki projekat.",
};

export default function KategorijePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop md:py-20">
        <div className="mb-16">
          <h1 className="mb-4 text-center text-display-lg-mobile md:text-display-lg">
            Pronađite stručnjaka za vaš dom
          </h1>
          <p className="mx-auto max-w-2xl text-center text-body-lg text-text-muted">
            Pregledajte sve dostupne kategorije majstora i usluga. Kvalitetni i provjereni lokalni profesionalci
            spremni su za vaš sljedeći projekat.
          </p>

          <CategorySearchGrid categories={categories} />
        </div>

        <BecomeCraftsmanCta
          className="mt-24"
          title="Vi ste majstor? Pridružite se MojMajstor.ba!"
          description="Hiljade korisnika mjesečno traži usluge upravo u vašoj kategoriji. Prijavite se besplatno i počnite primati upite za posao već danas."
          primaryLabel="Kreiraj profil majstora"
          secondaryLabel="Saznajte više"
        />
      </main>
      <SiteFooter />
    </>
  );
}
