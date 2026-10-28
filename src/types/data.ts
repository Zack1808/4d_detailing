export type VehicleClass = "car" | "suv" | "transporter";

type PriceType = {
  price: number;
  anchorPrice: number;
};

export type ServiceDataType = {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  services: string[];
  remark?: string;
  keywords?: string[];
  isFeatured: boolean;
  status: "active" | "hidden" | "archived";
  sortOrder: number;
  prices: Record<VehicleClass, PriceType>;
  discount: {
    type: "percentage" | "fixed";
    value: number;
    startsAt: string;
    endsAt: string;
  };
  lowestPrice30d?: Record<VehicleClass, { amount: number; computedAt: string }>;
  createdAt: string;
  updatedAt: string;
};

export type ReviewType = {
  id: string;
  starCount: number;
  name: string;
  surname: string;
  review: string;
  isApproved: boolean;
};

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

export type BlockedAppointments = {
  dateFrom: string;
  dateTo: string;
  id: string;
  appointmentId: string;
};

export type PriceTableType = {
  name: string;
  createdAt: string;
  downloadLink: string;
  isActual: boolean;
};
