import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "r1",
    craftsmanId: "haris-mujkic",
    authorName: "Edin Karić",
    authorInitials: "EK",
    rating: 5,
    comment:
      "Haris je došao tačno na vrijeme i riješio problem sa ventilom za manje od 30 minuta. Vrlo profesionalan i ljubazan. Topla preporuka!",
    createdAgo: "prije 2 sedmice",
  },
  {
    id: "r2",
    craftsmanId: "haris-mujkic",
    authorName: "Amra Musić",
    authorInitials: "AM",
    rating: 5,
    comment:
      "Radio nam je kompletno kupatilo. Prezadovoljni smo pedantnošću i završnim radovima. Svaka čast na strpljenju oko naših zahtjeva.",
    createdAgo: "prije 1 mjesec",
  },
  {
    id: "r3",
    craftsmanId: "haris-mujkic",
    authorName: "Mirsad K.",
    authorInitials: "MK",
    rating: 5,
    comment: "Brz, pedantan i veoma ljubazan. Preporuka svima!",
    createdAgo: "Jučer",
  },
  {
    id: "r4",
    craftsmanId: "haris-mujkic",
    authorName: "Elena B.",
    authorInitials: "EB",
    rating: 5,
    comment: "Majstor Haris je riješio problem koji drugi nisu mogli.",
    createdAgo: "Prije 3 dana",
  },
];

export function getReviewsForCraftsman(craftsmanId: string): Review[] {
  return reviews.filter((review) => review.craftsmanId === craftsmanId);
}
