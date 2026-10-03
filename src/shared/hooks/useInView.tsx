import { useEffect, useRef, useState } from "react";

export const useInView = (threshold: number = 0.15) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isInitiallyVisible, setIsInitiallyVisible] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    let initialCheck = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (initialCheck) {
          setIsInitiallyVisible(entry.isIntersecting);
          initialCheck = false;
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
