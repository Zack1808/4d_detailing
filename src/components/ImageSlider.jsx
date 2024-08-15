import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Button } from "../components";

import "../css/components/ImageSlider.css";

const ImageSlider = ({ images, reset }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderIndexSelectors = () => {
    let buttons = [];

    for (let i = 0; i < images.length; i++) {
      buttons = [
        ...buttons,
        <button
          key={`button${i}`}
          className={`select-index-btn ${
            i === currentImageIndex ? "active" : ""
          }`}
          onClick={() => setCurrentImageIndex(i)}
          aria-label={`See image number ${i + 1}`}
        ></button>,
      ];
    }

    return buttons;
  };

  useEffect(() => {
    reset && setCurrentImageIndex(0);
  }, [reset]);

  return (
    <div className="image-slider-container">
      <div className="image-slider-content">
        {currentImageIndex > 0 && (
          <Button
            secondary
            className="left-btn"
            onClick={() => setCurrentImageIndex((prevState) => prevState - 1)}
            aria-label="See previous image"
          >
            <FaChevronLeft />
          </Button>
        )}
        {currentImageIndex < images.length - 1 && (
          <Button
            secondary
            className="right-btn"
            onClick={() => setCurrentImageIndex((prevState) => prevState + 1)}
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
        {renderIndexSelectors()}
      </div>
    </div>
  );
};

export default ImageSlider;
