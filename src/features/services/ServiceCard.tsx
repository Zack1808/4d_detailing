import { useMemo } from "react";

import Wheel from "../../components/animated/Wheel";
import Button from "../../components/ui/Button";
import List from "../../components/ui/List";

import { contactPath } from "../../config/paths";
import { useIsDark, useMediaQuery } from "../../hooks/useMediaQuery";
import { formatDate } from "../../utils/date";
import { getCurrentPrice, isDiscounted, toDate } from "../../utils/pricing";

import type { ServiceDataType, VehicleClass } from "../../types/data";

type PriceInfo = {
  price: number;
  anchorPrice: number;
  current: number;
  lowest: number;
};

const EXTRA_CLASSES: { key: VehicleClass; label: string }[] = [
  { key: "suv", label: "SUV" },
  { key: "transporter", label: "Transporter" },
];

const LAW_DATE = new Date(2026, 8, 10);
const ONE_DAY_MS = 86_399_999;

const NOTE = "text-xs text-gray-500 dark:text-gray-400";

const PriceNotes = ({
  info,
  anchorDate,
  discounted,
  className = NOTE,
}: {
  info: PriceInfo;
  anchorDate: string;
  discounted: boolean;
  className?: string;
}) => (
  <>
    <small className={`block ${className}`}>
      Cijena na {anchorDate}: {info.anchorPrice}€
    </small>
    {discounted && (
      <small className={`block ${className}`}>
        Najniža cijena u zadnjih 30 dana: {info.lowest}€
      </small>
    )}
  </>
);

const ServiceCard = ({ item }: { item: ServiceDataType }) => {
  const isDark = useIsDark();
  const isWide = useMediaQuery("(min-width: 640px)");

  const discounted = useMemo(
    () => isDiscounted(item.discount),
    [item.discount],
  );

  const prices = useMemo(() => {
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
  }, [item]);

  const anchorDate = useMemo(() => {
    const created = toDate(item.createdAt);

    return formatDate(
      created && created.getTime() > LAW_DATE.getTime() + ONE_DAY_MS
        ? created
        : LAW_DATE,
    );
  }, [item.createdAt]);

  const car = prices.car;

  return (
    <div className="surface relative flex w-full flex-col gap-9 overflow-hidden px-6 py-9">
      <header className="flex flex-col gap-6">
        <h3
          className={`text-2xl font-semibold ${discounted ? "max-w-[25ch]" : ""}`}
        >
          {item.title}
        </h3>

        <div className="flex w-full flex-col gap-1 text-5xl font-medium">
          <div className="flex gap-3">
            {discounted && (
              <span className="min-w-max self-center text-sm text-gray-500 line-through dark:text-gray-400">
                €{car.price}
              </span>
            )}
            <span className="flex gap-1 font-bold">
              <small className="mb-3 text-lg font-light">€</small>
              <span>{car.current}</span>
            </span>
          </div>
          <PriceNotes
            info={car}
            anchorDate={anchorDate}
            discounted={discounted}
          />
        </div>

        {discounted && (
          <div className="absolute top-0 right-0 -z-10 flex aspect-square -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full p-1">
            <Wheel
              isDark={!isDark}
              speed={10}
              size={isWide ? 260 : 200}
              className="opacity-5"
            />
            <div className="absolute inset-0 flex items-end justify-center rounded-full bg-dark/5 p-3 dark:bg-light/5">
              <p className="mr-18 mb-10 text-lg font-normal sm:mr-21 sm:mb-15 sm:text-2xl">
                -{item.discount.value}
                {item.discount.type === "percentage" ? "%" : "€"}
              </p>
            </div>
          </div>
        )}
      </header>

      <div className="mb-10 flex flex-col gap-6">
        {item.services.length > 0 && <List items={item.services} />}

        <div className="flex flex-col gap-3 font-light">
          {EXTRA_CLASSES.map(({ key, label }) => {
            const info = prices[key];

            if (!info || info.price <= 0) return null;

            return (
              <span key={key}>
                <strong className="font-normal">Cijena za {label}: </strong>
                {discounted && (
                  <span className="mr-2 text-gray-500 line-through dark:text-gray-400">
                    €{info.price}
                  </span>
                )}
                €{info.current}
                <PriceNotes
                  info={info}
                  anchorDate={anchorDate}
                  discounted={discounted}
                  className="text-xs font-medium text-gray-500 dark:text-gray-400"
                />
              </span>
            );
          })}
        </div>
      </div>

      <footer className="mt-auto flex flex-col gap-6">
        {item.remark && (
          <small>
            <strong>Napomena:</strong> {item.remark}
          </small>
        )}
        <Button
          variant="primary"
          to={contactPath(item.slug)}
          className="w-full max-w-none justify-center"
        >
          Rezerviraj termin
        </Button>
      </footer>
    </div>
  );
};

export default ServiceCard;
