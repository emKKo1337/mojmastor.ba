import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/sections/PageHero";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pomoć",
  description: "Centar za pomoć MojMajstor.ba — pronađite odgovore, kontaktirajte podršku ili pogledajte uslove korištenja.",
};

const helpTopics = [
  {
    icon: "person_search",
    title: "Pronalaženje majstora",
    description: "Kako pretražiti kategorije, filtrirati po gradu i odabrati pravog majstora za posao.",
    href: "/faq",
  },
  {
    icon: "construction",
    title: "Za majstore",
    description: "Kreiranje profila, uređivanje usluga i galerije, te primanje upita za posao.",
    href: "/faq",
  },
  {
    icon: "manage_accounts",
    title: "Nalog i sigurnost",
    description: "Prijava, registracija, resetovanje lozinke i upravljanje ličnim podacima.",
    href: "/faq",
  },
  {
    icon: "gavel",
    title: "Uslovi i pravila",
    description: "Pravila korištenja platforme i kako štitimo vaše podatke.",
    href: "/uslovi-koristenja",
  },
];

export default function PomocPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop md:py-20">
        <PageHero
          eyebrow="Centar za pomoć"
          title="Kako vam možemo pomoći?"
          description="Pregledajte najčešće teme ispod ili se direktno obratite našem timu za podršku."
        />

        <div className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-gutter sm:grid-cols-2">
          {helpTopics.map((topic) => (
            <Link
              key={topic.title}
              href={topic.href}
              className="group flex flex-col gap-4 rounded-2xl border border-border-light bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MaterialIcon name={topic.icon} className="text-2xl" />
              </div>
              <div>
                <h2 className="mb-2 text-headline-md text-text-main transition-colors group-hover:text-primary">
                  {topic.title}
                </h2>
                <p className="text-body-md text-text-muted">{topic.description}</p>
              </div>
              <span className="mt-auto flex items-center gap-1 text-label-lg text-primary">
                Saznaj više
                <MaterialIcon name="arrow_forward" className="text-[18px] transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl bg-primary-container p-10 text-center text-on-primary">
          <MaterialIcon name="support_agent" className="text-5xl" />
          <h2 className="text-headline-md">Trebate direktnu pomoć?</h2>
          <p className="max-w-md text-body-md opacity-90">
            Naš tim za korisničku podršku dostupan je radnim danima od 08:00 do 18:00.
          </p>
          <Button href="/kontakt" variant="white" size="lg">
            Kontaktirajte podršku
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
