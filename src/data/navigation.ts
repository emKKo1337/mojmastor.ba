export const mainNavLinks = [
  { href: "/", label: "Početna" },
  { href: "/kategorije", label: "Kategorije" },
  { href: "/registracija?tip=majstor", label: "Postani majstor" },
];

export const customerSidebarLinks = [
  { href: "/nadzorna-ploca", label: "Nadzorna ploča", icon: "dashboard" },
  { href: "/nadzorna-ploca/zahtjevi", label: "Moji zahtjevi", icon: "pending_actions" },
  { href: "/poruke", label: "Moje poruke", icon: "chat", badge: 3 },
  { href: "/nadzorna-ploca/sacuvani", label: "Sačuvani majstori", icon: "bookmark" },
  { href: "/nadzorna-ploca/obavjestenja", label: "Obavještenja", icon: "notifications" },
  { href: "/nadzorna-ploca/postavke", label: "Postavke", icon: "settings" },
];

export const craftsmanSidebarLinks = [
  { href: "/panel-majstora", label: "Nadzorna ploča", icon: "dashboard" },
  { href: "/panel-majstora/novi-poslovi", label: "Novi poslovi", icon: "notifications" },
  { href: "/panel-majstora/aktivni-poslovi", label: "Aktivni poslovi", icon: "construction" },
  { href: "/panel-majstora/zavrseni-poslovi", label: "Završeni poslovi", icon: "check_circle" },
  { href: "/panel-majstora/recenzije", label: "Moje recenzije", icon: "star" },
  { href: "/panel-majstora/statistika", label: "Statistika", icon: "analytics" },
  { href: "/panel-majstora/zarada", label: "Zarada", icon: "payments" },
  { href: "/panel-majstora/profil", label: "Profil", icon: "person" },
];

export const customerMobileNav = [
  { href: "/nadzorna-ploca", label: "Dashboard", icon: "dashboard" },
  { href: "/nadzorna-ploca/zahtjevi", label: "Zahtjevi", icon: "pending_actions" },
  { href: "/poruke", label: "Poruke", icon: "chat" },
  { href: "/nadzorna-ploca/postavke", label: "Profil", icon: "person" },
];

export const craftsmanMobileNav = [
  { href: "/panel-majstora", label: "Nadzorna", icon: "dashboard" },
  { href: "/panel-majstora/novi-poslovi", label: "Poslovi", icon: "notifications" },
  { href: "/panel-majstora/statistika", label: "Statistika", icon: "analytics" },
  { href: "/panel-majstora/profil", label: "Profil", icon: "person" },
];

export const footerLinkGroups = [
  {
    title: "Kompanija",
    links: [
      { href: "/o-nama", label: "O nama" },
      { href: "/kontakt", label: "Kontakt" },
      { href: "/karijera", label: "Karijera" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Pomoć i podrška",
    links: [
      { href: "/pomoc", label: "Pomoć" },
      { href: "/uslovi-koristenja", label: "Uslovi korištenja" },
      { href: "/politika-privatnosti", label: "Politika privatnosti" },
      { href: "/faq", label: "Često postavljana pitanja" },
    ],
  },
];
