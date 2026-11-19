const PROJECT_ID = import.meta.env.VITE_APP_FIREBASE_PROJECT_ID as
  | string
  | undefined;
const API_KEY = import.meta.env.VITE_APP_FIREBASE_API_KEY as string | undefined;

const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const TIMEOUT_MS = 15_000;

export type EqualityFilter = { field: string; value: string | boolean };

type FirestoreValue =
  | { nullValue: null }
  | { booleanValue: boolean }
  | { integerValue: string }
  | { doubleValue: number }
  | { timestampValue: string }
  | { stringValue: string }
  | { referenceValue: string }
  | { geoPointValue: { latitude: number; longitude: number } }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } };

type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
};

class FirestoreRestError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "FirestoreRestError";
    this.code = code;
  }
}

const decode = (value: FirestoreValue): unknown => {
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("timestampValue" in value) return value.timestampValue;
  if ("nullValue" in value) return null;
  if ("referenceValue" in value) return value.referenceValue;
  if ("geoPointValue" in value) return value.geoPointValue;
  if ("arrayValue" in value) return (value.arrayValue.values ?? []).map(decode);
  if ("mapValue" in value) return decodeFields(value.mapValue.fields);

  return undefined;
};

const decodeFields = (fields: Record<string, FirestoreValue> = {}) =>
  Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, decode(value)]),
  );

const encode = (value: unknown): FirestoreValue => {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    return Number.isSafeInteger(value)
      ? { integerValue: String(value) }
      : { doubleValue: value };
  }
  if (typeof value === "string") return { stringValue: value };
  if (Array.isArray(value))
    return { arrayValue: { values: value.map(encode) } };
  if (typeof value === "object") {
    return { mapValue: { fields: encodeFields(value as object) } };
  }

  return { stringValue: String(value) };
};

const encodeFields = (data: object) =>
  Object.fromEntries(
    Object.entries(data)
      .filter(([, item]) => item !== undefined)
      .map(([key, item]) => [key, encode(item)]),
  );

const request = async <T>(path: string, body: unknown): Promise<T> => {
  if (!PROJECT_ID || !API_KEY) {
    throw new FirestoreRestError("Firebase is not configured.", "unavailable");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${BASE}${path}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const json = (await response.json().catch(() => null)) as
      | (T & { error?: { message?: string; status?: string } })
      | null;

    if (!response.ok) {
      const status = json && !Array.isArray(json) ? json.error?.status : "";

      throw new FirestoreRestError(
        (json && !Array.isArray(json) && json.error?.message) ||
          `Firestore request failed (${response.status})`,
        (status || "unknown").toLowerCase().replace(/_/g, "-"),
      );
    }

    return json as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new FirestoreRestError("Request timed out.", "deadline-exceeded");
    }

    throw error;
  } finally {
    clearTimeout(timer);
  }
};

export const firestoreRest = {
  async getAll<T>(
    collectionId: string,
    filters: EqualityFilter[] = [],
  ): Promise<T[]> {
    const conditions = filters.map(({ field, value }) => ({
      fieldFilter: {
        field: { fieldPath: field },
        op: "EQUAL",
        value: encode(value),
      },
    }));

    const where =
      conditions.length === 0
        ? undefined
        : conditions.length === 1
          ? conditions[0]
          : { compositeFilter: { op: "AND", filters: conditions } };

    const rows = await request<{ document?: FirestoreDocument }[]>(
      ":runQuery",
      {
        structuredQuery: { from: [{ collectionId }], ...(where && { where }) },
      },
    );

    return rows
      .filter((row) => row.document)
      .map(({ document }) => {
        const doc = document as FirestoreDocument;

        return {
          id: doc.name.slice(doc.name.lastIndexOf("/") + 1),
          ...decodeFields(doc.fields),
        } as T;
      });
  },

  async add(collectionId: string, data: object): Promise<string> {
    const doc = await request<FirestoreDocument>(`/${collectionId}`, {
      fields: encodeFields(data),
    });

    return doc.name.slice(doc.name.lastIndexOf("/") + 1);
  },
};
