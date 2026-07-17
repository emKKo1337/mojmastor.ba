"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { mainNavLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Button href="/prijava" variant="ghost" size="sm" className="hidden md:inline-flex">
            Prijava
          </Button>
          <Button href="/registracija" variant="primary" size="sm">
            Registracija
          </Button>
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
            <li>
              <Link
                href="/prijava"
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-body-md text-text-main hover:bg-surface-container-low"
              >
                Prijava
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
