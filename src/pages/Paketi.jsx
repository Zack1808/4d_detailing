import { useEffect, useMemo } from "react";

import { Header, PriceCard } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Eksterijer.css";

const Paketi = ({ resetScroll }) => {
  useEffect(() => {
    resetScroll();
  }, [resetScroll]);

  const categories = useMemo(
    () => [
      {
        title: "Paket Refresh",
        price: 200,
        list: [
          "+ kemijsko čišćenje unutrašnjosti",
          "+ vanjsko čišćenje",
          "+ jednoslojno poliranje",
          "+ zaštita keramičkim voskom",
          "+ točkanje oštećenja od kamenčića (klijent sam nosi boju)",
          "Napomena: po želji klijenta moguće je i izraditi slike za prodaju vozila (gratis)",
        ],
        info: "Cijena usluge se može mjenjati ovisno o veličini vozila",
      },
      {
        title: "Paket Novo vozilo",
        price: 500,
        list: [
          "+ full detailing interijera",
          "+ troslojno poliranje",
          "+ zaštita keramičkim voskom u trajanju od 6 mjeseci",
          "+ točkanje oštećenja od kamenčića (klijent sam nosi boju)",
        ],
        info: "Cijena usluge se može mjenjati ovisno o veličini vozila",
      },
    ],
    []
  );

  return (
    <>
      <Header title="Posebni paketi" />
      <div className="eksterijer-container">
        <div className="eksterijer-content">
          <div className="eksterijer-text">
            <h2>Posebni paketi</h2>
            <p>
              Cijenjeni korisnici, za Vas smo pripremili i par posebnih paketa
              usluga. Oni su spoj nekoliko naših pojedinačnih ponuda iz sva tri
              područja njege vozila. Ovi paketi su posebno prigodni za korisnike
              koji po prvi puta žele njegu svog vozila dati u naše ruke kako bi
              se lakše odlučili na uslugu. Također za korisnike koji žele
              redovito kod nas održavati vozilo ovi paketi su odlična priprema
              za program održavanja.
              <br />
              <br />
              Cijene paketa ovise isključivo o veličini vozila. Slobodno nam se
              javite s dodatnim pitanjima!
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1614687154052-e05046c3feec?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

export default transition(Paketi);
