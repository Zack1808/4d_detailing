import { MOCK_CONFIG } from "./mock/config";

export type ContactInput = {
  fullName: string;
  phone: string;
  email: string;
  note: string;
  appointmentRef: string;
};

export type PhoneContact = { id: string };

export const USE_MOCK_CONTACTS =
  import.meta.env.DEV && MOCK_CONFIG.enableMockContacts;

const TIMEOUT_MS = 6000;

export const createPhoneContact = async (
  input: ContactInput,
): Promise<PhoneContact | null> => {
  try {
    if (import.meta.env.DEV && MOCK_CONFIG.enableMockContacts) {
      const { createMockContact } = await import("./mock/mockContacts");

      return await Promise.race([
        createMockContact(input),
        new Promise<null>((resolve) =>
          window.setTimeout(() => resolve(null), TIMEOUT_MS),
        ),
      ]);
    }

    return null;
  } catch (error) {
    console.error("Creating contact failed:", error);

    return null;
  }
};
