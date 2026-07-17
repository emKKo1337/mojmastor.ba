import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    authorName: "Haris M.",
    city: "Sarajevo",
    avatarUrl: "/images/avatars/testimonial-haris.jpg",
    quote:
      "Trebao mi je vodoinstalater hitno jer je pukla cijev u kupatilu. Preko MojMajstor.ba sam pronašao majstora za 15 minuta. Došao je isti dan i sve sredio po fer cijeni. Svaka preporuka!",
    badge: "Verifikovan korisnik",
  },
  {
    id: "t2",
    authorName: "Amra K.",
    city: "Tuzla",
    avatarUrl: "/images/avatars/testimonial-amra.jpg",
    quote:
      "Renovirala sam cijelu kuhinju i tražila sam keramičara. Putem platforme sam dobila 5 ponuda, pogledala slike radova i izabrala najbolje. Majstor je bio izuzetno profesionalan i pedantan.",
    badge: "Verifikovan korisnik",
  },
  {
    id: "t3",
    authorName: "Mirza P.",
    city: "Mostar",
    avatarUrl: "/images/avatars/testimonial-mirza.jpg",
    quote:
      "Kao majstor, aplikacija mi je omogućila stalni protok poslova. Ne moram više trošiti na oglase, klijenti me sami pronalaze na osnovu mojih ocjena i kvaliteta rada.",
    badge: "Registrovan majstor",
  },
];
