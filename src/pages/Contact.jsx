import React, { useEffect, useCallback, useRef } from "react";
import { IoMail } from "react-icons/io5";
import { FaClock, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import { Header, Input, Textarea, Button } from "../components";

import "../css/pages/Contact.css";

const Contact = React.memo(() => {
  const { resetScroll } = useScrollPosition();

  const { contactData } = useStore();

  const formRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    const meta = document.createElement("meta");

    link.rel = "canonical";
    link.href = "https://4d-detailing.hr/kontakt";
    document.head.appendChild(link);

    meta.setAttribute("property", "og:url");
    meta.content = "https://4d-detailing.hr/kontakt";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(meta);
      resetScroll();
    };
  }, []);

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
        },
      )
      .then(
        () => {
          toast.success("Upit poslan!", { theme: "dark" });
        },
        (error) => {
          toast.error("Nešto je pošlo po zlu", { theme: "dark" });
        },
      );
  }, []);

  return (
    <>
      <Header
        title="Obratite nam se s povjerenjem"
        fallbackImage="https://images.unsplash.com/photo-1485770958101-9dd7e4ea6d93?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                <a href={`mailto:4d.detailing.ln@gmail.com`}>
                  <IoMail aria-hidden="true" />
                  <p>
                    <strong>Email:</strong> 4d.detailing.ln@gmail.com
                  </p>
                </a>
              </li>
              <li>
                <a href={`tel:+385 97 758 8716`}>
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
                  href={`https://maps.app.goo.gl/BM2TStTNWFyDirfr9`}
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

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.767049803596!2d16.136390876284516!3d45.65549967107774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476687ea7e828591%3A0xf8f5db96b6352889!2sRakitovec%20274%2C%2010419%2C%20Rakitovec!5e0!3m2!1sen!2shr!4v1783196063394!5m2!1sen!2shr"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
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
    </>
  );
});

export default Contact;
