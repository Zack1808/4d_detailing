import React, { useEffect, useCallback, useRef } from "react";
import { IoMail } from "react-icons/io5";
import { FaClock, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

import { useScrollPosition } from "../context/scrollContext";

import transition from "../helpers/transition";

import { Header, Input, Textarea, Button } from "../components";

import "../css/pages/Contact.css";

const Contact = () => {
  const { resetScroll } = useScrollPosition();

  const formRef = useRef(null);

  useEffect(() => resetScroll(), []);

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

  return (
    <div className="page-container">
      <Header
        title="Obratite nam se s povjerenjem"
        bgImage="https://images.unsplash.com/photo-1485770958101-9dd7e4ea6d93?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <main className="contact">
        <article className="container">
          <section>
            <p>
              U slučaju dodatnih pitanja, nedoumica ili za informacije o našim
              uslugama i cijenama, možete nas kontaktirati putem ovih usluga:
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

            <iframe src="https://maps.google.com/maps?q=rakitovec%20274&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" />
          </section>

          <section>
            <form onSubmit={handleSubmit} ref={formRef}>
              <Input
                placeholder="Ime"
                label="Ime"
                name="name"
                id="name"
                type="text"
                required
              />
              <Input
                placeholder="Prezime"
                label="Prezime"
                name="surname"
                id="surname"
                type="text"
                required
              />
              <Input
                placeholder="Email"
                label="Email"
                name="email"
                id="email"
                type="email"
                required
              />
              <Input
                placeholder="Predmet"
                label="Predmet"
                name="subject"
                id="subject"
                type="text"
                required
              />
              <Textarea
                placeholder="Poruka"
                label="Poruka"
                name="message"
                id="message"
                required
              />
              <Button primary>Pošalji</Button>
            </form>
          </section>
        </article>
      </main>
    </div>
  );
};

export default transition(Contact);
