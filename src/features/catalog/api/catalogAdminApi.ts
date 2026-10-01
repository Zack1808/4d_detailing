// TODO: setup api integration

import type { ReviewType, ServiceType, NewServiceType } from "../types";

export const catalogAdminApi = {
  addService: (data: NewServiceType) => {
    console.log(data);
  },

  updateService: (data: ServiceType, id: string) => {
    console.log(data, id);
  },

  deleteService: (id: string) => {
    console.log(id);
  },

  updateReview: (data: ReviewType, id: string) => {
    console.log(data, id);
  },

  deleteReview: (id: string) => {
    console.log(id);
  },
};
