import { useCallback, useEffect, useState, type TransitionEvent } from "react";

const mod = (value: number, length: number) =>
  ((value % length) + length) % length;

type Options = {
  length: number;
  step?: number;
  reducedMotion?: boolean;
};

export const useInfiniteCarousel = ({
  length,
  step = 1,
  reducedMotion = false,
}: Options) => {
  const [index, setIndex] = useState(length);
  const [animate, setAnimate] = useState(false);

  const jump = useCallback(
    (update: (current: number) => number) => {
      setAnimate(false);
      setIndex(update);

      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(!reducedMotion)),
      );
    },
    [reducedMotion],
  );

  useEffect(() => {
    if (length === 0) return;

    jump((current) => length + mod(current, length));
  }, [length, step, jump]);

  const move = useCallback(
    (delta: number) => {
      if (length === 0) return;

      if (reducedMotion) {
        setIndex((current) => length + mod(current + delta, length));
        return;
      }

      setAnimate(true);
      setIndex((current) => current + delta);
    },
    [length, reducedMotion],
  );

  const next = useCallback(() => move(step), [move, step]);
  const previous = useCallback(() => move(-step), [move, step]);

  const goTo = useCallback(
    (logicalIndex: number) => {
      setAnimate(!reducedMotion);
      setIndex(length + logicalIndex);
    },
    [length, reducedMotion],
  );

  const onTransitionEnd = (event: TransitionEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget || length === 0) return;

    if (index >= length * 2) jump((current) => current - length);
    else if (index < length) jump((current) => current + length);
  };

  return {
    index,
    animate: animate && !reducedMotion,
    logicalIndex: length === 0 ? 0 : mod(index, length),
    next,
    previous,
    goTo,
    onTransitionEnd,
  };
};
