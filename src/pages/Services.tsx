import React, { useEffect } from "react";

import Container from "../components/layout/Container";

const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container id="services-intro" className="min-h-screen">
        <h2 className="text-4xl text-dark dark:text-light mt-30 font-bold">
          Naše usluge
        </h2>
        <p className="text-dark dark:text-light max-w-[85ch] mt-3">
          Svako vozilo ima svoje potrebe, a kvalitetna njega počinje pravim
          odabirom usluge. U 4D Detailingu zato nudimo različite tretmane kojima
          možemo osvježiti, obnoviti i zaštititi vaše vozilo – izvana i iznutra.
          <br />
          <br />
          Našu ponudu podijelili smo u četiri glavne kategorije: temeljitu njegu
          interijera, održavanje i čišćenje eksterijera, profesionalno poliranje
          te pažljivo osmišljene pakete za one koji žele kombinirati više
          usluga.
          <br />
          <br />
          Bez obzira želite li samo osvježiti izgled vozila, ukloniti tragove
          svakodnevnog korištenja ili mu pružiti kompletnu njegu, pronaći ćete
          opciju prilagođenu svojim potrebama.
          <br />
          <br />
          <strong>
            Istražite našu ponudu i pronađite tretman koji najbolje odgovara
            vašem vozilu.
          </strong>
        </p>
      </Container>
      <Container></Container>
    </>
  );
};

export default Services;
