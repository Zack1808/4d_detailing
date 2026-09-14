import React, { useMemo, useState, useEffect } from "react";

import Button from "./Button";

import Wheel from "../animated/Wheel";

import { type ServiceDataType } from "../../types/data";

import { useData } from "../../context/DataContext";

type ServiceCardProps = {
  item: ServiceDataType;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
  const [iconSize, setIconSize] = useState<number>(260);

  const { isDark } = useData();

  const wheel = isDark ? "/images/wheel_dark.svg" : "/images/wheel_light.svg";

  const discountedPrice = useMemo(() => {
    let priceList = [item.priceFrom];

    if (item.priceTo) priceList = [...priceList, item.priceTo];

    if (!item.discount || !item.discount.value)
      return `${priceList.join(" - ")}`;

    const newPriceList = priceList.map((price) => {
      return item.discount?.type === "percentage"
        ? Math.round(Number(price) * (1 - Number(item.discount?.value) / 100))
        : Number(price) - Number(item.discount?.value);
    });

    return `${newPriceList.join(" - ")}`;
  }, [item.priceFrom, item.priceTo, item.discount]);

  useEffect(() => {
    const getIconSize = () => {
      setIconSize(window.innerWidth >= 640 ? 260 : 200);
    };

    getIconSize();

    window.addEventListener("resize", getIconSize);

    return () => {
      window.removeEventListener("resize", getIconSize);
    };
  }, []);

  return (
    <div className="rounded-sm shadow-sm bg-gray-light/20 dark:bg-gray-dark/20 px-6 py-9 flex flex-col gap-9 overflow-hidden relative">
      <header className="flex flex-col gap-6">
        <h3
          className={`text-3xl font-bold text-dark dark:text-light ${item.discount?.value ? "sm:max-w-[15ch] max-w-[10ch]" : ""}`}
        >
          {item.title}
        </h3>
        <div className="flex flex-col w-full">
          <p className="text-2xl text-dark dark:text-light flex gap-3 font-semibold">
            <small className="mb-3 text-md font-normal">€</small>
            <span className="flex gap-6 w-full">{discountedPrice}</span>
          </p>
          {item.discount && (
            <div className="rounded-full aspect-square flex items-center justify-center text-light dark:text-dark font-black absolute top-0 right-0 translate-x-1/2 p-1 -translate-y-1/2 -z-10">
              <Wheel
                isDark={!isDark}
                speed={10}
                size={iconSize}
                className="opacity-5"
              />
              <div className="absolute bg-dark/5 dark:bg-light/5 inset-0 rounded-full p-3 flex items-end justify-center">
                <p className="text-dark dark:text-light sm:mb-15 mb-10 sm:mr-21 mr-18 sm:text-2xl text-lg">
                  -
                  {`${item.discount?.value}${item.discount?.type === "percentage" ? "%" : "€"}`}
                </p>
              </div>
            </div>
          )}
          <span className="font-normal text-xl text-dark dark:text-light mt-3">
            ~ {item.duration.split("-").join(" - ")}
          </span>
        </div>
      </header>
      <main className="flex flex-col gap-6 text-dark dark:text-light ">
        <ul className={`flex flex-col gap-3`}>
          {item.services.map((service, index) => (
            <li key={`${service}-${index}`} className="flex items-start gap-3">
              <img src={wheel} alt="wheel image" className="w-5 mt-0.5" />
              <p className="">{service}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3">
          {item.suv && (
            <span>
              <strong>Cijena za SUV: </strong>+€{item.suv}
            </span>
          )}
          {item.transporter && (
            <span>
              <strong>Cijena za Transporter: </strong>+€{item.transporter}
            </span>
          )}
        </div>
      </main>
      <footer className="mt-auto text-dark dark:text-light flex flex-col gap-6">
        {item.remark && (
          <small>
            <strong>Napomena:</strong> {item.remark}
          </small>
        )}
        <Button
          to={`/kontakt?usluga=${item.slug}`}
          variant="primary"
          className="w-full max-w-none justify-center"
        >
          Rezerviraj Termin
        </Button>
      </footer>
    </div>
  );
};

export default ServiceCard;
