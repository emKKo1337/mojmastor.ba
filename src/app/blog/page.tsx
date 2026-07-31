import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Blog",
  description: "Savjeti o kućnim popravkama, renoviranju i odabiru pravog majstora — uskoro na MojMajstor.ba blogu.",
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-container-max flex-col items-center px-margin-mobile py-24 text-center md:px-margin-desktop md:py-32">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MaterialIcon name="edit_note" className="text-4xl" />
        </div>
        <h1 className="mb-4 text-display-lg-mobile md:text-display-lg">Blog stiže uskoro</h1>
        <p className="mx-auto mb-10 max-w-xl text-body-lg text-text-muted">
          Pripremamo savjete o kućnim popravkama, renoviranju i odabiru pravog majstora za vaš projekat. Vratite se
          uskoro!
        </p>
        <Button href="/" size="lg">
          Nazad na početnu
        </Button>
      </main>
      <SiteFooter />
    </>
  );
}
