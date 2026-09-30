import { firestoreApi } from "@/shared/api/firestoreApi";

import type { ReviewType, ServiceType, NewReviewType } from "../types";

import { COLLECTIONS } from "@/config/collections";

export const catalogApi = {
  getServices: () => firestoreApi.getData<ServiceType>(COLLECTIONS.services),
  getReviews: () =>
    firestoreApi.getData<ReviewType>(COLLECTIONS.reviews, [
      {
        field: "isApproved",
        operator: "==",
        value: true,
      },
    ]),
  addReview: (data: NewReviewType) =>
    firestoreApi.setData<ReviewType>(COLLECTIONS.reviews, {
      ...data,
      isApproved: false,
    }),
};
