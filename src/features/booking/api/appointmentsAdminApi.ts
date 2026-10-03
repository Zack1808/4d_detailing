// TODO: setup api integration

import type {
  AppointmentType,
  BlockedAppointments,
  NewBlockedAppointment,
} from "@features/booking/types";

export const appointmentAdminApi = {
  getAppointments: () => {},

  updateAppointment: (data: AppointmentType, id: string) => {
    console.log(data, id);
  },

  deleteAppointment: (id: string) => {
    console.log(id);
  },

  addBlockedAppointment: (data: NewBlockedAppointment) => {
    console.log(data);
  },

  updateBlockedAppointment: (data: BlockedAppointments, id: string) => {
    console.log(data, id);
  },

  deleteBlockedAppointment: (id: string) => {
    console.log(id);
  },
};
