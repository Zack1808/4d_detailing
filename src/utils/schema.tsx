import { BUSINESS, SITE_URL } from "../config/business";

import type { ServiceDataType } from "../types/data";

export const generateAutoWashSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AutoWash",
  name: BUSINESS.name,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/logo_light.svg`,
  telephone: BUSINESS.phone.schema,
  email: BUSINESS.email,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: "HR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
});

export const generateServicesSchema = (services: ServiceDataType[]) => ({
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Usluge detailinga",
  itemListElement: services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      ...(service.description && { description: service.description }),
    },
    ...(service.prices.car.price && {
      price: service.prices.car.price,
      priceCurrency: "EUR",
    }),
  })),
});
