import { firestoreApi } from "@/shared/api/firestoreApi";

import { COLLECTIONS } from "@/config/collections";

import type {
  AppointmentType,
  NewAppointmentType,
  BlockedAppointments,
} from "../types";

export const appointmentApi = {
  getBlockedDates: () =>
    firestoreApi.getData<BlockedAppointments>(COLLECTIONS.blocked),
  addAppointment: (data: NewAppointmentType) =>
    firestoreApi.setData<AppointmentType>(COLLECTIONS.appointments, {
      ...data,
      isConfirmed: false,
      isBlocked: false,
    }),
};
