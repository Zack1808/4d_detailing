import React, { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ImageCarouselProps = {
  images: string[];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(images.length);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);

  const slides = [...images, ...images, ...images];

  const next = useCallback(() => setCurrentIndex((index) => index + 1), []);

  const previous = useCallback(() => setCurrentIndex((index) => index - 1), []);

  const goTo = useCallback(
    (index: number) => setCurrentIndex(images.length + index),
    [images.length],
  );

  const handleTransitionedEnd = () => {
    const length = images.length;

    if (currentIndex >= length * 2) {
      setIsTransitioning(false);
      setCurrentIndex((index) => index - length);

      requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsTransitioning(true)),
      );
    }

    if (currentIndex < length) {
      setIsTransitioning(false);
      setCurrentIndex((index) => index + length);

      requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsTransitioning(true)),
      );
    }
  };

  useEffect(() => {
    setIsTransitioning(false);
    setCurrentIndex(images.length);

    requestAnimationFrame(() =>
      requestAnimationFrame(() => setIsTransitioning(true)),
    );
  }, [images]);

  if (images.length === 0) return null;

  const logicalIndex =
    ((currentIndex % images.length) + images.length) % images.length;

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden">
        <div
          className="flex rounded-xs"
          onTransitionEnd={handleTransitionedEnd}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning
              ? "transform 500ms ease-in-out"
              : "none",
          }}
        >
          {slides.map((image, index) => (
            <div className="w-full shrink-0" key={`${images}-${index}`}>
              <img
                src={image}
                alt={`Slika ${(index % images.length) + 1}`}
                className="block h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={previous}
          aria-label="Prošla slika"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-xs dark:bg-dark/90 bg-light/90 p-2 dark:text-light text-dark transition dark:hover:bg-dark/70 hover:bg-light/70"
        >
          <FaChevronLeft />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Slijedeća slika"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xs dark:bg-dark/90 bg-light/90 p-2 dark:text-light text-dark transition dark:hover:bg-dark/70 hover:bg-light/70"
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="mt-3 flex justify-center gap-2 absolute bottom-0 w-full p-6 dark:bg-dark/70 bg-light/70">
        {images.map((image, index) => (
          <button
            key={`${image}-indicator`}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Idi na sliku ${index + 1}`}
            aria-current={logicalIndex === index}
            className={`h-2.5 w-2.5 rounded-full transition ${logicalIndex === index ? "scale-110 dark:bg-light bg-dark" : "dark:bg-gray-light bg-gray-dark/50"}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
