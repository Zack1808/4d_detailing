import React, { useMemo, useState, useEffect } from "react";

import Button from "./Button";
import List from "./List";

import Wheel from "../animated/Wheel";

import { toDate, isDiscounted, getCurrentPrice } from "../../utils/pricing";

import type { ServiceDataType } from "../../types/data";

import { useData } from "../../context/DataContext";

type VehicleClass = keyof ServiceDataType["prices"];

type PriceInfo = {
  price: number;
  anchorPrice: number;
  current: number;
  lowest: number;
};

const EXTRA_CLASSES: { key: VehicleClass; label: string }[] = [
  {
    key: "suv",
    label: "SUV",
  },
  {
    key: "transporter",
    label: "Transporter",
  },
];

const LAW_DATE = new Date(2026, 8, 10);

const formatDate = (date: Date): string =>
  `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;

type ServiceCardProps = {
  item: ServiceDataType;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
  const [iconSize, setIconSize] = useState<number>(260);

  const { isDark } = useData();

  const isDiscountActive = useMemo(() => {
    return isDiscounted(item.discount);
  }, [item.discount]);

  const priceInfo = useMemo(() => {
    const entries = (Object.keys(item.prices) as VehicleClass[]).map(
      (vehicleClass) => {
        const { price, anchorPrice } = item.prices[vehicleClass];

        const info: PriceInfo = {
          price,
          anchorPrice,
          current: getCurrentPrice(item, vehicleClass),
          lowest: item.lowestPrice30d?.[vehicleClass]?.amount ?? price,
        };

        return [vehicleClass, info] as const;
      },
    );

    return Object.fromEntries(entries) as Record<VehicleClass, PriceInfo>;
  }, [item, item.prices, item.lowestPrice30d, item.discount, isDiscountActive]);

  const car = priceInfo.car;

  const anchorDate = useMemo(() => {
    const created = toDate(item.createdAt);

    if (created && created.getTime() > LAW_DATE.getTime() + 86_399_999)
      return formatDate(created);

    return formatDate(LAW_DATE);
  }, [item.createdAt]);

  useEffect(() => {
    const getIconSize = () => {
      setIconSize(window.innerWidth >= 640 ? 260 : 200);
    };

    getIconSize();

    window.addEventListener("resize", getIconSize);

    return () => window.removeEventListener("resize", getIconSize);
  }, []);

  return (
    <div className="rounded-sm shadow-sm bg-gray-light/15 dark:bg-gray-dark/40 px-6 py-9 flex flex-col gap-9 overflow-hidden relative w-full">
      <header className="flex flex-col gap-6">
        <h3
          className={`text-2xl font-semibold text-dark dark:text-light ${isDiscountActive ? "max-w-[25ch]" : ""}`}
        >
          {item.title}
        </h3>
        <div className="flex flex-col w-full gap-3">
          <p className="text-5xl text-dark dark:text-light flex gap-1 flex-col font-medium">
            {isDiscountActive ? (
              <span className="flex gap-3">
                <span className="text-sm flex gap-1 text-gray-500 dark:text-gray-400 line-through self-center min-w-max ">
                  <span>€{car.price}</span>
                </span>
                <span className="flex gap-1 font-bold">
                  <small className="mb-3 text-lg font-light">€</small>
                  <span>{car.current}</span>
                </span>
              </span>
            ) : (
              <span className="flex gap-1 font-bold">
                <small className="mb-3 text-lg font-light">€</small>
                <span>{car.current}</span>
              </span>
            )}
            <small className="text-xs text-gray-500 dark:text-gray-400">
              Cijena na {anchorDate}: {car.anchorPrice}€
            </small>
            {isDiscountActive && (
              <small className="text-xs text-gray-500 dark:text-gray-400">
                Najniža cijena u zadnjih 30 dana: {car.lowest}
              </small>
            )}
          </p>
          {isDiscountActive && (
            <div className="rounded-full aspect-square flex items-center justify-center text-light dark:text-dark font-black absolute top-0 right-0 translate-x-1/2 p-1 -translate-y-1/2 -z-10">
              <Wheel
                isDark={!isDark}
                speed={10}
                size={iconSize}
                className="opacity-5"
              />
              <div className="absolute bg-dark/5 dark:bg-light/5 inset-0 rounded-full p-3 flex items-end justify-center">
                <p className="text-dark dark:text-light sm:mb-15 mb-10 sm:mr-21 mr-18 sm:text-2xl text-lg font-normal">
                  -{item.discount.value}
                  {item.discount.type === "percentage" ? "%" : "€"}
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
        {item.services.length > 0 && (
          <List list={item.services} isDark={isDark} />
        )}

        <div className="flex flex-col gap-3 font-light">
          {EXTRA_CLASSES.map(({ key, label }) => {
            const info = priceInfo[key];

            if (!info || info.price <= 0) return null;

            return (
              <span key={key}>
                <strong className="font-normal">Cijena za {label}: </strong>
                {isDiscountActive ? (
                  <>
                    <span className="line-through text-gray-500 dark:text-gray-400 mr-2">
                      €{info.price}
                    </span>
                    €{info.current}
                  </>
                ) : (
                  <>€{info.current}</>
                )}
                <br />
                <small className="font-medium text-xs text-gray-500 dark:text-gray-400">
                  Cijena na {anchorDate}: {info.anchorPrice}€
                </small>
                {isDiscountActive && (
                  <>
                    <br />
                    <small className="font-medium text-xs text-gray-500 dark:text-gray-400">
                      Najniža cijena u zadnjih 30 dana: {info.lowest}€
                    </small>
                  </>
                )}
              </span>
            );
          })}
        </div>
      </main>
      <footer className="mt-auto text-dark dark:text-light flex flex-col gap-6">
        {item.remark && (
          <small>
            <strong>Napomena:</strong> {item.remark}
          </small>
        )}
        <Button
          variant="primary"
          to={`/kontakt?usluga=${item.slug}`}
          className="w-full max-w-none justify-center"
        >
          Rezerviraj termin
        </Button>
      </footer>
    </div>
  );
};

export default ServiceCard;
