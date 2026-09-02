import { type ServiceDataType, type ReviewType } from "../../types/data";

export const mockServices: ServiceDataType[] = [
  {
    title: "Vanjsko pranje, uključujući naplatke.",
    price: "20",
    services: [
      "Detaljno pranje eksterijera",
      "Detaljno pranje naplataka",
      "Usisavanje interijera",
      "Brisanje prašine interijera",
    ],
    category: "exterior",
    extraSuv: "10",
    extraTransporter: "30",
    info: "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila. Trajanje do 2.5 sata",
    hasDiscount: false,
    isFeatured: true,
  },
  {
    title: "Vanjsko pranje, uključujući naplatke.",
    price: "20",
    services: [
      "Detaljno pranje eksterijera",
      "Detaljno pranje naplataka",
      "Usisavanje interijera",
      "Brisanje prašine interijera",
    ],
    category: "package",
    extraSuv: "10",
    extraTransporter: "30",
    info: "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila. Trajanje do 2.5 sata",
    hasDiscount: false,
    isFeatured: true,
  },
  {
    title: "Vanjsko pranje, uključujući naplatke.",
    price: "20",
    services: [
      "Detaljno pranje eksterijera",
      "Detaljno pranje naplataka",
      "Usisavanje interijera",
      "Brisanje prašine interijera",
    ],
    category: "interior",
    extraSuv: "10",
    extraTransporter: "30",
    info: "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila. Trajanje do 2.5 sata",
    hasDiscount: true,
    isFeatured: true,
  },
];
export const mockReviews: ReviewType[] = [];

export const MOCK_CONFIG = {
  enableMockData: true,
  apiDelay: 500,
};
