import {
  type ServiceDataType,
  type ReviewType,
  type AppointmentType,
} from "../../types/data";

export const mockServices: ServiceDataType[] = [
  {
    id: "fasdfadsfvcad",
    slug: "vanjsko_pranje_ukljucujuci_naplatke",
    title: "Vanjsko pranje, uključujući naplatke.",
    priceFrom: {
      ref: 20,
      current: 20,
    },
    duration: "2.5 sata",
    services: [
      "Detaljno pranje eksterijera",
      "Detaljno pranje naplataka",
      "Usisavanje interijera",
      "Brisanje prašine interijera",
    ],
    category: "exterior",
    suv: {
      ref: 10,
      current: 10,
    },
    transporter: {
      ref: 30,
      current: 30,
    },
    remark:
      "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila.",
    discount: {
      isEnabled: false,
      type: "percentage",
      value: 0,
      lowest: [
        {
          date: "",
          priceFrom: 0,
        },
      ],
    },
    isFeatured: true,
    keywords: [],
    description: "",
  },
  {
    id: "fasdfadsfvcac",
    slug: "vanjsko_pranje",
    title: "Vanjsko pranje",
    priceFrom: {
      ref: 15,
      current: 15,
    },
    duration: "2.5 sata",
    services: [
      "Pranje eksterijera",
      "Usisavanje interijera",
      "Brisanje prašine s inerijera",
    ],
    category: "exterior",
    suv: {
      ref: 10,
      current: 10,
    },
    transporter: {
      ref: 30,
      current: 30,
    },
    remark:
      "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila.",
    discount: {
      isEnabled: false,
      type: "percentage",
      value: 0,
      lowest: [
        {
          date: "",
          priceFrom: 0,
        },
      ],
    },
    isFeatured: false,
    keywords: [],
    description: "",
  },
  {
    id: "fasdfadsfvcaa",
    slug: "kemijsko_ciscenje_sjedala",
    title: "Kemijsko čišćenje sjedala",
    priceFrom: {
      ref: 50,
      current: 50,
    },
    duration: "2-3 sata",
    services: [
      "Kemijsko čišćenje vozačevog i suvozačevog sjedala",
      "Kemijsko čiščenje stražnjih putničkih sjedala",
      "Zaštita površina sjedala",
    ],
    category: "interior",
    suv: {
      ref: 0,
      current: 0,
    },
    transporter: {
      ref: 0,
      current: 0,
    },
    remark:
      "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila. Trajanje do 2.5 sata",
    discount: {
      isEnabled: true,
      type: "percentage",
      value: 10,
      lowest: [],
    },
    isFeatured: false,
    keywords: [],
    description: "",
  },
  {
    id: "fasdfadsfvcae",
    slug: "dubinsko_ciscenje_unutrasnjosti",
    title: "Dubinsko čišćenje unutrašnjosti",
    priceFrom: {
      ref: 100,
      current: 100,
    },
    priceTo: {
      ref: 200,
      current: 200,
    },
    duration: "1-2 dana",
    services: [
      "Detaljno vanjsko pranje, pranje naplataka",
      "Detaljno pranje pragova i rubova oko vrata, pranje gumenih tepiha",
      "Otprašivanje i usisavanje unutrašnjosti",
      "Detaljno pranje plastičnih i teško dostupnih površina unutrašnjosti",
      "Dubinsko izvlačenje sjedala i ostalih tkanenih površina unutrašnjosti",
      "Pranje stakala, zaštita svih površina unutrašnjosti",
    ],
    category: "interior",
    suv: {
      ref: 50,
      current: 50,
    },
    transporter: {
      ref: 80,
      current: 80,
    },
    remark:
      "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila.",
    discount: {
      isEnabled: true,
      type: "percentage",
      value: 22,
      lowest: [
        {
          date: "19.09.2026",
          priceFrom: 70,
        },
      ],
    },
    isFeatured: true,
    keywords: [],
    description: "",
  },
  {
    id: "fasdfadsfvcaz",
    slug: "keramicka_zastita_koznih_povrsina",
    title: "Keramička zaštita kožnih površina",
    priceFrom: {
      ref: 60,
      current: 60,
    },
    priceTo: {
      ref: 100,
      current: 100,
    },
    duration: "2.5 sata",
    services: [
      "Priprema kožnih površina za zaštitu",
      "Premaz keramičkom zaštitom za kožu",
    ],
    category: "interior",
    suv: {
      ref: 0,
      current: 20,
    },
    transporter: {
      ref: 0,
      current: 40,
    },
    remark:
      "Cijena prikazana vrijedi za vozila s 5 sjedala. Za vozila s više od 5 sjedala cijena raste. Dodaje se kao dodatna zaštita kod drugih usluga čišćenja unutrašnjosti.",
    discount: {
      isEnabled: true,
      type: "fixed",
      value: 20,
      lowest: [
        {
          date: "20.09.2026",
          priceFrom: 50,
        },
        {
          date: "22.09.2026",
          priceFrom: 40,
        },
      ],
    },
    isFeatured: false,
    keywords: [],
    description: "",
  },
  {
    id: "fasdfadsfvcadq",
    slug: "full_detailing_interijera",
    title: "Full detailing interijera",
    priceFrom: {
      ref: 300,
      current: 300,
    },
    priceTo: {
      ref: 450,
      current: 450,
    },
    duration: "2 - 3 dana",
    services: [
      "Detaljno vanjsko pranje, pranje naplataka",
      "Detaljno pranje rubova i površina oko vrata",
      "Otprašivanje i usisavanje unutrašnjosti",
      "Dubinsko pranje svih plastičnih površina unutrašnjosti",
      "Demontaža i montaža sjedala",
      "Dubinsko izvlačenje sjedala i ostalih tkanenih površina",
      "Pranje stakala, zaštita svih površina unutrašnjosti",
    ],
    category: "interior",
    suv: {
      ref: 50,
      current: 50,
    },
    transporter: {
      ref: 130,
      current: 130,
    },
    remark:
      "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila.",
    discount: {
      isEnabled: false,
      type: "percentage",
      value: 0,
      lowest: [
        {
          date: "",
          priceFrom: 0,
        },
      ],
    },
    isFeatured: false,
    keywords: ["poliranje"],
    description: "",
  },
  {
    id: "fasdfadsfvcada",
    slug: "nanosenje_keramicke_zastite_12_mjeseci",
    title: "Nanošenje keramičke zaštite (12 mjeseci)",
    priceFrom: {
      ref: 120,
      current: 120,
    },
    duration: "2 - 3 dana",
    services: [
      "Priprema laka za zaštitni premaz",
      "Premaz keramičkim premazom",
    ],
    category: "polishing",
    suv: {
      ref: 50,
      current: 50,
    },
    transporter: {
      ref: 100,
      current: 100,
    },
    remark:
      "Nanošenje keramičkog premaza vrši se isključivo na neposredno poliran lak te služi kao završni korak nakon korekcije laka ",
    discount: {
      isEnabled: false,
      type: "percentage",
      value: 0,
      lowest: [
        {
          date: "",
          priceFrom: 0,
        },
      ],
    },
    isFeatured: false,
    keywords: ["felge"],
    description: "",
  },
  {
    id: "fasdfadsfvcadk",
    slug: "korekcija_laka_poliranje",
    title: "Korekcija laka (poliranje)",
    priceFrom: {
      ref: 120,
      current: 120,
    },
    priceTo: {
      ref: 400,
      current: 400,
    },
    duration: "1-3 dana",
    services: [
      "Detaljno pranje ekterijera kao priprema",
      "Kemijska i mehanička dekontaminacija kao priprema laka za poliranje",
    ],
    category: "polishing",
    suv: {
      ref: 70,
      current: 70,
    },
    transporter: {
      ref: 120,
      current: 120,
    },
    remark:
      "Razina i cijena usluge određuje se ovisno o željenim rezultatima te veličini vozila.",
    discount: {
      isEnabled: false,
      type: "percentage",
      value: 0,
      lowest: [
        {
          date: "",
          priceFrom: 0,
        },
      ],
    },
    isFeatured: false,
    keywords: [],
    description: "",
  },
  {
    id: "fasdfadsfvcadq",
    slug: "nanosenje_keramicke_zastite_24_mjeseca",
    title: "Nanošenje keramičke zaštite (24 mjeseca)",
    priceFrom: {
      ref: 180,
      current: 180,
    },
    duration: "1 - 2 dana",
    services: ["Priprema laka za zaštitu", "Premaz zaštitom"],
    category: "polishing",
    suv: {
      ref: 60,
      current: 60,
    },
    transporter: {
      ref: 80,
      current: 80,
    },
    remark:
      "Nanošenje keramičkog premaza vrši se isključivo na neposredno poliran lak te služi kao završni korak nakon korekcije laka ",
    discount: {
      isEnabled: false,
      type: "percentage",
      value: 0,
      lowest: [
        {
          date: "",
          priceFrom: 0,
        },
      ],
    },
    isFeatured: false,
    keywords: [],
    description: "",
  },
  {
    id: "fasdfadsfvcadp",
    slug: "poliranje_farova",
    title: "Poliranje farova",
    priceFrom: {
      ref: 40,
      current: 40,
    },
    priceTo: {
      ref: 70,
      current: 70,
    },
    duration: "1-2 sata",
    services: ["Brušenje i poliranje", "Zaštita i booster premaz"],
    category: "polishing",
    suv: {
      ref: 0,
      current: 0,
    },
    transporter: {
      ref: 0,
      current: 0,
    },
    remark:
      "Prikazana cijena odnosi se na oba fara zajedno. Cijena usluge može se mijenjati ovisno o zamagljenosti farova.",
    discount: {
      isEnabled: false,
      type: "percentage",
      value: 0,
      lowest: [
        {
          date: "",
          priceFrom: 0,
        },
      ],
    },
    isFeatured: false,
    keywords: [],
    description: "",
  },
  {
    id: "fasdfadsfvcadv",
    slug: "standard_paket",
    title: "Standard Paket",
    priceFrom: {
      ref: 40,
      current: 40,
    },
    duration: "3-6 sata",
    services: [
      "Detaljnjo vanjsko pranje, pranje naplataka",
      "Otprašivanje i usisavanje interijera",
      "Detaljno pranje svih plastičnih površina",
      "Pranje stakala, zaštita plastičnih površina interijera",
    ],
    category: "package",
    suv: {
      ref: 40,
      current: 40,
    },
    transporter: {
      ref: 60,
      current: 60,
    },
    discount: {
      isEnabled: false,
      type: "percentage",
      value: 0,
      lowest: [
        {
          date: "",
          priceFrom: 0,
        },
      ],
    },
    isFeatured: false,
    keywords: [],
    description: "",
  },
  {
    id: "fasdfadsfvcadp",
    slug: "luxury+_paket",
    title: "Luxury+ Paket",
    priceFrom: {
      ref: 500,
      current: 500,
    },
    priceTo: {
      ref: 750,
      current: 750,
    },
    duration: "3-4 dana",
    services: [
      "Detaljnjo vanjsko pranje, pranje naplataka",
      "Detaljno pranje štokova i prostora između vrata",
      "Dubinsko čišćenje svih površina unutrašnjosti",
      "Dubinsko čišćenje sjedala i ostalih tkanenih površina unutrašnjosti",
      "Višeslojna korekcija laka",
      "Po želji, zatočkavanje oštećenja od kamenčića (klijent nabavlja boju)",
      "Zaštita keramičkim premazom (24 mjeseca)",
    ],
    category: "package",
    suv: {
      ref: 60,
      current: 60,
    },
    transporter: {
      ref: 80,
      current: 80,
    },
    remark:
      "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila.",
    discount: {
      isEnabled: false,
      type: "percentage",
      value: 0,
      lowest: [
        {
          date: "",
          priceFrom: 0,
        },
      ],
    },
    isFeatured: true,
    keywords: [],
    description: "",
  },
  {
    id: "fasdfadsfvcado",
    slug: "premium_paket",
    title: "Premium Paket",
    priceFrom: {
      ref: 320,
      current: 320,
    },
    priceTo: {
      ref: 400,
      current: 400,
    },
    duration: "2-3 dana",
    services: [
      "Detaljnjo vanjsko pranje, pranje naplataka",
      "Pranje područja i rubova oko vrata",
      "Otprašivanje i usisavanje unutrašnjosti",
      "Dubinsko pranje svih površina unutrašnjosti",
      "jednosoljna korekcija laka",
      "Zaštita keramičkim premazom (12 - 18 mjeseci)",
    ],
    category: "package",
    suv: {
      ref: 50,
      current: 50,
    },
    transporter: {
      ref: 80,
      current: 80,
    },
    remark:
      "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila.",
    discount: {
      isEnabled: false,
      type: "percentage",
      value: 0,
      lowest: [
        {
          date: "",
          priceFrom: 0,
        },
      ],
    },
    isFeatured: false,
    keywords: [],
    description: "",
  },
];

