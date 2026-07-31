import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/sections/PageHero";
import { LegalContent, type LegalSection } from "@/components/sections/LegalContent";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: "Politika privatnosti MojMajstor.ba — kako prikupljamo, koristimo i štitimo vaše lične podatke.",
};

const sections: LegalSection[] = [
  {
    heading: "1. Uvod",
    body: (
      <p>
        Ova Politika privatnosti objašnjava koje podatke prikupljamo o vama kada koristite MojMajstor.ba
        (&bdquo;Platforma&ldquo;), kako ih koristimo i koja prava imate u vezi sa svojim podacima. Korištenjem
        Platforme saglasni ste sa prikupljanjem i obradom podataka opisanim u ovom dokumentu.
      </p>
    ),
  },
  {
    heading: "2. Koje podatke prikupljamo",
    body: (
      <>
        <p>Prilikom registracije i korištenja Platforme prikupljamo sljedeće podatke:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Osnovni podaci: ime, prezime, email adresa i broj telefona.</li>
          <li>Podaci o profilu majstora: opis usluga, kategorije, gradovi rada, fotografije radova.</li>
          <li>Podaci o korištenju: poruke razmijenjene kroz Platformu, sačuvani majstori, recenzije.</li>
          <li>Tehnički podaci: IP adresa, vrsta uređaja i preglednika, u svrhu sigurnosti i unapređenja usluge.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. Kako koristimo vaše podatke",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Za kreiranje i upravljanje vašim nalogom.</li>
        <li>Za povezivanje korisnika sa majstorima i omogućavanje komunikacije kroz Platformu.</li>
        <li>Za slanje obavještenja vezanih za nalog (potvrda emaila, resetovanje lozinke, poruke).</li>
        <li>Za sigurnost, sprječavanje zloupotrebe i unapređenje kvaliteta usluge.</li>
      </ul>
    ),
  },
  {
    heading: "4. Dijeljenje podataka",
    body: (
      <p>
        Vaše osnovne kontakt podatke (ime i, u slučaju majstora, kontakt informacije) dijelimo isključivo u mjeri
        potrebnoj za funkcionisanje Platforme — na primjer, kako bi korisnik i majstor mogli stupiti u kontakt. Ne
        prodajemo vaše lične podatke trećim stranama. Podaci se mogu dijeliti s pružaocima usluga koji nam pomažu u
        radu Platforme (npr. hosting i infrastruktura), a koji su ugovorno obavezani da štite vaše podatke.
      </p>
    ),
  },
  {
    heading: "5. Kolačići (cookies)",
    body: (
      <p>
        Platforma koristi kolačiće neophodne za prijavu i održavanje vaše sesije. Ne koristimo kolačiće za praćenje u
        marketinške svrhe bez vašeg pristanka.
      </p>
    ),
  },
  {
    heading: "6. Sigurnost podataka",
    body: (
      <p>
        Primjenjujemo standardne tehničke i organizacijske mjere zaštite podataka, uključujući enkriptovanu
        komunikaciju i kontrolu pristupa na nivou baze podataka, kako bismo spriječili neovlašten pristup, gubitak ili
        zloupotrebu vaših podataka.
      </p>
    ),
  },
  {
    heading: "7. Čuvanje podataka",
    body: (
      <p>
        Vaše podatke čuvamo dok god je vaš nalog aktivan. Ako želite obrisati svoj nalog i pripadajuće podatke,
        kontaktirajte nas putem stranice Kontakt, a mi ćemo postupiti po vašem zahtjevu u skladu sa važećim propisima.
      </p>
    ),
  },
  {
    heading: "8. Vaša prava",
    body: (
      <>
        <p>U vezi sa svojim ličnim podacima imate pravo na:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Uvid u podatke koje čuvamo o vama.</li>
          <li>Ispravku netačnih ili nepotpunih podataka putem Postavki naloga.</li>
          <li>Brisanje naloga i pripadajućih podataka.</li>
          <li>Povlačenje pristanka za obradu podataka u bilo kojem trenutku.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "9. Podaci maloljetnika",
    body: (
      <p>
        Platforma nije namijenjena osobama mlađim od 18 godina i svjesno ne prikupljamo podatke maloljetnika. Ako
        saznamo da smo prikupili podatke maloljetne osobe, preduzet ćemo korake da ih uklonimo.
      </p>
    ),
  },
  {
    heading: "10. Izmjene politike privatnosti",
    body: (
      <p>
        Ovu Politiku privatnosti možemo povremeno ažurirati. O značajnijim izmjenama obavijestit ćemo vas putem
        Platforme ili email adrese vezane za nalog.
      </p>
    ),
  },
  {
    heading: "11. Kontakt",
    body: (
      <p>
        Za sva pitanja u vezi sa obradom vaših ličnih podataka, obratite nam se putem stranice{" "}
        <a href="/kontakt" className="text-primary hover:underline">
          Kontakt
        </a>{" "}
        ili na email podrska@mojmajstor.ba.
      </p>
    ),
  },
];

export default function PolitikaPrivatnostiPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop md:py-20">
        <PageHero title="Politika privatnosti" />
        <LegalContent updatedAt="17. juli 2026." sections={sections} />
      </main>
      <SiteFooter />
    </>
  );
}
