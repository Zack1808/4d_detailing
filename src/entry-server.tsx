import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom";

import { AppRoutes } from "./App";
import { DataSnapshotProvider } from "./context/DataContext";

import type { PageData } from "./types/data";

export { PAGE_META } from "./config/seo";
export { SITE_URL } from "./config/business";
export { fetchPageData } from "./services/pageData";
export {
  generateBreadcrumbSchema,
  generateBusinessSchema,
  generateServicesSchema,
  generateWebsiteSchema,
} from "./utils/schema";

export const loadMockData = async (): Promise<PageData> => {
  const mock = await import("./services/mock/mockData");

  return {
    services: mock.mockServices
      .filter((service) => service.status === "active")
      .sort((a, b) => a.sortOrder - b.sortOrder),
    reviews: mock.mockReviews,
    blockedAppointments: mock.mockBlockedAppointments,
    priceArchive: mock.mockPriceTable,
  };
};

export const render = (url: string, data: PageData | null) =>
  renderToString(
    <StrictMode>
      <HelmetProvider context={{}}>
        <DataSnapshotProvider value={data}>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </DataSnapshotProvider>
      </HelmetProvider>
    </StrictMode>,
  );
