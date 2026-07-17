"use client";

import { useEffect } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/** Generic mobile slide-over drawer, used for filter panels. */
export function FilterDrawer({ open, onClose, title = "Filteri", children, footer }: FilterDrawerProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <div className={cn("fixed inset-0 z-50 lg:hidden", !open && "pointer-events-none")} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-surface-white shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border-light p-6">
          <h2 className="text-headline-md text-text-main">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zatvori filtere"
            className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-container-low"
          >
            <MaterialIcon name="close" />
          </button>
        </div>
        <div className="custom-scrollbar flex-1 overflow-y-auto p-6">{children}</div>
        {footer ? <div className="border-t border-border-light p-6">{footer}</div> : null}
      </div>
    </div>
  );
}
