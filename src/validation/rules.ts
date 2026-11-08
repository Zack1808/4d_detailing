import { parseDate } from "../utils/date";

export const LIMITS = {
  fullName: 100,
  email: 254,
  phone: 25,
  service: 150,
  vehicle: 100,
  remark: 1000,
  name: 50,
  surname: 50,
  review: 1000,
} as const;

export const MIN_REVIEW_LENGTH = 10;

export const APPOINTMENT_FIELDS = [
  "fullName",
  "email",
  "phone",
  "service",
  "vehicle",
  "dateFrom",
  "remark",
] as const;

export const REVIEW_FIELDS = [
  "name",
  "surname",
  "starCount",
  "review",
] as const;

export type AppointmentField = (typeof APPOINTMENT_FIELDS)[number];
export type ReviewField = (typeof REVIEW_FIELDS)[number];

export type AppointmentValues = Record<AppointmentField, string>;
export type ReviewValues = Record<ReviewField, string>;

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

export const MESSAGES = {
  required: "Ovo polje je obavezno.",
  fullName: "Unesite ime i prezime.",
  email: "Unesite ispravnu email adresu, npr. ime@domena.hr.",
  phone: "Unesite ispravan broj telefona, npr. +385 97 123 4567.",
  service: "Odaberite uslugu.",
  vehicle: "Unesite model vozila, npr. Mazda 3 2023.",
  date: "Datum unesite u formatu DD.MM.GGGG, npr. 24.12.2026.",
  name: "Unesite ime.",
  surname: "Unesite prezime.",
  rating: "Odaberite ocjenu od 1 do 5 zvjezdica.",
  reviewTooShort: `Recenzija mora imati barem ${MIN_REVIEW_LENGTH} znakova.`,
  tooLong: (max: number) => `Najviše ${max} znakova.`,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s()\-/.]+$/;

const clean = (value: string | undefined) => (value ?? "").trim();

export const isValidEmail = (value: string) => EMAIL_PATTERN.test(value);

export const isValidPhone = (value: string) => {
  if (!PHONE_PATTERN.test(value)) return false;

  const digits = value.replace(/\D/g, "").length;

  return digits >= 6 && digits <= 15;
};

const checkLength = (value: string, max: number) =>
  value.length > max ? MESSAGES.tooLong(max) : undefined;

export const validateAppointment = (
  input: Partial<AppointmentValues>,
): FieldErrors<AppointmentField> => {
  const errors: FieldErrors<AppointmentField> = {};

  const fullName = clean(input.fullName);
  const email = clean(input.email);
  const phone = clean(input.phone);
  const service = clean(input.service);
  const vehicle = clean(input.vehicle);
  const dateFrom = clean(input.dateFrom);
  const remark = clean(input.remark);

  if (!fullName) errors.fullName = MESSAGES.required;
  else if (fullName.split(/\s+/).length < 2)
    errors.fullName = MESSAGES.fullName;
  else errors.fullName = checkLength(fullName, LIMITS.fullName);

  if (!email) errors.email = MESSAGES.required;
  else if (!isValidEmail(email)) errors.email = MESSAGES.email;
  else errors.email = checkLength(email, LIMITS.email);

  if (!phone) errors.phone = MESSAGES.required;
  else if (!isValidPhone(phone) || phone.length > LIMITS.phone)
    errors.phone = MESSAGES.phone;

  if (!service) errors.service = MESSAGES.service;
  else errors.service = checkLength(service, LIMITS.service);

  if (!vehicle) errors.vehicle = MESSAGES.vehicle;
  else errors.vehicle = checkLength(vehicle, LIMITS.vehicle);

  if (dateFrom && !parseDate(dateFrom)) errors.dateFrom = MESSAGES.date;

  errors.remark = checkLength(remark, LIMITS.remark);

  return stripEmpty(errors);
};

export const validateReview = (
  input: Partial<ReviewValues>,
): FieldErrors<ReviewField> => {
  const errors: FieldErrors<ReviewField> = {};

  const name = clean(input.name);
  const surname = clean(input.surname);
  const review = clean(input.review);
  const stars = Number(input.starCount);

  if (!name) errors.name = MESSAGES.name;
  else errors.name = checkLength(name, LIMITS.name);

  if (!surname) errors.surname = MESSAGES.surname;
  else errors.surname = checkLength(surname, LIMITS.surname);

  if (!Number.isInteger(stars) || stars < 1 || stars > 5)
    errors.starCount = MESSAGES.rating;

  if (!review) errors.review = MESSAGES.required;
  else if (review.length < MIN_REVIEW_LENGTH)
    errors.review = MESSAGES.reviewTooShort;
  else errors.review = checkLength(review, LIMITS.review);

  return stripEmpty(errors);
};

function stripEmpty<K extends string>(errors: FieldErrors<K>): FieldErrors<K> {
  const result: FieldErrors<K> = {};

  for (const key of Object.keys(errors) as K[]) {
    if (errors[key]) result[key] = errors[key];
  }

  return result;
}
