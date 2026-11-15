import { BUSINESS } from "../../config/business";

import type { AppointmentType } from "../../types/data";

export type OutgoingEmail = {
  to: string;
  subject: string;
  body: string;
};

export const buildRescheduleEmail = (
  appointment: AppointmentType,
  proposal: { dateFrom: string; message: string },
): OutgoingEmail => {
  const requested = appointment.dateFrom ? ` (${appointment.dateFrom})` : "";
  const note = proposal.message.trim();

  const body = [
    `Poštovani/a ${appointment.fullName},`,
    `hvala vam na upitu za uslugu „${appointment.service}” (${appointment.vehicle}). Nažalost, traženi termin${requested} nam ne odgovara.`,
    `Predlažemo vam novi termin: ${proposal.dateFrom || "…"}.`,
    note,
    `Ako vam novi termin odgovara, odgovorite na ovaj e-mail ili nas nazovite na ${BUSINESS.phone.display}. Ako vam ne odgovara, slobodno predložite drugi datum.`,
    `Srdačan pozdrav,\n${BUSINESS.name}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    to: appointment.email,
    subject: `${BUSINESS.name} – prijedlog novog termina`,
    body,
  };
};
