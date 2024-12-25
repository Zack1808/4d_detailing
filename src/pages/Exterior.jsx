import React, { useEffect } from "react";

import { useScrollPosition } from "../context/scrollContext";

import transition from "../helpers/transition";

import { Header } from "../components";

import "../css/pages/Exterior.css";

const Exterior = () => {
  const { resetScroll } = useScrollPosition();

  useEffect(() => resetScroll(), []);

  return (
    <div className="page-container">
      <Header title="Čišćenje eksterijera" bgImage="/eksterijer.avif" />

      <main className="exterior">
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
          </section>
          <img
            src="https://images.unsplash.com/photo-1527581849771-416a9d62308e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            srcSet="https://images.unsplash.com/photo-1527581849771-416a9d62308e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 480w, https://images.unsplash.com/photo-1527581849771-416a9d62308e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 800w, https://images.unsplash.com/photo-1527581849771-416a9d62308e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1200w"
            alt="placeholder-image-eksterijer"
          />
        </article>
      </main>
    </div>
  );
};

export default transition(Exterior);
