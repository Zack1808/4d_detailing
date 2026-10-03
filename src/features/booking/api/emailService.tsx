import type { NewAppointmentType } from "../types";

const SITE_EMAIL = "4d.detailing.ln@gmail.com";

const loadEmail = () =>
  Promise.all([
    import("@react-email/components"),
    import("@emailjs/browser"),
    import("@features/booking/email/NotifyUser"),
    import("@features/booking/email/NotifyAdmin"),
  ]);

export const preloadEmail = () => {
  loadEmail().catch(() => {});
};

export const sendNotificationEmails = async (data: NewAppointmentType) => {
  const [
    { render },
    { default: emailjs },
    { default: NotifyUser },
    { default: NotifyAdmin },
  ] = await loadEmail();

  const [notifyUser, notifyAdmin] = await Promise.all([
    render(<NotifyUser {...data} />),
    render(<NotifyAdmin {...data} />),
  ]);

  const send = (params: Record<string, string>) => {
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      params,
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
    );
  };

  await Promise.all([
    send({
      to_email: data.email,
      from_email: SITE_EMAIL,
      subject: `Zaprimili smo vaš upit za uslugu ${data.service}`,
      email_template: notifyUser,
      name: "4D Detailing",
    }),
    send({
      to_email: SITE_EMAIL,
      from_email: data.email,
      subject: `Novi upit za termin: ${data.service}`,
      email_template: notifyAdmin,
      name: data.fullName,
    }),
  ]);
};
