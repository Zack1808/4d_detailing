import {
  ApiError,
  DEFAULT_ERROR_MESSAGE,
  OFFLINE_MESSAGE,
} from "../utils/errors";

import type { AppointmentValues, ReviewValues } from "../validation/rules";

const ENDPOINT = "/.netlify/functions/contact";
const TIMEOUT_MS = 15_000;

export type ContactPayload =
  | ({ type: "appointment" } & AppointmentValues)
  | ({ type: "review" } & ReviewValues);

type ErrorBody = { error?: string; errors?: Record<string, string> };

export const sendContactEmail = async (payload: ContactPayload) => {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.ok) return;

    const body = (await response.json().catch(() => ({}))) as ErrorBody;

    throw new ApiError(
      body.error ?? DEFAULT_ERROR_MESSAGE,
      response.status,
      body.errors,
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (controller.signal.aborted) {
      throw new ApiError("Zahtjev je istekao. Pokušajte ponovno.", 408);
    }

    throw new ApiError(
      navigator.onLine === false ? OFFLINE_MESSAGE : DEFAULT_ERROR_MESSAGE,
    );
  } finally {
    window.clearTimeout(timer);
  }
};
