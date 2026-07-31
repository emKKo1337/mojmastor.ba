import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/sections/PageHero";
import { BecomeCraftsmanCta } from "@/components/sections/BecomeCraftsmanCta";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "MojMajstor.ba je vodeća platforma u Bosni i Hercegovini za povezivanje korisnika sa provjerenim majstorima i uslugama.",
};

const stats = [
  { value: "5.000+", label: "Aktivnih majstora" },
  { value: "59", label: "Gradova u BiH" },
  { value: "49", label: "Kategorija usluga" },
  { value: "4.9/5", label: "Prosječna ocjena" },
];

const values = [
  {
    icon: "verified_user",
    title: "Povjerenje prije svega",
    description: "Svaki profil majstora prolazi provjeru kako bismo korisnicima osigurali sigurnu saradnju.",
  },
  {
    icon: "bolt",
    title: "Brzina i jednostavnost",
    description: "Pronalaženje pravog majstora traje minut — pretražite, uporedite i kontaktirajte direktno.",
  },
  {
    icon: "diversity_3",
    title: "Zajednica lokalnih majstora",
    description: "Podržavamo lokalne obrtnike i majstore da rastu i pronalaze nove klijente u svojoj okolini.",
  },
  {
    icon: "favorite",
    title: "Zadovoljstvo korisnika",
    description: "Recenzije i ocjene nakon svakog posla pomažu nam da stalno unapređujemo iskustvo za sve.",
  },
];

export default function ONamaPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop md:py-20">
        <PageHero
          eyebrow="O nama"
          title="Povezujemo korisnike sa pouzdanim majstorima širom BiH"
          description="MojMajstor.ba je nastao iz jednostavne ideje — da pronalaženje dobrog majstora ne treba biti stresno. Danas smo mjesto gdje se hiljade korisnika i majstora susreću svakog mjeseca."
        />

        <section className="mb-24 grid grid-cols-2 gap-gutter md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-2xl bg-surface-container-low py-8 text-center"
            >
              <span className="text-headline-lg font-bold text-primary">{stat.value}</span>
              <span className="text-label-lg text-text-muted">{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="mb-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-headline-lg">Šta nas pokreće</h2>
            <p className="text-body-lg text-text-muted">Vrijednosti koje stoje iza svakog dijela platforme.</p>
          </div>
          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="flex gap-5 rounded-2xl border border-border-light bg-surface-white p-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MaterialIcon name={value.icon} />
                </div>
                <div>
                  <h3 className="mb-2 text-headline-md text-text-main">{value.title}</h3>
                  <p className="text-body-md text-text-muted">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <BecomeCraftsmanCta
          title="Pridružite se MojMajstor.ba zajednici"
          description="Bilo da tražite pouzdanog majstora ili želite razviti svoj posao, tu smo da vam pomognemo."
          primaryLabel="Kreiraj profil majstora"
          secondaryLabel="Pregledaj kategorije"
          secondaryHref="/kategorije"
        />
      </main>
      <SiteFooter />
    </>
  );
}
