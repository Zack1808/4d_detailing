import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { loadAuthApi } from "./authApi";

import type { AdminUser, AuthApi } from "./types";

type Status = "loading" | "authenticated" | "unauthenticated";

type AuthContextType = {
  status: Status;
  user: AdminUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<AdminUser | null>(null);
  const api = useRef<AuthApi | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    loadAuthApi().then((loaded) => {
      if (cancelled) return;

      api.current = loaded;
      unsubscribe = loaded.subscribe((next) => {
        setUser(next);
        setStatus(next ? "authenticated" : "unauthenticated");
      });
    });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  });

  const signIn = useCallback(async (email: string, password: string) => {
    const loaded = api.current ?? (await loadAuthApi());

    await loaded.signIn(email, password);
  }, []);

  const signOut = useCallback(async () => {
    await api.current?.signOut();
  }, []);

  const value = useMemo(
    () => ({ status, user, signIn, signOut }),
    [status, user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
