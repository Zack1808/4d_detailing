import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import ReviewCard from "./ReviewCard";

import { useDocumentVisible } from "../../hooks/useDocumentVisible";
import { useInfiniteCarousel } from "../../hooks/useInfiniteCarousel";
import {
  useMediaQuery,
  usePrefersReducedMotion,
} from "../../hooks/useMediaQuery";

import type { ReviewType } from "../../types/data";

const AUTOPLAY_DELAY = 10_000;

const ARROW =
  "cursor-pointer rounded-xs border border-dark p-3 transition hover:bg-gray-200 dark:border-light dark:hover:bg-gray-semidark";

const ReviewCarousel = ({ reviews }: { reviews: ReviewType[] }) => {
  const length = reviews.length;

  const reducedMotion = usePrefersReducedMotion();
  const tabVisible = useDocumentVisible();
  const itemsPerPage = useMediaQuery("(min-width: 768px)") ? 2 : 1;

  const [paused, setPaused] = useState(false);

  const { index, animate, next, previous, onTransitionEnd } =
    useInfiniteCarousel({
      length,
      step: itemsPerPage,
      reducedMotion,
    });

  useEffect(() => {
    if (!tabVisible || reducedMotion || paused || length < 2) return;

    const timer = window.setTimeout(next, AUTOPLAY_DELAY);

    return () => window.clearTimeout(timer);
  }, [index, tabVisible, reducedMotion, paused, length, next]);

  if (length === 0) return null;

  const slides = [...reviews, ...reviews, ...reviews];

  return (
    <div
      className="flex w-full flex-col gap-3"
      role="region"
      aria-roledescription="carousel"
      aria-label="Recenzije klijenata"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative mt-3 w-full overflow-hidden">
        <div
          className="flex"
          onTransitionEnd={onTransitionEnd}
          style={{
            transform: `translateX(-${index * (100 / itemsPerPage)}%)`,
            transition: animate ? "transform 1s ease-in-out" : "none",
          }}
        >
          {slides.map((review, position) => (
            <div
              key={position}
              className="w-full shrink-0 px-1.5 md:w-1/2"
              aria-hidden={position < length || position >= length * 2}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {length > itemsPerPage && (
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={previous}
            aria-label="Prethodne recenzije"
            className={ARROW}
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Sljedeće recenzije"
            className={ARROW}
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCarousel;
