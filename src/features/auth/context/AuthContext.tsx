import React, { useState, useContext, useEffect, useCallback } from "react";

import PageLoader from "@/shared/components/PageLoader";

import { useAuth } from "@features/auth/hooks/useAuth";

import { useTheme } from "@/shared/context/ThemeContext";

import type { AdminUserType } from "../types";
import { notifySuccess } from "@/shared/utils/toast";

type AuthContextType = {
  user: AdminUserType | null;
  error: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
};

type AuthProviderType = {
  children: React.ReactNode;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<AdminUserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  const {
    signIn: authSignIn,
    signOut: authSignOut,
    getCurrentUser,
    error,
  } = useAuth();

  const { isDark } = useTheme();

  useEffect(() => {
    const restoreSession = async () => {
      setLoading(true);
      try {
        const currentUser = await getCurrentUser();

        setUser(currentUser ?? null);
      } catch (err: unknown) {
        console.log("getCurrentUser failed: ", err);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [getCurrentUser]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowLoader(false), 700);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const signedInUser = await authSignIn(email, password);

      if (!signedInUser) return false;

      setUser(signedInUser);
      return true;
    },
    [authSignIn],
  );

  const signOut = useCallback(async () => {
    const success = await authSignOut();

    if (success) {
      notifySuccess("Odjava uspiješna");
      setUser(null);
    }
  }, [authSignOut]);

  return (
    <AuthContext.Provider value={{ user, error, signIn, signOut }}>
      {showLoader && (
        <PageLoader
          isDark={isDark}
          className={` ${
            loading
              ? "opacity-100"
              : "opacity-0 pointer-events-none transition-opacity duration-700"
          }`}
        />
      )}
      {!loading && children}
    </AuthContext.Provider>
  );
};
