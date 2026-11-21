import { useEffect } from "react";

import { removePastCalendarEvents } from "./appointmentActions";

import type { AppointmentType } from "../../types/data";

export const usePastCalendarCleanup = (
  items: AppointmentType[],
  ready: boolean,
  refresh: () => Promise<unknown>,
) => {
  useEffect(() => {
    if (!ready) return;

    void removePastCalendarEvents(items).then((removed) => {
      if (removed > 0) void refresh();
    });
  }, [items, ready, refresh]);
};
