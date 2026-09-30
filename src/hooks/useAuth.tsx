import { useState, useCallback } from "react";

import { MOCK_CONFIG } from "../services/mock/mockData";

import { type AdminUserType } from "../types/data";

type useAuthDataType = (useMockData?: boolean) => {
  signIn: (
    email: string,
    password: string,
  ) => Promise<AdminUserType | undefined>;
  signOut: () => Promise<boolean>;
  getCurrentUser: () => Promise<AdminUserType | null | undefined>;
  error: string | null;
};

const MOCK_SESSION_KEY = "mock-admin-session";
const loadMockData = () => import("../services/mock/mockData");
const wait = () =>
  new Promise((resolve) => setTimeout(resolve, MOCK_CONFIG.apiDelay));

export const useAuth: useAuthDataType = (
  useMockData = MOCK_CONFIG.enableMockAuth,
) => {
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setError(null);

      try {
        if (useMockData) {
          const [{ mockAdminCredentials }] = await Promise.all([
            loadMockData(),
            wait(),
          ]);

          if (
            email !== mockAdminCredentials.email ||
            password !== mockAdminCredentials.password
          ) {
            throw new Error("Pogrešan email ili lozinka!");
          }

          const user = {
            uid: mockAdminCredentials.uid,
            email: mockAdminCredentials.email,
          };

          sessionStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(user));

          return user;
        }

        return;
      } catch (err: unknown) {
        console.error("signIn failed: ", err);
        setError(err instanceof Error ? err.message : "Nešto je pošlo po zlu!");
      }
    },
    [useMockData],
  );

  const signOut = useCallback(async () => {
    setError(null);

    try {
      if (useMockData) {
        await wait();
        sessionStorage.removeItem(MOCK_SESSION_KEY);

        return true;
      }

      return true;
    } catch (err: unknown) {
      console.error("signOut failed: ", err);
      setError(err instanceof Error ? err.message : "Nešto je pošlo po zlu!");
      return false;
    }
  }, [useMockData]);

  const getCurrentUser = useCallback(async () => {
    setError(null);

    try {
      if (useMockData) {
        await wait();

        const raw = sessionStorage.getItem(MOCK_SESSION_KEY);

        return raw ? (JSON.parse(raw) as AdminUserType) : null;
      }

      return;
    } catch (err: unknown) {
      console.error("getCurrentUser failed: ", err);
      setError(err instanceof Error ? err.message : "Nešto je pošlo po zlu!");
    }
  }, [useMockData]);

  return {
    error,
    getCurrentUser,
    signIn,
    signOut,
  };
};
