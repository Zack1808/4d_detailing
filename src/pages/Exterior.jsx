import React, { useEffect } from "react";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Exterior = React.memo(() => {
  const { resetScroll } = useScrollPosition();

  const { exteriorList } = useStore();

  useEffect(() => {
    const link = document.createElement("link");
    const meta = document.createElement("meta");

    link.rel = "canonical";
    link.href = "https://4d-detailing.hr/čišćenje-eksterijera";
    document.head.appendChild(link);

    meta.setAttribute("property", "og:url");
    meta.content = "https://4d-detailing.hr/čišćenje-eksterijera";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(meta);
      resetScroll();
    };
  }, []);

  return (
    <>
      <Header title="Čišćenje eksterijera" fallbackImage="/eksterijer.avif" />

      <main className="category">
        <article className="container">
          <section>
            <p>
              Poznata je činjenica da automatske autopraonice s četkama nisu
              najbolje rješenje za čistoću vašeg vozila. Štoviše, često uzrokuju
              oštećenja ili nezadovoljavajuće rezultate pranja. Kod nas možete
              dovesti vozilo na sigurno i detaljno pranje koje neće oštetiti
              boju niti ostaviti nečistoće na dijelovima vašeg vozila. Koristimo
              profesionalna i provjerena sredstva i metode kako bismo osigurali
              samo najbolje rezultate pranja.
              <br />
              <br />
              Za dodatne informacije slobodno nam se javite.
            </p>
            <Button primary link="/kontakt">
              Rezerviraj termin
            </Button>
          </section>
          <FadeImage alt="Slika eksterijera" fallbackImage="/washing.avif" />
        </article>

        <article className="container category-prices">
          {exteriorList?.map((priceCard) => (
            <PriceCard {...priceCard} key={priceCard.id} />
          ))}
        </article>
      </main>
    </>
  );
});

export default Exterior;
