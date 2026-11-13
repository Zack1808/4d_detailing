import { addDaysToValue } from "./date";

import type { ServiceDataType } from "../types/data";

export type DurationRange = { min: number; max: number };

const DURATION = /^(\d{1,2})(?:\s*[-–]\s*(\d{1,2}))?$/;

export const parseDuration = (value?: string | null): DurationRange | null => {
  const match = DURATION.exec((value ?? "").trim());

  if (!match) return null;

  const min = Number(match[1]);
  const max = match[2] === undefined ? min : Number(match[2]);

  if (min < 1 || max < min) return null;

  return { min, max };
};

export const normalizeDuration = (value: string) => {
  const range = parseDuration(value);

  if (!range) return value.trim();

  return range.min === range.max
    ? String(range.max)
    : `${range.min}-${range.max}`;
};

const dayWord = (count: number) =>
  count % 10 === 1 && count % 100 === 11 ? "dan" : "dana";

export const formatDuration = (value?: string | null) => {
  const range = parseDuration(value);

  if (!range) return null;

  const label =
    range.min === range.max ? range.max : `${range.min}-${range.max}`;

  return `${label} ${dayWord(range.max)}`;
};

export const guessPhases = (title: string) => {
  const match = /(\d+)\s*fa(?:za|ze|zi|zu)\b/i.exec(title);
  const phases = match ? Number(match[1]) : 1;

  return phases >= 1 ? phases : 1;
};

export const getBlockedDays = (
  service: Pick<ServiceDataType, "duration" | "durationPerPhase"> | undefined,
  phases = 1,
): number | null => {
  const range = parseDuration(service?.duration);

  if (!range) return null;

  const multiplier = service?.durationPerPhase ? Math.max(1, phases) : 1;

  return range.max * multiplier;
};

export const getEndDate = (dateFrom: string, days: number | null) =>
  days === null ? dateFrom : addDaysToValue(dateFrom, Math.max(1, days) - 1);
