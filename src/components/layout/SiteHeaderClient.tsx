"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { mainNavLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/lib/auth/actions";
import type { Profile } from "@/types/auth";

interface SiteHeaderClientProps {
  profile: Profile | null;
}

export function SiteHeaderClient({ profile }: SiteHeaderClientProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileMenuOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setProfileMenuOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [profileMenuOpen]);

  const dashboardHref = profile?.role === "majstor" ? "/panel-majstora" : "/nadzorna-ploca";
  const initials = profile ? `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase() : "";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent bg-surface-white shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
      <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8">
          {mainNavLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.split("?")[0]);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-body-md pb-1 transition-colors duration-200",
                  isActive
                    ? "border-b-2 border-primary font-bold text-primary"
                    : "text-text-muted hover:text-primary",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-surface-container-low" />

          {profile ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setProfileMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={profileMenuOpen}
                aria-label="Korisnički meni"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-label-lg text-primary transition-colors hover:bg-primary/20"
              >
                {initials || <MaterialIcon name="person" />}
              </button>

              {profileMenuOpen ? (
                <div
                  role="menu"
                  aria-label="Korisnički meni"
                  className="absolute right-0 top-14 w-64 rounded-xl border border-border-light bg-surface-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                >
                  <div className="border-b border-border-light px-3 py-3">
                    <p className="truncate text-label-lg text-text-main">
                      {profile.firstName} {profile.lastName}
                    </p>
                    <p className="truncate text-label-sm text-text-muted">{profile.email}</p>
                  </div>
                  <div className="py-2">
                    <Link
                      href={dashboardHref}
                      role="menuitem"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-body-md text-text-main hover:bg-surface-container-low"
                    >
                      <MaterialIcon name="dashboard" />
                      Nadzorna ploča
                    </Link>
                    <Link
                      href="/poruke"
                      role="menuitem"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-body-md text-text-main hover:bg-surface-container-low"
                    >
                      <MaterialIcon name="chat" />
                      Moje poruke
                    </Link>
                  </div>
                  <form action={signOutAction} className="border-t border-border-light pt-2">
                    <button
                      type="submit"
                      role="menuitem"
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-body-md text-error transition-colors hover:bg-error-container/50"
                    >
                      <MaterialIcon name="logout" />
                      Odjavi se
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <Button href="/prijava" variant="ghost" size="sm" className="hidden md:inline-flex">
                Prijava
              </Button>
              <Button href="/registracija" variant="primary" size="sm">
                Registracija
              </Button>
            </>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-text-main hover:bg-surface-container-low lg:hidden"
          >
            <MaterialIcon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="border-t border-border-light bg-surface-white px-margin-mobile py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-body-md text-text-main hover:bg-surface-container-low"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {profile ? (
              <>
                <li>
                  <Link
                    href={dashboardHref}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-3 text-body-md text-text-main hover:bg-surface-container-low"
                  >
                    Nadzorna ploča
                  </Link>
                </li>
                <li>
                  <Link
                    href="/poruke"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-3 text-body-md text-text-main hover:bg-surface-container-low"
                  >
                    Moje poruke
                  </Link>
                </li>
                <li>
                  <form action={signOutAction}>
                    <button
                      type="submit"
                      className="block w-full rounded-lg px-3 py-3 text-left text-body-md text-error hover:bg-error-container/50"
                    >
                      Odjavi se
                    </button>
                  </form>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/prijava"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-body-md text-text-main hover:bg-surface-container-low"
                >
                  Prijava
                </Link>
              </li>
            )}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
