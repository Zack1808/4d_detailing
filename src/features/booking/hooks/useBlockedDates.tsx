import { useCallback } from "react";

import type { BlockedAppointments } from "@features/booking/types";

import { appointmentApi } from "../api/appointmentsApi";

import { MOCK_CONFIG } from "@/config/mockConfig";

type UseBlockedDates = (useMockData?: boolean) => {
  getBlockedAppointments: () => Promise<BlockedAppointments[]>;
};

const loadMockBlockedDatesData = () =>
  import("@/features/booking/mock/appointmentsMock");

export const useBlockedDates: UseBlockedDates = (
  useMockData = MOCK_CONFIG.enableMockData,
) => {
  const getBlockedAppointments = useCallback(async () => {
    try {
      if (useMockData) {
        const [{ mockBlockedAppointments }] = await Promise.all([
          loadMockBlockedDatesData(),
          new Promise((resolve) => setTimeout(resolve, MOCK_CONFIG.apiDelay)),
        ]);

        return mockBlockedAppointments;
      }

      return await appointmentApi.getBlockedDates();
    } catch (err: unknown) {
      console.error("setReview failed: ", err);
      return [];
    }
  }, [useMockData]);

  return { getBlockedAppointments };
};
