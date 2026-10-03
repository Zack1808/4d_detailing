export type AnalyticsSummaryType = {
  totalVisits: number;
  uniqueVisitors: number;
  conversionRate: number;
};

export type DailyVisitType = {
  date: string;
  visits: number;
  uniqueVisitors: number;
};

export type PageStatType = {
  path: string;
  views: number;
};

export type TrafficSourceType = {
  source: string;
  visits: number;
};

export type AnalyticsType = {
  summary: AnalyticsSummaryType;
  dailyVisits: DailyVisitType[];
  topPages: PageStatType[];
  trafficSources: TrafficSourceType[];
};
