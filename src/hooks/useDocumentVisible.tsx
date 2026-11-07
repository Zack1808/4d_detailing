import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  document.addEventListener("visibilitychange", onChange);

  return () => document.removeEventListener("visibilitychange", onChange);
};

export const useDocumentVisible = () =>
  useSyncExternalStore(
    subscribe,
    () => document.visibilityState === "visible",
    () => true,
  );
