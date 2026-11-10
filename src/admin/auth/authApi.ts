import { MOCK_CONFIG } from "../../services/mock/config";

import type { AuthApi } from "./types";

export const USE_MOCK_AUTH = import.meta.env.DEV && MOCK_CONFIG.enableMockAuth;

export const loadAuthApi = async (): Promise<AuthApi> => {
  if (USE_MOCK_AUTH) {
    return (await import("./mockAuth")).mockAuth;
  }

  return (await import("./firebaseAuth")).firebaseAuth;
};
