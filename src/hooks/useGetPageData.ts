import { useState, useCallback } from "react";

import {
  mockServices,
  mockReviews,
  MOCK_CONFIG,
} from "../services/mock/mockData";

import { type ServiceDataType, type ReviewType } from "../types/data";

type useGetPageDataType = (useMockData?: boolean) => {
  loading: boolean;
  pageLoading: boolean;
  error: string | null;
  getServices: () => Promise<ServiceDataType[] | undefined>;
  getReviews: () => Promise<ReviewType[] | undefined>;
  setReview: (review: ReviewType) => Promise<boolean | undefined>;
  getPageData: () => Promise<
    | {
        services: ServiceDataType[];
        reviews: ReviewType[];
      }
    | undefined
  >;
};

export const useGetPageData: useGetPageDataType = (
  useMockData = MOCK_CONFIG.enableMockData,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getServices = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (useMockData) {
        await new Promise((resolve) =>
          setTimeout(resolve, MOCK_CONFIG.apiDelay),
        );

        return mockServices;
      }

      return [];
    } catch (err: unknown) {
    } finally {
      setLoading(false);
    }
  }, [useMockData]);

  const getReviews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (useMockData) {
        await new Promise((resolve) =>
          setTimeout(resolve, MOCK_CONFIG.apiDelay),
        );
        return mockReviews;
      }
    } catch (err: unknown) {
    } finally {
      setLoading(false);
    }
  }, [useMockData]);

  const setReview = useCallback(
    async (reveiw: ReviewType) => {
      setLoading(true);
      setError(null);

      try {
        if (useMockData) {
          await new Promise((resolve) =>
            setTimeout(resolve, MOCK_CONFIG.apiDelay),
          );

          return true;
        }

        return true;
      } catch (err: unknown) {
      } finally {
        setLoading(false);
      }
    },
    [useMockData],
  );

  const getPageData = useCallback(async () => {
    setPageLoading(true);
    setError(null);

    try {
      if (useMockData) {
        await new Promise((resolve) =>
          setTimeout(resolve, MOCK_CONFIG.apiDelay),
        );

        return {
          services: mockServices,
          reviews: mockReviews,
        };
      }

      return {
        services: [],
        reviews: [],
      };
    } catch (err: unknown) {
    } finally {
      setPageLoading(false);
    }
  }, [useMockData]);

  return {
    loading,
    pageLoading,
    error,
    getServices,
    getReviews,
    setReview,
    getPageData,
  };
};
