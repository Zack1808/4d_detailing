import { useState } from "react";

import Button from "../../components/ui/Button";
import DatePicker from "../../components/ui/DatePicker";
import Field from "../../components/ui/Field";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import Select from "../../components/ui/Select";
import Textarea from "../../components/ui/Textarea";

import { useForm } from "../../hooks/useForm";

import { formatDate, parseDate } from "../../utils/date";
import { slugify } from "../../utils/text";
import { MESSAGES } from "../../validation/rules";

import type { ServiceDataType, VehicleClass } from "../../types/data";

type ServiceInput = Omit<ServiceDataType, "id">;

type Values = {
  title: string;
  slug: string;
  description: string;
  remark: string;
  servicesText: string;
  status: string;
  sortOrder: string;
  isFeatured: string;
  priceCar: string;
  anchorCar: string;
  priceSuv: string;
  anchorSuv: string;
  priceTransporter: string;
  anchorTransporter: string;
  discountType: string;
  discountValue: string;
  discountStartsAt: string;
  discountEndsAt: string;
};

const VEHICLES: {
  key: VehicleClass;
  label: string;
  price: keyof Values;
  anchor: keyof Values;
}[] = [
  {
    key: "car",
    label: "Osobni automobil",
    price: "priceCar",
    anchor: "anchorCar",
  },
  { key: "suv", label: "SUV", price: "priceSuv", anchor: "anchorSuv" },
  {
    key: "transporter",
    label: "Transporter",
    price: "priceTransporter",
    anchor: "anchorTransporter",
  },
];

const STATUS_OPTIONS = [
  { value: "active", label: "Aktivna (vidljiva na stranici)" },
  { value: "hidden", label: "Skrivena" },
  { value: "archived", label: "Arhivirana" },
];

const DISCOUNT_OPTIONS = [
  { value: "percentage", label: "Postotak (%)" },
  { value: "fixed", label: "Fiksni iznos (€)" },
];

const MAX = { title: 120, description: 500, remark: 300, price: 100000 };

const toNumber = (value: string) => Number(value.trim().replace(",", "."));

const toPickerDate = (value: string) => {
  if (!value || parseDate(value)) return value;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? "" : formatDate(date);
};

const toValues = (service?: ServiceDataType | null): Values => ({
  title: service?.title ?? "",
  slug: service?.slug ?? "",
  description: service?.description ?? "",
  remark: service?.remark ?? "",
  servicesText: service?.services.join("\n") ?? "",
  status: service?.status ?? "active",
  sortOrder: String(service?.sortOrder ?? ""),
  isFeatured: String(service?.isFeatured ?? false),
  priceCar: String(service?.prices.car.price ?? ""),
  anchorCar: String(service?.prices.car.anchorPrice ?? ""),
  priceSuv: String(service?.prices.suv.price ?? ""),
  anchorSuv: String(service?.prices.suv.anchorPrice ?? ""),
  priceTransporter: String(service?.prices.transporter.price ?? ""),
  anchorTransporter: String(service?.prices.transporter.anchorPrice ?? ""),
  discountType: service?.discount.type ?? "percentage",
  discountValue: String(service?.discount.value ?? 0),
  discountStartsAt: toPickerDate(service?.discount.startsAt ?? ""),
  discountEndsAt: toPickerDate(service?.discount.endsAt ?? ""),
});

const isMoney = (value: string) => {
  const number = toNumber(value);

  return value.trim() !== "" && Number.isFinite(number) && number >= 0;
};

