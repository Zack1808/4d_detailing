import { useEffect, useRef, useState } from "react";

export const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    let isFirstCheck = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isFirstCheck) {
          setIsInitiallyVisible(entry.isIntersecting);
          isFirstCheck = false;
        }

        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible, isInitiallyVisible };
};
