import { COLLECTIONS } from "../config/collections";

import { firestoreRest } from "./firestoreRest";
import { MOCK_CONFIG } from "./mock/config";

import type {
  BlockedAppointments,
  PageData,
  PriceTableType,
  ReviewType,
  ServiceDataType,
} from "../types/data";

export const USE_MOCK_DATA = import.meta.env.DEV && MOCK_CONFIG.enableMockData;

export const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const prepare = (data: PageData): PageData => ({
  ...data,
  services: data.services
    .filter((service) => service.status === "active")
    .sort((a, b) => a.sortOrder - b.sortOrder),
});

export const fetchPageData = async (): Promise<PageData> => {
  if (import.meta.env.DEV && MOCK_CONFIG.enableMockData) {
    const [mock] = await Promise.all([
      import("./mock/mockData"),
      wait(MOCK_CONFIG.apiDelay),
    ]);

    return prepare({
      services: mock.mockServices,
      reviews: mock.mockReviews,
      blockedAppointments: mock.mockBlockedAppointments,
      priceArchive: mock.mockPriceTable,
    });
  }

  const [services, reviews, blockedAppointments, priceArchive] =
    await Promise.all([
      firestoreRest.getAll<ServiceDataType>(COLLECTIONS.services, [
        { field: "status", value: "active" },
      ]),
      firestoreRest.getAll<ReviewType>(COLLECTIONS.reviews, [
        { field: "isApproved", value: true },
      ]),
      firestoreRest.getAll<BlockedAppointments>(
        COLLECTIONS.blockedAppointments,
      ),
      firestoreRest.getAll<PriceTableType>(COLLECTIONS.priceTables),
    ]);

  return prepare({ services, reviews, blockedAppointments, priceArchive });
};
