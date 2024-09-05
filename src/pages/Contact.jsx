import React, { useEffect } from "react";

import { Header, Input } from "../components";

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
            </form>
          </div>
          <div className="contact-info">
            <img src="/hero-bg-big.webp" alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default transition(Contact);
