export type VehicleClass = "car" | "suv" | "transporter";

export type PriceType = {
  price: number;
  anchorPrice: number;
};

export type ServiceDataType = {
  id: string;
  slug: string;
  title: string;
  description: string;
  services: string[];
  remark?: string;
  keywords?: string[];
  isFeatured: boolean;
  status: "active" | "hidden" | "archived";
  sortOrder: number;
  /** Days the service occupies: "1" or a span like "1-2" (upper limit blocks dates). */
  duration?: string;
  /** When true, `duration` is per phase and is multiplied by the number of phases. */
  durationPerPhase?: boolean;
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

export type RescheduleProposal = {
  dateFrom: string;
  message: string;
  sentAt: string;
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
  isDenied?: boolean;
  serviceId?: string;
  phases?: number;
  rescheduleProposal?: RescheduleProposal | null;
  calendarEventId?: string | null;
};

export type NewAppointment = Omit<AppointmentType, "id" | "dateTo">;
export type NewReview = Omit<ReviewType, "id">;

export type PageData = {
  services: ServiceDataType[];
  reviews: ReviewType[];
  blockedAppointments: BlockedAppointments[];
  priceArchive: PriceTableType[];
};

export type BlockedAppointments = {
  dateFrom: string;
  dateTo: string;
  id: string;
  appointmentId: string;
};

export type PriceTableType = {
  id: string;
  name: string;
  createdAt: string;
  downloadLink: string;
  isCurrent: boolean;
};
