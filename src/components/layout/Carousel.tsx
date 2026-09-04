import React, { useCallback, useEffect, useMemo, useState } from "react";

import { type ReviewType } from "../../types/data";

import ReviewCard from "../common/RevievCard";

type CarouselProps = {
  reviews: ReviewType[];
};

const AUTOPLAY_DELAY = 10000;

const Carousel: React.FC<CarouselProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(reviews.length);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(2);

  const [isDocumentVisible, setIsDocumentVisible] = useState(
    typeof document === "undefined"
      ? true
      : document.visibilityState === "visible",
  );

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setCurrentIndex(reviews.length);
  }, [reviews]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 2 : 1);
    };

    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const slides = useMemo(() => [...reviews, ...reviews, ...reviews], [reviews]);

  const next = useCallback(() => {
    setIsTransitioning(!prefersReducedMotion);

    setCurrentIndex((index) => index + itemsPerPage);
  }, [itemsPerPage, prefersReducedMotion]);

  useEffect(() => {
    if (!isDocumentVisible) return;

    if (prefersReducedMotion) return;

    const timeout = window.setTimeout(() => {
      next();
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [currentIndex, isDocumentVisible, prefersReducedMotion, next]);

  const handleTransitionEnd = () => {
    const length = reviews.length;

    if (currentIndex >= length * 2) {
      setIsTransitioning(false);

      setCurrentIndex((index) => index - length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(!prefersReducedMotion);
        });
      });
    }

    if (currentIndex < length) {
      setIsTransitioning(false);

      setCurrentIndex((index) => index + length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(!prefersReducedMotion);
        });
      });
    }
  };

  useEffect(() => {
    setIsTransitioning(false);

    setCurrentIndex((index) => {
      const logicalIndex =
        ((index % reviews.length) + reviews.length) % reviews.length;

      return reviews.length + logicalIndex;
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitioning(!prefersReducedMotion);
      });
    });
  }, [itemsPerPage, prefersReducedMotion]);

  const translatePercentage = currentIndex * (100 / itemsPerPage);

  return (
    <div className="relative mt-6 w-full overflow-hidden">
      <div
        className="flex"
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${translatePercentage}%)`,

          transition:
            isTransitioning && !prefersReducedMotion
              ? "transform 1s ease-in-out"
              : "none",
        }}
      >
        {" "}
        {slides.map((review, index) => (
          <div
            className="w-full shrink-0 odd:pr-1.5 even:pl-1.5 md:w-1/2"
            key={`${review.name}-${index}`}
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
