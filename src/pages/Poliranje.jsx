import { useEffect, useMemo } from "react";

import { Header, PriceCard } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Eksterijer.css";

const Eksterijer = ({ resetScroll }) => {
  useEffect(() => {
    resetScroll();
  }, [resetScroll]);

  const categories = useMemo(
    () => [
      {
        title: "Poliranje farova",
        price: 20,
        list: [
          "Brušenje i poliranje",
          "Dodavanje zaštitnog premaza i boost premaza",
        ],
        info: "Cijena usluge može se mijenjati ovisno o zamagljenosti farova.",
      },
      {
        title: "Poliranje laka",
        price: "100 (po sloju)",
        list: [
          "Detaljno pranje eksterijera kao priprema",
          "Kemijska i mehanička dekontaminacija kao priprema laka za poliranje",
          "Zaštita voskom ako nije odabrana druga vrsta zaštite",
        ],
        priceSuv: 30,
        priceTransporter: 80,
        info: "Cijena usluge može se mijenjati ovisno o veličini vozila i oštećenosti laka",
      },
      {
        title: "Višeslojna korekcija laka",
        price: 500,
        list: [
          "Detaljno pranje eksterijera kao priprema",
          "Kemijska i mehanička dekontaminacija kao priprema laka za poliranje",
          "Zaštita voskom ako nije odabrana druga vrsta zaštite",
          "Po potrebi, zatočkavanje i brušenje većih ogrebotina (kupac donosi boju)",
        ],
        priceSuv: 100,
        priceTransporter: 180,
      },
      {
        title: "Zaštita voskom u trajanju od 3 mjeseca",
        price: 15,
        list: [
          "Detaljno pranje eksterijera kao priprema",
          "Priprema laka za zaštitni premaz",
          "Premaz voskom za zaštitu laka",
        ],
      },
      {
        title: "Zaštita sintetičkim premazom u trajanju od 6-8 mjeseci",
        price: 50,
        list: [
          "Detaljno pranje eksterijera kao priprema",
          "Priprema laka za zaštitni premaz",
          "Premaz sintetičkim premazom",
        ],
      },
      {
        title: "Zaštita keramičkim premazom u trajanju od 3 godine",
        price: 300,
        list: [
          "Detaljno pranje eksterijera kao priprema",
          "Priprema laka za zaštitni premaz",
          "Premaz keramičkim premazom",
        ],
        priceSuv: 100,
        priceTransporter: 180,
        info: "Napomena: Prije nanošenja keramičkog premaza, obavezan je barem jedan sloj poliranja kako bi se premaz dobro primio i postigao maksimalnu učinkovitost. (Poliranje nije uključeno u cijenu usluge keramičkog premaza.)nnnnnnn",
      },
    ],
    []
  );

  return (
    <>
      <Header title="Poliranje i zaštita" />
      <div className="eksterijer-container">
        <div className="eksterijer-content">
          <div className="eksterijer-text">
            <h2>Poliranje i zaštita</h2>
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
          </div>
          <img
            src="/poliranje.webp"
            alt="placeholder-image-eksterijer"
            style={{ objectPosition: "center top" }}
          />
        </div>
        <div className="eksterijer-price-list">
          {categories.map((category) => (
            <PriceCard {...category} key={category.title} />
          ))}
        </div>
      </div>
    </>
  );
};

export default transition(Eksterijer);
