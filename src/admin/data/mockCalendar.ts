import { readStorage, writeStorage } from "../../lib/storage";
import { MOCK_CONFIG } from "../../services/mock/config";
import { toIsoDate, addDaysToValue } from "../../utils/date";

import { MOCK_CALENDAR_KEY } from "./mockKeys";

import type { CalendarEvent, CalendarEventInput } from "./calendarApi";

export const REMINDER_MINUTES_BEFORE = 360;

type StoredEvent = {
  id: string;
  summary: string;
  description: string;
  start: { date: string };
  end: { date: string };
  reminders: {
    useDefault: false;
    overrides: { method: "popup" | "email"; minutes: number }[];
  };
};

const wait = () =>
  new Promise<void>((resolve) =>
    window.setTimeout(resolve, MOCK_CONFIG.apiDelay),
  );

const read = () => readStorage<StoredEvent[]>(MOCK_CALENDAR_KEY) ?? [];

export const createMockEvent = async (
  input: CalendarEventInput,
): Promise<CalendarEvent> => {
  await wait();

  const event: StoredEvent = {
    id: `mock-event-${crypto.randomUUID()}`,
    summary: input.summary,
    description: input.description,
    start: { date: toIsoDate(input.dateFrom) },
    end: { date: toIsoDate(addDaysToValue(input.dateTo, 1)) },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: REMINDER_MINUTES_BEFORE },
        { method: "email", minutes: REMINDER_MINUTES_BEFORE },
      ],
    },
  };

  writeStorage(MOCK_CALENDAR_KEY, [...read(), event]);
  console.info("[mock google calendar] event created", event);

  return { id: event.id };
};

export const deleteMockEvent = async (eventId: string) => {
  await wait();

  writeStorage(
    MOCK_CALENDAR_KEY,
    read().filter((event) => event.id !== eventId),
  );
  console.info("[mock google calendar] event deleted", eventId);
};
