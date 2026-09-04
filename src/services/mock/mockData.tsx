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
    discount: "",
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
    discount: "",
    isFeatured: true,
  },
  {
    title: "Vanjsko pranje, uključujući naplatke.",
    price: "35 - 100",
    services: [
      "Detaljno pranje eksterijera",
      "Detaljno pranje naplataka",
      "Usisavanje interijera",
      "Brisanje prašine interijera",
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
    discount: "22",
    isFeatured: true,
  },
];
export const mockReviews: ReviewType[] = [
  {
    name: "Matej",
    surname: "Peteranec",
    starCount: 5,
    review:
      "Prezadovoljan uslugom! Nakon čišćenja auto izgleda 10 godina mlađe. Super brza i iznimno temeljita usluga, a uistinu jednostavan dogovor. Vanjski sjaj je nevjerojatan, dugo već nije tako blistao. Unutrašnjost savršeno čista, a miris kao da je auto nov! Što sigurno nije bilo jednostavno postići s obzirom da se u autu pušilo, a redoviti putnik je zlatni retriver. Cijena i više nego prihvatljiva za kvalitetu usluge. Ja sigurno dolazim opet!",
    approvedBy: null,
  },
  {
    name: "Matej",
    surname: "Peteranec",
    starCount: 5,
    review:
      "Prezadovoljan uslugom! Nakon čišćenja auto izgleda 10 godina mlađe. Super brza i iznimno temeljita usluga, a uistinu jednostavan dogovor. Vanjski sjaj je nevjerojatan, dugo već nije tako blistao. Unutrašnjost savršeno čista, a miris kao da je auto nov! Što sigurno nije bilo jednostavno postići s obzirom da se u autu pušilo, a redoviti putnik je zlatni retriver. Cijena i više nego prihvatljiva za kvalitetu usluge. Ja sigurno dolazim opet!",
    approvedBy: null,
  },
  {
    name: "Matej",
    surname: "Peteranec",
    starCount: 1,
    review:
      "Prezadovoljan uslugom! Nakon čišćenja auto izgleda 10 godina mlađe. Super brza i iznimno temeljita usluga, a uistinu jednostavan dogovor. Vanjski sjaj je nevjerojatan, dugo već nije tako blistao. Unutrašnjost savršeno čista, a miris kao da je auto nov! Što sigurno nije bilo jednostavno postići s obzirom da se u autu pušilo, a redoviti putnik je zlatni retriver. Cijena i više nego prihvatljiva za kvalitetu usluge. Ja sigurno dolazim opet!",
    approvedBy: null,
  },
  {
    name: "Matej",
    surname: "Peteranec",
    starCount: 3,
    review:
      "Prezadovoljan uslugom! Nakon čišćenja auto izgleda 10 godina mlađe. Super brza i iznimno temeljita usluga, a uistinu jednostavan dogovor. Vanjski sjaj je nevjerojatan, dugo već nije tako blistao. Unutrašnjost savršeno čista, a miris kao da je auto nov! Što sigurno nije bilo jednostavno postići s obzirom da se u autu pušilo, a redoviti putnik je zlatni retriver. Cijena i više nego prihvatljiva za kvalitetu usluge. Ja sigurno dolazim opet!",
    approvedBy: null,
  },
];

export const MOCK_CONFIG = {
  enableMockData: true,
  apiDelay: 500,
};
