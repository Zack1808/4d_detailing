import React, { useEffect } from "react";

import Container from "../components/layout/Container";

import Input from "../components/common/Input";
import ServiceCard from "../components/common/ServiceCard";

import { useData } from "../context/DataContext";

const Services: React.FC = () => {
  const { services } = useData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Container className="pb-3!" id="service-intro">
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
      <Container className="pt-9!">
        <div className="p-3 w-full bg-gray-light/20 dark:bg-gray-dark/20 rounded-xs">
          <Input placeholder="Unesite naziv usluge..." />
        </div>
        <div className="w-full grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3 ">
          {services.map((service, index) => (
            <ServiceCard item={service} key={`${service.title}-${index}`} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default Services;
