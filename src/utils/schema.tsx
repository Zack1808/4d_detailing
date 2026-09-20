import { type ServiceDataType } from "../types/data";

export interface BusinessInfo {
  telephone: string;
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
  image?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export const generateAutoWashSchema = (business: BusinessInfo) => {
  return {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    name: "4D Detailing",
    url: "https://4d-detailing.hr/",
    image: business.image ?? "https://4d-detailing.hr/putanja-do-logotipa.jpg",
    telephone: business.telephone,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.addressLocality,
      postalCode: business.postalCode,
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
  };
};

export const generateServicesSchema = (services: ServiceDataType[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Usluge detailinga",
    itemListElement: services.map((u) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: u.title,
        ...(u.description && { description: u.description }),
      },
      ...(u.priceFrom && {
        price: u.priceFrom,
        priceCurrency: "EUR",
      }),
    })),
  };
};

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};
