import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { CategoryListing } from "@/components/sections/CategoryListing";
import { BecomeCraftsmanCta } from "@/components/sections/BecomeCraftsmanCta";
import { categories, getCategoryBySlug } from "@/data/categories";
import { craftsmen } from "@/data/craftsmen";
import { cities } from "@/data/cities";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.pluralName,
    description: category.description,
  };
}

export default async function CategoryListingPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryCraftsmen = craftsmen.filter((craftsman) => craftsman.categorySlugs.includes(category.slug));

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-border-light bg-surface-white pb-16 pt-10 md:pb-24 md:pt-14">
          <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] -translate-y-1/3 translate-x-1/4 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 -z-10 h-[350px] w-[350px] translate-y-1/3 -translate-x-1/4 rounded-full bg-secondary/5 blur-3xl" />
          <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
            <Breadcrumb
              items={[{ label: "Početna", href: "/" }, { label: category.pluralName }]}
              className="mb-8"
            />
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary">
                <MaterialIcon name={category.icon} className="text-[32px]" />
              </div>
              <h1 className="mx-auto mb-4 max-w-3xl text-display-lg-mobile md:text-display-lg">
                {category.pluralName}
              </h1>
              <p className="mx-auto max-w-2xl text-body-lg text-text-muted">{category.description}</p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-surface-container-low px-5 py-2.5 text-label-lg text-text-main">
                <MaterialIcon name="verified" filled className="text-secondary" />
                Preko {category.craftsmanCount}+ registrovanih majstora u ovoj kategoriji
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-12 md:py-20">
          <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
            <CategoryListing craftsmen={categoryCraftsmen} category={category} cities={cities} />
          </div>
        </section>

        <section className="bg-surface-white py-16 md:py-24">
          <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
            <BecomeCraftsmanCta
              title="Jeste li majstor?"
              description="Kreirajte svoj profil i pronađite nove klijente."
              primaryLabel="Registruj se kao majstor"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
