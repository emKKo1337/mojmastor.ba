import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { StarRating } from "@/components/ui/StarRating";
import { ProfileContactActions } from "@/components/sections/ProfileContactActions";
import { ProfileGallery } from "@/components/sections/ProfileGallery";
import { ProfileInfoSection } from "@/components/sections/ProfileInfoSection";
import { ProfileReviews } from "@/components/sections/ProfileReviews";
import { ProfileSidebar } from "@/components/sections/ProfileSidebar";
import { SimilarCraftsmen } from "@/components/sections/SimilarCraftsmen";
import { craftsmen, getCraftsmanById } from "@/data/craftsmen";
import { getReviewsForCraftsman } from "@/data/reviews";

interface MajstorPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return craftsmen.map((craftsman) => ({ id: craftsman.id }));
}

export async function generateMetadata({ params }: MajstorPageProps): Promise<Metadata> {
  const { id } = await params;
  const craftsman = getCraftsmanById(id);
  if (!craftsman) return {};

  return {
    title: `${craftsman.fullName} — ${craftsman.headline}`,
    description: craftsman.bio[0] ?? craftsman.headline,
  };
}

export default async function MajstorPage({ params }: MajstorPageProps) {
  const { id } = await params;
  const craftsman = getCraftsmanById(id);
  if (!craftsman) notFound();

  const reviews = getReviewsForCraftsman(craftsman.id);
  const coverSrc = craftsman.gallery[0]?.src;
  const similarCraftsmen = craftsmen
    .filter(
      (other) =>
        other.id !== craftsman.id && other.categorySlugs.some((slug) => craftsman.categorySlugs.includes(slug)),
    )
    .slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-container-max px-margin-mobile pb-28 pt-12 md:px-margin-desktop lg:pb-12">
        {/* Hero */}
        <section className="mb-12 overflow-hidden rounded-3xl bg-surface-white shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
          <div className="relative h-48 w-full md:h-64">
            {coverSrc ? (
              <Image src={coverSrc} alt="" fill priority className="object-cover" sizes="100vw" />
            ) : (
              <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-primary to-primary-container">
                <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-secondary/30 blur-3xl" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <div className="px-6 pb-8 pt-0 md:px-12 md:pb-12">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:gap-8">
              <div className="relative -mt-16 shrink-0 md:-mt-20">
                <Image
                  src={craftsman.avatarUrl}
                  alt={craftsman.fullName}
                  width={160}
                  height={160}
                  className="h-32 w-32 rounded-2xl border-4 border-white object-cover shadow-lg md:h-40 md:w-40"
                />
                {craftsman.availability === "available" ? (
                  <div className="absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-label-sm text-on-secondary shadow-md">
                    <MaterialIcon name="check_circle" filled className="text-[16px]" />
                    Dostupan
                  </div>
                ) : null}
              </div>

              <div className="flex w-full flex-1 flex-col items-center gap-6 pt-4 text-center md:flex-row md:items-end md:justify-between md:pt-0 md:text-left">
                <div>
                  <div className="mb-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                    <h1 className="text-headline-lg">{craftsman.fullName}</h1>
                    {craftsman.verified ? (
                      <Badge tone="success" icon="verified">
                        Verifikovan
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mb-3 text-headline-md text-primary">{craftsman.headline}</p>
                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start">
                    <StarRating rating={craftsman.rating} reviewCount={craftsman.reviewCount} />
                    <span className="flex items-center gap-2 text-text-muted">
                      <MaterialIcon name="location_on" />
                      {craftsman.city}
                    </span>
                    <span className="flex items-center gap-2 text-text-muted">
                      <MaterialIcon name="work_history" />
                      {craftsman.yearsExperience}+ god. iskustva
                    </span>
                  </div>
                </div>

                <ProfileContactActions
                  phone={craftsman.phone}
                  craftsmanId={craftsman.id}
                  className="w-full md:w-auto md:min-w-[220px]"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
          <div className="flex flex-col gap-gutter lg:col-span-2">
            {/* About */}
            <div className="rounded-3xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              <h2 className="mb-6 flex items-center gap-2 text-headline-md">
                <MaterialIcon name="description" className="text-primary" />
                O majstoru
              </h2>
              <div className="space-y-4 text-body-md text-text-muted">
                {craftsman.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Services */}
            {craftsman.skills.length > 0 ? (
              <div className="rounded-3xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
                <h2 className="mb-6 flex items-center gap-2 text-headline-md">
                  <MaterialIcon name="handyman" className="text-primary" />
                  Usluge
                </h2>
                <div className="flex flex-wrap gap-2">
                  {craftsman.skills.map((skill) => (
                    <Chip key={skill} tone="primary">
                      {skill}
                    </Chip>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Gallery */}
            <div className="rounded-3xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              <h2 className="mb-6 flex items-center gap-2 text-headline-md">
                <MaterialIcon name="gallery_thumbnail" className="text-primary" />
                Galerija radova
              </h2>
              <ProfileGallery gallery={craftsman.gallery} craftsmanName={craftsman.fullName} />
            </div>

            {/* Reviews */}
            <ProfileReviews reviews={reviews} averageRating={craftsman.rating} />

            {/* Information */}
            <ProfileInfoSection craftsman={craftsman} />
          </div>

          {/* Sidebar (Desktop) */}
          <ProfileSidebar craftsman={craftsman} />
        </div>

        {similarCraftsmen.length > 0 ? (
          <section className="mt-16 border-t border-border-light pt-16">
            <SimilarCraftsmen craftsmen={similarCraftsmen} />
          </section>
        ) : null}
      </main>
      <SiteFooter />
      <MobileActionBar phone={craftsman.phone} craftsmanId={craftsman.id} />
    </>
  );
}
