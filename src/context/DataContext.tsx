import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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

const SNAPSHOT_ELEMENT_ID = "page-data";

const SnapshotContext = createContext<PageData | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const DataSnapshotProvider = SnapshotContext.Provider;

const readEmbeddedSnapshot = (): PageData | null => {
  if (typeof document === "undefined") return null;

  const element = document.getElementById(SNAPSHOT_ELEMENT_ID);

  if (!element?.textContent) return null;

  try {
    return { ...EMPTY, ...(JSON.parse(element.textContent) as PageData) };
  } catch {
    return null;
  }
};

const DataContext = createContext<DataContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
  const context = useContext(DataContext);

  if (!context) throw new Error("useData must be used within a DataProvider");

  return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const serverSnapshot = useContext(SnapshotContext);

  const [initial] = useState(() => serverSnapshot ?? readEmbeddedSnapshot());
  const [data, setData] = useState<PageData>(initial ?? EMPTY);
  const [status, setStatus] = useState<Status>(initial ? "ready" : "loading");
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

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

        setStatus((current) => (current === "ready" ? current : "error"));
        setError(getErrorMessage(err));
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const reload = useCallback(() => {
    setStatus("loading");
    setAttempt((n) => n + 1);
  }, []);

  const value = useMemo(
    () => ({ ...data, status, error, reload }),
    [data, status, error, reload],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
