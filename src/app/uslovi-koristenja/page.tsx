import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/sections/PageHero";
import { LegalContent, type LegalSection } from "@/components/sections/LegalContent";

export const metadata: Metadata = {
  title: "Uslovi korištenja",
  description: "Uslovi korištenja platforme MojMajstor.ba — prava i obaveze korisnika i majstora koji koriste platformu.",
};

const sections: LegalSection[] = [
  {
    heading: "1. Prihvatanje uslova",
    body: (
      <p>
        Korištenjem platforme MojMajstor.ba (&bdquo;Platforma&ldquo;) prihvatate ove Uslove korištenja u cijelosti. Ako
        se ne slažete sa bilo kojim dijelom ovih uslova, molimo vas da ne koristite Platformu.
      </p>
    ),
  },
  {
    heading: "2. Ko smo mi",
    body: (
      <p>
        MojMajstor.ba je online platforma koja povezuje korisnike koji traže usluge kućnih popravki i održavanja
        (&bdquo;Korisnici&ldquo;) sa majstorima i pružaocima usluga (&bdquo;Majstori&ldquo;) na području Bosne i
        Hercegovine. Platforma služi isključivo kao posrednik za povezivanje strana — mi nismo ugovorna strana u
        poslovima dogovorenim između Korisnika i Majstora.
      </p>
    ),
  },
  {
    heading: "3. Registracija naloga",
    body: (
      <>
        <p>
          Za korištenje pojedinih funkcionalnosti Platforme potrebno je kreirati nalog kao Korisnik ili kao Majstor.
          Prilikom registracije obavezni ste dostaviti tačne i potpune podatke o sebi.
        </p>
        <p>Odgovorni ste za čuvanje povjerljivosti podataka za prijavu i za sve aktivnosti koje se odvijaju putem vašeg naloga.</p>
      </>
    ),
  },
  {
    heading: "4. Obaveze korisnika",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Dostavljati tačne podatke prilikom registracije i slanja upita majstorima.</li>
        <li>Komunicirati s majstorima pošteno i u skladu s dobrim poslovnim običajima.</li>
        <li>Ne zloupotrebljavati platformu za slanje neprimjerenog ili lažnog sadržaja.</li>
        <li>Sve dogovore oko cijene, roka i obima posla direktno usaglašavati sa majstorom.</li>
      </ul>
    ),
  },
  {
    heading: "5. Obaveze majstora",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Objavljivati tačne informacije o svojim uslugama, iskustvu i cijenama.</li>
        <li>Izvršavati usluge profesionalno i u dogovorenom roku.</li>
        <li>Ne koristiti Platformu za oglašavanje usluga koje nisu u skladu sa zakonom.</li>
        <li>Blagovremeno odgovarati na upite korisnika u razumnom roku.</li>
      </ul>
    ),
  },
  {
    heading: "6. Sadržaj i recenzije",
    body: (
      <p>
        Korisnici i majstori mogu objavljivati recenzije, ocjene i fotografije na Platformi. Sadržaj mora biti istinit
        i ne smije kršiti prava trećih strana. Zadržavamo pravo uklanjanja sadržaja koji krši ove Uslove, uključujući
        uvredljiv, lažan ili neprimjeren sadržaj.
      </p>
    ),
  },
  {
    heading: "7. Ograničenje odgovornosti",
    body: (
      <p>
        MojMajstor.ba ne garantuje kvalitet, sigurnost ili zakonitost usluga koje pružaju Majstori, niti tačnost
        oglasa i profila. Svi poslovni dogovori, uključujući plaćanje, odvijaju se direktno između Korisnika i
        Majstora, van odgovornosti Platforme. Preporučujemo oprez i provjeru reference prije angažovanja bilo kojeg
        majstora.
      </p>
    ),
  },
  {
    heading: "8. Intelektualno vlasništvo",
    body: (
      <p>
        Naziv, logo, dizajn i softver Platforme vlasništvo su MojMajstor.ba i zaštićeni su važećim propisima.
        Zabranjeno je kopiranje, distribuiranje ili modificiranje sadržaja Platforme bez prethodne pismene saglasnosti.
      </p>
    ),
  },
  {
    heading: "9. Suspenzija i raskid naloga",
    body: (
      <p>
        Zadržavamo pravo da suspendujemo ili trajno uklonimo nalog koji krši ove Uslove, bez prethodne najave, u
        slučaju zloupotrebe, lažnog predstavljanja ili štetnog ponašanja prema drugim korisnicima Platforme.
      </p>
    ),
  },
  {
    heading: "10. Izmjene uslova",
    body: (
      <p>
        Ove Uslove možemo povremeno ažurirati kako bismo odražavali promjene u našim uslugama ili zakonskim
        propisima. O značajnijim izmjenama obavijestit ćemo korisnike putem Platforme ili email adrese vezane za
        nalog. Nastavak korištenja Platforme nakon izmjena smatra se prihvatanjem novih Uslova.
      </p>
    ),
  },
  {
    heading: "11. Mjerodavno pravo",
    body: (
      <p>
        Na ove Uslove primjenjuju se zakoni Bosne i Hercegovine. Svi eventualni sporovi rješavat će se pred nadležnim
        sudom u Sarajevu, osim ako zakonom nije drugačije propisano.
      </p>
    ),
  },
  {
    heading: "12. Kontakt",
    body: (
      <p>
        Za sva pitanja u vezi sa ovim Uslovima korištenja, obratite nam se putem stranice{" "}
        <a href="/kontakt" className="text-primary hover:underline">
          Kontakt
        </a>{" "}
        ili na email podrska@mojmajstor.ba.
      </p>
    ),
  },
];

export default function UsloviKoristenjaPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop md:py-20">
        <PageHero title="Uslovi korištenja" />
        <LegalContent updatedAt="17. juli 2026." sections={sections} />
      </main>
      <SiteFooter />
    </>
  );
}
