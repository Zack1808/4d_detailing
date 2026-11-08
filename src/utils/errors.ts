export const DEFAULT_ERROR_MESSAGE =
  "Nešto je pošlo po zlu. Pokušajte ponovno za nekoliko trenutaka.";

export const OFFLINE_MESSAGE =
  "Nema internetske veze. Provjerite vezu i pokušajte ponovno.";

export class ApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;

  constructor(
    message: string,
    status = 0,
    fieldErrors?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

const FIREBASE_MESSAGES: Record<string, string> = {
  "permission-denied":
    "Slanje nije dopušteno. Pokušajte ponovno ili nas kontaktirajte izravno.",
  unavailable: "Poslužitelj trenutno nije dostupan. Pokušajte ponovno.",
  "resource-exhausted":
    "Trenutno je previše zahtjeva. Pokušajte ponovno za nekoliko minuta.",
  "deadline-exceeded": "Zahtjev je istekao. Pokušajte ponovno.",
};

const getFirebaseCode = (error: unknown): string | undefined => {
  if (typeof error !== "object" || error === null) return undefined;

  const code = (error as { code?: unknown }).code;

  return typeof code === "string"
    ? code.replace(/^firestore\//, "")
    : undefined;
};

export const getErrorMessage = (
  error: unknown,
  fallback: string = DEFAULT_ERROR_MESSAGE,
): string => {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return OFFLINE_MESSAGE;
  }

  if (error instanceof ApiError) return error.message;

  const code = getFirebaseCode(error);

  if (code && FIREBASE_MESSAGES[code]) return FIREBASE_MESSAGES[code];

  return fallback;
};
