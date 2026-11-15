import { useMemo } from "react";

import Button from "../../components/ui/Button";
import DatePicker from "../../components/ui/DatePicker";
import Field from "../../components/ui/Field";
import Modal from "../../components/ui/Modal";
import Textarea from "../../components/ui/Textarea";

import { USE_MOCK_EMAIL } from "../data/emailApi";
import { buildRescheduleEmail } from "../data/emailTemplates";
import { countOverlaps, findNextFreeDate } from "../data/appointmentActions";

import { useForm } from "../../hooks/useForm";
import {
  addDaysToValue,
  formatDate,
  parseDate,
  toMidnight,
} from "../../utils/date";
import { formatDays } from "../../utils/duration";
import { MESSAGES } from "../../validation/rules";

import type { AppointmentType, BlockedAppointments } from "../../types/data";

type Values = { dateFrom: string; message: string };

const MAX_MESSAGE = 1000;

type RescheduleDialogProps = {
  open: boolean;
  appointment: AppointmentType | null;
  blocked: BlockedAppointments[];
  days: number;
  onClose: () => void;
  onSubmit: (values: Values) => Promise<boolean>;
};

const RescheduleDialog = ({
  open,
  appointment,
  blocked,
  days,
  onClose,
  onSubmit,
}: RescheduleDialogProps) => {
  const today = useMemo(() => toMidnight(new Date()), []);

  const rangeFor = (dateFrom: string) => ({
    dateFrom,
    dateTo: addDaysToValue(dateFrom, Math.max(1, days) - 1),
  });

  const fits = (dateFrom: string) =>
    countOverlaps(rangeFor(dateFrom), blocked, appointment?.id) === 0;

  const initialValues = useMemo<Values>(
    () => ({
      dateFrom: findNextFreeDate(today, days, blocked, appointment?.id),
      message: "",
    }),
    [today, days, blocked, appointment?.id],
  );

  const validate = ({ dateFrom, message }: Values) => {
    const errors: Partial<Record<keyof Values, string>> = {};
    const date = parseDate(dateFrom);

    if (!dateFrom) errors.dateFrom = MESSAGES.required;
    else if (!date) errors.dateFrom = MESSAGES.date;
    else if (date < today) errors.dateFrom = "Datum ne može biti u prošlosti.";
    else if (!fits(dateFrom))
      errors.dateFrom = `Za ovaj datum ${formatDays(days)} nisu slobodni. Odaberite drugi.`;

    if (message.length > MAX_MESSAGE)
      errors.message = MESSAGES.tooLong(MAX_MESSAGE);

    return errors;
  };

  const form = useForm<Values>({
    initialValues,
    validate,
    onSubmit: async (values, { reset }) => {
      if (await onSubmit(values)) reset();
    },
  });

  const { bind, errors, values, submitting } = form;

  const preview = appointment
    ? buildRescheduleEmail(appointment, values)
    : null;

  return (
    <Modal
      open={open}
      onClose={submitting ? () => undefined : onClose}
      title="Predloži novi termin"
    >
      {appointment && preview && (
        <form
          ref={form.formRef}
          onSubmit={form.handleSubmit}
          noValidate
          className="mt-3 flex flex-col gap-5"
        >
          <p className="font-light">
            Klijentu{" "}
            <strong className="font-semibold">{appointment.fullName}</strong>{" "}
            šaljemo e-mail s prijedlogom novog termina za uslugu „
            {appointment.service}”. Usluga zauzima {formatDays(days)}.
          </p>

          <Field
            id="dateFrom"
            label="Novi datum (prvi dan)"
            required
            error={errors.dateFrom}
            hint="Predloženi je prvi datum na kojem su svi potrebni dani slobodni."
          >
            <DatePicker
              {...bind("dateFrom")}
              min={formatDate(today)}
              isDateDisabled={(date) => !fits(date)}
            />
          </Field>

          <Field
            id="message"
            label="Poruka klijentu"
            error={errors.message}
            hint="Neobavezno – dodaje se u e-mail."
            count={{ current: values.message.length, max: MAX_MESSAGE }}
          >
            <Textarea
              {...bind("message")}
              className="h-28!"
              placeholder="Npr. Na traženi datum je već zauzet termin, a ovaj nam odgovara jer…"
            />
          </Field>

          <div className="flex flex-col gap-2">
            <p className="font-medium">Pregled e-maila</p>
            <div className="rounded-xs bg-gray-light/15 p-3 text-sm dark:bg-gray-dark/40">
              <p>
                <span className="text-gray-light">Za:</span> {preview.to}
              </p>
              <p>
                <span className="text-gray-light">Predmet:</span>{" "}
                {preview.subject}
              </p>
              <p className="mt-3 max-h-48 overflow-y-auto font-light whitespace-pre-wrap">
                {preview.body}
              </p>
            </div>
            {USE_MOCK_EMAIL && (
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Mock: e-mail se ne šalje stvarno, sprema se u konzolu
                preglednika.
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <Button variant="secondary" onClick={onClose} disabled={submitting}>
              Odustani
            </Button>
            <Button type="submit" variant="primary" loading={submitting}>
              Pošalji prijedlog
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default RescheduleDialog;
