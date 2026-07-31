import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/sections/PageHero";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Karijera",
  description: "Pridružite se timu MojMajstor.ba i pomozite nam da gradimo vodeću platformu za majstore i korisnike u BiH.",
};

const benefits = [
  {
    icon: "trending_up",
    title: "Rast i uticaj",
    description: "Mali tim, veliki uticaj — svaka odluka koju donesete direktno oblikuje platformu.",
  },
  {
    icon: "groups",
    title: "Odličan tim",
    description: "Radite sa ljudima koji vjeruju u kvalitetan proizvod i pomažu jedni drugima da rastu.",
  },
  {
    icon: "schedule",
    title: "Fleksibilno radno vrijeme",
    description: "Fokusirani smo na rezultate, ne na broj sati provedenih za stolom.",
  },
  {
    icon: "school",
    title: "Prostor za učenje",
    description: "Podržavamo dalje usavršavanje i isprobavanje novih ideja bez straha od greške.",
  },
];

export default function KarijeraPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop md:py-20">
        <PageHero
          eyebrow="Karijera"
          title="Gradite budućnost lokalnih usluga sa nama"
          description="Vjerujemo u pošten posao, dobre majstore i jednostavne alate. Ako i vi vjerujete u to, voljeli bismo da čujemo od vas."
        />

        <section className="mb-20 grid grid-cols-1 gap-gutter sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex gap-5 rounded-2xl border border-border-light bg-surface-white p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MaterialIcon name={benefit.icon} />
              </div>
              <div>
                <h2 className="mb-2 text-headline-md text-text-main">{benefit.title}</h2>
                <p className="text-body-md text-text-muted">{benefit.description}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-3xl rounded-2xl border border-dashed border-border-light bg-surface-container-low p-10 text-center">
          <MaterialIcon name="work_outline" className="mb-4 text-4xl text-text-muted" />
          <h2 className="mb-3 text-headline-md text-text-main">Trenutno nemamo otvorenih pozicija</h2>
          <p className="mx-auto mb-8 max-w-md text-body-md text-text-muted">
            Uvijek smo radi upoznati talentovane ljude. Pošaljite nam svoj CV i par riječi o sebi — javit ćemo se čim se
            otvori pozicija koja vam odgovara.
          </p>
          <Button href="mailto:karijera@mojmajstor.ba" variant="outline" size="lg">
            <MaterialIcon name="mail" />
            Pošalji spontanu prijavu
          </Button>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
