import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/sections/PageHero";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt informacije MojMajstor.ba — email, telefon, adresa i radno vrijeme naše korisničke podrške.",
};

const contactDetails = [
  {
    icon: "mail",
    label: "Email",
    value: "podrska@mojmajstor.ba",
    href: "mailto:podrska@mojmajstor.ba",
  },
  {
    icon: "call",
    label: "Telefon",
    value: "+387 33 123 456",
    href: "tel:+38733123456",
  },
  {
    icon: "location_on",
    label: "Adresa",
    value: "Ferhadija 12, 71000 Sarajevo, BiH",
  },
  {
    icon: "schedule",
    label: "Radno vrijeme",
    value: "Ponedjeljak – Petak, 08:00 – 18:00",
  },
];

export default function KontaktPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop md:py-20">
        <PageHero
          eyebrow="Kontakt"
          title="Javite nam se"
          description="Imate pitanje, prijedlog ili vam treba pomoć? Naš tim je tu za vas."
        />

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-gutter overflow-hidden rounded-2xl bg-surface-white shadow-[0_4px_20px_rgba(15,23,42,0.05)] md:grid-cols-2">
          <div className="relative h-64 md:h-full">
            <Image
              src="/images/misc/map-sarajevo.jpg"
              alt="Karta lokacije MojMajstor.ba u Sarajevu"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>

          <div className="p-8 md:p-10">
            <h2 className="mb-6 text-headline-md text-text-main">Kontakt informacije</h2>
            <ul className="space-y-6">
              {contactDetails.map((detail) => (
                <li key={detail.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MaterialIcon name={detail.icon} />
                  </div>
                  <div>
                    <p className="text-label-sm text-text-muted">{detail.label}</p>
                    {detail.href ? (
                      <a href={detail.href} className="text-label-lg text-text-main transition-colors hover:text-primary">
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-label-lg text-text-main">{detail.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
