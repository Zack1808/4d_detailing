import React from "react";

import Button from "./Button";

import { type ServiceDataType } from "../../types/data";

type CardProps = {
  item: ServiceDataType;
};

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="rounded-sm shadow-sm bg-gray-light/20 dark:bg-gray-dark/20 p-4 flex flex-col gap-9">
      <header className="flex flex-col gap-6">
        <h4 className="text-2xl font-semibold text-dark dark:text-light">
          {item.title}
        </h4>
        <p className="text-4xl text-dark dark:text-light flex gap-3 font-bold">
          <small className="mb-3 text-md font-normal">€</small>
          {item.price}
        </p>
      </header>
      <main className="flex flex-col gap-6 text-dark dark:text-light">
        <ul className="flex flex-col gap-3 list-inside list-image-[url(/logo_dark.svg)]">
          {item.services.map((service) => (
            <li key={service} className="">
              {service}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3">
          {item.extraSuv && (
            <span>
              <strong>Cijena za SUV: </strong>+€{item.extraSuv}
            </span>
          )}
          {item.extraTransporter && (
            <span>
              <strong>Cijena za Transporter: </strong>+€{item.extraTransporter}
            </span>
          )}
        </div>
      </main>
      <footer className="mt-auto text-dark dark:text-light flex flex-col gap-6">
        {item.info && (
          <small>
            <strong>Info:</strong> {item.info}
          </small>
        )}
        <Button
          to={`/kontakt?usluga=${item.title}`}
          variant="primary"
          className="w-full max-w-none justify-center"
        >
          Rezerviraj Termin
        </Button>
      </footer>
    </div>
  );
};

export default Card;
