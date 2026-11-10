import { MOCK_CONFIG } from "../../services/mock/config";
import { readStorage, removeStorage, writeStorage } from "../../lib/storage";
import { ApiError } from "../../utils/errors";

import type { AdminUser, AuthApi } from "./types";

export const MOCK_ADMIN = {
  email: "admin@4d-detailing.hr",
  password: "admin123",
} as const;

const SESSION_KEY = "4d-admin-mock-session";

const listeners = new Set<(user: AdminUser | null) => void>();

const readSession = () => readStorage<AdminUser>(SESSION_KEY);

const emit = (user: AdminUser | null) => listeners.forEach((fn) => fn(user));

const wait = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));

export const mockAuth: AuthApi = {
  async signIn(email, password) {
    await wait(MOCK_CONFIG.apiDelay);

    const matches =
      email.trim().toLowerCase() === MOCK_ADMIN.email &&
      password === MOCK_ADMIN.password;

    if (!matches) {
      throw new ApiError("Neispravan e-mail ili lozinka", 401);
    }

    const user: AdminUser = { uid: "mock-admin", email: MOCK_ADMIN.email };

    writeStorage(SESSION_KEY, user);
    emit(user);

    return user;
  },

  async signOut() {
    removeStorage(SESSION_KEY);
    emit(null);
  },

  subscribe(callback) {
    listeners.add(callback);
    callback(readSession());

    return () => {
      listeners.delete(callback);
    };
  },
};
