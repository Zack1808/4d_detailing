import { getDocs, collection } from "firebase/firestore";

import { db } from "../../firebaseConfig";

export const firebaseApi = {
  getData: async <T>(coll: string): Promise<T[]> => {
    const querySnapshot = await getDocs(collection(db, coll));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length) return data as T[];

    return [];
  },

  // addReview: async (data: ReviewType) => {},
};
