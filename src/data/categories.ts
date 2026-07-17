import type { Category } from "@/types";

export const categories: Category[] = [
  { slug: "vodoinstalater", name: "Vodoinstalater", icon: "water_drop", craftsmanCount: 124 },
  { slug: "elektricar", name: "Električar", icon: "bolt", craftsmanCount: 98 },
  { slug: "keramicar", name: "Keramičar", icon: "grid_view", craftsmanCount: 76 },
  { slug: "moler", name: "Moler", icon: "format_paint", craftsmanCount: 112 },
  { slug: "stolar", name: "Stolar", icon: "handyman", craftsmanCount: 54 },
  { slug: "krovopokrivac", name: "Krovopokrivač", icon: "roofing", craftsmanCount: 32 },
  { slug: "gipsar", name: "Gipsani radovi", icon: "wallpaper", craftsmanCount: 47 },
  { slug: "grijanje-klima", name: "Grijanje i klima", icon: "ac_unit", craftsmanCount: 61 },
  { slug: "fasader", name: "Fasader", icon: "home_work", craftsmanCount: 38 },
  { slug: "bravar", name: "Bravar", icon: "key", craftsmanCount: 29 },
  { slug: "selidbe", name: "Selidbe", icon: "local_shipping", craftsmanCount: 44 },
  { slug: "ciscenje", name: "Čišćenje", icon: "cleaning_services", craftsmanCount: 67 },
  { slug: "vrtlar", name: "Vrtlar", icon: "yard", craftsmanCount: 21 },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
