import React from "react";
import { useInView } from "react-intersection-observer";

import "../css/components/FadeImage.css";

const FadeImage = ({ src, alt }) => {
  const [imageRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <img
      ref={imageRef}
      src={src}
      srcSet={`${src} 480w, ${src} 800w, ${src} 1200w`}
      alt={alt}
      className={inView ? "image-pop" : ""}
    />
  );
};

export default FadeImage;
