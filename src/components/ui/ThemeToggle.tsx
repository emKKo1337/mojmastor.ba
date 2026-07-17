"use client";

import { useSyncExternalStore } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("mm-theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Uključi svijetli način rada" : "Uključi tamni način rada"}
      className={className ?? "flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-low text-text-main transition-colors hover:bg-surface-container-highest"}
    >
      <MaterialIcon name={isDark ? "light_mode" : "dark_mode"} />
    </button>
  );
}
