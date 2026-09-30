export type AppointmentType = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  vehicle: string;
  dateFrom: string;
  dateTo?: string;
  remark?: string;
  isConfirmed: boolean;
  isBlocked: boolean;
};

export type NewAppointmentType = Omit<
  AppointmentType,
  "id" | "isConfirmed" | "isBlocked"
>;
