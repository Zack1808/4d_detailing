import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Button } from "../components";

import "../css/components/ImageSlider.css";

const ImageSlider = React.memo(({ images, reset }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = useCallback(() => {
    setCurrentImageIndex((prevState) => Math.max(prevState - 1, 0));
  }, []);

  const handleNextClick = useCallback(() => {
    setCurrentImageIndex((prevState) =>
      Math.min(prevState + 1, images.length - 1)
    );
  }, [images.length]);

  useEffect(() => {
    if (reset) setCurrentImageIndex(0);
  }, [reset]);

  return (
    <div className="image-slider-container">
      <div className="image-slider-content">
        {currentImageIndex > 0 && (
          <Button
            secondary
            className="left-btn"
            onClick={handlePrevClick}
            aria-label="See previous image"
          >
            <FaChevronLeft />
          </Button>
        )}
        {currentImageIndex < images.length - 1 && (
          <Button
            secondary
            className="right-btn"
            onClick={handleNextClick}
            aria-label="See next image"
          >
            <FaChevronRight />
          </Button>
        )}
        {images.map((image, index) => (
          <img
            src={image}
            alt={`Preview image number ${index + 1}`}
            key={`image${index}`}
            style={{
              transform: `translateX(calc(-100% * ${currentImageIndex}))`,
            }}
            onDrag={() => console.log("here")}
          />
        ))}
      </div>
      <div className="image-slider-index-selector">
        {images.map((_, index) => (
          <button
            key={`button${index}`}
            className={`select-index-btn ${
              index === currentImageIndex ? "active" : ""
            }`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`See image number ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
});

export default ImageSlider;
