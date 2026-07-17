import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { craftsmen, getCraftsmanById } from "@/data/craftsmen";
import { getReviewsForCraftsman } from "@/data/reviews";
import { cn } from "@/lib/utils";

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

const galleryLayout = ["md:col-span-2 md:row-span-2", "", "", "md:col-span-2"];

export default async function MajstorPage({ params }: MajstorPageProps) {
  const { id } = await params;
  const craftsman = getCraftsmanById(id);
  if (!craftsman) notFound();

  const reviews = getReviewsForCraftsman(craftsman.id);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop">
        <section className="mb-12">
          <div className="relative flex flex-col items-start gap-10 overflow-hidden rounded-3xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)] md:flex-row md:items-center md:p-12">
            <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-primary/5" />
            <div className="relative z-10 flex flex-grow flex-col items-center gap-8 md:flex-row">
              <div className="relative">
                <Image
                  src={craftsman.avatarUrl}
                  alt={craftsman.fullName}
                  width={192}
                  height={192}
                  className="h-32 w-32 rounded-2xl border-4 border-white object-cover shadow-lg md:h-48 md:w-48"
                />
                {craftsman.availability === "available" ? (
                  <div className="absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-label-sm text-on-secondary shadow-md">
                    <MaterialIcon name="check_circle" filled className="text-[16px]" />
                    Dostupan
                  </div>
                ) : null}
              </div>
              <div className="text-center md:text-left">
                <div className="mb-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <h1 className="text-headline-lg">{craftsman.fullName}</h1>
                  <span className="rounded-full bg-surface-container-highest px-3 py-1 text-label-sm text-text-muted">
                    ID: {craftsman.id.slice(0, 5).toUpperCase()}
                  </span>
                </div>
                <p className="mb-4 text-headline-md text-primary">{craftsman.headline}</p>
                <div className="flex flex-wrap items-center justify-center gap-6 md:justify-start">
                  <div className="flex items-center gap-1 text-tertiary-container">
                    <MaterialIcon name="star" filled />
                    <span className="text-lg font-bold">{craftsman.rating.toFixed(1)}</span>
                    <span className="text-sm text-text-muted">({craftsman.reviewCount} recenzije)</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <MaterialIcon name="location_on" />
                    <span>{craftsman.neighborhood}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <MaterialIcon name="work_history" />
                    <span>{craftsman.yearsExperience}+ god. iskustva</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex w-full min-w-[240px] flex-col gap-3 md:w-auto">
              <Button href={`/poruke?majstor=${craftsman.id}`} size="lg">
                <MaterialIcon name="send" />
                Pošalji poruku
              </Button>
              <Button href={`/novi-zahtjev?majstor=${craftsman.id}`} variant="outline" size="lg">
                <MaterialIcon name="request_quote" />
                Zatraži ponudu
              </Button>
              <Button variant="subtle" size="lg">
                <MaterialIcon name="call" />
                Pozovi
              </Button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
          <div className="flex flex-col gap-gutter lg:col-span-2">
            <div className="rounded-3xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              <h2 className="mb-6 flex items-center gap-2 text-headline-md">
                <MaterialIcon name="description" className="text-primary" />
                Opis
              </h2>
              <div className="space-y-4 text-body-md text-text-muted">
                {craftsman.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {craftsman.gallery.length > 0 ? (
              <div className="rounded-3xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-headline-md">
                    <MaterialIcon name="gallery_thumbnail" className="text-primary" />
                    Galerija radova
                  </h2>
                  <button type="button" className="text-label-lg text-primary hover:underline">
                    Vidi sve ({craftsman.gallery.length})
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[200px]">
                  {craftsman.gallery.map((item, index) => (
                    <div
                      key={item.src}
                      className={cn(
                        "group relative overflow-hidden rounded-2xl",
                        galleryLayout[index] ?? "",
                      )}
                    >
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(min-width: 768px) 25vw, 50vw"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                        <p className="text-sm text-white">{item.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-3xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-headline-md">
                  <MaterialIcon name="reviews" className="text-primary" />
                  Recenzije
                </h2>
                <div className="rounded-xl bg-primary/5 px-4 py-2">
                  <span className="font-bold text-primary">{craftsman.rating.toFixed(1)}/5</span>
                </div>
              </div>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border-light pb-6 last:border-0 last:pb-0">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container font-bold text-primary">
                            {review.authorInitials}
                          </div>
                          <div>
                            <h4 className="text-label-lg text-text-main">{review.authorName}</h4>
                            <p className="text-label-sm text-text-muted">{review.createdAgo}</p>
                          </div>
                        </div>
                        <div className="flex text-tertiary-container" aria-hidden="true">
                          {Array.from({ length: review.rating }, (_, i) => (
                            <MaterialIcon key={i} name="star" filled className="text-[18px]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-body-md text-text-muted">&ldquo;{review.comment}&rdquo;</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-body-md text-text-muted">Ovaj majstor još uvijek nema recenzija.</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-gutter">
            <div className="rounded-3xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              <h2 className="mb-6 text-headline-md">Iskustvo</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <MaterialIcon name="verified" className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-label-lg text-text-main">Certificirani majstor</h4>
                    <p className="text-sm text-text-muted">{craftsman.headline}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <MaterialIcon name="history_edu" className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-label-lg text-text-main">{craftsman.yearsExperience} godina iskustva</h4>
                    <p className="text-sm text-text-muted">{craftsman.reviewCount}+ završenih projekata</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="mb-4 text-label-lg text-text-main">Vještine</h4>
                <div className="flex flex-wrap gap-2">
                  {craftsman.skills.map((skill) => (
                    <span key={skill} className="rounded-lg bg-surface-container px-3 py-1 text-sm text-text-main">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              <h2 className="mb-6 text-headline-md">Radno vrijeme</h2>
              <div className="space-y-3">
                {craftsman.workingHours.map((entry) => (
                  <div
                    key={entry.days}
                    className={cn(
                      "flex justify-between text-body-md",
                      entry.closed && "font-semibold text-error",
                    )}
                  >
                    <span className={entry.closed ? undefined : "text-text-muted"}>{entry.days}</span>
                    <span className={entry.closed ? undefined : "font-semibold text-text-main"}>
                      {entry.closed ? "Zatvoreno" : entry.hours}
                    </span>
                  </div>
                ))}
              </div>
              {craftsman.availability === "available" ? (
                <div className="mt-4 flex items-center gap-2 border-t border-border-light pt-4 font-semibold text-secondary">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary" />
                  </span>
                  Trenutno dostupan
                </div>
              ) : null}
            </div>

            <div className="overflow-hidden rounded-3xl bg-surface-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              <h2 className="mb-6 text-headline-md">Lokacija</h2>
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-2xl bg-surface-container-low">
                <Image
                  src="/images/misc/map-sarajevo.jpg"
                  alt={`Mapa lokacije: ${craftsman.neighborhood}`}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <MaterialIcon name="location_on" filled className="text-4xl text-primary" />
                </div>
              </div>
              <p className="flex items-center gap-2 text-body-md text-text-muted">
                <MaterialIcon name="map" className="text-primary" />
                {craftsman.neighborhood} i šira okolica
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
