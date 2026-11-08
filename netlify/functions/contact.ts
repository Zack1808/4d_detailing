import FormData from "form-data";
import Mailgun from "mailgun.js";

import {
  APPOINTMENT_FIELDS,
  REVIEW_FIELDS,
  validateAppointment,
  validateReview,
  type AppointmentValues,
  type ReviewValues,
} from "../../src/validation/rules";

const DOMAIN = "4d-detailing.hr";
const ADMIN_EMAIL = "info@4d-detailing.hr";
const FROM_WEBSITE = `4D Detailing Web stranica <postmaster@${DOMAIN}>`;
const FROM_NOREPLY = `4D Detailing Noreply <noreply@${DOMAIN}>`;

const TEMPLATE_USER_NOTIFICATION = "user notification";
const TEMPLATE_APPOINTMENT_REQUEST = "appointment request";
const TEMPLATE_REVIEW_SUBMISSION = "review submition";

const MAX_BODY_BYTES = 20_000;

const mg = new Mailgun(FormData).client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
  url: "https://api.eu.mailgun.net",
});

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const fail = (error: string, status: number, errors?: Record<string, string>) =>
  json({ error, ...(errors && { errors }) }, status);

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

const pick = <K extends string>(
  body: Record<string, unknown>,
  fields: readonly K[],
): Record<K, string> =>
  Object.fromEntries(
    fields.map((field) => [field, String(body[field] ?? "").trim()]),
  ) as Record<K, string>;

const sendAppointment = async (data: AppointmentValues) => {
  const service = oneLine(data.service);

  const adminMail = mg.messages.create(DOMAIN, {
    from: FROM_WEBSITE,
    to: [ADMIN_EMAIL],
    subject: `Novi upit za termin: ${service}`,
    template: TEMPLATE_APPOINTMENT_REQUEST,
    "h:X-Mailgun-Variables": JSON.stringify({ ...data, service }),
    "h:Reply-To": data.email,
  });

  const userMail = mg.messages.create(DOMAIN, {
    from: FROM_NOREPLY,
    to: [data.email],
    subject: `Zaprimili smo vaš upit za uslugu ${service}`,
    template: TEMPLATE_USER_NOTIFICATION,
    "h:X-Mailgun-Variables": JSON.stringify({
      dateFrom: data.dateFrom,
      email: data.email,
      name: oneLine(data.fullName).split(/\s+/)[0],
      phone: data.phone,
      service,
      vehicle: data.vehicle,
    }),
  });

  const [admin, user] = await Promise.allSettled([adminMail, userMail]);

  if (user.status === "rejected") {
    console.error("User confirmation failed:", user.reason);
  }

  if (admin.status === "rejected") throw admin.reason;
};

const sendReview = async (data: ReviewValues) => {
  await mg.messages.create(DOMAIN, {
    from: FROM_WEBSITE,
    to: ADMIN_EMAIL,
    subject: "Postavljena je nova recenzija na stranicu!",
    template: TEMPLATE_REVIEW_SUBMISSION,
    "h:X-Mailgun-Variables": JSON.stringify(data),
  });
};

export default async (req: Request) => {
  if (req.method !== "POST") {
    return fail("Metoda nije dopuštena.", 405);
  }

  let body: Record<string, unknown>;

  try {
    const raw = await req.text();

    if (raw.length > MAX_BODY_BYTES) return fail("Zahtjev je prevelik.", 413);

    body = JSON.parse(raw);
  } catch {
    return fail("Neispravan zahtjev.", 400);
  }

  if (typeof body !== "object" || body === null) {
    return fail("Neispravan zahtjev.", 400);
  }

  if (body.hp_ref_code) return json({ ok: true });

  try {
    switch (body.type) {
      case "appointment": {
        const data = pick(body, APPOINTMENT_FIELDS);
        const errors = validateAppointment(data);

        if (Object.keys(errors).length > 0) {
          return fail("Provjerite unesene podatke.", 422, errors);
        }

        await sendAppointment(data);
        return json({ ok: true });
      }

      case "review": {
        const data = pick(body, REVIEW_FIELDS);
        const errors = validateReview(data);

        if (Object.keys(errors).length > 0) {
          return fail("Provjerite unesene podatke.", 422, errors);
        }

        await sendReview(data);
        return json({ ok: true });
      }

      default:
        return fail("Nepoznata vrsta zahtjeva.", 400);
    }
  } catch (error) {
    console.error("Mailgun error:", error);
    return fail("Slanje poruke nije uspjelo. Pokušajte ponovno kasnije.", 500);
  }
};
