import { firestoreApi } from "@/shared/api/firestoreApi";

import { COLLECTIONS } from "@/config/collections";

import type { AppointmentType, NewAppointmentType } from "../types";

export const appointmentApi = {
  getAppointments: () =>
    firestoreApi.getData<AppointmentType>(COLLECTIONS.appointments, [
      {
        field: "isBlocked",
        operator: "==",
        value: true,
      },
    ]),
  addAppointment: (data: NewAppointmentType) =>
    firestoreApi.setData<AppointmentType>(COLLECTIONS.appointments, {
      ...data,
      isConfirmed: false,
      isBlocked: false,
    }),
};
