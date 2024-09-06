import React, { useEffect } from "react";

import { Header } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Privacy.css";

const Privacy = ({ resetScroll }) => {
  useEffect(() => {
    resetScroll();
  }, [resetScroll]);

  return (
    <div>
      <Header title="Pravila privatnosti" />
      <div className="privacy-container">
        <div className="privacy-content">
          <h2>1. Voditelj obrade</h2>
          <p>Obrt za detailing 4D Detailing</p>
          <h2>2. Podaci koje prikupljamo</h2>
          <p>
            Jedini osobni podaci koje prikupljamo su oni koje dobrovoljno
            unesete putem kontakt obrasca na našoj web stranici. Ti podaci mogu
            uključivati:
            <ul>
              <li>Ime i prezime</li>
              <li>Email adresa</li>
              <li>Predmet maila kojeg unesete</li>
              <li>Poruka koju nam šaljete</li>
            </ul>
          </p>

          <h2>3. Kako koristimo vaše podatke</h2>
          <p>
            Prikupljene podatke koristimo isključivo u svrhu odgovaranja na vaše
            upite ili pružanja dodatnih informacija koje ste zatražili. Vaši
            podaci neće biti korišteni u marketinške svrhe bez vaše izričite
            dozvole.
          </p>
          <h2>4. Dijeljenje podataka</h2>
          <p>Vaši podaci neće biti dijeljeni s trećim stranama.</p>
          <h2>5. Kolačići</h2>
          <p>
            Naša web stranica trenutno ne koristi kolačiće za praćenje
            aktivnosti korisnika ili prikupljanje osobnih podataka.
          </p>
          <h2>6. Sigurnost podataka</h2>
          <p>
            Poduzimamo sve razumne mjere kako bismo osigurali zaštitu vaših
            osobnih podataka. Ipak, imajte na umu da nijedna metoda prijenosa
            podataka putem interneta ili metoda elektroničkog pohranjivanja nije
            100% sigurna.
          </p>
          <h2>7. Vaša prava</h2>
          <p>
            Imate pravo na pristup, ispravak ili brisanje osobnih podataka koje
            ste nam dostavili. Ako želite ostvariti bilo koje od ovih prava,
            molimo vas da nas kontaktirate putem{" "}
            <a href="mailto:4d.detailing.ln@gmail.com">
              4d.detailing.ln@gmail.com
            </a>
            .
          </p>
          <h2>8. Izmjene pravila privatnosti</h2>
          <p>
            Zadržavamo pravo izmjene ovih pravila privatnosti u bilo kojem
            trenutku. Svaka promjena bit će objavljena na ovoj stranici.
          </p>
          <h2>9. Kontakt</h2>
          <p>
            Ako imate bilo kakvih pitanja u vezi s našim pravilima privatnosti,
            slobodno nas kontaktirajte putem{" "}
            <a href="mailto:4d.detailing.ln@gmail.com">
              4d.detailing.ln@gmail.com
            </a>{" "}
            ili putem kontakt obrasca na našoj web stranici.
          </p>
        </div>
      </div>
    </div>
  );
};

export default transition(Privacy);
