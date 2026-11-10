import { appointmentRepo, blockedDatesRepo } from "./repositories";

import { parseDate } from "../../utils/date";

import type { AppointmentType, BlockedAppointments } from "../../types/data";

export type AppointmentState = "pending" | "confirmed" | "denied";

export const getAppointmentState = (
  appointment: AppointmentType,
): AppointmentState => {
  if (appointment.isDenied) return "denied";

  return appointment.isConfirmed ? "confirmed" : "pending";
};

export type DateRange = { dateFrom: string; dateTo: string };

export const getRange = (appointment: AppointmentType): DateRange => ({
  dateFrom: appointment.dateFrom,
  dateTo: appointment.dateTo ?? appointment.dateFrom,
});

export const countOverlaps = (
  range: DateRange,
  blocked: BlockedAppointments[],
  ignoreAppointmentId?: string,
) => {
  const from = parseDate(range.dateFrom)?.getTime();
  const to = parseDate(range.dateTo)?.getTime();

  if (from === undefined || to === undefined) return 0;

  return blocked.filter((entry) => {
    if (entry.appointmentId === ignoreAppointmentId) return false;

    const start = parseDate(entry.dateFrom)?.getTime();
    const end = parseDate(entry.dateTo)?.getTime();

    return (
      start !== undefined && end !== undefined && start <= to && end >= from
    );
  }).length;
};

export const sendDecisionEmail = async (
  _appointment: AppointmentType,
  _decision: "confirmed" | "denied",
): Promise<void> => {};

export const confirmAppointment = async (
  appointment: AppointmentType,
  range: DateRange,
) => {
  const blocked = await blockedDatesRepo.create({
    ...range,
    appointmentId: appointment.id,
  });

  try {
    await appointmentRepo.update(appointment.id, {
      ...range,
      isConfirmed: true,
      isBlocked: true,
      isDenied: false,
    });
  } catch (error) {
    await blockedDatesRepo.remove(blocked.id).catch(() => undefined);

    throw error;
  }

  await sendDecisionEmail(appointment, "confirmed");
};

export const denyAppointment = async (
  appointment: AppointmentType,
  blocked: BlockedAppointments[],
) => {
  await appointmentRepo.update(appointment.id, {
    isConfirmed: false,
    isBlocked: false,
    isDenied: true,
  });

  await Promise.all(
    blocked
      .filter((entry) => entry.appointmentId === appointment.id)
      .map((entry) => blockedDatesRepo.remove(entry.id)),
  );

  await sendDecisionEmail(appointment, "denied");
};
