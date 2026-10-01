import type {
  AppointmentType,
  BlockedAppointments,
} from "@/features/booking/types";

export const mockAppointments: AppointmentType[] = [
  {
    id: "vaserafdasdrfads",
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

export const mockBlockedAppointments: BlockedAppointments[] = [
  {
    id: "asdremnvemvaue",
    dateFrom: "15.10.2026",
    dateTo: "17.10.2026",
    appointmentId: "vaserafdasdrfads",
  },
  {
    id: "fadsfakldfčdsafnds",
    dateFrom: "20.10.2026",
    dateTo: "20.10.2026",
    appointmentId: "afadsfadsklfjadskfnadsklfn",
  },
];
