import { BUSINESS, SITE_URL, SOCIAL_LINKS } from "../config/business";
import { getCurrentPrice } from "./pricing";

import type { ServiceDataType } from "../types/data";

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const CONTEXT = "https://schema.org";

export const generateBusinessSchema = () => ({
  "@context": CONTEXT,
  "@type": "AutoWash",
  "@id": BUSINESS_ID,
  name: BUSINESS.name,
  slogan: BUSINESS.tagline,
  description:
    "Profesionalno dubinsko čišćenje interijera i eksterijera, strojno poliranje i zaštita laka vozila u Velikoj Gorici.",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icons/icon-512.png`,
  image: [`${SITE_URL}/images/og-image.jpg`, `${SITE_URL}/images/founder.avif`],
  telephone: BUSINESS.phone.schema,
  email: BUSINESS.email,
  priceRange: "€€",
  currenciesAccepted: "EUR",
  founder: { "@type": "Person", name: BUSINESS.owner },
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: "HR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  hasMap: BUSINESS.mapsUrl,
  areaServed: BUSINESS.areaServed.map((name) => ({ "@type": "Place", name })),
  sameAs: SOCIAL_LINKS.filter(({ id }) => id !== "whatsapp").map(
    ({ href }) => href.split("?")[0],
  ),
  ...(BUSINESS.openingHours && {
    openingHoursSpecification: BUSINESS.openingHours.map(
      ({ days, opens, closes }) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days,
        opens,
        closes,
      }),
    ),
  }),
});

export const generateWebsiteSchema = () => ({
  "@context": CONTEXT,
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: BUSINESS.name,
  url: `${SITE_URL}/`,
  inLanguage: "hr-HR",
  publisher: { "@id": BUSINESS_ID },
});

export const generateBreadcrumbSchema = (name: string, path: string) => ({
  "@context": CONTEXT,
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Početna",
      item: `${SITE_URL}/`,
    },
    { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
  ],
});

export const generateServicesSchema = (services: ServiceDataType[]) => ({
  "@context": CONTEXT,
  "@type": "OfferCatalog",
  "@id": `${SITE_URL}/usluge#catalog`,
  name: "Usluge detailinga",
  url: `${SITE_URL}/usluge`,
  offeredBy: { "@id": BUSINESS_ID },
  itemListElement: services.map((service) => {
    const price = getCurrentPrice(service);

    return {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        serviceType: "Auto detailing",
        provider: { "@id": BUSINESS_ID },
        areaServed: BUSINESS.address.city,
        ...(service.description && { description: service.description }),
      },
      ...(price > 0 && {
        price,
        priceCurrency: "EUR",
        url: `${SITE_URL}/kontakt?usluga=${encodeURIComponent(service.slug)}`,
      }),
    };
  }),
});
