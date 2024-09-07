import { useEffect, useMemo } from "react";

import { Header, PriceCard } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Eksterijer.css";

const Eksterijer = ({ resetScroll }) => {
  const categories = useMemo(
    () => [
      {
        title: "Vanjsko pranje",
        price: 15,
        list: ["+ usisavanje interijera", "+ brisanje prašine interijera"],
        info: "Cijena usluge se može mjenjati ovisno o veličini i zaprljanosti vozila",
      },
      {
        title: "Vanjsko pranje s naplatcima",
        price: 20,
        list: ["+ usisavanje interijera", "+ brisanje prašine interijera"],
        info: "Cijena usluge se može mjenjati ovisno o veličini i zaprljanosti vozila",
      },
      {
        title: "Premium čišćenje vozila",
        price: 35,
        list: [
          "Vanjsko pranje kao priprema",
          "Detaljno pranje eksterijera",
          "Detaljno pranje interijera bez kemijskog izvlačenja tekstilnih površina i krova",
        ],
        priceSuv: 10,
        priceTransporter: 30,
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
      <Header title="Čišćenje Eksterijera" />
      <div className="eksterijer-container">
        <div className="eksterijer-content">
          <div className="eksterijer-text">
            <h2>Čišćenje Eksterijera</h2>
            <p>
              Poznata je činjenica da automatske autopraonice s četkama nisu
              najbolje rješenje za čistoću Vašeg vozila, štoviše, često u
              uzrokuju oštećenja ili nezadovoljavajuće rezultate pranja. Kod nas
              možete dovesti vozilo na sigurno i detaljno pranje koje neće
              oštetiti boju niti ostaviti nečistoće na nezgodnim dijelovima
              vozila. Koristimo profesionalna i provjerena sredstva i metode
              kako bi osigurali samo najbolje rezultate pranja.
              <br />
              <br />
              Za dodatne informacije slobodno nam se javite.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1527581849771-416a9d62308e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

export default transition(Eksterijer);
