import React, { useEffect, useState, useMemo, useCallback } from "react";
import { FaEnvelope, FaPhone, FaClock, FaLocationDot } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Textarea from "../components/common/Textarea";
import DatePicker from "../components/common/DatePicker";

import Container from "../components/layout/Container";
import Reveal from "../components/layout/Reveal";

import Tesseract from "../components/animated/Tessaract";
import Wheel from "../components/animated/Wheel";
import Polisher from "../components/animated/Polisher";

import { useData } from "../context/DataContext";

const Contact: React.FC = () => {
  const { isDark, services } = useData();

  const location = useLocation();
  const navigate = useNavigate();

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

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
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

      const formData = new FormData(form);
      const values = Object.fromEntries(formData.entries());

      console.log(values);
    },
    [],
  );

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
  }, []);

  return (
    <main>
      <Container id="contact-data">
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0 md:delay-200`}
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
                transitionTo={`opacity-100 translate-x-0 md:delay-400`}
              >
                <p className="text-dark dark:text-light">
                  Želite svom vozilu pružiti pažnju koju zaslužuje? Ispunite
                  obrazac i pošaljite nam upit za termin, a mi ćemo vam se
                  javiti kako bismo dogovorili sve detalje.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={`opacity-100 translate-x-0 md:delay-600`}
              >
                <p className="text-dark dark:text-light">
                  Niste sigurni koja je usluga najbolji izbor za vaše vozilo?
                  Slobodno nam se obratite – rado ćemo odgovoriti na vaša
                  pitanja i preporučiti opciju koja najbolje odgovara vašim
                  potrebama.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={`opacity-100 translate-x-0 md:delay-800`}
              >
                <p className="text-dark dark:text-light">
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
                  transitionTo={`opacity-100 translate-x-0 md:delay-1000`}
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
                  transitionTo={`opacity-100 translate-x-0 md:delay-1200`}
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
                  transitionTo={`opacity-100 translate-x-0 md:delay-1400`}
                  className="text-dark dark:text-light flex gap-3 items-center py-3 font-semibold"
                >
                  <FaClock className="text-lg" /> Radno vrijeme: Po dogovoru
                </Reveal>
              </li>
              <li>
                <Reveal
                  transitionFrom="opacity-0 -translate-x-6"
                  transitionTo={`opacity-100 translate-x-0 md:delay-1600`}
                >
                  <Button
                    variant="none"
                    className="gap-3 px-0!"
                    href="https://maps.app.goo.gl/BM2TStTNWFyDirfr9"
                    target="_blank"
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
              transitionTo={`opacity-100 translate-x-0 translate-y-0 md:delay-1800`}
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
            className="flex flex-col gap-6 lg:flex-1"
            onSubmit={handleSubmit}
          >
            <Reveal
              transitionFrom="opacity-0"
              transitionTo={`opacity-100 md:delay-400`}
            >
              <fieldset className="w-full flex flex-col gap-3">
                <label htmlFor="fullName" className="text-dark dark:text-light">
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
              transitionTo={`opacity-100 md:delay-600`}
            >
              <fieldset className="w-full flex flex-col gap-3">
                <label htmlFor="email" className="text-dark dark:text-light">
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
              transitionTo={`opacity-100 md:delay-600`}
            >
              <fieldset className="w-full flex flex-col gap-3">
                <label htmlFor="phone" className="text-dark dark:text-light">
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
              transitionTo={`opacity-100 md:delay-800`}
            >
              <fieldset className="w-full flex flex-col gap-3">
                <label htmlFor="service" className="text-dark dark:text-light">
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
              transitionTo={`opacity-100 md:delay-1000`}
            >
              <fieldset className="w-full flex flex-col gap-3">
                <label htmlFor="carType" className="text-dark dark:text-light">
                  Model vozila *
                </label>
                <Input
                  required
                  type="text"
                  className="w-full scroll-mt-40"
                  placeholder="Mazda 3 Hatchback 2023"
                  id="carType"
                  name="carType"
                />
              </fieldset>
            </Reveal>

            <Reveal
              transitionFrom="opacity-0"
              transitionTo={`opacity-100 md:delay-1200`}
            >
              <fieldset className="w-full flex flex-col gap-3">
                <label htmlFor="date" className="text-dark dark:text-light">
                  Željeni termin
                </label>
                <DatePicker
                  id="date"
                  min={`${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}.${today.getFullYear()}`}
                  name="date"
                />
              </fieldset>
            </Reveal>

            <Reveal
              transitionFrom="opacity-0"
              transitionTo={`opacity-100 md:delay-1400`}
            >
              <fieldset className="w-full flex flex-col gap-3">
                <label htmlFor="message" className="text-dark dark:text-light">
                  Napomena / dodatni zahtjevi
                </label>
                <Textarea
                  className="w-full"
                  placeholder="Navedite dodatne detalje ili posebne zahtjeve..."
                  id="message"
                  name="message"
                />
              </fieldset>
            </Reveal>

            <Reveal
              transitionFrom="opacity-0"
              transitionTo={`opacity-100 md:delay-1600`}
              className="self-end"
            >
              <Button variant="primary">Pošalji upit</Button>
            </Reveal>
          </form>
        </div>
      </Container>
    </main>
  );
};

export default Contact;
