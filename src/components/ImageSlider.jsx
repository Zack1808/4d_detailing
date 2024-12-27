import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "../css/components/ImageSlider.css";

const ImageSlider = React.memo(({ images, className }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const setNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const setPrevImage = () => {
    setCurrentImage((prevImage) => (prevImage - 1) % images.length);
  };

  return (
    <div className={`image-slider ${className}`}>
      <button className="btn-previous" onClick={setPrevImage}>
        <FaChevronLeft />
      </button>
      {images.map((image, index) => (
        <div
          style={{
            backgroundImage: `url(${image})`,
            transform: `translateX(calc(-100% * ${currentImage}))`,
          }}
          key={`image${index + 1}`}
          className={`image`}
        />
      ))}
      <button className="btn-next" onClick={setNextImage}>
        <FaChevronRight />
      </button>
    </div>
  );
});

export default ImageSlider;
