import type { ActivityItem } from "@/types";

export const customerActivity: ActivityItem[] = [
  {
    id: "a1",
    actorName: "Mirza H. (Vodoinstalater)",
    actorAvatarUrl: "/images/avatars/majstor-vodoinstalater-1.jpg",
    description: 'Vam je poslao novu ponudu za zahtjev "Popravka česme u kuhinji".',
    timeAgo: "Prije 2 sata",
    tags: [
      { label: "Nova ponuda", tone: "primary" },
      { label: "Hitno", tone: "neutral" },
    ],
  },
  {
    id: "a2",
    actorName: 'Elektro-Servis "Sjaj"',
    actorAvatarUrl: "/images/avatars/majstor-elektricar-1.jpg",
    description: 'Zahtjev za "Instalaciju lustera" je označen kao završen. Molimo ocijenite uslugu.',
    timeAgo: "Jučer, 15:30",
    tags: [
      { label: "Završeno", tone: "success" },
      { label: "Potrebna ocjena", tone: "warning" },
    ],
  },
  {
    id: "a3",
    actorName: "Podrška MojMajstor.ba",
    description: "Vaša verifikacija profila je uspješno završena. Hvala na povjerenju!",
    timeAgo: "2. Oktobar",
    tags: [{ label: "Sistem", tone: "neutral" }],
  },
];

export const recommendedForCustomer = [
  {
    craftsmanId: "edin-stolarski",
    note: "Dostupan sada",
  },
  {
    craftsmanId: "lejla-cist-dom",
    note: "Slobodna od sutra",
  },
];
