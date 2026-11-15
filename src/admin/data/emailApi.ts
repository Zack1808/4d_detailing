import { MOCK_CONFIG } from "../../services/mock/config";

import type { OutgoingEmail } from "./emailTemplates";

export const USE_MOCK_EMAIL =
  import.meta.env.DEV && MOCK_CONFIG.enableMockEmail;

export const sendEmail = async (mail: OutgoingEmail): Promise<void> => {
  if (import.meta.env.DEV && MOCK_CONFIG.enableMockEmail) {
    await new Promise((resolve) =>
      window.setTimeout(resolve, MOCK_CONFIG.apiDelay),
    );
    (await import("./mockOutbox")).pushToOutbox(mail);

    return;
  }

  throw new Error(
    "Slanje e-maila iz administracije još nije povezano s Mailgunom.",
  );
};
