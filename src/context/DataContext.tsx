import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import PageLoader from "../components/layout/PageLoader";

import { fetchPageData } from "../services/pageData";
import { getErrorMessage } from "../utils/errors";

import type { PageData } from "../types/data";

type Status = "loading" | "ready" | "error";

type DataContextType = PageData & {
  status: Status;
  error: string | null;
  reload: () => void;
};

const EMPTY: PageData = {
  services: [],
  reviews: [],
  blockedAppointments: [],
  priceArchive: [],
};

const FADE_OUT_MS = 400;

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) throw new Error("useData must be used within a DataProvider");

  return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PageData>(EMPTY);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setStatus("loading");

    fetchPageData()
      .then((result) => {
        if (cancelled) return;

        setData(result);
        setError(null);
        setStatus("ready");
      })
      .catch((err: unknown) => {
        if (cancelled) return;

        console.error("Loading page data failed:", err);
        setError(getErrorMessage(err));
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  useEffect(() => {
    if (status === "loading") return;

    const timer = window.setTimeout(() => setShowLoader(false), FADE_OUT_MS);

    return () => window.clearTimeout(timer);
  }, [status]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  const value = useMemo(
    () => ({ ...data, status, error, reload }),
    [data, status, error, reload],
  );

  return (
    <DataContext.Provider value={value}>
      {showLoader && (
        <PageLoader
          className={
            status === "loading"
              ? "opacity-100"
              : `pointer-events-none opacity-0 transition-opacity duration-400`
          }
        />
      )}
      {(status !== "loading" || !showLoader) && children}
    </DataContext.Provider>
  );
};
