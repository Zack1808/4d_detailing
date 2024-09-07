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
          <h3>1. Voditelj obrade</h3>
          <p>Obrt za detailing 4D Detailing</p>
          <h3>2. Podaci koje prikupljamo</h3>
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

          <h3>3. Kako koristimo vaše podatke</h3>
          <p>
            Prikupljene podatke koristimo isključivo u svrhu odgovaranja na vaše
            upite ili pružanja dodatnih informacija koje ste zatražili. Vaši
            podaci neće biti korišteni u marketinške svrhe bez vaše izričite
            dozvole.
          </p>
          <h3>4. Dijeljenje podataka</h3>
          <p>Vaši podaci neće biti dijeljeni s trećim stranama.</p>
          <h3>5. Kolačići</h3>
          <p>
            Naša web stranica trenutno ne koristi kolačiće za praćenje
            aktivnosti korisnika ili prikupljanje osobnih podataka.
          </p>
          <h3>6. Sigurnost podataka</h3>
          <p>
            Poduzimamo sve razumne mjere kako bismo osigurali zaštitu vaših
            osobnih podataka. Ipak, imajte na umu da nijedna metoda prijenosa
            podataka putem interneta ili metoda elektroničkog pohranjivanja nije
            100% sigurna.
          </p>
          <h3>7. Vaša prava</h3>
          <p>
            Imate pravo na pristup, ispravak ili brisanje osobnih podataka koje
            ste nam dostavili. Ako želite ostvariti bilo koje od ovih prava,
            molimo vas da nas kontaktirate putem{" "}
            <a href="mailto:4d.detailing.ln@gmail.com">
              4d.detailing.ln@gmail.com
            </a>
            .
          </p>
          <h3>8. Izmjene pravila privatnosti</h3>
          <p>
            Zadržavamo pravo izmjene ovih pravila privatnosti u bilo kojem
            trenutku. Svaka promjena bit će objavljena na ovoj stranici.
          </p>
          <h3>9. Kontakt</h3>
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
