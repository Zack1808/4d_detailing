import React, { useEffect } from "react";

import { Header } from "../components";

import transition from "../helpers/transition";

const Terms = React.memo(({ resetScroll }) => {
  useEffect(() => {
    resetScroll();
  }, [resetScroll]);

  return (
    <div>
      <Header title="Pravila korištenja" />
      <div className="privacy-container">
        <div className="privacy-content">
          <p>
            Dobrodošli na našu web stranicu. Molimo vas da pažljivo pročitate
            ova pravila korištenja prije nego što nastavite koristiti stranicu.
            Korištenjem stranice pristajete na pridržavanje sljedećih uvjeta:
          </p>
          <h2>1. Opći uvijeti</h2>
          <p>
            Ova web stranica je osmišljena kako bi vam pružila informacije o
            našim uslugama auto detailinga i omogućila vam da pregledate
            galeriju naših radova. Također možete koristiti kontakt obrazac kako
            biste nas direktno kontaktirali.
          </p>
          <h2>2. Autorska prava</h2>
          <p>
            Svi sadržaji objavljeni na ovoj stranici, uključujući, ali ne
            ograničavajući se na tekstove, slike, grafike i logotipe, zaštićeni
            su autorskim pravima i ne smiju se koristiti bez prethodnog pismenog
            odobrenja vlasnika stranice. Zabranjena je distribucija,
            reprodukcija ili izmjena sadržaja bez dozvole.
          </p>

          <h2>3. Korištenje galerije</h2>
          <p>
            Galerija na stranici prikazuje naše najbolje radove iz područja auto
            detailinga. Svi radovi prikazani u galeriji vlasništvo su naše
            tvrtke i služe isključivo kao referenca za potencijalne klijente.
            Bilo kakvo neovlašteno preuzimanje ili distribucija slika je strogo
            zabranjeno.
          </p>
          <h2>4. Kontakt obrazac</h2>
          <p>
            Putem kontakt obrasca možete nas kontaktirati s upitima,
            prijedlozima ili zahtjevima za uslugama. Svi podaci prikupljeni
            putem obrasca koriste se isključivo u svrhu odgovora na vaš upit. Ne
            prikupljamo dodatne osobne podatke niti koristimo kolačiće na ovoj
            stranici.
          </p>
          <h2>5. Odgovornost</h2>
          <p>
            Iako se trudimo osigurati da su sve informacije na ovoj stranici
            točne i ažurirane, ne preuzimamo odgovornost za eventualne pogreške
            ili propuste u sadržaju. Korištenje stranice je isključivo na
            vlastitu odgovornost korisnika.
          </p>
          <h2>6. Izmjene pravila</h2>
          <p>
            Zadržavamo pravo izmjene ovih pravila korištenja u bilo kojem
            trenutku. Preporučujemo da povremeno provjerite ovu stranicu kako
            biste bili informirani o eventualnim promjenama.
          </p>
        </div>
      </div>
    </div>
  );
});

export default transition(Terms);
