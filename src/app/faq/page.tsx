import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { faqCategories } from "@/data/faq";

export const metadata: Metadata = {
  title: "Često postavljana pitanja",
  description:
    "Odgovori na najčešća pitanja o korištenju MojMajstor.ba platforme — za korisnike koji traže majstora i za majstore koji nude usluge.",
};

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop md:py-20">
        <PageHero
          eyebrow="Pomoć"
          title="Često postavljana pitanja"
          description="Odgovori na pitanja koja nam korisnici i majstori najčešće postavljaju. Ne nalazite ono što tražite?"
        />

        <div className="mx-auto max-w-3xl space-y-12">
          {faqCategories.map((category) => (
            <div key={category.title}>
              <h2 className="mb-4 text-headline-md text-text-main">{category.title}</h2>
              <FaqAccordion items={category.items} />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-4 rounded-2xl bg-surface-container-low p-10 text-center">
          <h2 className="text-headline-md text-text-main">Niste pronašli odgovor?</h2>
          <p className="max-w-md text-body-md text-text-muted">
            Naš tim za podršku rado će vam pomoći sa bilo kojim pitanjem.
          </p>
          <Button href="/kontakt" size="lg">
            Kontaktirajte nas
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
