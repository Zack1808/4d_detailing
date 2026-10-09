import { firestoreApi } from "@/shared/api/firestoreApi";

import type {
  ReviewType,
  ServiceType,
  NewReviewType,
  NewServiceType,
} from "../types";

import { COLLECTIONS } from "@/config/collections";

export const catalogApi = {
  getServices: () => firestoreApi.getData<ServiceType>(COLLECTIONS.services),

  addService: (data: NewServiceType) => {
    console.log(data);
  },

  updateService: (data: ServiceType, id: string) => {
    console.log(data, id);
  },

  deleteService: (id: string) => {
    console.log(id);
  },

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

  updateReview: (data: ReviewType, id: string) => {
    console.log(data, id);
  },

  deleteReview: (id: string) => {
    console.log(id);
  },
};
