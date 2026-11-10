import type {
  AppointmentType,
  BlockedAppointments,
  ReviewType,
} from "../../types/data";

export const mockAppointments: AppointmentType[] = [
  {
    id: "apt-01",
    fullName: "Ivan Horvat",
    email: "ivan.horvat@example.com",
    phone: "+385 91 234 5678",
    service: "Luxury+ Paket",
    vehicle: "BMW X5 2021",
    dateFrom: "14.11.2026",
    remark: "Auto je jako zaprljan iznutra, imam psa.",
    isConfirmed: false,
    isBlocked: false,
  },
  {
    id: "apt-02",
    fullName: "Marija Kovač",
    email: "marija.kovac@example.com",
    phone: "098 765 4321",
    service: "Poliranje farova (brušenje 3 faze, poliranje i zaštita)",
    vehicle: "VW Golf 7",
    dateFrom: "16.11.2026",
    isConfirmed: false,
    isBlocked: false,
  },
  {
    id: "apt-03",
    fullName: "Petar Babić",
    email: "petar.babic@example.com",
    phone: "+385 99 111 2222",
    service: "Luxury+ Paket",
    vehicle: "Mercedes Vito",
    dateFrom: "20.11.2026",
    remark: "Mogu doći i tjedan kasnije ako je potrebno.",
    isConfirmed: false,
    isBlocked: false,
  },
  {
    id: "apt-04",
    fullName: "Ana Jurić",
    email: "ana.juric@example.com",
    phone: "+385 95 333 4444",
    service: "Poliranje farova (samo poliranje i zaštita)",
    vehicle: "Audi A3",
    dateFrom: "17.10.2026",
    dateTo: "17.10.2026",
    isConfirmed: true,
    isBlocked: true,
  },
  {
    id: "apt-05",
    fullName: "Tomislav Šimić",
    email: "tomislav.simic@example.com",
    phone: "+385 91 555 6666",
    service: "Luxury+ Paket",
    vehicle: "Škoda Octavia",
    dateFrom: "25.11.2026",
    dateTo: "26.11.2026",
    isConfirmed: true,
    isBlocked: true,
  },
  {
    id: "apt-06",
    fullName: "Katarina Matić",
    email: "katarina.matic@example.com",
    phone: "+385 98 777 8888",
    service: "Luxury+ Paket",
    vehicle: "Opel Corsa",
    dateFrom: "05.11.2026",
    isConfirmed: false,
    isBlocked: false,
    isDenied: true,
  },
];

export const mockBlockedDates: BlockedAppointments[] = [
  {
    id: "blk-01",
    dateFrom: "17.10.2026",
    dateTo: "17.10.2026",
    appointmentId: "apt-04",
  },
  {
    id: "blk-02",
    dateFrom: "25.11.2026",
    dateTo: "26.11.2026",
    appointmentId: "apt-05",
  },
  {
    id: "blk-03",
    dateFrom: "24.12.2026",
    dateTo: "26.12.2026",
    appointmentId: "",
  },
];

export const mockPendingReviews: ReviewType[] = [
  {
    id: "rev-pending-01",
    name: "Dario",
    surname: "Perić",
    starCount: 4,
    review:
      "Odličan posao s felgama i interijerom, jedina zamjerka je što sam malo čekao na preuzimanje.",
    isApproved: false,
  },
];
