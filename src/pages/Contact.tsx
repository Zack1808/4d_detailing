import React, { useEffect } from "react";
import { FaEnvelope, FaPhone, FaClock, FaLocationDot } from "react-icons/fa6";

import Button from "../components/common/Button";

import Container from "../components/layout/Container";

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Container className="pb-3!" id="contact-data">
        <h2 className="text-4xl text-dark dark:text-light mt-30 font-bold">
          Rezervirajte svoj termin
        </h2>
        <div className="flex gap-3 mt-3 w-full">
          <div className="flex flex-col gap-3 flex-1">
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

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.767048363273!2d16.138965799999994!3d45.6554997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476687ea7e828591%3A0xf8f5db96b6352889!2sRakitovec%20274%2C%2010419%2C%20Rakitovec!5e0!3m2!1sen!2shr!4v1789139385570!5m2!1sen!2shr"
              loading="lazy"
              className="w-full h-full rounded-xs"
            ></iframe>
          </div>
          <form className="flex flex-col gap-3 flex-1"></form>
        </div>
      </Container>
    </main>
  );
};

export default Contact;
