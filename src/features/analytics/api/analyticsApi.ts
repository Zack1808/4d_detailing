// TODO: setup api integration

import type { AnalyticsType } from "@features/analytics/types";

export const analyticsAdminApi = {
  getAnalytics: async (): Promise<AnalyticsType> => {
    throw new Error("analyticsAdminApi.getAnalytics is not implemented yet");
  },
};
