import { useEffect } from "react";

import { Header, PriceCard } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Eksterijer.css";

const categories = [
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
      "Detaljno pranje eksterijera",
      "Detaljno pranje interijera bez kemijskog izvlačenja tekstilnih površina i krova",
    ],
    priceSuv: 10,
    priceTransporter: 30,
    info: "Cijena usluge se može mjenjati ovisno o veličini i zaprljanosti vozila",
  },
];

const Eksterijer = ({ resetScroll }) => {
  useEffect(() => {
    resetScroll();
  }, []);

  return (
    <>
      <Header title="Čišćenje Eksterijera" />
      <div className="eksterijer-container">
        <div className="eksterijer-content">
          <div className="eksterijer-text">
            <h2>Čišćenje Eksterijera</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              provident earum pariatur repellat, praesentium voluptas assumenda!
              Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa
              deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum
              nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab
              officiis ipsa nihil quaerat magni beatae laborum doloremque quia
              fugiat enim nulla saepe placeat a delectus repellat doloribus,
              voluptatum ullam pariatur rerum, tempore accusantium soluta. Ad
              provident, nisi, delectus qui atque id in rerum, est nam dolorum
              ab nihil. Ut eaque ipsa quisquam, obcaecati labore aut, atque
              dolores dolore iusto placeat inventore facere, quos eius deleniti.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              provident earum pariatur repellat, praesentium voluptas assumenda!
              Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa
              deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum
              nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab
              officiis ipsa nihil quaerat magni beatae laborum doloremque quia
              fugiat enim nulla saepe placeat a delectus repellat doloribus.
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
