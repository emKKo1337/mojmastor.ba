export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    title: "Za korisnike",
    items: [
      {
        question: "Kako pronalazim majstora na MojMajstor.ba?",
        answer:
          "Unesite uslugu koja vam je potrebna i svoj grad na početnoj stranici ili pretražite kategorije. Dobit ćete listu provjerenih majstora sa ocjenama, recenzijama i cijenama, koje možete filtrirati po lokaciji i dostupnosti.",
      },
      {
        question: "Da li je registracija na platformi besplatna?",
        answer:
          "Da, kreiranje korisničkog naloga je potpuno besplatno. Pregledavanje profila majstora i slanje upita za posao ne naplaćuje se korisnicima.",
      },
      {
        question: "Kako kontaktiram majstora?",
        answer:
          "Na profilu majstora možete pozvati direktno preko dugmeta \"Pozovi\" ili poslati poruku kroz platformu preko dugmeta \"Pošalji poruku\". Odgovor obično stiže u roku od nekoliko sati.",
      },
      {
        question: "Šta ako nisam zadovoljan izvedenom uslugom?",
        answer:
          "Preporučujemo da prvo problem riješite direktno s majstorom. Ako se ne dogovorite, kontaktirajte našu podršku preko stranice Kontakt i pomoći ćemo u posredovanju.",
      },
      {
        question: "Kako ostavljam recenziju majstoru?",
        answer:
          "Nakon završenog posla, recenziju možete ostaviti sa svog naloga na profilu majstora kojeg ste angažovali. Recenzije pomažu drugim korisnicima da naprave bolji izbor.",
      },
    ],
  },
  {
    title: "Za majstore",
    items: [
      {
        question: "Kako kreiram profil majstora?",
        answer:
          "Prilikom registracije odaberite tip naloga \"Majstor\". Nakon potvrde email adrese, iz nadzorne ploče uredite svoj profil — kontakt informacije, opis, usluge koje nudite, gradove u kojima radite i galeriju fotografija dosadašnjih radova.",
      },
      {
        question: "Da li MojMajstor.ba naplaćuje proviziju na poslove?",
        answer:
          "Ne, kreiranje profila i primanje upita za posao je besplatno. O eventualnim planovima za dodatne, plaćene funkcionalnosti (npr. isticanje profila) obavijestit ćemo majstore unaprijed.",
      },
      {
        question: "Kako povećavam broj upita koje primam?",
        answer:
          "Potpuno popunjen profil sa jasnim opisom usluga, dodanim fotografijama radova i brzim odgovaranjem na poruke značajno povećava povjerenje korisnika i broj upita.",
      },
      {
        question: "Mogu li raditi u više gradova?",
        answer:
          "Da. U postavkama profila, pod \"Gradovi u kojima radim\", možete odabrati sve gradove u kojima ste dostupni za posao.",
      },
      {
        question: "Kako postajem verifikovan majstor?",
        answer:
          "Verifikacija se dodjeljuje profilima koji potvrde identitet i kvalifikacije kroz našu podršku. Kontaktirajte nas preko stranice Kontakt za više informacija o procesu verifikacije.",
      },
    ],
  },
  {
    title: "Nalog i sigurnost",
    items: [
      {
        question: "Zaboravio/la sam lozinku, šta da radim?",
        answer:
          "Na stranici za prijavu kliknite \"Zaboravili ste lozinku?\" i unesite svoju email adresu. Poslat ćemo vam link za postavljanje nove lozinke.",
      },
      {
        question: "Kako mijenjam svoje podatke ili lozinku?",
        answer:
          "Prijavite se i otvorite Postavke naloga iz nadzorne ploče — tamo možete ažurirati kontakt informacije i promijeniti lozinku.",
      },
      {
        question: "Da li su moji podaci sigurni?",
        answer:
          "Da. Svi podaci se čuvaju uz standardne sigurnosne mjere, a pristup vašim podacima je ograničen isključivo na vas. Detalje pogledajte na stranici Politika privatnosti.",
      },
    ],
  },
];
