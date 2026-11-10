import { COLLECTIONS } from "../../config/collections";
import { readStorage, removeStorage, writeStorage } from "../../lib/storage";
import { MOCK_CONFIG } from "../../services/mock/config";

import { MOCK_DB_KEY } from "./mockKeys";

import type { CollectionName, Repository } from "./repository";

type WithId = { id: string };
type Db = Record<CollectionName, WithId[]>;

let cache: Db | undefined;

const wait = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));

const buildSeed = async (): Promise<Db> => {
  const [mock, { mockAppointments, mockBlockedDates, mockPendingReviews }] =
    await Promise.all([
      import("../../services/mock/mockData"),
      import("./mockAppointments"),
    ]);

  return {
    [COLLECTIONS.services]: mock.mockServices,
    [COLLECTIONS.reviews]: [...mock.mockReviews, ...mockPendingReviews],
    [COLLECTIONS.blockedAppointments]: mockBlockedDates,
    [COLLECTIONS.priceTables]: mock.mockPriceTable,
    [COLLECTIONS.appointments]: mockAppointments,
  };
};

const getDb = async (): Promise<Db> => {
  if (cache) return cache;

  cache = readStorage<Db>(MOCK_DB_KEY) ?? (await buildSeed());

  return cache;
};

const save = (db: Db) => {
  cache = db;
  writeStorage(MOCK_DB_KEY, db);
};

const newId = () => `mock-${crypto.randomUUID}`;

export const resetMockData = () => {
  cache = undefined;
  removeStorage(MOCK_DB_KEY);
  window.location.reload();
};

export const createMockRepository = <T extends WithId>(
  name: CollectionName,
): Repository<T> => ({
  async list() {
    await wait(MOCK_CONFIG.apiDelay);

    return structuredClone((await getDb())[name]) as T[];
  },

  async create(data) {
    await wait(MOCK_CONFIG.apiDelay);

    const db = await getDb();
    const record = { ...data, id: newId() } as T;

    save({ ...db, [name]: [...db[name], record] });

    return structuredClone(record);
  },

  async update(id, patch) {
    await wait(MOCK_CONFIG.apiDelay);

    const db = await getDb();

    save({
      ...db,
      [name]: db[name].map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  },

  async remove(id) {
    await wait(MOCK_CONFIG.apiDelay);

    const db = await getDb();

    save({ ...db, [name]: db[name].filter((item) => item.id !== id) });
  },
});
