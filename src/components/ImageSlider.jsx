import React, { useState, useEffect, useRef } from "react";

import "../css/components/ImageSlider.css";

const ImageSlider = React.memo(
  ({ images, hover, className, animationDuration }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
      const startImageTransition = () => {
        timerRef.current = setInterval(() => {
          setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, animationDuration * 1000);
      };

      if (hover) {
        startImageTransition();
      } else setCurrentImage(0);

      return () => clearInterval(timerRef.current);
    }, [hover]);

    return (
      <div className={`image-slider ${className} ${hover ? "hovering" : ""}`}>
        {images.map((image, index) => (
          <div
            style={{ backgroundImage: `url(${image})` }}
            key={`image${index + 1}`}
            className={`${currentImage === index ? "active" : ""} image`}
          />
        ))}
      </div>
    );
  }
);

export default ImageSlider;
