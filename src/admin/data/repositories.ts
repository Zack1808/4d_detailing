import { COLLECTIONS } from "../../config/collections";

import { createRepository } from "./repository";

import type {
  AppointmentType,
  BlockedAppointments,
  PriceTableType,
  ReviewType,
  ServiceDataType,
} from "../../types/data";

export const appointmentRepo = createRepository<AppointmentType>(
  COLLECTIONS.appointments,
);

export const serviceRepo = createRepository<ServiceDataType>(
  COLLECTIONS.services,
);

export const reviewsRepo = createRepository<ReviewType>(COLLECTIONS.reviews);

export const blockedDatesRepo = createRepository<BlockedAppointments>(
  COLLECTIONS.blockedAppointments,
);

export const priceTableRepo = createRepository<PriceTableType>(
  COLLECTIONS.priceTables,
);
