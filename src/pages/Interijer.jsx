import { useEffect, useMemo } from "react";

import { Header, PriceCard } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Eksterijer.css";

const Interijer = ({ resetScroll }) => {
  const categories = useMemo(
    () => [
      {
        title: "Kemijsko čišćenje sjedala",
        price: 50,
        list: [
          "Kemijsko izvlačenje vozačevog, suvozačevog sjedala",
          "Kemijsko izvlačenje stražnjih putničkih sjedala",
          "Zaštita površina sjedala",
        ],
        info: "Cijena usluge se može mjenjati ovisno o veličini i zaprljanosti vozila",
      },
      {
        title: "Kemijsko čišćenje unutrašnjosti",
        price: 90,
        list: [
          "Detaljno pranje eksterijera kao priprema",
          "Detaljno pranje naplataka",
          "Potpuno kemijsko čišćenje vidljivih površina osim krova",
          "Kemijsko izvlačenje sjedala i podova",
          "Zaštita plastičnih i tekstilnih površina",
        ],
        info: "Cijena usluge se može mjenjati ovisno o veličini i zaprljanosti vozila",
      },
      {
        title: "Full detailing interijera",
        price: 250,
        list: [
          "Detaljno pranje eksterijera kao priprema",
          "Detaljno pranje naplataka",
          "Demontaža sjedala",
          "Kompletno dubinsko čišćenje unutrašnjosti",
          "Čišćenje teško dostupnih mjesta, dlaka od ljubimaca i sl.",
          "Kemijsko izvlačenje sjedala i podova",
          "Ponovna montaža sjedala",
          "Zaštita plastičnih i tekstilnih površina",
        ],
        priceSuv: 50,
        priceTransporter: 130,
        info: "Cijena usluge se može mjenjati ovisno o veličini i zaprljanosti vozila",
      },
    ],
    []
  );

  useEffect(() => {
    resetScroll();
  }, [resetScroll]);

  return (
    <>
      <Header title="Čišćenje Interijera" />
      <div className="eksterijer-container">
        <div className="eksterijer-content">
          <div className="eksterijer-text">
            <h2>Čišćenje Interijera</h2>
            <p>
              Čišćenje interijera često bude teško i vremenski zahtjevan proces.
              Cijelom interijeru vozila korištenjem posebnih namjenskih
              sredstava i alata pružamo najbolje rezultate čišćenja koji pritom
              nisu opasni za dijelove unutrašnjosti Vašeg limenog ljubimca.
              <br />
              <br />U slučaju jačih zaprljanja cijena usluga može porasti. Za
              dodatne informacije vezane uz cijenu slobodno nas kontaktirajte.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1601362840138-44bca7a80305?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="placeholder-image-eksterijer"
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

export default transition(Interijer);
