import type { JobRequest } from "@/types";

export const incomingJobRequests: JobRequest[] = [
  {
    id: "jr1",
    title: "Popravka česme i odvoda",
    description: "Curi česma u kuhinji i sporo otiče voda iz sudopere.",
    categorySlug: "vodoinstalater",
    city: "Sarajevo",
    neighborhood: "Sarajevo, Centar",
    budgetFrom: 35,
    status: "pending",
    createdAgo: "Prije 15 min",
    urgent: true,
  },
  {
    id: "jr2",
    title: "Kompletna zamjena cijevi u kupatilu",
    description: "Renovacija kupatila, potrebna kompletna zamjena vodovodnih cijevi.",
    categorySlug: "vodoinstalater",
    city: "Sarajevo",
    neighborhood: "Sarajevo, Novi Grad",
    budgetFrom: 450,
    preferredDate: "Sutra 09:00",
    status: "pending",
    createdAgo: "Prije 2 sata",
  },
];
