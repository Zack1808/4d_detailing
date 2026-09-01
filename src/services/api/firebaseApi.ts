import { type ServiceDataType, type ReviewType } from "../../types/data";

export const firebaseApi = {
  getData: async (
    documentId: string,
  ): Promise<ServiceDataType[] | ReviewType[]> => {
    return [];
  },

  addReview: async (data: ReviewType) => {},
};
