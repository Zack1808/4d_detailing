import { useCallback } from "react";

import { catalogApi } from "../api/catalogApi";

import { MOCK_CONFIG } from "@/config/mockConfig";

import type { ReviewType, NewReviewType } from "../types";

type useReviewsType = (useMockData?: boolean) => {
  getReviews: () => Promise<ReviewType[] | undefined>;
  addReview: (review: NewReviewType) => Promise<boolean>;
  updateReview: (id: string, review: ReviewType) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
};

const loadMockReviews = () => import("@/features/catalog/mock/catalogMock");

export const useReviews: useReviewsType = (
  useMockData = MOCK_CONFIG.enableMockData,
) => {
  const getReviews = useCallback(async () => {
    try {
      if (useMockData) {
        const [{ mockReviews }] = await Promise.all([
          loadMockReviews(),
          new Promise((resolve) => setTimeout(resolve, MOCK_CONFIG.apiDelay)),
        ]);

        return mockReviews;
      }

      const reviews = await catalogApi.getReviews();

      return reviews;
    } catch (err: unknown) {
      console.error("getReview failed: ", err);
    }
  }, [useMockData]);

  const addReview = useCallback(
    async (review: NewReviewType) => {
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
        return false;
      }
    },
    [useMockData],
  );

  const updateReview = useCallback(
    async (id: string, review: NewReviewType) => {
      console.log(id, review);
    },
    [useMockData],
  );

  const deleteReview = useCallback(
    async (id: string) => {
      console.log(id);
    },
    [useMockData],
  );

  return {
    getReviews,
    addReview,
    updateReview,
    deleteReview,
  };
};
