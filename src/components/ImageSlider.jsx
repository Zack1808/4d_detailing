import React, { useState, useEffect } from "react";

import "../css/components/ImageSlider.css";

const ImageSlider = ({ images, hover, className, animationDuration }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    let timer;

    if (hover) {
      const changeImage = (index) => {
        setCurrentImage(index);
        timer = setTimeout(() => {
          const nextIndex = (index + 1) % images.length;
          changeImage(nextIndex);
        }, animationDuration * 1000);
      };

      changeImage(currentImage);
    } else setCurrentImage(0);

    return () => clearTimeout(timer);
  }, [hover, currentImage, images.length, animationDuration]);

  return (
    <div className={`image-slider ${className} ${hover ? "hovering" : ""}`}>
      {images.map((image, index) => (
        <img
          key={`image${index + 1}`}
          src={image}
          alt={`Pozadina ${index + 1}`}
          className={currentImage === index ? "active" : ""}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
