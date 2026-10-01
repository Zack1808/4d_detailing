import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";
import DatePicker from "@/shared/components/DatePicker";
import Reveal from "@/shared/components/Reveal";

import { useSubmitAppointment } from "@features/booking/hooks/useSubmitAppointment";
import { useBlockedDates } from "@features/booking/hooks/useBlockedDates";

import { parseDate, toMidnight } from "@/shared/utils/date";

import { preloadEmail } from "@features/booking/api/emailService";

import type {
  BlockedAppointments,
  NewAppointmentType,
} from "@features/booking/types";
import type { ServiceType } from "@/features/catalog/types";

const GENERAL = "general_question";

const AppointmentForm: React.FC<{ services: ServiceType[] }> = ({
  services,
}) => {
  const [dates, setDates] = useState<BlockedAppointments[]>([]);

  const [params, setParams] = useSearchParams();
  const selectedValue = params.get("usluga") ?? GENERAL;

  const { submit, loading } = useSubmitAppointment();
  const { getBlockedAppointments } = useBlockedDates();

  const options = useMemo(
    () => [
      { value: GENERAL, label: "Općenito pitanje" },
      ...services.map((service) => ({
        value: service.slug,
        label: service.title,
      })),
    ],
    [services],
  );

  useEffect(preloadEmail, []);

  useEffect(() => {
    const getDates = async () => {
      const result = await getBlockedAppointments();

      setDates(result);
    };

    getDates();
  }, []);

  const handleSelectChange = (value: string | string[]) => {
    const next = new URLSearchParams(params);
    if (value === GENERAL) next.delete("usluga");
    else next.set("usluga", String(value));
    setParams(next, { replace: true });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form
        .querySelector<HTMLElement>(":invalid")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const values = Object.fromEntries(
      new FormData(form),
    ) as unknown as NewAppointmentType;
    const service = options.find((o) => o.value === values.service);

    const ok = await submit({
      ...values,
      service: service?.label ?? values.service,
    });
    if (ok) form.reset();
  };

  const blockDates = (value: string) => {
    const parsed = parseDate(value);

    if (!parsed) return false;

    const target = toMidnight(parsed);

    return dates.some(({ dateFrom, dateTo }) => {
      const from = parseDate(dateFrom);
      const to = parseDate(dateTo);

      if (!from || !to) return false;

      return target >= toMidnight(from) && target <= toMidnight(to);
    });
  };

  const today = new Date();
  const min = `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}.${today.getFullYear()}`;

  return (
    <form className="flex flex-col gap-6 lg:flex-2" onSubmit={handleSubmit}>
      <Reveal
        transitionFrom="opacity-0"
        transitionTo={`opacity-100`}
        delay={300}
      >
        <fieldset className="w-full flex flex-col gap-3">
          <label
            htmlFor="fullName"
            className="text-dark dark:text-light font-light"
          >
            Ime i Prezime *
          </label>
          <Input
            required
            type="text"
            className="w-full scroll-mt-38"
            placeholder="Ivan Ivic"
            id="fullName"
            name="fullName"
          />
        </fieldset>
      </Reveal>

      <Reveal
        transitionFrom="opacity-0"
        transitionTo={`opacity-100`}
        delay={400}
      >
        <fieldset className="w-full flex flex-col gap-3">
          <label
            htmlFor="email"
            className="text-dark dark:text-light font-light"
          >
            Email *
          </label>
          <Input
            required
            type="email"
            className="w-full scroll-mt-40"
            placeholder="ivanivic@gmail.com"
            id="email"
            name="email"
          />
        </fieldset>
      </Reveal>

      <Reveal
        transitionFrom="opacity-0"
        transitionTo={`opacity-100`}
        delay={500}
      >
        <fieldset className="w-full flex flex-col gap-3">
          <label
            htmlFor="phone"
            className="text-dark dark:text-light font-light"
          >
            Broj telefona *
          </label>
          <Input
            required
            type="tel"
            className="w-full scroll-mt-40"
            placeholder="Vaš broj telefona"
            id="phone"
            name="phone"
          />
        </fieldset>
      </Reveal>

      <Reveal
        transitionFrom="opacity-0"
        transitionTo={`opacity-100`}
        delay={600}
      >
        <fieldset className="w-full flex flex-col gap-3">
          <label
            htmlFor="service"
            className="text-dark dark:text-light font-light"
          >
            Usluga *
          </label>
          <Select
            required
            className="w-full scroll-mt-40"
            options={options}
            value={selectedValue}
            id="service"
            name="service"
            onChange={handleSelectChange}
          />
        </fieldset>
      </Reveal>

      <Reveal
        transitionFrom="opacity-0"
        transitionTo={`opacity-100`}
        delay={700}
      >
        <fieldset className="w-full flex flex-col gap-3">
          <label
            htmlFor="vehicle"
            className="text-dark dark:text-light font-light"
          >
            Model vozila *
          </label>
          <Input
            required
            type="text"
            className="w-full scroll-mt-40"
            placeholder="Mazda 3 Hatchback 2023"
            id="vehicle"
            name="vehicle"
          />
        </fieldset>
      </Reveal>

      <Reveal
        transitionFrom="opacity-0"
        transitionTo={`opacity-100`}
        delay={800}
      >
        <fieldset className="w-full flex flex-col gap-3">
          <label
            htmlFor="dateFrom"
            className="text-dark dark:text-light font-light"
          >
            Željeni termin
          </label>
          <DatePicker
            id="dateFrom"
            min={min}
            name="dateFrom"
            isDateDisabled={blockDates}
          />
        </fieldset>
      </Reveal>

      <Reveal
        transitionFrom="opacity-0"
        transitionTo={`opacity-100`}
        delay={900}
      >
        <fieldset className="w-full flex flex-col gap-3">
          <label
            htmlFor="remark"
            className="text-dark dark:text-light font-light"
          >
            Napomena / dodatni zahtjevi
          </label>
          <Textarea
            className="w-full"
            placeholder="Navedite dodatne detalje ili posebne zahtjeve..."
            id="remark"
            name="remark"
          />
        </fieldset>
      </Reveal>

      <Reveal
        transitionFrom="opacity-0"
        transitionTo={`opacity-100`}
        className="self-end"
        delay={1000}
      >
        <Button variant="primary" loading={loading} disabled={loading}>
          Pošalji upit
        </Button>
      </Reveal>
    </form>
  );
};

export default AppointmentForm;
