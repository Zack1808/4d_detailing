import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

import "../css/components/ImageSlider.css";

const ImageSlider = React.memo(({ images, className, resetGallery }) => {
  const [currentImage, setCurrentImage] = useState(1);
  const [transition, setTransition] = useState(
    "0.7s cubic-bezier(0.92, -0.33, 0.38, 1.4)"
  );

  const [imageRef1, inView1] = useInView({
    threshold: 1,
  });
  const [imageRef2, inView2] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (resetGallery) {
      setTransition("0s");
      setCurrentImage(1);
    }
  }, [resetGallery]);

  useEffect(() => {
    if (inView1) {
      setTransition("0s");
      setCurrentImage(images.length);
    }
  }, [inView1]);

  useEffect(() => {
    if (inView2) {
      setTransition("0s");
      setCurrentImage(1);
    }
  }, [inView2]);

  const setNextImage = () => {
    setTransition("0.35s cubic-bezier(0, 0, 0.5, 1.4)");
    setCurrentImage((prevImage) => {
      return prevImage < images.length + 1 ? prevImage + 1 : 1;
    });
  };

  const setPrevImage = () => {
    setTransition("0.35s cubic-bezier(0, 0, 0.5, 1.4)");
    setCurrentImage((prevImage) => {
      return prevImage > 0 ? prevImage - 1 : images.length;
    });
  };

  return (
    <div className={`image-slider ${className}`}>
      <button className="btn-previous" onClick={setPrevImage}>
        <FaChevronLeft />
      </button>
      <div
        ref={imageRef1}
        style={{
          backgroundImage: `url(${images[images.length - 1]})`,
          transform: `translateX(calc(-100% * ${currentImage}))`,
          transition,
        }}
        key={`image01`}
        className={`image`}
      />
      {images.map((image, index) => (
        <div
          style={{
            backgroundImage: `url(${image})`,
            transform: `translateX(calc(-100% * ${currentImage}))`,
            transition,
          }}
          key={`image${index + 1}`}
          className={`image`}
        />
      ))}
      <div
        ref={imageRef2}
        style={{
          backgroundImage: `url(${images[0]})`,
          transform: `translateX(calc(-100% * ${currentImage}))`,
          transition,
        }}
        key={`image02`}
        className={`image`}
      />
      <button className="btn-next" onClick={setNextImage}>
        <FaChevronRight />
      </button>
    </div>
  );
});

export default ImageSlider;
