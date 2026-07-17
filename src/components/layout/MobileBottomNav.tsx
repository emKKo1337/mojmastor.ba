"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

interface MobileNavItem {
  href: string;
  label: string;
  icon: string;
}

export function MobileBottomNav({ items }: { items: MobileNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t border-border-light bg-surface-white md:hidden">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn("flex flex-col items-center gap-1", isActive ? "text-primary" : "text-text-muted")}
          >
            <MaterialIcon name={item.icon} filled={isActive} />
            <span className={cn("text-[10px]", isActive && "font-bold")}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
