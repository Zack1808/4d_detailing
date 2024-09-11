import React, { useEffect, useCallback, useRef } from "react";
import { IoMail } from "react-icons/io5";
import { FaClock, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

import { Header, Input, Textarea, Button } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Contact.css";

const Contact = React.memo(({ resetScroll }) => {
  const formRef = useRef();

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (!formRef.current) return;
    emailjs
      .sendForm(
        import.meta.env.VITE_APP_EMAIL_SERVICE_ID,
        import.meta.env.VITE_APP_EMAIL_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_APP_EMAIL_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          toast.success("Upit poslan!", { theme: "dark" });
        },
        (error) => {
          toast.error("Nešto je pošlo po zlu", { theme: "dark" });
        }
      );
  }, []);

  useEffect(() => {
    resetScroll();
  }, [resetScroll]);

  return (
    <div>
      <Header title="Kontakt" />
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-form">
            <h2>Kontaktirajte nas</h2>
            <p>
              U slučaju dodatnih pitanja, nedoumica ili za informacije o našim
              uslugama i cijenama, možete nas kontaktirati putem e-pošte,
              telefona, SMS-a, WhatsApp poruka ili kontakt obrasca.
            </p>
            <ul className="contact-data">
              <li>
                <a href="mailto:4d.detailing.ln@gmail.com">
                  <IoMail aria-hidden="true" />
                  <p>
                    <strong>Email:</strong> 4d.detailing.ln@gmail.com
                  </p>
                </a>
              </li>
              <li>
                <a href="tel:+385977588716">
                  <FaPhoneAlt aria-hidden="true" />
                  <p>
                    <strong>Telefon:</strong> +385 97 758 8716
                  </p>
                </a>
              </li>
              <li>
                <span>
                  <FaClock aria-hidden="true" />
                  <p>
                    <strong>Radno vrijeme:</strong> po dogovoru
                  </p>
                </span>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/kQ868KeYKgo41F1r8"
                  target="_blank"
                >
                  <FaLocationDot aria-hidden="true" />
                  <p>
                    <strong>Lokacija sjedišta:</strong> Rakitovec 274, 10410
                    Velika Gorica
                  </p>
                </a>
              </li>
            </ul>
            <iframe src="https://maps.google.com/maps?q=rakitovec%20274&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"></iframe>
          </div>
          <form ref={formRef} onSubmit={handleSubmit}>
            <Input
              label="Ime"
              id="name"
              placeholder="Ivan"
              type="text"
              required
              name="name"
            />
            <Input
              label="Prezime"
              id="surname"
              placeholder="Ivić"
              type="text"
              required
              name="surname"
            />
            <Input
              label="Email"
              id="email"
              placeholder="ivoivic@gmail.com"
              type="email"
              required
              name="email"
            />
            <Input
              label="Predmet"
              id="subject"
              placeholder="Narudžba za detailing"
              type="text"
              required
              name="subject"
            />
            <Textarea
              label="Poruka"
              placeholder="Želim napraviti termin."
              id="message"
              name="message"
            />
            <Button primary style={{ alignSelf: "flex-end" }}>
              Pošalji
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
});

export default transition(Contact);
