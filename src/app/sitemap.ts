import type { MetadataRoute } from "next";
import { craftsmen } from "@/data/craftsmen";
import { categories } from "@/data/categories";

const staticRoutes = [
  "",
  "/kategorije",
  "/pretraga",
  "/novi-zahtjev",
  "/prijava",
  "/registracija",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mojmajstor.ba";
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: now,
    })),
    ...categories.map((category) => ({
      url: `${base}/pretraga?kategorija=${category.slug}`,
      lastModified: now,
    })),
    ...craftsmen.map((craftsman) => ({
      url: `${base}/majstor/${craftsman.id}`,
      lastModified: now,
    })),
  ];
}
