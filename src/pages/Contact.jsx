import React, { useEffect, useCallback, useRef } from "react";
import { IoMail } from "react-icons/io5";
import { FaClock, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import transition from "../helpers/transition";

import { Header, Input, Textarea, Button } from "../components";

import "../css/pages/Contact.css";

const Contact = () => {
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
    <>
      <Header title={contactData.title} bgImage={contactData.headerImg} />

      <main className="contact">
        <article className="container">
          <section>
            <p>
              {contactData.content?.split(/\n/g).map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>

            <ul className="contact-data">
              <li>
                <a href={`mailto:${contactData.email}`}>
                  <IoMail aria-hidden="true" />
                  <p>
                    <strong>Email:</strong> {contactData.email}
                  </p>
                </a>
              </li>
              <li>
                <a href={`tel:${contactData.mobile}`}>
                  <FaPhoneAlt aria-hidden="true" />
                  <p>
                    <strong>Telefon:</strong> {contactData.mobile}
                  </p>
                </a>
              </li>
              <li>
                <span>
                  <FaClock aria-hidden="true" />
                  <p>
                    <strong>Radno vrijeme:</strong> {contactData.worktime}
                  </p>
                </span>
              </li>
              <li>
                <a href={contactData.maps} target="_blank">
                  <FaLocationDot aria-hidden="true" />
                  <p>
                    <strong>Lokacija sjedišta:</strong> {contactData.location}
                  </p>
                </a>
              </li>
            </ul>

            <iframe title="Lokacija sjedišta" src={contactData.maps} />
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
};

export default Contact;
