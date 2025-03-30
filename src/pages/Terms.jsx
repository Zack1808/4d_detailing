import React, { useEffect } from "react";

import { useScrollPosition } from "../context/scrollContext";

import { Header } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Privacy.css";

const Terms = () => {
  const { resetScroll } = useScrollPosition();

  useEffect(() => {
    const link = document.createElement("link");
    const meta = document.createElement("meta");

    link.rel = "canonical";
    link.href = "https://4d-detailing.hr/uvjeti-korištenja";
    document.head.appendChild(link);

    meta.setAttribute("property", "og:url");
    meta.content = "https://4d-detailing.hr/uvjeti-korištenja";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(meta);
      resetScroll();
    };
  }, []);

  return (
    <>
      <Header
        title="Uvjeti korištenja"
        bgImage="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <main className="privacy">
        <article className="container">
          <section>
            <p>
              Dobrodošli na našu web stranicu. Molimo vas da pažljivo pročitate
              ova pravila korištenja prije nego što nastavite koristiti
              stranicu. Korištenjem stranice pristajete na pridržavanje
              sljedećih uvjeta:
            </p>
          </section>

          <section>
            <h2>1. Opći uvijeti</h2>
            <p>
              Ova web stranica je osmišljena kako bi vam pružila informacije o
              našim uslugama auto detailinga. Također možete koristiti kontakt
              obrazac kako biste nas direktno kontaktirali.
            </p>
          </section>

          <section>
            <h2>2. Autorska prava</h2>
            <p>
              Svi sadržaji objavljeni na ovoj stranici, uključujući, ali ne
              ograničavajući se na tekstove, slike, grafike i logotipe,
              zaštićeni su autorskim pravima i ne smiju se koristiti bez
              prethodnog pismenog odobrenja vlasnika stranice. Zabranjena je
              distribucija, reprodukcija ili izmjena sadržaja bez dozvole.
            </p>
          </section>

          <section>
            <h2>3. Kontakt obrazac</h2>
            <p>
              Putem kontakt obrasca možete nas kontaktirati s upitima,
              prijedlozima ili zahtjevima za uslugama. Svi podaci prikupljeni
              putem obrasca koriste se isključivo u svrhu odgovora na vaš upit.
              Ne prikupljamo dodatne osobne podatke niti koristimo kolačiće na
              ovoj stranici.
            </p>
          </section>

          <section>
            <h2>4. Odgovornost</h2>
            <p>
              Iako se trudimo osigurati da su sve informacije na ovoj stranici
              točne i ažurirane, ne preuzimamo odgovornost za eventualne
              pogreške ili propuste u sadržaju. Korištenje stranice je
              isključivo na vlastitu odgovornost korisnika.
            </p>
          </section>

          <section>
            <h2>5. Vaša prava</h2>
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
            <h2>6. Izmjene pravila</h2>
            <p>
              Zadržavamo pravo izmjene ovih pravila korištenja u bilo kojem
              trenutku. Preporučujemo da povremeno provjerite ovu stranicu kako
              biste bili informirani o eventualnim promjenama.
            </p>
          </section>
        </article>
      </main>
    </>
  );
};

export default Terms;
