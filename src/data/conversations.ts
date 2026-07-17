import type { Conversation } from "@/types";

export const conversations: Conversation[] = [
  {
    id: "c1",
    participant: {
      id: "mirza-elektricar",
      name: "Mirza Električar",
      avatarUrl: "/images/avatars/majstor-mirza-header.jpg",
      online: true,
    },
    lastMessage: "Može, vidimo se sutra u 9h.",
    lastMessageAt: "14:20",
    unread: false,
    messages: [
      {
        id: "m1",
        conversationId: "c1",
        senderId: "mirza-elektricar",
        body: "Zdravo Harise, pregledao sam slike razvodne kutije što ste poslali. Izgleda da treba zamijeniti glavni osigurač.",
        sentAt: "14:15",
      },
      {
        id: "m2",
        conversationId: "c1",
        senderId: "me",
        body: "Razumijem. Da li možete doći sutra ujutro da to sredimo? Hitno mi je jer planiram put u četvrtak.",
        sentAt: "14:18",
      },
      {
        id: "m3",
        conversationId: "c1",
        senderId: "mirza-elektricar",
        body: "Može, vidimo se sutra u 9h. Cijena će biti oko 50 KM s materijalom.",
        sentAt: "14:20",
      },
    ],
  },
  {
    id: "c2",
    participant: {
      id: "emina-moler",
      name: "Emina Moler",
      avatarUrl: "/images/avatars/majstorica-emina.jpg",
      online: false,
    },
    lastMessage: "Poslala sam vam ponudu na email.",
    lastMessageAt: "Jučer",
    unread: false,
    messages: [
      {
        id: "m4",
        conversationId: "c2",
        senderId: "emina-moler",
        body: "Poslala sam vam ponudu na email.",
        sentAt: "Jučer",
      },
    ],
  },
  {
    id: "c3",
    participant: {
      id: "samir-vodoinstalater",
      name: "Samir Vodoinstalater",
      avatarUrl: "/images/avatars/majstor-samir.jpg",
      online: false,
    },
    lastMessage: "Hvala na povjerenju!",
    lastMessageAt: "Utorak",
    unread: false,
    messages: [
      {
        id: "m5",
        conversationId: "c3",
        senderId: "samir-vodoinstalater",
        body: "Hvala na povjerenju!",
        sentAt: "Utorak",
      },
    ],
  },
  {
    id: "c4",
    participant: {
      id: "amar-keramicar",
      name: "Amar Keramičar",
      avatarUrl: "/images/avatars/majstor-amar.jpg",
      online: false,
    },
    lastMessage: "Kada možemo početi s radovima?",
    lastMessageAt: "22. Okt",
    unread: false,
    messages: [
      {
        id: "m6",
        conversationId: "c4",
        senderId: "amar-keramicar",
        body: "Kada možemo početi s radovima?",
        sentAt: "22. Okt",
      },
    ],
  },
];
