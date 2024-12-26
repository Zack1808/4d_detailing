import React, { useEffect, useMemo } from "react";

import { useScrollPosition } from "../context/scrollContext";

import transition from "../helpers/transition";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Polishing = () => {
  const { resetScroll } = useScrollPosition();

  const priceCards = useMemo(
    () => [
      {
        title: "Poliranje farova",
        price: "20",
        services: [
          "Brušenje i poliranje",
          "Dodavanje zaštitnog premaza i boost premaza",
        ],
        info: "Cijena usluge može se mijenjati ovisno o zamagljenosti farova.",
      },
      {
        title: "Poliranje laka",
        price: "100 (po sloju)",
        services: [
          "Detaljno pranje eksterijera kao priprema",
          "Kemijska i mehanička dekontaminacija kao priprema laka za poliranje",
          "Zaštita voskom ako nije odabrana druga vrsta zaštite",
        ],
        priceSuv: "30",
        priceTransporter: "80",
        info: "Cijena usluge može se mijenjati ovisno o veličini vozila i oštećenosti laka",
      },
      {
        title: "Višeslojna korekcija laka",
        price: "500",
        services: [
          "Detaljno pranje eksterijera kao priprema",
          "Kemijska i mehanička dekontaminacija kao priprema laka za poliranje",
          "Zaštita voskom ako nije odabrana druga vrsta zaštite",
          "Po potrebi, zatočkavanje i brušenje većih ogrebotina (kupac donosi boju)",
        ],
        priceSuv: "100",
        priceTransporter: "180",
      },
      {
        title: "Zaštita voskom u trajanju od 3 mjeseca",
        price: "15",
        services: [
          "Detaljno pranje eksterijera kao priprema",
          "Priprema laka za zaštitni premaz",
          "Premaz voskom za zaštitu laka",
        ],
      },
      {
        title: "Zaštita sintetičkim premazom u trajanju od 6-8 mjeseci",
        price: "50",
        services: [
          "Detaljno pranje eksterijera kao priprema",
          "Priprema laka za zaštitni premaz",
          "Premaz sintetičkim premazom",
        ],
      },
      {
        title: "Zaštita keramičkim premazom u trajanju od 3 godine",
        price: "300",
        services: [
          "Detaljno pranje eksterijera kao priprema",
          "Priprema laka za zaštitni premaz",
          "Premaz keramičkim premazom",
        ],
        priceSuv: "100",
        priceTransporter: "180",
        info: "Napomena: Prije nanošenja keramičkog premaza, obavezan je barem jedan sloj poliranja kako bi se premaz dobro primio i postigao maksimalnu učinkovitost. (Poliranje nije uključeno u cijenu usluge keramičkog premaza.)nnnnnnn",
      },
    ],
    []
  );

  useEffect(() => resetScroll(), []);

  return (
    <div className="page-container">
      <Header title="Poliranje i zaštita" bgImage="/hero-bg-big.avif" />

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
            src="https://images.unsplash.com/photo-1527581849771-416a9d62308e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="placeholder-image-eksterijer"
          />
        </article>

        <article className="container category-prices">
          {priceCards.map((priceCard, index) => (
            <PriceCard {...priceCard} key={`price-card-${index + 1}`} />
          ))}
        </article>
      </main>
    </div>
  );
};

export default transition(Polishing);
