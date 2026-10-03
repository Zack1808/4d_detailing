import type { AnalyticsType } from "@features/analytics/types";

export const mockAnalytics: AnalyticsType = {
  summary: {
    totalVisits: 365,
    uniqueVisitors: 271,
    conversionRate: 7.0,
  },
  dailyVisits: [
    { date: "27.09.2026", visits: 42, uniqueVisitors: 30 },
    { date: "28.09.2026", visits: 55, uniqueVisitors: 41 },
    { date: "29.09.2026", visits: 38, uniqueVisitors: 29 },
    { date: "30.09.2026", visits: 61, uniqueVisitors: 46 },
    { date: "01.10.2026", visits: 47, uniqueVisitors: 35 },
    { date: "02.10.2026", visits: 70, uniqueVisitors: 52 },
    { date: "03.10.2026", visits: 52, uniqueVisitors: 38 },
  ],
  topPages: [
    { path: "/", views: 182 },
    { path: "/usluge", views: 102 },
    { path: "/kontakt", views: 58 },
    { path: "/pravila-privatnosti", views: 12 },
    { path: "/uvijeti-koristenja", views: 11 },
  ],
  trafficSources: [
    { source: "Direct", visits: 124 },
    { source: "Google", visits: 113 },
    { source: "Instagram", visits: 80 },
    { source: "Facebook", visits: 33 },
    { source: "Other", visits: 15 },
  ],
};
