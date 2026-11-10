import { COLLECTIONS } from "../../config/collections";
import { firestoreApi } from "../../services/firestore";
import { MOCK_CONFIG } from "../../services/mock/config";

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

type WithId = { id: string };

export type Repository<T extends WithId> = {
  list: () => Promise<T[]>;
  create: (data: Omit<T, "id">) => Promise<T>;
  update: (id: string, patch: Partial<Omit<T, "id">>) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

const withoutUndefined = <V extends object>(value: V): V =>
  Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== undefined),
  ) as V;

const createFirestoreRepository = <T extends WithId>(
  name: CollectionName,
): Repository<T> => ({
  list: () => firestoreApi.getAll<T>(name),

  async create(data) {
    const clean = withoutUndefined(data);
    const id = await firestoreApi.add(name, clean);

    return { ...clean, id } as T;
  },

  update: (id, patch) => firestoreApi.update(name, id, withoutUndefined(patch)),

  remove: (id) => firestoreApi.remove(name, id),
});

export const createRepository = <T extends WithId>(
  name: CollectionName,
): Repository<T> => {
  let backend: Promise<Repository<T>> | undefined;

  const resolve = () => {
    if (import.meta.env.DEV && MOCK_CONFIG.enableMockData) {
      return (backend ??= import("./mockStore").then((m) =>
        m.createMockRepository<T>(name),
      ));
    }

    return (backend ??= Promise.resolve(createFirestoreRepository<T>(name)));
  };

  return {
    list: async () => (await resolve()).list(),
    create: async (data) => (await resolve()).create(data),
    update: async (id, patch) => (await resolve()).update(id, patch),
    remove: async (id) => (await resolve()).remove(id),
  };
};
