import { useCallback, useMemo, useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

import Button from "../../components/ui/Button";
import DatePicker from "../../components/ui/DatePicker";
import Field from "../../components/ui/Field";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Textarea from "../../components/ui/Textarea";

import { useData } from "../../context/DataContext";
import { useForm } from "../../hooks/useForm";
import { submitAppointment } from "../../services/submissions";
import { formatDate, parseDate, toMidnight } from "../../utils/date";
import { ApiError, getErrorMessage } from "../../utils/errors";
import { notifyError, notifySuccess } from "../../utils/toast";
import {
  LIMITS,
  validateAppointment,
  type AppointmentValues,
} from "../../validation/rules";

const GENERAL_QUESTION = "general_question";

const SEND_FAILED =
  "Slanje upita nije uspjelo. Pokušajte ponovno ili nas kontaktirajte izravno.";

const MIN_FILL_MS = 1500;

const ContactForm = () => {
  const { services, blockedAppointments } = useData();
  const [params, setParams] = useSearchParams();

  const [sent, setSent] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const openedAt = useRef(Date.now());

  const options = useMemo(
    () => [
      { value: GENERAL_QUESTION, label: "Općenito pitanje" },
      ...services.map(({ slug, title }) => ({ value: slug, label: title })),
    ],
    [services],
  );

  const initialValues = useMemo<AppointmentValues>(() => {
    const requested = params.get("usluga");

    return {
      fullName: "",
      email: "",
      phone: "",
      service: options.some((o) => o.value === requested)
        ? (requested as string)
        : GENERAL_QUESTION,
      vehicle: "",
      dateFrom: "",
      remark: "",
    };
  }, [options]);

  const blockedRanges = useMemo(
    () =>
      blockedAppointments.flatMap(({ dateFrom, dateTo }) => {
        const from = parseDate(dateFrom);
        const to = parseDate(dateTo);

        return from && to
          ? [{ from: toMidnight(from), to: toMidnight(to) }]
          : [];
      }),
    [blockedAppointments],
  );

  const isBlocked = useCallback(
    (value: string) => {
      const date = parseDate(value);

      return Boolean(
        date &&
        blockedRanges.some(({ from, to }) => date >= from && date <= to),
      );
    },
    [blockedRanges],
  );

  const validate = useCallback(
    (values: AppointmentValues) => {
      const errors = validateAppointment(values);
      const date = parseDate(values.dateFrom);

      if (date && !errors.dateFrom) {
        if (date < toMidnight(new Date())) {
          errors.dateFrom = "Datum ne može biti u prošlosti.";
        } else if (isBlocked(values.dateFrom)) {
          errors.dateFrom =
            "Na odabrani datum nismo dostupni. Odaberite drugi termin.";
        }
      }

      return errors;
    },
    [isBlocked],
  );

  const form = useForm<AppointmentValues>({
    initialValues,
    validate,
    onSubmit: async (values, { setFieldErrors, focusFirstInvalid, reset }) => {
      if (
        honeypot.current?.checked ||
        Date.now() - openedAt.current < MIN_FILL_MS
      ) {
        setSent(true);
        return;
      }

      const service =
        options.find((option) => option.value === values.service)?.label ??
        values.service;

      try {
        await submitAppointment({ ...values, service });

        notifySuccess("Vaš upit je uspješno poslan!");
        setSent(true);
        reset();
      } catch (error) {
        if (error instanceof ApiError && error.fieldErrors) {
          setFieldErrors(error.fieldErrors);
          focusFirstInvalid();
        }

        notifyError(getErrorMessage(error, SEND_FAILED));
      }
    },
  });

  const { bind, errors, values, submitting } = form;

  const handleServiceChange = (value: string) => {
    form.setValue("service", value);

    const next = new URLSearchParams(params);

    if (value === GENERAL_QUESTION) next.delete("usluga");
    else next.set("usluga", value);

    setParams(next, { replace: true });
  };

  if (sent) {
    return (
      <div
        role="status"
        className="surface flex flex-col items-start gap-6 p-9 w-full"
      >
        <FaCircleCheck className="text-5xl" aria-hidden="true" />
        <h2 className="text-3xl font-semibold">Hvala! Upit je poslan.</h2>
        <p className="max-w-[60ch] font-light">
          Primili smo vaš upit i javit ćemo vam se uskoro kako bismo dogovorili
          sve detalje. Potvrdu smo vam poslali i e-poštom.
        </p>
        <Button variant="secondary" onClick={() => setSent(false)}>
          Pošalji novi upit
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={form.formRef}
      noValidate
      onSubmit={form.handleSubmit}
      className="flex flex-col gap-6 w-full"
    >
      <input
        ref={honeypot}
        type="checkbox"
        name="hp_ref_code"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute left-[9999px] size-0 opacity-0"
      />

      <p className="text-sm font-light text-gray-light">
        Polja označena zvjezdicom (*) su obavezna.
      </p>

      <Field
        id="fullName"
        label="Ime i prezime"
        required
        error={errors.fullName}
      >
        <Input
          {...bind("fullName")}
          type="text"
          autoComplete="name"
          placeholder="Ivan Ivić"
          maxLength={LIMITS.fullName}
        />
      </Field>

      <Field id="email" label="Email" required error={errors.email}>
        <Input
          {...bind("email")}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="ivanivic@gmail.com"
          maxLength={LIMITS.email}
        />
      </Field>

      <Field id="phone" label="Broj telefona" required error={errors.phone}>
        <Input
          {...bind("phone")}
          type="tel"
          autoComplete="tel"
          placeholder="Vaš broj telefona"
          maxLength={LIMITS.phone}
        />
      </Field>

      <Field id="service" label="Usluga" required error={errors.service}>
        <Select
          {...bind("service")}
          options={options}
          onChange={handleServiceChange}
        />
      </Field>

      <Field id="vehicle" label="Model vozila" required error={errors.vehicle}>
        <Input
          {...bind("vehicle")}
          type="text"
          placeholder="Mazda 3 Hatchback 2023"
          maxLength={LIMITS.vehicle}
        />
      </Field>

      <Field
        id="dateFrom"
        label="Željeni termin"
        error={errors.dateFrom}
        hint="Neobavezno – dogovorit ćemo točno vrijeme."
      >
        <DatePicker
          {...bind("dateFrom")}
          min={formatDate(new Date())}
          isDateDisabled={isBlocked}
        />
      </Field>

      <Field
        id="remark"
        label="Napomena / dodatni zahtjevi"
        error={errors.remark}
        count={{ current: values.remark.length, max: LIMITS.remark }}
      >
        <Textarea
          {...bind("remark")}
          placeholder="Navedite dodatne detalje ili posebne zahtjeve..."
        />
      </Field>

      <Button
        variant="primary"
        type="submit"
        loading={submitting}
        className="self-end"
      >
        Pošalji upit
      </Button>
    </form>
  );
};

export default ContactForm;
