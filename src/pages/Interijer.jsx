import { useEffect } from "react";

import { Header, PriceCard } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Eksterijer.css";

const categories = [
  {
    title: "Kemijsko čišćenje sjedala",
    price: 50,
    list: ["Samo kemijsko izvalčenje sjedala"],
    info: "Cijena usluge se može mjenjati ovisno o veličini i zaprljanosti vozila",
  },
  {
    title: "Kemijsko čišćenje unutrašnjosti",
    price: 90,
    list: ["Potpuno kemijsko čišćenje vidljivh površina osim krova"],
    info: "Cijena usluge se može mjenjati ovisno o veličini i zaprljanosti vozila",
  },
  {
    title: "Full detailing interijera",
    price: 250,
    list: [
      "Kompletno dubinsko čišćenje unutrašnjosti",
      "Ponovna montaža sjedala",
      "+ vanjsko pranje kao priprema",
    ],
    priceSuv: 50,
    priceTransporter: 130,
    info: "Cijena usluge se može mjenjati ovisno o veličini i zaprljanosti vozila",
  },
];

const Eksterijer = ({ resetScroll }) => {
  useEffect(() => {
    resetScroll();
  }, []);

  return (
    <>
      <Header title="Čišćenje Interijera" />
      <div className="eksterijer-container">
        <div className="eksterijer-content">
          <div className="eksterijer-text">
            <h2>Čišćenje Interijera</h2>
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
              fugiat enim nulla saepe placeat a delectus repellat doloribus,
              voluptatum ullam pariatur rerum, tempore accusantium soluta. Ad
              provident, nisi, delectus qui atque id in rerum, est nam dolorum
              ab nihil. Ut eaque ipsa quisquam, obcaecati labore aut, atque
              dolores dolore iusto placeat inventore facere, quos eius deleniti.
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

export default transition(Eksterijer);
