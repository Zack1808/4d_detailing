import { useEffect, useState } from "react";

export const useTransitionMount = (open: boolean, exitDurationMs: number) => {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);

      let second = 0;
      const first = requestAnimationFrame(() => {
        second = requestAnimationFrame(() => setVisible(true));
      });

      return () => {
        cancelAnimationFrame(first);
        cancelAnimationFrame(second);
      };
    }

    setVisible(false);

    const timer = window.setTimeout(() => setMounted(false), exitDurationMs);

    return () => window.clearTimeout(timer);
  }, [open, exitDurationMs]);

  return { mounted, visible };
};
