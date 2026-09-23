import {
  getDocs,
  addDoc,
  collection,
  query,
  where,
  QueryConstraint,
  type WhereFilterOp,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";

type FilterCondition = {
  field: string;
  operator: WhereFilterOp;
  value: unknown;
};

export const firebaseApi = {
  getData: async <T>(
    coll: string,
    filters?: FilterCondition[],
  ): Promise<T[]> => {
    const constraints: QueryConstraint[] = (filters ?? []).map((f) =>
      where(f.field, f.operator, f.value),
    );

    const q = query(collection(db, coll), ...constraints);
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length) return data as T[];

    return [];
  },

  setData: async <T>(coll: string, data: Omit<T, "id">): Promise<string> => {
    const docRef = await addDoc(collection(db, coll), data);
    return docRef.id;
  },
};