const toInput = (
  values: Values,
  base?: ServiceDataType | null,
): ServiceInput => {
  const now = new Date().toISOString();
  const price = (key: keyof Values, anchorKey: keyof Values) => ({
    price: toNumber(values[key]),
    anchorPrice: values[anchorKey].trim()
      ? toNumber(values[anchorKey])
      : toNumber(values[key]),
  });

  const description = values.description.trim();
  const remark = values.remark.trim();

  return {
    slug: values.slug.trim(),
    title: values.title.trim(),
    description,
    services: values.servicesText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    ...(remark && { remark }),
    keywords: base?.keywords ?? [],
    isFeatured: values.isFeatured === "true",
    status: values.status as ServiceInput["status"],
    sortOrder: Number(values.sortOrder) || 0,
    prices: {
      car: price("priceCar", "anchorCar"),
      suv: price("priceSuv", "anchorSuv"),
      transporter: price("priceTransporter", "anchorTransporter"),
    },
    discount: {
      type: values.discountType as ServiceInput["discount"]["type"],
      value: toNumber(values.discountValue) || 0,
      startsAt: values.discountStartsAt,
      endsAt: values.discountEndsAt,
    },
    ...(base?.lowestPrice30d && { lowestPrice30d: base.lowestPrice30d }),
    createdAt: base?.createdAt ?? now,
    updatedAt: now,
  };
};

type ServiceEditorProps = {
  open: boolean;
  service: ServiceDataType | null;
  existingSlugs: string[];
  nextSortOrder: number;
  onClose: () => void;
  onSave: (data: ServiceInput, id?: string) => Promise<boolean>;
};

