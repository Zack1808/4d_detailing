import { parseDate } from "./date";

import type { ServiceDataType, VehicleClass } from "../types/data";

export const toDate = (value: string, endOfDay = false): Date | null => {
  if (!value) return null;

  let date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    const parsed = parseDate(value);

    if (!parsed) return null;

    date = parsed;
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
  const end = toDate(discount.endsAt, true);

  if (start && now < start.getTime()) return false;
  if (end && now > end.getTime()) return false;

  return true;
};

export const applyDiscount = (
  price: number,
  discount: ServiceDataType["discount"],
): number => {
  const value = Number(discount.value);

  const result =
    discount.type === "percentage"
      ? Math.round(price * (1 - value / 100))
      : price - value;

  return Math.max(result, 0);
};

export const getCurrentPrice = (
  item: ServiceDataType,
  vehicleClass: VehicleClass = "car",
  now: number = Date.now(),
): number => {
  const { price } = item.prices[vehicleClass];

  return isDiscounted(item.discount, now)
    ? applyDiscount(price, item.discount)
    : price;
};
