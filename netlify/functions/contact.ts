import FormData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
  url: "https://api.eu.mailgun.net",
});

const DOMAIN = "4d-detailing.hr";

const TEMPLATE_USER_NOTIFICATION = "user notification";
const TEMPLATE_APPOINTMENT_REQUEST = "appointment request";
const TEMPLATE_REVIEW_SUBMITION = "review submition";

const FIELDS = {
  appointment: [
    "fullName",
    "email",
    "phone",
    "vehicle",
    "service",
    "dateFrom",
    "remark",
  ],
  review: ["name", "surname", "starCount", "review"],
};

type EmailType = keyof typeof FIELDS;

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return new Response("Invalid request", { status: 400 });
  }

  if (body.website) {
    return new Response("ok");
  }

  const type = body.type as EmailType;
  if (type !== "appointment" && type !== "review") {
    return new Response("Unknown email type", { status: 400 });
  }

  const data: Record<string, string> = {};
  for (const field of FIELDS[type]) {
    const value = String(body[field] ?? "").trim();

    data[field] = value;
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return new Response("Invalid email address", { status: 400 });
  }

  try {
    switch (type) {
      case "appointment": {
        const adminVariables = {
          dateFrom: data.dateFrom,
          email: data.email,
          fullName: data.fullName,
          phone: data.phone,
          remark: data.remark,
          service: data.service,
          vehicle: data.vehicle,
        };

        const userVariables = {
          dateFrom: data.dateFrom,
          email: data.email,
          name: data.fullName.split(/\s+/)[0],
          phone: data.phone,
          service: data.service,
          vehicle: data.vehicle,
        };

        const adminMail = mg.messages.create(DOMAIN, {
          from: `4D Detaling Web stranica <postmaster@4d-detailing.hr>`,
          to: ["info@4d-detailing.hr"],
          subject: `Novi upit za termin: ${data.service}`,
          template: TEMPLATE_APPOINTMENT_REQUEST,
          "h:X-Mailgun-Variables": JSON.stringify(adminVariables),
          "h:Reply-To": data.email,
        });

        const userMail = mg.messages.create(DOMAIN, {
          from: "4D Detailing Noreply <noreply@4d-detailing.hr>",
          to: [data.email],
          subject: `Zaprimili smo vaš upit za uslugu ${data.service}`,
          template: TEMPLATE_USER_NOTIFICATION,
          "h:X-Mailgun-Variables": JSON.stringify(userVariables),
        });

        const [adminResult, userResult] = await Promise.all([
          adminMail,
          userMail,
        ]);

        if (userResult.status !== 200) {
          console.error("User confirmation failed: ", userResult.message);
        }

        if (adminResult.status !== 200) {
          console.error("Admin notification failed: ", adminResult.message);
          return new Response("Failed to send message.", { status: 500 });
        }

        return new Response("ok");
      }
      case "review":
        const reviewVariables = {
          starCount: data.starCount,
          name: data.name,
          surname: data.surname,
          review: data.review,
        };

        await mg.messages.create(DOMAIN, {
          from: "4D Detaling Web stranica <postmaster@4d-detailing.hr>",
          to: "info@4d-detailing.hr",
          subject: "Postavljena je nova recenzija na stranicu!",
          template: TEMPLATE_REVIEW_SUBMITION,
          "h:X-Mailgun-Variables": JSON.stringify(reviewVariables),
        });

        return new Response("ok");
    }
  } catch (error) {
    console.error("Mailgun error: ", error);
    return new Response("Failed to send message.", { status: 500 });
  }
};
