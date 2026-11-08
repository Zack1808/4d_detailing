import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  type WhereFilterOp,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export type FilterCondition = {
  field: string;
  operator: WhereFilterOp;
  value: unknown;
};

export const firestoreApi = {
  async getAll<T>(name: string, filters: FilterCondition[] = []): Promise<T[]> {
    const constraints = filters.map((f) => where(f.field, f.operator, f.value));
    const snapshot = await getDocs(query(collection(db, name), ...constraints));

    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
  },

  async add<T extends object>(name: string, data: T): Promise<string> {
    const ref = await addDoc(collection(db, name), data);

    return ref.id;
  },

  async update(name: string, id: string, data: object): Promise<void> {
    await updateDoc(doc(db, name, id), { ...data });
  },

  async remove(name: string, id: string): Promise<void> {
    await deleteDoc(doc(db, name, id));
  },
};
