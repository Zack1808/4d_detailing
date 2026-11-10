import { useCallback, useEffect, useState } from "react";

import { getErrorMessage } from "../../utils/errors";
import { notifyError } from "../../utils/toast";

import type { Repository } from "./repository";

type Status = "loading" | "ready" | "error";

export const useCollections = <T extends { id: string }>(
  repository: Repository<T>,
) => {
  const [items, setItems] = useState<T[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setStatus("loading");

    repository
      .list()
      .then((result) => {
        if (cancelled) return;

        setItems(result);
        setError(null);
        setStatus("ready");
      })
      .catch((err: unknown) => {
        if (cancelled) return;

        console.error("Loading admin data failed: ", err);
        setError(getErrorMessage(err));
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [repository, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  const refresh = useCallback(async () => {
    try {
      setItems(await repository.list());
    } catch (err) {
      console.error("Refreshing admin data failed: ", err);
      notifyError(getErrorMessage(err));
    }
  }, [repository]);

  const run = useCallback(
    async <R>(id: string, action: () => Promise<R>): Promise<R | null> => {
      setPendingId(id);

      try {
        return await action();
      } catch (err) {
        console.error("Admin action failed: ", err);
        notifyError(getErrorMessage(err));

        return null;
      } finally {
        setPendingId(null);
      }
    },
    [],
  );

  const create = useCallback(
    async (data: Omit<T, "id">) => {
      const record = await run("new", () => repository.create(data));

      if (record) setItems((current) => [...current, record]);

      return record;
    },
    [repository, run],
  );

  const update = useCallback(
    async (id: string, patch: Partial<Omit<T, "id">>) => {
      const done = await run(id, async () => {
        await repository.update(id, patch);

        return true;
      });

      if (done) {
        setItems((current) =>
          current.map((item) =>
            item.id === id ? { ...item, ...patch } : item,
          ),
        );
      }

      return done === true;
    },
    [repository, run],
  );

  const remove = useCallback(
    async (id: string) => {
      const done = await run(id, async () => {
        await repository.remove(id);

        return true;
      });

      if (done) setItems((current) => current.filter((item) => item.id !== id));

      return done === true;
    },
    [repository, run],
  );

  return {
    items,
    status,
    error,
    pendingId,
    reload,
    refresh,
    create,
    update,
    remove,
  };
};
