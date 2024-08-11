import { useEffect } from "react";

import { Header, PriceCard } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Eksterijer.css";

const categories = [
  {
    title: "Poliranje farova",
    price: 20,
    list: [
      "Brušenje i poliranje",
      "Dodavanje zaštitnog premaza + boost premaza",
    ],
  },
  {
    title: "Poliranje laka jednoslojno",
    price: 100,
    list: [
      "+ vanjsko pranje vozila",
      "+ kemijska i mehanička dekontaminacija laka",
      "+ priprema laka za poliranje",
      "+ zaštita voskom ako nije odabrana druga vrsta zaštite",
    ],
    priceSuv: 30,
    priceTransporter: 80,
  },
  {
    title: "Poliranje laka troslojno",
    price: 300,
    list: [
      "+ vanjsko pranje vozila",
      "+ kemijska i mehanička dekontaminacija laka",
      "+ priprema laka za poliranje",
      "+ zaštita voskom ako nije odabrana druga vrsta zaštite",
    ],
    priceSuv: 90,
    priceTransporter: 240,
  },
  {
    title: "Zaštita voskom u trajanju od 3 mjeseca",
    price: 15,
    list: [
      "+ vanjsko pranje vozila",
      "Napomena: prije zaštite laka keramičkim premazom, obavezan je barem jedan sloj poliranja kako bi se premaz dobro primio i dao maksimum svoje učinkovitosti ( Nije uključeno u cijenu)",
    ],
  },
  {
    title: "Zaštita voskom u trajanju od 6-8 mjeseci",
    price: 50,
    list: [
      "+ vanjsko pranje vozila",
      "Napomena: prije zaštite laka keramičkim premazom, obavezan je barem jedan sloj poliranja kako bi se premaz dobro primio i dao maksimum svoje učinkovitosti ( Nije uključeno u cijenu)",
    ],
  },
  {
    title: "Zaštita keramičkim premazom u trajanju od 3 godine",
    price: 300,
    list: [
      "+ vanjsko pranje vozila",
      "Napomena: prije zaštite laka keramičkim premazom, obavezan je barem jedan sloj poliranja kako bi se premaz dobro primio i dao maksimum svoje učinkovitosti ( Nije uključeno u cijenu)",
    ],
    priceSuv: 100,
    priceTransporter: 180,
  },
];

const Eksterijer = ({ resetScroll }) => {
  useEffect(() => {
    resetScroll();
  }, []);

  return (
    <>
      <Header title="Poliranje i zaštita" />
      <div className="eksterijer-container">
        <div className="eksterijer-content">
          <div className="eksterijer-text">
            <h2>Poliranje i zaštita</h2>
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
            src="https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
