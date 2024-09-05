import React, { useEffect } from "react";
import { IoMail } from "react-icons/io5";
import { FaClock, FaPhoneAlt } from "react-icons/fa";

import { Header, Input, Textarea, Button } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Contact.css";

const Contact = React.memo(({ resetScroll }) => {
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium obcaecati velit explicabo repudiandae saepe omnis
              perferendis consectetur et a labore, nam laboriosam quisquam totam
              similique, assumenda iusto doloremque ad fugit. Impedit deleniti
              ipsum animi, iste corporis sapiente facilis reprehenderit sit, et
              laudantium accusamus ab ad? Dolor voluptates pariatur ducimus?
              Nemo, asperiores. Libero excepturi culpa suscipit eaque neque aut
              eum perferendis hic laboriosam! Pariatur veniam temporibus
              doloremque quam, culpa nesciunt unde magnam ab beatae cupiditate
              sunt, illum autem fugiat voluptas facere veritatis possimus. Quam
              odit eos maiores molestiae rerum delectus. Deserunt, non fugit!
              Eaque ipsam deserunt porro officiis commodi cumque incidunt.
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
            </ul>
          </div>
          <form>
            <Input
              label="Ime"
              id="name"
              placeholder="Ivan"
              type="text"
              required
            />
            <Input
              label="Prezime"
              id="surname"
              placeholder="Ivić"
              type="text"
              required
            />
            <Input
              label="Email"
              id="email"
              placeholder="ivoivic@gmail.com"
              type="email"
              required
            />
            <Input
              label="Predmet"
              id="subject"
              placeholder="Narudžba za detailing"
              type="text"
              required
            />
            <Textarea label="Poruka" placeholder="Želim napraviti termin." />
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
