"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

interface SidebarLink {
  href: string;
  label: string;
  icon: string;
  badge?: number;
}

interface DashboardSidebarProps {
  links: SidebarLink[];
  user: { name: string; roleLabel: string; avatarUrl: string };
  width?: "w-64" | "w-72";
}

export function DashboardSidebar({ links, user, width = "w-64" }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-border-light bg-surface-white px-0 py-8 md:flex",
        width,
      )}
    >
      <div className="mb-10 flex items-center gap-3 px-6">
        <Logo wordmarkClassName="text-headline-md" />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-6 py-3 text-label-lg transition-colors",
                isActive
                  ? "border-r-4 border-primary bg-primary/5 font-bold text-primary"
                  : "text-text-muted hover:bg-surface-container-low",
              )}
            >
              <MaterialIcon name={link.icon} filled={isActive} />
              <span>{link.label}</span>
              {link.badge ? (
                <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-white">
                  {link.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-border-light px-6 pt-4">
        <div className="flex items-center space-x-3 py-4">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-primary-fixed">
            <Image src={user.avatarUrl} alt={user.name} width={40} height={40} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-label-lg text-text-main">{user.name}</p>
            <p className="truncate text-xs text-text-muted">{user.roleLabel}</p>
          </div>
          <Link href="/prijava" className="text-text-muted transition-colors hover:text-error" aria-label="Odjava">
            <MaterialIcon name="logout" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