const ServiceEditor = ({
  open,
  service,
  existingSlugs,
  nextSortOrder,
  onClose,
  onSave,
}: ServiceEditorProps) => {
  const [slugTouched, setSlugTouched] = useState(Boolean(service));

  const validate = (values: Values) => {
    const errors: Partial<Record<keyof Values, string>> = {};
    const slug = values.slug.trim();

    if (!values.title.trim()) errors.title = MESSAGES.required;
    else if (values.title.length > MAX.title)
      errors.title = MESSAGES.tooLong(MAX.title);

    if (!slug) errors.slug = MESSAGES.required;
    else if (!/^[a-z0-9_-]+$/.test(slug))
      errors.slug = "Dopuštena su mala slova, brojevi, _ i -.";
    else if (existingSlugs.includes(slug))
      errors.slug = "Ova poveznica već postoji kod druge usluge.";

    if (values.description.length > MAX.description)
      errors.description = MESSAGES.tooLong(MAX.description);
    if (values.remark.length > MAX.remark)
      errors.remark = MESSAGES.tooLong(MAX.remark);

    if (!values.servicesText.trim())
      errors.servicesText = "Dodajte barem jednu stavku usluge.";

    if (values.sortOrder.trim() && !Number.isInteger(Number(values.sortOrder)))
      errors.sortOrder = "Unesite cijeli broj.";

    VEHICLES.forEach(({ price, anchor }) => {
      if (!isMoney(values[price])) errors[price] = "Unesite ispravnu cijenu.";
      else if (toNumber(values[price]) > MAX.price)
        errors[price] = "Cijena je prevelika.";

      if (values[anchor].trim() && !isMoney(values[anchor]))
        errors[anchor] = "Unesite ispravnu cijenu.";
    });

    const discount = toNumber(values.discountValue || "0");

    if (!Number.isFinite(discount) || discount < 0)
      errors.discountValue = "Unesite ispravan iznos.";
    else if (values.discountType === "percentage" && discount > 100)
      errors.discountValue = "Postotak ne može biti veći od 100.";

    const from = parseDate(values.discountStartsAt);
    const to = parseDate(values.discountEndsAt);

    if (values.discountStartsAt && !from)
      errors.discountStartsAt = MESSAGES.date;
    if (values.discountEndsAt && !to) errors.discountEndsAt = MESSAGES.date;
    if (from && to && to < from)
      errors.discountEndsAt = "Kraj akcije ne može biti prije početka.";

    return errors;
  };

  const form = useForm<Values>({
    initialValues: service
      ? toValues(service)
      : { ...toValues(null), sortOrder: String(nextSortOrder) },
    validate,
    onSubmit: async (values) => {
      const saved = await onSave(toInput(values, service), service?.id);

      if (saved) onClose();
    },
  });

  const { bind, errors, values, setValue, submitting } = form;

  const titleBinding = bind("title");

  return (
    <Modal
      open={open}
      onClose={submitting ? () => undefined : onClose}
      title={service ? "Uredi uslugu" : "Nova usluga"}
    >
      <form
        ref={form.formRef}
        onSubmit={form.handleSubmit}
        noValidate
        className="mt-6 flex flex-col gap-5"
      >
        <Field id="title" label="Naziv" required error={errors.title}>
          <Input
            {...titleBinding}
            maxLength={MAX.title + 20}
            onChange={(event) => {
              titleBinding.onChange(event);

              if (!slugTouched) setValue("slug", slugify(event.target.value));
            }}
          />
        </Field>

        <Field
          id="slug"
          label="Poveznica (slug)"
          required
          error={errors.slug}
          hint="Koristi se u adresi, npr. /kontakt?usluga=…"
        >
          <Input
            {...bind("slug")}
            onChange={(event) => {
              setSlugTouched(true);
              bind("slug").onChange(event);
            }}
          />
        </Field>

        <Field
          id="description"
          label="Opis"
          error={errors.description}
          count={{ current: values.description.length, max: MAX.description }}
        >
          <Textarea {...bind("description")} className="h-24!" />
        </Field>

        <Field
          id="servicesText"
          label="Što usluga uključuje"
          required
          error={errors.servicesText}
          hint="Jedna stavka po retku."
        >
          <Textarea {...bind("servicesText")} className="h-40!" />
        </Field>

        <Field
          id="remark"
          label="Napomena"
          error={errors.remark}
          count={{ current: values.remark.length, max: MAX.remark }}
        >
          <Textarea {...bind("remark")} className="h-20!" />
        </Field>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-2 text-lg font-semibold">Cijene (€)</legend>

          {VEHICLES.map(({ key, label, price, anchor }) => (
            <div
              key={key}
              className="grid gap-4 sm:grid-cols-[10rem_1fr_1fr] sm:items-start"
            >
              <p className="pt-3 font-medium">{label}</p>
              <Field id={price} label="Cijena" required error={errors[price]}>
                <Input {...bind(price)} inputMode="decimal" />
              </Field>
              <Field
                id={anchor}
                label="Referentna cijena"
                error={errors[anchor]}
                hint="Prazno = ista kao cijena."
              >
                <Input {...bind(anchor)} inputMode="decimal" />
              </Field>
            </div>
          ))}
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-2 text-lg font-semibold">Popust</legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="discountType" label="Vrsta popusta">
              <Select {...bind("discountType")} options={DISCOUNT_OPTIONS} />
            </Field>
            <Field
              id="discountValue"
              label="Iznos"
              error={errors.discountValue}
              hint="0 = bez popusta."
            >
              <Input {...bind("discountValue")} inputMode="decimal" />
            </Field>
            <Field
              id="discountStartsAt"
              label="Početak"
              error={errors.discountStartsAt}
            >
              <DatePicker {...bind("discountStartsAt")} />
            </Field>
            <Field
              id="discountEndsAt"
              label="Kraj (uključivo)"
              error={errors.discountEndsAt}
            >
              <DatePicker {...bind("discountEndsAt")} />
            </Field>
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="status" label="Status">
            <Select {...bind("status")} options={STATUS_OPTIONS} />
          </Field>
          <Field
            id="sortOrder"
            label="Redoslijed"
            error={errors.sortOrder}
            hint="Manji broj = ranije na stranici."
          >
            <Input {...bind("sortOrder")} inputMode="numeric" />
          </Field>
        </div>

        <label className="flex cursor-pointer items-center gap-3 font-light">
          <input
            type="checkbox"
            className="size-5 accent-current"
            checked={values.isFeatured === "true"}
            onChange={(event) =>
              setValue("isFeatured", String(event.target.checked))
            }
          />
          Istaknuta usluga (prikazuje se na početnoj stranici)
        </label>

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            Odustani
          </Button>
          <Button type="submit" variant="primary" loading={submitting}>
            Spremi
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ServiceEditor;
