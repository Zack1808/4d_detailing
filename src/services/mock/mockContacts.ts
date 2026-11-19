import { MOCK_CONTACTS_KEY } from "../../admin/data/mockKeys";
import { readStorage, writeStorage } from "../../lib/storage";

import { MOCK_CONFIG } from "./config";

import type { ContactInput, PhoneContact } from "../contactsApi";

type StoredContact = {
  resourceName: string;
  names: { displayName: string }[];
  phoneNumbers: { value: string; type: "mobile" }[];
  emailAddresses: { value: string }[];
  biographies: { value: string }[];
  userDefined: { key: string; value: string }[];
};

const wait = () =>
  new Promise<void>((resolve) =>
    window.setTimeout(resolve, MOCK_CONFIG.apiDelay),
  );

export const createMockContact = async (
  input: ContactInput,
): Promise<PhoneContact> => {
  await wait();

  const contact: StoredContact = {
    resourceName: `people/mock-${crypto.randomUUID()}`,
    names: [{ displayName: input.fullName }],
    phoneNumbers: [{ value: input.phone, type: "mobile" }],
    emailAddresses: [{ value: input.email }],
    biographies: [{ value: input.note }],
    userDefined: [{ key: "4D termin", value: input.appointmentRef }],
  };

  writeStorage(MOCK_CONTACTS_KEY, [
    ...(readStorage<StoredContact[]>(MOCK_CONTACTS_KEY) ?? []),
    contact,
  ]);
  console.info("[mock google contacts] contact created", contact);

  return { id: contact.resourceName };
};
