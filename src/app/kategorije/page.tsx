import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CategorySearchGrid } from "@/components/sections/CategorySearchGrid";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
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

        <section className="relative mt-24 overflow-hidden rounded-2xl bg-primary-container text-on-primary shadow-xl">
          <div className="absolute right-0 top-0 p-8 opacity-10">
            <MaterialIcon name="construction" className="text-[160px]" />
          </div>
          <div className="relative z-10 max-w-2xl p-12 md:p-16">
            <h2 className="mb-6 text-headline-lg">Vi ste majstor? Pridružite se MojMajstor.ba!</h2>
            <p className="mb-8 text-body-lg opacity-90">
              Hiljade korisnika mjesečno traži usluge upravo u vašoj kategoriji. Prijavite se besplatno i počnite
              primati upite za posao već danas.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href="/registracija?tip=majstor" variant="white" size="lg">
                Kreiraj profil majstora
              </Button>
              <Button
                href="/o-nama"
                variant="ghost"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10"
              >
                Saznajte više
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
