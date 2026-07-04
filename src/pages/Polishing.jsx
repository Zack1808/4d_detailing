import React, { useEffect, useMemo } from "react";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Polishing = React.memo(() => {
  const { resetScroll } = useScrollPosition();

  const { polishList } = useStore();

  useEffect(() => {
    const link = document.createElement("link");
    const meta = document.createElement("meta");

    link.rel = "canonical";
    link.href = "https://4d-detailing.hr/poliranje-i-zaštita";
    document.head.appendChild(link);

    meta.setAttribute("property", "og:url");
    meta.content = "https://4d-detailing.hr/poliranje-i-zaštita";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(meta);
      resetScroll();
    };
  }, []);

  return (
    <>
      <Header title="Poliranje i zaštita" fallbackImage="/hero-bg-big.avif" />

      <main className="category">
        <article className="container">
          <section>
            <p>
              Zbog zagađenja atmosfere i utjecaja prirodnih faktora, vaš limeni
              ljubimac s vremenom gubi sjaj i veličanstvenost. To je osobito
              vidljivo na vozilima koja su stalno izložena suncu i vremenskim
              neprilikama. Takvi uvjeti mogu uzrokovati nevidljiva zaprljanja i
              oksidaciju površinskog laka, zbog kojih boja gubi svoju ljepotu.
              Poliranjem vašem vozilu može se vratiti izgubljeni sjaj i
              otpornost na nečistoće.
              <br />
              <br />
              Ovisno o vrsti boje i željenim rezultatima, nudimo različite
              tretmane poliranja i zaštite laka vašeg vozila. Slobodno nas
              kontaktirajte za više informacija.
            </p>
            <Button primary link="/kontakt">
              Rezerviraj termin
            </Button>
          </section>
          <FadeImage
            alt="Slika poliranja"
            fallbackImage="https://images.unsplash.com/photo-1527581849771-416a9d62308e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </article>

        <article className="container category-prices">
          {polishList?.map((priceCard) => (
            <PriceCard {...priceCard} key={polishList.id} />
          ))}
        </article>
      </main>
    </>
  );
});

export default Polishing;
