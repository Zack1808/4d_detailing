import { useState, useCallback } from "react";

import { catalogApi } from "../api/catalogApi";

import { MOCK_CONFIG } from "@/config/mockConfig";

import type { ServiceType, ReviewType, NewReviewType } from "../types";

type useGetPageDataType = (useMockData?: boolean) => {
  error: string | null;
  setReview: (review: NewReviewType) => Promise<boolean | undefined>;
  getPageData: () => Promise<
    | {
        services: ServiceType[];
        reviews: ReviewType[];
      }
    | undefined
  >;
};

const loadCatalogMockData = () => import("@/features/catalog/mock/catalogMock");

export const useGetPageData: useGetPageDataType = (
  useMockData = MOCK_CONFIG.enableMockData,
) => {
  const [error, setError] = useState<string | null>(null);

  const setReview = useCallback(
    async (review: NewReviewType) => {
      setError(null);

      try {
        if (useMockData) {
          await new Promise((resolve) =>
            setTimeout(resolve, MOCK_CONFIG.apiDelay),
          );

          return true;
        }

        const id = await catalogApi.addReview(review);

        if (id) return true;

        return false;
      } catch (err: unknown) {
        console.error("setReview failed: ", err);
        setError(err instanceof Error ? err.message : "Nešto je pošlo po zlu!");
        return false;
      } finally {
      }
    },
    [useMockData],
  );

  const getPageData = useCallback(async () => {
    setError(null);

    try {
      if (useMockData) {
        const [{ mockServices, mockReviews }] = await Promise.all([
          loadCatalogMockData(),
          new Promise((resolve) => setTimeout(resolve, MOCK_CONFIG.apiDelay)),
        ]);

        return {
          services: mockServices,
          reviews: mockReviews,
        };
      }

      const services = await catalogApi.getServices();
      const reviews = await catalogApi.getReviews();

      return {
        services,
        reviews,
      };
    } catch (err: unknown) {
      console.error("getPageData failed: ", err);
      setError(err instanceof Error ? err.message : "Nešto je pošlo po zlu!");
    } finally {
    }
  }, [useMockData]);

  return {
    error,
    setReview,
    getPageData,
  };
};
