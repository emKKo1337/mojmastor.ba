export interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  timeAgo: string;
  read: boolean;
}

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    icon: "local_offer",
    title: "Nova ponuda za vaš zahtjev",
    description: 'Mirza H. (Vodoinstalater) vam je poslao ponudu za "Popravka česme u kuhinji".',
    timeAgo: "Prije 2 sata",
    read: false,
  },
  {
    id: "n2",
    icon: "check_circle",
    title: "Zahtjev označen kao završen",
    description: 'Zahtjev "Instalacija lustera" je označen kao završen. Ocijenite uslugu majstora.',
    timeAgo: "Jučer, 15:30",
    read: false,
  },
  {
    id: "n3",
    icon: "chat",
    title: "Nova poruka",
    description: "Haris Mujkić vam je odgovorio na poruku o terminu dolaska.",
    timeAgo: "Jučer, 09:12",
    read: true,
  },
  {
    id: "n4",
    icon: "verified_user",
    title: "Nalog uspješno verifikovan",
    description: "Vaša email adresa je uspješno potvrđena. Dobrodošli na MojMajstor.ba!",
    timeAgo: "Prije 5 dana",
    read: true,
  },
  {
    id: "n5",
    icon: "person_add",
    title: "Novi majstori u vašoj blizini",
    description: "3 nova verifikovana majstora za kategoriju Električar dostupna su u Sarajevu.",
    timeAgo: "Prije 1 sedmicu",
    read: true,
  },
];
