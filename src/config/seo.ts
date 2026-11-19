import { SITE_URL } from "./business";
import { PATHS } from "./paths";

export const OG_IMAGE = {
  url: `${SITE_URL}/images/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: "4D Detailing – auto detailing u Velikoj Gorici",
};

export type PageMeta = {
  title: string;
  description: string;
  path: string;
};

export const PAGE_META = {
  home: {
    title:
      "4D Detailing Velika Gorica – Profesionalno čišćenje i poliranje vozila",
    description:
      "4D Detailing – profesionalno dubinsko čišćenje interijera i eksterijera, strojno poliranje i zaštita laka vozila u Velikoj Gorici. Rezervirajte termin online.",
    path: PATHS.home,
  },
  services: {
    title:
      "Usluge Detailinga – Pranje, Poliranje i Zaštita Vozila | 4D Detailing",
    description:
      "Pregled usluga i cijena: dubinsko čišćenje interijera i eksterijera, strojno poliranje i zaštita laka vozila u Velikoj Gorici.",
    path: PATHS.services,
  },
  contact: {
    title: "Kontakt | 4D Detailing Velika Gorica",
    description:
      "Rezervirajte termin ili nam pošaljite upit. 4D Detailing, Rakitovec 274, Velika Gorica.",
    path: PATHS.contact,
  },
  priceArchive: {
    title: "Arhiva cjenika | 4D Detailing",
    description:
      "Pregledajte i preuzmite aktualni i starije cjenike usluga 4D Detailinga.",
    path: PATHS.priceArchive,
  },
  privacy: {
    title: "Pravila privatnosti | 4D Detailing",
    description:
      "Kako 4D Detailing prikuplja, koristi i štiti vaše osobne podatke.",
    path: PATHS.privacy,
  },
  terms: {
    title: "Uvjeti korištenja | 4D Detailing",
    description:
      "Uvjeti korištenja web stranice i slanja zahtjeva za termin 4D Detailinga.",
    path: PATHS.terms,
  },
} satisfies Record<string, PageMeta>;
