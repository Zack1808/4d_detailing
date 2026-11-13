import { COLLECTIONS } from "../config/collections";

import { firestoreApi } from "./firestore";
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
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));

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
      firestoreApi.getAll<ServiceDataType>(COLLECTIONS.services, [
        { field: "status", operator: "==", value: "active" },
      ]),
      firestoreApi.getAll<ReviewType>(COLLECTIONS.reviews, [
        { field: "isApproved", operator: "==", value: true },
      ]),
      firestoreApi.getAll<BlockedAppointments>(COLLECTIONS.blockedAppointments),
      firestoreApi.getAll<PriceTableType>(COLLECTIONS.priceTables),
    ]);

  return prepare({ services, reviews, blockedAppointments, priceArchive });
};
