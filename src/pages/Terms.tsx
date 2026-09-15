import React, { useEffect } from "react";

import Container from "../components/layout/Container";

const Terms: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Container>
        <h2 className="text-dark dark:text-light mt-30 text-5xl font-bold">
          Uvijeti korištenja
        </h2>
        <p className="text-dark dark:text-light mt-6">
          Dobrodošli na našu web stranicu. Molimo vas da pažljivo pročitate ova
          pravila korištenja prije nego što nastavite koristiti stranicu.
          Korištenjem stranice pristajete na pridržavanje sljedećih uvjeta:
        </p>

        <ul className="flex flex-col gap-12 mt-15">
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">1. Opći uvijeti</h3>
            <p>
              Ova web stranica je osmišljena kako bi vam pružila informacije o
              našim uslugama auto detailinga. Također možete koristiti kontakt
              obrazac kako biste nas direktno kontaktirali.
            </p>
          </li>
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">2. Autorska prava</h3>
            <p>
              Svi sadržaji objavljeni na ovoj stranici, uključujući, ali ne
              ograničavajući se na tekstove, slike, grafike i logotipe,
              zaštićeni su autorskim pravima i ne smiju se koristiti bez
              prethodnog pismenog odobrenja vlasnika stranice. Zabranjena je
              distribucija, reprodukcija ili izmjena sadržaja bez dozvole.
            </p>
          </li>
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">3. Kontakt obrazac</h3>
            <p>
              Putem kontakt obrasca možete nas kontaktirati s upitima,
              prijedlozima ili zahtjevima za uslugama. Svi podaci prikupljeni
              putem obrasca koriste se isključivo u svrhu odgovora na vaš upit.
              Ne prikupljamo dodatne osobne podatke niti koristimo kolačiće na
              ovoj stranici.
            </p>
          </li>
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">4. Odgovornost</h3>
            <p>
              Iako se trudimo osigurati da su sve informacije na ovoj stranici
              točne i ažurirane, ne preuzimamo odgovornost za eventualne
              pogreške ili propuste u sadržaju. Korištenje stranice je
              isključivo na vlastitu odgovornost korisnika.
            </p>
          </li>
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">5. Vaša prava</h3>
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
            </p>
          </li>
          <li className="text-dark dark:text-light flex flex-col gap-3">
            <h3 className="font-semibold text-3xl">6. Izmjene pravila</h3>
            <p>
              Zadržavamo pravo izmjene ovih pravila korištenja u bilo kojem
              trenutku. Preporučujemo da povremeno provjerite ovu stranicu kako
              biste bili informirani o eventualnim promjenama.
            </p>
          </li>
        </ul>
      </Container>
    </main>
  );
};

export default Terms;
