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

type MockStore = {
  [COLLECTIONS.services]?: ServiceDataType[];
  [COLLECTIONS.reviews]?: ReviewType[];
  [COLLECTIONS.blockedAppointments]?: BlockedAppointments[];
  [COLLECTIONS.priceTables]?: PriceTableType[];
};

const readMockStore = async (): Promise<MockStore | null> => {
  const [{ readStorage }, { MOCK_DB_KEY }] = await Promise.all([
    import("../lib/storage"),
    import("../admin/data/mockKeys"),
  ]);

  return readStorage<MockStore>(MOCK_DB_KEY);
};

const prepare = (data: PageData): PageData => ({
  ...data,
  services: data.services
    .filter((service) => service.status === "active")
    .sort((a, b) => a.sortOrder - b.sortOrder),
});

export const fetchPageData = async (): Promise<PageData> => {
  if (import.meta.env.DEV && MOCK_CONFIG.enableMockData) {
    const [mock, stored] = await Promise.all([
      import("./mock/mockData"),
      readMockStore(),
      wait(MOCK_CONFIG.apiDelay),
    ]);

    if (stored) {
      return prepare({
        services: stored[COLLECTIONS.services] ?? [],
        reviews: (stored[COLLECTIONS.reviews] ?? []).filter(
          (review) => review.isApproved,
        ),
        blockedAppointments: stored[COLLECTIONS.blockedAppointments] ?? [],
        priceArchive: stored[COLLECTIONS.priceTables] ?? [],
      });
    }

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
