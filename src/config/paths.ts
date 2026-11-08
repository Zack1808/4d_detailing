export const PATHS = {
  home: "/",
  services: "/usluge",
  contact: "/kontakt",
  priceArchive: "/arhiva-cijenika",
  privacy: "/pravila-privatnosti",
  terms: "/uvjeti-koristenja",
  admin: "/admin",
} as const;

export const NAV_LINKS = [
  { to: PATHS.home, label: "Početna" },
  { to: PATHS.services, label: "Usluge" },
  { to: PATHS.contact, label: "Kontakt" },
] as const;

export const FOOTER_LINKS = [
  { to: PATHS.home, label: "Početna" },
  { to: PATHS.services, label: "Usluge" },
  { to: PATHS.contact, label: "Kontakt" },
  { to: PATHS.terms, label: "Uvjeti korištenja" },
  { to: PATHS.privacy, label: "Pravila privatnosti" },
] as const;

export const contactPath = (serviceSlug?: string) =>
  serviceSlug
    ? `${PATHS.contact}?usluga=${encodeURIComponent(serviceSlug)}`
    : PATHS.contact;
