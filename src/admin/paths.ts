import { PATHS } from "../config/paths";

export const ADMIN_SEGMENTS = {
  login: "prijava",
  appointments: "termini",
  services: "usluge",
  reviews: "recenzije",
  blockedDates: "blokirani-datumi",
  priceTables: "cijenici",
} as const;

const join = (segment?: string) =>
  segment ? `${PATHS.admin}/${segment}` : PATHS.admin;

export const ADMIN_PATHS = {
  root: join(),
  login: join(ADMIN_SEGMENTS.login),
  appointments: join(ADMIN_SEGMENTS.appointments),
  services: join(ADMIN_SEGMENTS.services),
  reviews: join(ADMIN_SEGMENTS.reviews),
  blockedDates: join(ADMIN_SEGMENTS.blockedDates),
  priceTables: join(ADMIN_SEGMENTS.priceTables),
} as const;

export const ADMIN_NAV = [
  { to: ADMIN_PATHS.root, label: "Pregled", end: true },
  { to: ADMIN_PATHS.appointments, label: "Termini" },
  { to: ADMIN_PATHS.services, label: "Usluge" },
  { to: ADMIN_PATHS.reviews, label: "Recenzije" },
  { to: ADMIN_PATHS.blockedDates, label: "Blokirani datumi" },
  { to: ADMIN_PATHS.priceTables, label: "Cjenici" },
] as const;
