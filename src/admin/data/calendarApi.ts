import { MOCK_CONFIG } from "../../services/mock/config";

export type CalendarEventInput = {
  summary: string;
  description: string;
  dateFrom: string;
  dateTo: string;
};

export type CalendarEvent = { id: string; link?: string };

export const USE_MOCK_CALENDAR =
  import.meta.env.DEV && MOCK_CONFIG.enableMockCalendar;

const NOT_CONNECTED = "Google Calendar još nije povezan";

export const createCalendarEvent = async (
  input: CalendarEventInput,
): Promise<CalendarEvent> => {
  if (import.meta.env.DEV && MOCK_CONFIG.enableMockCalendar) {
    return (await import("./mockCalendar")).createMockEvent(input);
  }

  throw new Error(NOT_CONNECTED);
};

export const deleteCalendarEvent = async (eventId: string): Promise<void> => {
  if (import.meta.env.DEV && MOCK_CONFIG.enableMockCalendar) {
    return (await import("./mockCalendar")).deleteMockEvent(eventId);
  }

  throw new Error(NOT_CONNECTED);
};
