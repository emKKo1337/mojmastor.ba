import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { customerMobileNav, customerSidebarLinks } from "@/data/navigation";
import { customerActivity, recommendedForCustomer } from "@/data/activity";
import { getCraftsmanById } from "@/data/craftsmen";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nadzorna ploča",
  robots: { index: false, follow: false },
};

const toneClasses = {
  primary: "bg-primary/10 text-primary",
  success: "bg-secondary-container/20 text-on-secondary-container",
  warning: "bg-tertiary-container/10 text-tertiary",
  neutral: "bg-surface-container-highest text-text-muted",
} as const;

export default async function NadzornaPlocaPage() {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/nadzorna-ploca");
  const { profile } = authenticatedUser;

  const recommended = recommendedForCustomer
    .map((entry) => ({ craftsman: getCraftsmanById(entry.craftsmanId), note: entry.note }))
    .filter((entry): entry is { craftsman: NonNullable<typeof entry.craftsman>; note: string } => Boolean(entry.craftsman));

  return (
    <>
      <DashboardSidebar
        links={customerSidebarLinks}
        user={{
          name: `${profile.firstName} ${profile.lastName}`.trim(),
          roleLabel: "Korisnik",
          avatarUrl: profile.avatarUrl || "/images/avatars/haris-korisnik.jpg",
        }}
      />

      <main className="min-h-screen pb-24 md:ml-64 md:pb-0">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-surface-white/80 px-6 backdrop-blur-md md:px-margin-desktop">
          <div>
            <h1 className="text-headline-md text-text-main">Zdravo, {profile.firstName}! 👋</h1>
            <p className="text-sm text-text-muted">Dobrodošli nazad na vašu MojMajstor.ba platformu.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:flex">
              <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 scale-75 text-text-muted" />
              <input
                type="text"
                placeholder="Traži majstora..."
                className="w-64 rounded-xl border-none bg-surface-container-low py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-low text-text-main transition-colors hover:bg-surface-container-highest"
              aria-label="Obavještenja"
            >
              <MaterialIcon name="notifications" />
            </button>
          </div>
        </header>

        <div className="space-y-gutter p-6 md:p-margin-desktop">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col space-y-2 rounded-xl border border-white bg-surface-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container/10 text-primary">
                <MaterialIcon name="task_alt" />
              </div>
              <span className="text-label-lg text-text-muted">Aktivni zahtjevi</span>
              <span className="text-3xl font-bold text-text-main">3</span>
              <div className="w-fit rounded-full bg-secondary-container/20 px-2 py-0.5 text-[10px] text-on-secondary-container">
                +1 ove sedmice
              </div>
            </div>

            <div className="flex flex-col space-y-2 rounded-xl border border-white bg-surface-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary-container/10 text-tertiary">
                <MaterialIcon name="mail" />
              </div>
              <span className="text-label-lg text-text-muted">Nepročitane poruke</span>
              <span className="text-3xl font-bold text-text-main">5</span>
              <div className="w-fit rounded-full bg-tertiary-fixed/30 px-2 py-0.5 text-[10px] text-tertiary">
                Od 2 različita majstora
              </div>
            </div>

            <div className="flex flex-col space-y-2 rounded-xl border border-white bg-surface-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <MaterialIcon name="star" />
              </div>
              <span className="text-label-lg text-text-muted">Vaše recenzije</span>
              <span className="text-3xl font-bold text-text-main">12</span>
              <div className="w-fit rounded-full bg-secondary-fixed/30 px-2 py-0.5 text-[10px] text-secondary">
                Prosjek 4.9/5.0
              </div>
            </div>

            <Link
              href="/novi-zahtjev"
              className="group flex cursor-pointer flex-col justify-between rounded-xl border border-primary/20 bg-primary p-6 text-white shadow-lg transition-all duration-300 hover:shadow-primary/25"
            >
              <div>
                <span className="mb-1 block text-label-lg font-bold">Trebate pomoć?</span>
                <p className="text-xs text-white/80">Objavite novi zahtjev i pronađite majstora danas.</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold underline decoration-2 underline-offset-4">Novi zahtjev</span>
                <MaterialIcon name="arrow_forward" className="transition-transform group-hover:translate-x-2" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-headline-lg text-text-main">Nedavne aktivnosti</h2>
                <button type="button" className="text-label-lg text-primary hover:underline">
                  Vidi sve
                </button>
              </div>
              <div className="space-y-4">
                {customerActivity.map((item) => (
                  <div
                    key={item.id}
                    className="group flex cursor-pointer items-center gap-4 rounded-xl border border-border-light bg-surface-white p-5 transition-all hover:border-primary/30"
                  >
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-border-light bg-surface-container">
                      {item.actorAvatarUrl ? (
                        <Image
                          src={item.actorAvatarUrl}
                          alt={item.actorName}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-primary">
                          <MaterialIcon name="chat_bubble" className="!text-3xl" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-start justify-between">
                        <h4 className="truncate font-bold text-text-main">{item.actorName}</h4>
                        <span className="text-xs text-text-muted">{item.timeAgo}</span>
                      </div>
                      <p className="line-clamp-1 text-sm text-text-muted">{item.description}</p>
                      <div className="mt-2 flex gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag.label}
                            className={cn(
                              "inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold",
                              toneClasses[tag.tone],
                            )}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <MaterialIcon name="chevron_right" className="text-text-muted transition-colors group-hover:text-primary" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-xl border border-border-light bg-surface-white shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
                <div className="border-b border-border-light p-6">
                  <h3 className="text-headline-md font-bold text-text-main">Preporučeni majstori</h3>
                  <p className="mt-1 text-xs text-text-muted">Bazirano na vašoj lokaciji (Sarajevo)</p>
                </div>
                <div className="divide-y divide-border-light">
                  {recommended.map(({ craftsman, note }) => (
                    <Link
                      key={craftsman.id}
                      href={`/majstor/${craftsman.id}`}
                      className="group block p-4 transition-colors hover:bg-surface-container-low"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 overflow-hidden rounded-lg bg-surface-container">
                          <Image
                            src={craftsman.avatarUrl}
                            alt={craftsman.fullName}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="truncate text-sm font-bold text-text-main">{craftsman.fullName}</p>
                            <div className="flex items-center text-[10px] text-tertiary">
                              <MaterialIcon name="star" filled className="!text-[12px]" />
                              <span className="ml-0.5">{craftsman.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <p className="text-xs text-text-muted">{craftsman.headline}</p>
                          <div
                            className={cn(
                              "mt-1 flex items-center text-[10px] font-bold",
                              craftsman.availability === "available" ? "text-secondary" : "text-text-muted",
                            )}
                          >
                            {craftsman.availability === "available" ? (
                              <span className="mr-1 h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
                            ) : (
                              <MaterialIcon name="schedule" className="!text-[12px] mr-1" />
                            )}
                            {note}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="bg-surface-container-low p-4 text-center">
                  <Link href="/pretraga" className="text-xs font-bold text-primary hover:underline">
                    Istraži više majstora
                  </Link>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-surface-container p-6">
                <div className="relative z-10">
                  <h4 className="mb-2 font-bold text-text-main">Savjet za sigurnost</h4>
                  <p className="text-xs leading-relaxed text-text-muted">
                    Uvijek plaćajte preko platforme kako biste bili osigurani u slučaju nezadovoljstva uslugom.
                  </p>
                  <button type="button" className="mt-4 flex items-center text-xs font-bold text-primary">
                    Saznaj više <MaterialIcon name="open_in_new" className="!text-[14px] ml-1" />
                  </button>
                </div>
                <div className="absolute -bottom-4 -right-4 scale-[4] text-primary/5">
                  <MaterialIcon name="verified_user" className="!text-6xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <SiteFooter />
      </main>

      <MobileBottomNav items={customerMobileNav} />
      <Link
        href="/novi-zahtjev"
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform active:scale-95 md:hidden"
        aria-label="Novi zahtjev"
      >
        <MaterialIcon name="add" />
      </Link>
    </>
  );
}
