import React, { useMemo } from "react";

import Button from "./Button";

import { type ServiceDataType } from "../../types/data";

import { useData } from "../../context/DataContext";

type CardProps = {
  item: ServiceDataType;
};

const Card: React.FC<CardProps> = ({ item }) => {
  const { isDark } = useData();

  const wheel = isDark ? "/wheel_dark.svg" : "/wheel_light.svg";

  const discountedPrice = useMemo(() => {
    const priceList = item.price.split("-");

    if (!item.hasDiscount) return `${priceList.join("-")}`;

    const newPriceList = priceList.map((price) => {
      return Math.round(Number(price) * (1 - Number(item.discount) / 100));
    });

    return `${newPriceList.join(" - ")}`;
  }, [item.price, item.discount, item.hasDiscount]);

  return (
    <div className="rounded-sm shadow-sm bg-gray-light/20 dark:bg-gray-dark/20 px-6 py-9 flex flex-col gap-9">
      <header className="flex flex-col gap-6">
        <h3 className="text-3xl font-bold text-dark dark:text-light">
          {item.title}
        </h3>
        <p className="text-2xl text-dark dark:text-light flex gap-3 font-semibold">
          <small className="mb-3 text-md font-normal">€</small>
          <span
            className={`${item.hasDiscount ? "line-through text-gray-600 dark:text-gray-light" : ""}`}
          >
            {item.price}
          </span>
          {item.hasDiscount && <span>{discountedPrice}</span>}
        </p>
      </header>
      <main className="flex flex-col gap-6 text-dark dark:text-light ">
        <ul className={`flex flex-col gap-3`}>
          {item.services.map((service) => (
            <li
              key={service}
              className="flex items-center  justify-start gap-3"
            >
              <img src={wheel} alt="wheel image" className="w-5" />
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
