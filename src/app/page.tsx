import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { categories } from "@/data/categories";
import { testimonials } from "@/data/testimonials";

const steps = [
  {
    number: 1,
    title: "Objavite zahtjev",
    description:
      "Detaljno opišite što Vam treba, dodajte slike i lokaciju. Potpuno besplatno i za manje od 2 minute.",
    image: "/images/illustrations/kako-radi-1.jpg",
    alt: "Zahtjev za renoviranje na ekranu telefona",
  },
  {
    number: 2,
    title: "Primite ponude",
    description: "Kvalifikovani majstori iz Vaše blizine će poslati svoje ponude i rokove za završetak posla.",
    image: "/images/illustrations/kako-radi-2.jpg",
    alt: "Profili majstora sa ocjenama i ponudama",
  },
  {
    number: 3,
    title: "Odaberite najboljeg",
    description:
      "Pogledajte recenzije, prethodne radove i izaberite majstora koji Vam najviše odgovara. Plaćate tek nakon završenog posla.",
    image: "/images/illustrations/kako-radi-3.jpg",
    alt: "Zadovoljan klijent i majstor se rukuju",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24">
          <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/4 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] translate-y-1/2 -translate-x-1/4 rounded-full bg-secondary/5 blur-3xl" />
          <div className="mx-auto max-w-container-max px-margin-mobile text-center md:px-margin-desktop">
            <h1 className="mx-auto mb-6 max-w-4xl text-display-lg-mobile md:text-display-lg">
              Pronađite provjerenog majstora u svom gradu
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-body-lg text-text-muted">
              Hiljade provjerenih majstora spremno je pomoći oko renoviranja, popravki i svih kućnih usluga. Sigurno,
              brzo i pouzdano.
            </p>

            <div className="relative z-10 mx-auto max-w-4xl rounded-[24px] bg-surface-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.05)] md:p-6">
              <form action="/pretraga" method="GET" className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto]">
                <div className="group relative flex items-center">
                  <MaterialIcon name="search" className="absolute left-4 text-text-muted transition-colors group-focus-within:text-primary" />
                  <input
                    name="q"
                    type="text"
                    placeholder="Koju uslugu tražite?"
                    className="h-14 w-full rounded-xl border-none bg-surface-bright pl-12 pr-4 text-body-md transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="group relative flex items-center">
                  <MaterialIcon name="location_on" className="absolute left-4 text-text-muted transition-colors group-focus-within:text-primary" />
                  <input
                    name="grad"
                    type="text"
                    placeholder="Grad"
                    className="h-14 w-full rounded-xl border-none bg-surface-bright pl-12 pr-4 text-body-md transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button type="submit" size="lg">
                  Pronađi majstora
                </Button>
              </form>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-60">
              <span className="text-label-lg text-text-muted">Preko 5.000+ aktivnih majstora</span>
              <span className="text-label-lg text-text-muted">100% provjereni profili</span>
              <span className="text-label-lg text-text-muted">Sigurno plaćanje</span>
            </div>
          </div>
        </section>

        <section className="bg-surface-white py-20 md:py-32">
          <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="mb-2 text-headline-lg">Popularne kategorije</h2>
                <p className="text-body-md text-text-muted">Najtraženije usluge u Vašem okruženju</p>
              </div>
              <Link href="/kategorije" className="flex items-center gap-1 text-label-lg text-primary hover:underline">
                Vidi sve kategorije
                <MaterialIcon name="arrow_forward" className="text-[18px]" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
              {categories.map((category) => (
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
          </div>
        </section>

        <section id="kako-radi" className="bg-surface py-20 md:py-32">
          <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
            <div className="mb-16 text-center md:mb-24">
              <h2 className="mb-4 text-headline-lg">Kako radi MojMajstor.ba?</h2>
              <p className="mx-auto max-w-2xl text-body-lg text-text-muted">
                Jednostavan proces u tri koraka koji Vam štedi vrijeme i novac.
              </p>
            </div>
            <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="absolute left-0 top-1/3 -z-10 hidden h-[2px] w-full bg-gradient-to-r from-transparent via-border-light to-transparent md:block" />
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center">
                  <div className="relative mb-8 aspect-square w-full max-w-[280px] overflow-hidden rounded-[32px] bg-surface-white shadow-xl">
                    <Image src={step.image} alt={step.alt} fill className="object-cover" sizes="280px" />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="mb-3 text-headline-md">{step.title}</h3>
                  <p className="text-body-md text-text-muted">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-20 text-center">
              <Button href="/novi-zahtjev" size="lg" className="!px-10 !text-headline-md">
                Započnite odmah
              </Button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-surface-white py-20 md:py-32">
          <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
            <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="max-w-xl">
                <h2 className="mb-4 text-center text-headline-lg md:text-left">Šta kažu naši korisnici?</h2>
                <p className="text-center text-body-lg text-text-muted md:text-left">
                  Hiljade uspješnih saradnji svakog mjeseca potvrđuju našu kvalitetu i sigurnost.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <MaterialIcon key={i} name="star" filled />
                  ))}
                </div>
                <span className="text-label-lg">4.9/5 prosječna ocjena</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
            <div className="relative flex flex-col items-center gap-12 overflow-hidden rounded-[40px] bg-primary-container p-8 text-on-primary md:p-16 lg:flex-row">
              <div className="absolute right-0 top-0 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
              <div className="z-10 flex-1 text-center lg:text-left">
                <h2 className="mb-6 text-display-lg-mobile text-white md:text-headline-lg">
                  Vi ste majstor? Pronađite nove klijente već danas.
                </h2>
                <p className="mb-10 text-body-lg text-on-primary-container opacity-90">
                  Pridružite se hiljadama majstora koji putem naše platforme grade svoj biznis i pronalaze provjerene
                  poslove u svojoj okolini.
                </p>
                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  <Button href="/registracija?tip=majstor" variant="white" size="lg" className="!text-headline-md">
                    Postani majstor
                  </Button>
                  <Button
                    href="/o-nama"
                    variant="ghost"
                    size="lg"
                    className="!text-headline-md border-2 border-white/30 text-white hover:bg-white/10"
                  >
                    Saznaj više
                  </Button>
                </div>
              </div>
              <div className="z-10 w-full max-w-[500px] flex-1">
                <div className="rounded-[32px] border border-white/20 bg-white/10 p-2 backdrop-blur-md">
                  <Image
                    src="/images/illustrations/postani-majstor.jpg"
                    alt="Majstor sa tabletom prikazuje nadzornu ploču sa poslovima"
                    width={500}
                    height={500}
                    className="w-full rounded-[24px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
