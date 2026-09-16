import { useEffect, useRef, useState } from "react";

export const useInView = (threshold: number = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisibile, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
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

  return { ref, isVisibile };
};
