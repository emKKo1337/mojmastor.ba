import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NewRequestForm } from "@/components/sections/NewRequestForm";

export const metadata: Metadata = {
  title: "Postavi novi zahtjev",
  description:
    "Opišite svoj problem, odredite budžet i dozvolite provjerenim majstorima na MojMajstor.ba da Vam ponude najbolje rješenje.",
};

export default function NoviZahtjevPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-screen max-w-[900px] px-4 py-16 md:px-margin-desktop">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-headline-lg text-text-main md:text-display-lg">Postavi novi zahtjev</h1>
          <p className="mx-auto max-w-2xl text-body-lg text-text-muted">
            Opišite svoj problem, odredite budžet i dozvolite našim majstorima da Vam ponude najbolje rješenje. Brzo,
            sigurno i jednostavno.
          </p>
        </div>
        <NewRequestForm />
      </main>
      <SiteFooter />
    </>
  );
}
