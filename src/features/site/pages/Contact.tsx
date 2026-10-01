import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaClock, FaLocationDot } from "react-icons/fa6";

import Button from "@shared/components/Button";
import SEO from "@shared/components/SEO";

import AppointmentForm from "@/features/booking/components/AppointmentForm";

import Container from "@shared/components/Container";
import Reveal from "@shared/components/Reveal";

import Tesseract from "@features/site/components/animated/Tessaract";
import Wheel from "@features/site/components/animated/Wheel";
import Polisher from "@features/site/components/animated/Polisher";

import { useData } from "@features/catalog/context/DataContext";
import { useTheme } from "@/shared/context/ThemeContext";

const Contact: React.FC = () => {
  const { services } = useData();
  const { isDark } = useTheme();

  const loaders = [
    <Tesseract isDark={isDark} size={60} thickness={15} speed={10} />,
    <Wheel isDark={isDark} size={60} speed={3} />,
    <Polisher isDark={isDark} size={80} speed={3} />,
  ];

  const [selectLoader] = useState<number>(() => {
    const randomIndex = Math.floor(Math.random() * loaders.length);
    return randomIndex;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
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
          <AppointmentForm services={services} />
        </div>
      </Container>
    </main>
  );
};

export default Contact;
