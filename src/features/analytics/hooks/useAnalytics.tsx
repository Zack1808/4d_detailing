import { useCallback } from "react";

import type { AnalyticsType } from "@features/analytics/types";

import { MOCK_CONFIG } from "@/config/mockConfig";

type UseAnalyticsType = (useMockData?: boolean) => {
  getAnalytics: () => Promise<AnalyticsType | null>;
};

const loadMockAnalyticsData = () =>
  import("@features/analytics/mock/analyticsMock");

export const UseAnalytics: UseAnalyticsType = (
  useMockData = MOCK_CONFIG.enableMockData,
) => {
  const getAnalytics = useCallback(async () => {
    try {
      if (useMockData) {
        const [{ mockAnalytics }] = await Promise.all([
          loadMockAnalyticsData(),
          new Promise((resolve) => setTimeout(resolve, MOCK_CONFIG.apiDelay)),
        ]);

        return mockAnalytics;
      }

      return null;
    } catch (err: unknown) {
      console.error("getAnalytics failed: ", err);
      return null;
    }
  }, [useMockData]);

  return {
    getAnalytics,
  };
};
