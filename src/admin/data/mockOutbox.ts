import { readStorage, writeStorage } from "../../lib/storage";

import { MOCK_OUTBOX_KEY } from "./mockKeys";

import type { OutgoingEmail } from "./emailTemplates";

export type SentEmail = OutgoingEmail & { id: string; sentAt: string };

export const pushToOutbox = (mail: OutgoingEmail): SentEmail => {
  const sent: SentEmail = {
    ...mail,
    id: crypto.randomUUID(),
    sentAt: new Date().toISOString(),
  };

  writeStorage(MOCK_OUTBOX_KEY, [
    ...(readStorage<SentEmail[]>(MOCK_OUTBOX_KEY) ?? []),
    sent,
  ]);

  console.info("[mock e-mail]", sent);

  return sent;
};
