import React from "react";

import { Header } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Privacy.css";

const Privacy = () => {
  return (
    <div className="page-container">
      <Header
        title="Pravila privatnosti"
        bgImage="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <main className="privacy">
        <article className="container">
          <section>
            <h2>1. Voditelj obrade</h2>
            <p>Obrt za detailing 4D Detailing</p>
          </section>

          <section>
            <h2>2. Podaci koje prikupljamo</h2>
            <p>
              Osobni podaci koje prikupljamo uključuju one koje dobrovoljno
              unesete putem kontakt obrasca na našoj web stranici. Ti podaci
              mogu uključivati:
            </p>
            <ul>
              <li>Ime i prezime</li>
              <li>Email adresa</li>
              <li>Predmet maila kojeg unesete</li>
              <li>Poruka koju nam šaljete</li>
            </ul>
            <p>
              Također prikupljamo anonimne podatke o posjećenosti stranice
              korištenjem alata Google Analytics. Ti podaci mogu uključivati:
            </p>
            <ul>
              <li>IP adresu (anonimiziranu)</li>
              <li>Vrstu preglednika i operativnog sustava</li>
              <li>Trajanje posjete</li>
              <li>Stranice koje posjećujete</li>
            </ul>
          </section>

          <section>
            <h2>3. Kako koristimo vaše podatke</h2>
            <p>
              Prikupljene podatke koristimo isključivo u svrhu odgovaranja na
              vaše upite ili pružanja dodatnih informacija koje ste zatražili.
              Anonimni podaci prikupljeni putem Google Analytics-a koriste se za
              analizu posjećenosti i optimizaciju naše web stranice.
            </p>
          </section>

          <section>
            <h2>4. Dijeljenje podataka</h2>
            <p>
              Vaši osobni podaci neće biti dijeljeni s trećim stranama. Anonimni
              podaci prikupljeni putem Google Analytics-a mogu biti dostupni
              Googleu u skladu s njihovim uvjetima korištenja.
            </p>
          </section>

          <section>
            <h2>5. Kolačići</h2>
            <p>
              Naša web stranica koristi kolačiće za praćenje aktivnosti
              korisnika i prikupljanje anonimnih podataka putem Google
              Analytics-a. Ovi kolačići omogućuju nam:
            </p>
            <ul>
              <li>Analizu posjećenosti stranice</li>
              <li>
                Razumijevanje načina na koji korisnici koriste našu stranicu
              </li>
            </ul>
            <p>
              Možete onemogućiti kolačiće u postavkama vašeg preglednika. Više o
              Google Analytics kolačićima možete saznati na{" "}
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noopener noreferrer"
              >
                službenim Google stranicama
              </a>
              .
            </p>
          </section>

          <section>
            <h2>6. Sigurnost podataka</h2>
            <p>
              Poduzimamo sve razumne mjere kako bismo osigurali zaštitu vaših
              osobnih podataka. Ipak, imajte na umu da nijedna metoda prijenosa
              podataka putem interneta ili metoda elektroničkog pohranjivanja
              nije 100% sigurna.
            </p>
          </section>

          <section>
            <h2>7. Vaša prava</h2>
            <p>
              Imate pravo na pristup, ispravak ili brisanje osobnih podataka
              koje ste nam dostavili. Ako želite ostvariti bilo koje od ovih
              prava, molimo vas da nas kontaktirate putem{" "}
              <a href="mailto:4d.detailing.ln@gmail.com">
                4d.detailing.ln@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2>8. Izmjene pravila privatnosti</h2>
            <p>
              Zadržavamo pravo izmjene ovih pravila privatnosti u bilo kojem
              trenutku. Svaka promjena bit će objavljena na ovoj stranici.
            </p>
          </section>

          <section>
            <h2>9. Kontakt</h2>
            <p>
              Ako imate bilo kakvih pitanja u vezi s našim pravilima
              privatnosti, slobodno nas kontaktirajte putem{" "}
              <a href="mailto:4d.detailing.ln@gmail.com">
                4d.detailing.ln@gmail.com
              </a>
              ili putem kontakt obrasca na našoj web stranici.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default transition(Privacy);
