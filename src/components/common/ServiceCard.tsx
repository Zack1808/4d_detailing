import React, { useMemo, useState, useEffect } from "react";

import Button from "./Button";
import List from "./List";

import Wheel from "../animated/Wheel";

import { type ServiceDataType } from "../../types/data";

import { useData } from "../../context/DataContext";

type ServiceCardProps = {
  item: ServiceDataType;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
  const [iconSize, setIconSize] = useState<number>(260);

  const { isDark } = useData();

  const discountedPrice = useMemo(() => {
    let priceList = [item.priceFrom.current];

    if (item.priceTo?.current) priceList = [...priceList, item.priceTo.current];

    if (!item.discount.isEnabled) return `${priceList.join(" - ")}`;

    const newPriceList = priceList.map((price) => {
      return item.discount?.type === "percentage"
        ? Math.round(Number(price) * (1 - Number(item.discount?.value) / 100))
        : Number(price) - Number(item.discount.value);
    });

    return `${newPriceList.join(" - ")}`;
  }, [
    item.priceFrom.current,
    item.priceTo?.current,
    item.discount.isEnabled,
    item.discount.value,
  ]);

  const getLowestPrice = useMemo(() => {
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    let bestPrice = Infinity;

    const parseDate = (date: string) => {
      const [day, month, year] = date.split(".").map(Number);
      return new Date(year, month - 1, day).getTime();
    };

    if (!item.discount.lowest.length) return undefined;

    for (const entry of item.discount.lowest) {
      const entryTime = parseDate(entry.date);
      const isWithinWindow =
        now - entryTime <= THIRTY_DAYS_MS && entryTime <= now;

      if (isWithinWindow && entry.priceFrom < bestPrice) {
        bestPrice = entry.priceFrom;
      }
    }

    return bestPrice === Infinity ? undefined : bestPrice;
  }, [item.discount.lowest]);

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
    <div className="rounded-sm shadow-sm bg-gray-light/15 dark:bg-gray-dark/40 px-6 py-9 flex flex-col gap-9 overflow-hidden relative w-full">
      <header className="flex flex-col gap-6">
        <h3
          className={`text-3xl font-semibold text-dark dark:text-light ${item.discount.isEnabled ? "lg:max-w-[15ch] max-w-[10ch]" : ""}`}
        >
          {item.title}
        </h3>
        <div className="flex flex-col w-full gap-3">
          <p className="text-2xl text-dark dark:text-light flex gap-1 flex-col font-medium">
            {item.discount.isEnabled ? (
              <span className="flex gap-3">
                <span className="text-sm flex gap-1 text-gray-400 line-through self-center min-w-max ">
                  <span className="flex gap-6 w-full">
                    €
                    {item.priceTo
                      ? `${item.priceFrom.current} - ${item.priceTo?.current}`
                      : `${item.priceFrom.current}`}
                  </span>
                </span>
                <span className="flex gap-1">
                  <small className="mb-3 text-md font-light">€</small>
                  <span className="flex gap-6 w-full">{discountedPrice}</span>
                </span>
              </span>
            ) : (
              <span className="flex gap-1">
                <small className="mb-3 text-md font-light">€</small>
                <span className="flex gap-6 w-full">{discountedPrice}</span>
              </span>
            )}
            <small className="text-xs text-gray-400">
              {item.priceFrom.ref
                ? item.priceTo?.ref
                  ? `Cijena na 10.09.2026: ${item.priceFrom.ref} - ${item.priceTo.ref} €`
                  : `Cijena na 10.09.2026: ${item.priceFrom.ref}€`
                : `Dana 10.09.2026 ove usluge nije bilo.`}
            </small>
            {item.discount.isEnabled && (
              <small className="text-xs text-gray-400">
                Najniža cijena u zadnjih 30 dana: {`${getLowestPrice}€`}
              </small>
            )}
          </p>
          {item.discount.isEnabled && (
            <div className="rounded-full aspect-square flex items-center justify-center text-light dark:text-dark font-black absolute top-0 right-0 translate-x-1/2 p-1 -translate-y-1/2 -z-10">
              <Wheel
                isDark={!isDark}
                speed={10}
                size={iconSize}
                className="opacity-5"
              />
              <div className="absolute bg-dark/5 dark:bg-light/5 inset-0 rounded-full p-3 flex items-end justify-center">
                <p className="text-dark dark:text-light sm:mb-15 mb-10 sm:mr-21 mr-18 sm:text-2xl text-lg font-normal">
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
      <main className="flex flex-col gap-6 text-dark dark:text-light mb-10">
        <List list={item.services} isDark={isDark} />

        <div className="flex flex-col gap-3 font-light">
          {item.suv.current > 0 && (
            <span>
              <strong className="font-normal">Cijena za SUV: </strong>+€
              {item.suv.current} <br />
              <small className="font-medium text-xs text-gray-400">
                {item.suv.ref
                  ? `Nadoplata na 10.09.2026: ${item.suv.ref}€`
                  : "Dana 10.09.2026 nije bilo nadoplate za SUV-ove."}
              </small>
            </span>
          )}
          {item.transporter.current > 0 && (
            <span>
              <strong className="font-normal">Cijena za Transporter: </strong>
              +€{item.transporter.current} <br />
              <small className="font-medium text-xs text-gray-400">
                {item.transporter.ref
                  ? `Nadoplata na 10.09.2026: ${item.transporter.ref}€`
                  : "Dana 10.09.2026 nije bilo nadoplate za transportere."}
              </small>
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
          Rezerviraj termin
        </Button>
      </footer>
    </div>
  );
};

export default ServiceCard;
