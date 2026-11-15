import { appointmentRepo, blockedDatesRepo } from "./repositories";
import { createCalendarEvent, deleteCalendarEvent } from "./calendarApi";
import { sendEmail } from "./emailApi";
import { buildRescheduleEmail } from "./emailTemplates";

import { BUSINESS } from "../../config/business";
import {
  addDaysToValue,
  formatDate,
  parseDate,
  toMidnight,
} from "../../utils/date";
import { getBlockedDays, getEndDate, guessPhases } from "../../utils/duration";
import { normalizeText } from "../../utils/text";

import type {
  AppointmentType,
  BlockedAppointments,
  ServiceDataType,
} from "../../types/data";

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
    if (entry.appointmentId && entry.appointmentId === ignoreAppointmentId)
      return false;

    const start = parseDate(entry.dateFrom)?.getTime();
    const end = parseDate(entry.dateTo)?.getTime();

    return (
      start !== undefined && end !== undefined && start <= to && end >= from
    );
  }).length;
};

export const findService = (
  appointment: AppointmentType,
  services: ServiceDataType[],
): ServiceDataType | undefined =>
  services.find((service) => service.id === appointment.serviceId) ??
  services.find(
    (service) =>
      normalizeText(service.title) === normalizeText(appointment.service),
  );

export const getDefaultPhases = (
  appointment: AppointmentType,
  service?: ServiceDataType,
) =>
  service?.durationPerPhase
    ? (appointment.phases ?? guessPhases(appointment.service))
    : 1;

export const getStartDate = (appointment: AppointmentType) =>
  appointment.rescheduleProposal?.dateFrom || appointment.dateFrom;

export const getSuggestedRange = (
  dateFrom: string,
  service: ServiceDataType | undefined,
  phases: number,
): DateRange => ({
  dateFrom,
  dateTo: getEndDate(dateFrom, getBlockedDays(service, phases)),
});

export const findNextFreeDate = (
  from: Date,
  days: number,
  blocked: BlockedAppointments[],
  ignoreAppointmentId?: string,
) => {
  const MAX_LOOKAHEAD = 366;
  const start = toMidnight(from);

  for (let offset = 0; offset < MAX_LOOKAHEAD; offset += 1) {
    const candidate = formatDate(
      new Date(start.getFullYear(), start.getMonth(), start.getDate() + offset),
    );
    const range = {
      dateFrom: candidate,
      dateTo: addDaysToValue(candidate, Math.max(1, days) - 1),
    };

    if (countOverlaps(range, blocked, ignoreAppointmentId) === 0) {
      return candidate;
    }
  }

  return "";
};

const calendarSummary = (appointment: AppointmentType) =>
  `${BUSINESS.name}: ${appointment.service} – ${appointment.fullName}`;

const calendarDescription = (appointment: AppointmentType) =>
  [
    `Klijent: ${appointment.fullName}`,
    `Telefon: ${appointment.phone}`,
    `E-mail: ${appointment.email}`,
    `Usluga: ${appointment.service}`,
    `Vozilo: ${appointment.vehicle}`,
    appointment.remark && `Napomena: ${appointment.remark}`,
  ]
    .filter(Boolean)
    .join("\n");

export const sendDecisionEmail = async (
  _appointment: AppointmentType,
  _decision: "confirmed" | "denied",
): Promise<void> => {};

export type ConfirmResult = { calendar: "added" | "failed" };

export const confirmAppointment = async (
  appointment: AppointmentType,
  range: DateRange,
  phases = 1,
): Promise<ConfirmResult> => {
  const blocked = await blockedDatesRepo.create({
    ...range,
    appointmentId: appointment.id,
  });

  try {
    await appointmentRepo.update(appointment.id, {
      ...range,
      phases,
      isConfirmed: true,
      isBlocked: true,
      isDenied: false,
      rescheduleProposal: null,
    });
  } catch (error) {
    await blockedDatesRepo.remove(blocked.id).catch(() => undefined);

    throw error;
  }

  let calendar: ConfirmResult["calendar"] = "added";

  try {
    const event = await createCalendarEvent({
      summary: calendarSummary(appointment),
      description: calendarDescription(appointment),
      ...range,
    });

    await appointmentRepo.update(appointment.id, { calendarEventId: event.id });
  } catch (error) {
    console.error("Adding the appointment to Google Calendar failed: ", error);
    calendar = "failed";
  }

  await sendDecisionEmail(appointment, "confirmed");

  return { calendar };
};

export const denyAppointment = async (
  appointment: AppointmentType,
  blocked: BlockedAppointments[],
) => {
  await appointmentRepo.update(appointment.id, {
    isConfirmed: false,
    isBlocked: false,
    isDenied: true,
    rescheduleProposal: null,
    calendarEventId: null,
  });

  await Promise.all(
    blocked
      .filter((entry) => entry.appointmentId === appointment.id)
      .map((entry) => blockedDatesRepo.remove(entry.id)),
  );

  if (appointment.calendarEventId) {
    await deleteCalendarEvent(appointment.calendarEventId).catch((error) =>
      console.error("Removing the Google Calendar event failed: ", error),
    );
  }

  await sendDecisionEmail(appointment, "denied");
};

/** Emails the customer a new date and remembers the proposal on the request. */
export const proposeReschedule = async (
  appointment: AppointmentType,
  proposal: { dateFrom: string; message: string },
) => {
  await sendEmail(buildRescheduleEmail(appointment, proposal));

  await appointmentRepo.update(appointment.id, {
    rescheduleProposal: {
      dateFrom: proposal.dateFrom,
      message: proposal.message.trim(),
      sentAt: new Date().toISOString(),
    },
  });
};
