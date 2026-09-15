import React, { useEffect } from "react";

import List from "../components/common/List";

import Container from "../components/layout/Container";

import { useData } from "../context/DataContext";

const PRIVATE_DATA = [
  "Ime i prezime",
  "Email adresa",
  "Broj telefona",
  "Predmet maila",
  "Marka vozila",
  "Željeni termin",
  "Napomena koju nam šaljete",
];

const ANON_DATA = [
  "IP adresu (anonimiziranu)",
  "Vrsu preglednika i operativnog sustava",
  "Trajanje posjete",
  "Stranice koje posjećujete",
];

const COOKIES = [
  "Analizu posjećenosti stranice",
  "Razumijevanje načina na koji korisnici koriste našu stranicu",
];

const Privacy: React.FC = () => {
  const { isDark } = useData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Container>
        <h2 className="text-dark dark:text-light mt-30 text-5xl font-bold">
          Pravila privatnosti
        </h2>

        <ul className="flex flex-col gap-12 mt-15">
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">1. Voditelj obrade</h3>
            <p>Obrt za detailing 4D Detailing</p>
          </li>
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">
              2. Podaci koje prikupljamo
            </h3>
            <p>
              Osobni podaci koje prikupljamo uključuju one koje dobrovoljno
              unesete putem kontakt obrasca na našoj web stranici. Ti podaci
              mogu uključivati:
            </p>
            <List list={PRIVATE_DATA} isDark={isDark} inset />
            <p>
              Također prikupljamo anonimne podatke o posjećenosti stranice
              korištenjem alata Google Analytics. Ti podaci mogu uključivati:
            </p>
            <List list={ANON_DATA} isDark={isDark} inset />
          </li>
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">
              3. Kako koristimo vaše podatke
            </h3>
            <p>
              Prikupljene podatke koristimo isključivo u svrhu odgovaranja na
              vaše upite ili pružanja dodatnih informacija koje ste zatražili.
              Anonimni podaci prikupljeni putem Google Analytics-a koriste se za
              analizu posjećenosti i optimizaciju naše web stranice.
            </p>
          </li>
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">4. Dijeljenje podataka</h3>
            <p>
              Vaši osobni podaci neće biti dijeljeni s trećim stranama. Anonimni
              podaci prikupljeni putem Google Analytics-a mogu biti dostupni
              Googleu u skladu s njihovim uvjetima korištenja.
            </p>
          </li>
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">5. Kolačići</h3>
            <p>
              Naša web stranica koristi kolačiće za praćenje aktivnosti
              korisnika i prikupljanje anonimnih podataka putem Google
              Analytics-a. Ovi kolačići omogućuju nam:
            </p>
            <List list={COOKIES} isDark={isDark} inset />
            <p>
              Možete onemogućiti kolačiće u postavkama vašeg preglednika. Više o
              Google Analytics kolačićima možete saznati na{" "}
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                className="font-semibold underline"
              >
                službenim Google stranicama
              </a>
              .
            </p>
          </li>
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">6. Sigurnost podataka</h3>
            <p>
              Poduzimamo sve razumne mjere kako bismo osigurali zaštitu vaših
              osobnih podataka. Ipak, imajte na umu da nijedna metoda prijenosa
              podataka putem interneta ili metoda elektroničkog pohranjivanja
              nije 100% sigurna.
            </p>
          </li>
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">7. Vaša prava</h3>
            <p>
              Imate pravo na pristup, ispravak ili brisanje osobnih podataka
              koje ste nam dostavili. Ako želite ostvariti bilo koje od ovih
              prava, molimo vas da nas kontaktirate putem{" "}
              <a
                href="mailto:4d.detailing.ln@gmail.com"
                className="font-semibold underline"
              >
                4d.detailing.ln@gmail.com
              </a>
              .
            </p>
          </li>
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">
              8. Izmjene pravila privatnosti
            </h3>
            <p>
              Zadržavamo pravo izmjene ovih pravila privatnosti u bilo kojem
              trenutku. Svaka promjena bit će objavljena na ovoj stranici.
            </p>
          </li>
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">9. Kontakt</h3>
            <p>
              Ako imate bilo kakvih pitanja u vezi s našim pravilima
              privatnosti, slobodno nas kontaktirajte putem{" "}
              <a
                href="mailto:4d.detailing.ln@gmail.com"
                className="font-semibold underline"
              >
                4d.detailing.ln@gmail.com
              </a>{" "}
              ili puten kontakt obrasca na našoj web stranici.
            </p>
          </li>
        </ul>
      </Container>
    </main>
  );
};

export default Privacy;
