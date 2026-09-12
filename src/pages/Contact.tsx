import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaClock, FaLocationDot } from "react-icons/fa6";

import Button from "../components/common/Button";

import Container from "../components/layout/Container";

import Tesseract from "../components/animated/Tessaract";
import Wheel from "../components/animated/Wheel";
import Polisher from "../components/animated/Polisher";

import { useData } from "../context/DataContext";

const Contact: React.FC = () => {
  const { isDark } = useData();

  const loaders = [
    <Tesseract isDark={isDark} size={60} thickness={10} />,
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
      <Container id="contact-data">
        <h2 className="text-4xl text-dark dark:text-light mt-30 font-bold">
          Rezervirajte svoj termin
        </h2>
        <div className="flex gap-3 mt-3 w-full min-h-0">
          <div className="flex flex-col gap-3 flex-1 min-h-0">
            <p className="text-dark dark:text-light">
              Želite svom vozilu pružiti pažnju koju zaslužuje? Ispunite obrazac
              i pošaljite nam upit za termin, a mi ćemo vam se javiti kako bismo
              dogovorili sve detalje.
              <br />
              <br />
              Niste sigurni koja je usluga najbolji izbor za vaše vozilo?
              Slobodno nam se obratite – rado ćemo odgovoriti na vaša pitanja i
              preporučiti opciju koja najbolje odgovara vašim potrebama.
              <br />
              <br />
              Ako vam je jednostavnije, možete nas kontaktirati telefonom ili
              e-mailom. Za rezervaciju termina možete koristiti i obrazac u
              nastavku.
            </p>

            <ul className="mt-3">
              <li>
                <Button
                  variant="none"
                  className="gap-3 px-0!"
                  href="mailto:4d.detailing.ln@gmail.com"
                >
                  <FaEnvelope className="text-lg" />
                  Email: 4d.detailing.ln@gmail.com
                </Button>
              </li>
              <li>
                <Button
                  variant="none"
                  className="gap-3 px-0!"
                  href="tel:+385977588716"
                >
                  <FaPhone className="text-lg" /> Telefon: +385 97 758 8716
                </Button>
              </li>
              <li className="text-dark dark:text-light flex gap-3 items-center py-3 font-semibold">
                <FaClock className="text-lg" /> Radno vrijeme: Po dogovoru
              </li>
              <li>
                <Button
                  variant="none"
                  className="gap-3 px-0!"
                  href="https://maps.app.goo.gl/BM2TStTNWFyDirfr9"
                  target="_blank"
                >
                  <FaLocationDot className="text-lg" /> Lokacija sjedišta:
                  Rakitovec 274, 10410 Velika Gorica
                </Button>
              </li>
            </ul>

            <div className="flex-1 min-h-0 relative rounded-xs overflow-hidden group">
              <div className="absolute inset-0 bg-gray-light/20 dark:bg-gray-dark/20 flex items-center justify-center -z-10 text-dark dark:text-light flex-col font-semibold gap-3">
                {loaders[selectLoader]}
                Loading...
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
            </div>
          </div>
          <form className="flex flex-col gap-3 flex-1"></form>
        </div>
      </Container>
    </main>
  );
};

export default Contact;
