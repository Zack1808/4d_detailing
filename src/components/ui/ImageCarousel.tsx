import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { useInfiniteCarousel } from "../../hooks/useInfiniteCarousel";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

import { cn } from "../../utils/cn";

type ImageCarouselProps = {
  images: readonly string[];
  label: string;
};

const ARROW =
  "absolute top-1/2 -translate-y-1/2 cursor-pointer rounded-xs bg-light/90 p-2 transition hover:bg-light/70 dark:bg-dark/90 dark:hover:bg-dark/70";

const ImageCarousel = ({ images, label }: ImageCarouselProps) => {
  const length = images.length;

  const {
    index,
    animate,
    logicalIndex,
    next,
    previous,
    goTo,
    onTransitionEnd,
  } = useInfiniteCarousel({ length, reducedMotion: usePrefersReducedMotion() });

  if (length === 0) return null;

  const slides = [...images, ...images, ...images];

  return (
    <div
      className="relative w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative overflow-hidden">
        <div
          className="flex rounded-xs"
          onTransitionEnd={onTransitionEnd}
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: animate ? "transform 500ms ease-in-out" : "none",
          }}
        >
          {slides.map((image, position) => (
            <div
              key={position}
              className="aspect-video w-full shrink-0"
              // Only the middle copy is "real"; the others are loop clones.
              aria-hidden={position < length || position >= length * 2}
            >
              <img
                src={image}
                alt={`Slika ${(position % length) + 1} od ${length}`}
                className="block h-auto w-full object-cover"
                loading="lazy"
                width={1000}
                height={666}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={previous}
          aria-label="Prethodna slika"
          className={cn(ARROW, "left-3")}
        >
          <FaChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Sljedeća slika"
          className={cn(ARROW, "right-3")}
        >
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="absolute bottom-0 flex w-full justify-center gap-2 bg-light/70 p-6 dark:bg-dark/80">
        {images.map((image, position) => (
          <button
            key={image}
            type="button"
            onClick={() => goTo(position)}
            aria-label={`Idi na sliku ${position + 1}`}
            aria-current={logicalIndex === position}
            className={cn(
              "h-2.5 w-2.5 cursor-pointer rounded-full transition",
              logicalIndex === position
                ? "scale-110 bg-dark dark:bg-light"
                : "bg-gray-dark/50 dark:bg-gray-light",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