export const mockReviews: ReviewType[] = [
  {
    name: "Matej",
    surname: "Peteranec",
    starCount: 5,
    review:
      "Prezadovoljan uslugom! Nakon čišćenja auto izgleda 10 godina mlađe. Super brza i iznimno temeljita usluga, a uistinu jednostavan dogovor. Vanjski sjaj je nevjerojatan, dugo već nije tako blistao.",
    isApproved: true,
    id: "sdafsdfa",
  },
  {
    name: "Matej",
    surname: "Peteranec",
    starCount: 5,
    review:
      "Prezadovoljan uslugom! Nakon čišćenja auto izgleda 10 godina mlađe. Super brza i iznimno temeljita usluga, a uistinu jednostavan dogovor. Vanjski sjaj je nevjerojatan, dugo već nije tako blistao. Unutrašnjost savršeno čista, a miris kao da je auto nov! Što sigurno nije bilo jednostavno postići s obzirom da se u autu pušilo, a redoviti putnik je zlatni retriver. Cijena i više nego prihvatljiva za kvalitetu usluge. Ja sigurno dolazim opet!",
    isApproved: true,
    id: "sdafsdfb",
  },
  {
    name: "Matej",
    surname: "Peteranec",
    starCount: 1,
    review:
      "Prezadovoljan uslugom! Nakon čišćenja auto izgleda 10 godina mlađe. Super brza i iznimno temeljita usluga, a uistinu jednostavan dogovor. Vanjski sjaj je nevjerojatan, dugo već nije tako blistao. Unutrašnjost savršeno čista, a miris kao da je auto nov! Što sigurno nije bilo jednostavno postići s obzirom da se u autu pušilo, a redoviti putnik je zlatni retriver. Cijena i više nego prihvatljiva za kvalitetu usluge. Ja sigurno dolazim opet!",
    isApproved: true,
    id: "sdafsdfc",
  },
  {
    name: "Matej",
    surname: "Peteranec",
    starCount: 3,
    review:
      "Prezadovoljan uslugom! Nakon čišćenja auto izgleda 10 godina mlađe. Super brza i iznimno temeljita usluga, a uistinu jednostavan dogovor. Vanjski sjaj je nevjerojatan, dugo već nije tako blistao. Unutrašnjost savršeno čista, a miris kao da je auto nov! Što sigurno nije bilo jednostavno postići s obzirom da se u autu pušilo, a redoviti putnik je zlatni retriver. Cijena i više nego prihvatljiva za kvalitetu usluge. Ja sigurno dolazim opet!",
    isApproved: true,
    id: "sdafsdf",
  },
];

export const mockAppointments: AppointmentType[] = [
  {
    id: "afadsfadsklfjadskfnadsklfn",
    fullName: "Test Test",
    email: "test@gmal.com",
    phone: "+385950000000",
    service: "vanjsko_pranje_ukljucujuci_naplatke",
    vehicle: "Ford Fiesta 2017",
    dateFrom: "15.10.2026",
    dateTo: "17.10.2026",
    remark: "",
    isConfirmed: true,
    isBlocked: true,
  },
  {
    id: "afadsfadsklfjadskfnadsklfn",
    fullName: "Test Test",
    email: "test@gmal.com",
    phone: "+385950000000",
    service: "vanjsko_pranje_ukljucujuci_naplatke",
    vehicle: "Ford Fiesta 2017",
    dateFrom: "27.09.2026",
    dateTo: "27.09.2026",
    remark: "",
    isConfirmed: true,
    isBlocked: true,
  },
];

export const mockAdminCredentials = {
  uid: "mock-admin-1",
  email: "admin@test.com",
  password: "admin123",
};

export { MOCK_CONFIG } from "./mockConfig";
