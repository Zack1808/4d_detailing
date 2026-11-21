import type { AppointmentType } from "../../types/data";

export const normalizeEmail = (email?: string) =>
  (email ?? "").trim().toLowerCase();

export const normalizePhone = (phone?: string) => {
  let digits = (phone ?? "").replace(/\D/g, "");

  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("385")) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);

  return digits;
};

export type MatchReason = "email" | "phone";

export type HistoryEntry = {
  appointment: AppointmentType;
  matchedBy: MatchReason[];
};

const MIN_PHONE_DIGITS = 7;

const getMatchReasons = (
  a: AppointmentType,
  b: AppointmentType,
): MatchReason[] => {
  const reasons: MatchReason[] = [];

  if (a.email && normalizeEmail(a.email) === normalizeEmail(b.email)) {
    reasons.push("email");
  }

  const phone = normalizePhone(a.phone);

  if (phone.length >= MIN_PHONE_DIGITS && phone === normalizePhone(b.phone)) {
    reasons.push("phone");
  }

  return reasons;
};

const timeOf = (appointment: AppointmentType) => {
  const [d, m, y] = appointment.dateFrom.split(".").map(Number);

  return y && m && d ? new Date(y, m - 1, d).getTime() : 0;
};

export const getCustomerHistory = (
  appointment: AppointmentType,
  all: AppointmentType[],
): HistoryEntry[] =>
  all
    .filter((other) => other.id !== appointment.id && !other.isDenied)
    .flatMap((other) => {
      const matchedBy = getMatchReasons(appointment, other);

      return matchedBy.length > 0 ? [{ appointment: other, matchedBy }] : [];
    })
    .sort((a, b) => timeOf(b.appointment) - timeOf(a.appointment));

export const getPastServices = (history: HistoryEntry[]) =>
  history.filter((entry) => entry.appointment.isConfirmed);
