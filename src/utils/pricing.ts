import { parseDate } from "./date";

import type { ServiceDataType } from "../types/data";

type VehicleClass = keyof ServiceDataType["prices"];

export const toDate = (
  value: string,
  endOfDay: boolean = false,
): Date | null => {
  if (!value) return null;

  let date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    const parsed = parseDate(value);

    if (!parsed) return null;

    date = new Date(parsed.getTime());
  }

  if (endOfDay && !value.includes(":")) date.setHours(23, 59, 59, 999);

  return date;
};

export const isDiscounted = (
  discount: ServiceDataType["discount"],
  now: number = Date.now(),
): boolean => {
  if (!(Number(discount.value) > 0)) return false;

  const start = toDate(discount.startsAt);
  const end = toDate(discount.endsAt);

  if (start && now < start.getTime()) return false;
  if (end && now > end.getTime()) return false;

  return true;
};

export const applyDiscount = (
  price: number,
  discount: ServiceDataType["discount"],
): number => {
  const result =
    discount.type === "percentage"
      ? Math.round(price * (1 - Number(discount.value) / 100))
      : price - Number(discount.value);

  return Math.max(result, 0);
};

export const getCurrentPrice = (
  item: ServiceDataType,
  vehilcleClass: VehicleClass = "car",
  now: number = Date.now(),
): number => {
  const { price } = item.prices[vehilcleClass];

  return isDiscounted(item.discount, now)
    ? applyDiscount(price, item.discount)
    : price;
};
