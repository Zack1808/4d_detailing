import React, { useEffect, useState, useMemo, useCallback } from "react";
import { FaEnvelope, FaPhone, FaClock, FaLocationDot } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Textarea from "../components/common/Textarea";
import DatePicker from "../components/common/DatePicker";
import SEO from "../components/common/SEO";

import Container from "../components/layout/Container";
import Reveal from "../components/layout/Reveal";

import Tesseract from "../components/animated/Tessaract";
import Wheel from "../components/animated/Wheel";
import Polisher from "../components/animated/Polisher";

import { useData } from "../context/DataContext";

import { useGetPageData } from "../hooks/useGetPageData";

import { parseDate, toMidnight } from "../utils/date";
import { notifyError, notifySuccess } from "../utils/toast";

import type { AppointmentType } from "../types/data";

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { isDark, services, appointments } = useData();

  const location = useLocation();
  const navigate = useNavigate();

  const { setAppointment } = useGetPageData();

  const loaders = [
    <Tesseract isDark={isDark} size={60} thickness={15} speed={10} />,
    <Wheel isDark={isDark} size={60} speed={3} />,
    <Polisher isDark={isDark} size={80} speed={3} />,
  ];

  const [selectLoader] = useState<number>(() => {
    const randomIndex = Math.floor(Math.random() * loaders.length);
    return randomIndex;
  });
  const [selectValue, setSelectValue] = useState<string | string[]>(
    "general_question",
  );

  const today = new Date();

  const options = useMemo(
    () => [
      {
        value: "general_question",
        label: "Općenito pitanje",
      },
      ...services.map((service) => ({
        label: service.title,
        value: service.slug,
      })),
    ],
    [services],
  );

  const loadEmail = () =>
    Promise.all([
      import("@react-email/components"),
      import("@emailjs/browser"),
      import("../components/email/NotifyUser"),
      import("../components/email/NotifyAdmin"),
    ]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.currentTarget;

      if (!form.checkValidity()) {
        const invalidField = form.querySelector<HTMLElement>(":invalid");

        invalidField?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        return;
      }

      setLoading(true);

      const formData = new FormData(form);
      const values = Object.fromEntries(
        formData.entries(),
      ) as unknown as AppointmentType;

      const selectedService = options.filter(
        (service) => service.value === values.service,
      );

      const data = {
        ...values,
        service: selectedService[0].label,
        isConfirmed: false,
        isBlocked: false,
        toDate: "",
      };

      try {
        const savePromise = setAppointment(data);

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

        await Promise.all([
          savePromise,

          emailjs.send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            {
              to_email: data.email,
              from_email: "4d.detailing.ln@gmail.com",
              subject: `Zaprimili smo vaš upit za uslugu ${data.service}`,
              email_template: notifyUser,
              name: "4D Detailing",
            },
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
          ),

          emailjs.send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            {
              to_email: "4d.detailing.ln@gmail.com",
              from_email: data.email,
              subject: `Novi upit za termin: ${data.service}`,
              email_template: notifyAdmin,
              name: data.fullName,
            },
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
          ),
        ]);

        notifySuccess("Vaš upit je uspješno poslan!");
        form.reset();
      } catch (err: unknown) {
        notifyError(
          err instanceof Error ? err.message : "Nešto je pošlo po zlu",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const blockDates = useCallback((value: string) => {
    const date = parseDate(value);

    if (!date) return false;

    const target = toMidnight(date);

    return appointments.some(({ dateFrom, dateTo, isBlocked }) => {
      if (!isBlocked) return false;

      const from = parseDate(dateFrom as string);
      const to = parseDate(dateTo as string);

      if (!from || !to) return false;

      return target >= toMidnight(from) && target <= toMidnight(to);
    });
  }, []);

  const handleSelectChange = (value: string | string[]) => {
    setSelectValue(value);

    if (value === "general_question") {
      navigate(`/kontakt`, {
        replace: true,
      });

      return;
    }
    navigate(`/kontakt?usluga=${value}`, {
      replace: true,
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const service = searchParams.get("usluga");

    if (!service) return;

    setSelectValue(service);
  }, [location.search]);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadEmail();
  }, []);

  return (
    <main>
      <SEO
        title="Kontakt | 4D Detailing Velika Gorica"
        canonical="https://4d-detailing.hr/kontakt"
      />
      <Container id="contact-data">
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0`}
          delay={200}
        >
          <h2 className="text-4xl text-dark dark:text-light mt-30 font-bold">
            Rezervirajte svoj termin
          </h2>
        </Reveal>
        <div className="flex gap-12 mt-3 w-full min-h-0 lg:flex-row flex-col">
          <div className="flex flex-col gap-3 flex-1 min-h-0">
            <div className="flex flex-col gap-3">
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={`opacity-100 translate-x-0`}
                delay={300}
              >
                <p className="text-dark dark:text-light font-light">
                  Želite svom vozilu pružiti pažnju koju zaslužuje? Ispunite
                  obrazac i pošaljite nam upit za termin, a mi ćemo vam se
                  javiti kako bismo dogovorili sve detalje.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={`opacity-100 translate-x-0`}
                delay={400}
              >
                <p className="text-dark dark:text-light font-light">
                  Niste sigurni koja je usluga najbolji izbor za vaše vozilo?
                  Slobodno nam se obratite – rado ćemo odgovoriti na vaša
                  pitanja i preporučiti opciju koja najbolje odgovara vašim
                  potrebama.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={`opacity-100 translate-x-0`}
                delay={500}
              >
                <p className="text-dark dark:text-light font-light">
                  Ako vam je jednostavnije, možete nas kontaktirati telefonom
                  ili e-mailom. Za rezervaciju termina možete koristiti i
                  obrazac u nastavku.
                </p>
              </Reveal>
            </div>

            <ul className="mt-3">
              <li>
                <Reveal
                  transitionFrom="opacity-0 -translate-x-6"
                  transitionTo={`opacity-100 translate-x-0`}
                  delay={600}
                >
                  <Button
                    variant="none"
                    className="gap-3 px-0!"
                    href="mailto:4d.detailing.ln@gmail.com"
                  >
                    <FaEnvelope className="text-lg" />
                    Email: 4d.detailing.ln@gmail.com
                  </Button>
                </Reveal>
              </li>
              <li>
                <Reveal
                  transitionFrom="opacity-0 -translate-x-6"
                  transitionTo={`opacity-100 translate-x-0`}
                  delay={700}
                >
                  <Button
                    variant="none"
                    className="gap-3 px-0!"
                    href="tel:+385977588716"
                  >
                    <FaPhone className="text-lg" /> Telefon: +385 97 758 8716
                  </Button>
                </Reveal>
              </li>
              <li>
                <Reveal
                  transitionFrom="opacity-0 -translate-x-6"
                  transitionTo={`opacity-100 translate-x-0`}
                  className="text-dark dark:text-light flex gap-3 items-center py-3 font-medium"
                  delay={800}
                >
                  <FaClock className="text-lg" /> Radno vrijeme: Po dogovoru
                </Reveal>
              </li>
              <li>
                <Reveal
                  transitionFrom="opacity-0 -translate-x-6"
                  transitionTo={`opacity-100 translate-x-0`}
                  delay={900}
                >
                  <Button
                    variant="none"
                    className="gap-3 px-0!"
                    href="https://maps.app.goo.gl/BM2TStTNWFyDirfr9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLocationDot className="text-lg" /> Lokacija sjedišta:
                    Rakitovec 274, 10410 Velika Gorica
                  </Button>
                </Reveal>
              </li>
            </ul>

            <Reveal
              className="lg:flex-1 min-h-0 relative rounded-xs overflow-hidden group lg:mb-18.5"
              transitionFrom="opacity-0 lg:-translate-x-6 lg:translate-y-0 translate-y-6"
              transitionTo={`opacity-100 translate-x-0 translate-y-0`}
              delay={1000}
            >
              <div className="absolute inset-0 bg-gray-light/20 dark:bg-gray-dark/20 flex items-center justify-center -z-10 text-dark dark:text-light flex-col font-semibold gap-3">
                <div className="flex flex-col gap-3">
                  {loaders[selectLoader]}
                  Loading...
                </div>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.767048363273!2d16.138965799999994!3d45.6554997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476687ea7e828591%3A0xf8f5db96b6352889!2sRakitovec%20274%2C%2010419%2C%20Rakitovec!5e0!3m2!1sen!2shr!4v1789139385570!5m2!1sen!2shr"
                loading="lazy"
                title="Karta lokacije, Rakitovec 274, Velika Gorica"
                className="w-full h-full min-h-60"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div
                className="
                  absolute inset-0
                  rounded-xs
                  bg-black/0
                  group-hover:bg-dark/30
                  transition-colors duration-200
                  pointer-events-none
                "
              />
            </Reveal>
          </div>
          <form
            className="flex flex-col gap-6 lg:flex-2"
            onSubmit={handleSubmit}
          >
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
                  value={selectValue}
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
                  min={`${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}.${today.getFullYear()}`}
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
        </div>
      </Container>
    </main>
  );
};

export default Contact;
