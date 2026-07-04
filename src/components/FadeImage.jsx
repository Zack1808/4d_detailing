import React from "react";
import { useInView } from "react-intersection-observer";

import { useStore } from "../context/storeContext";

const FadeImage = ({ src, alt, fallbackImage }) => {
  const [imageRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { loadedCache } = useStore();

  const isLoaded = loadedCache[src];

  return (
    <img
      ref={imageRef}
      loading="lazy"
      src={isLoaded ? src : fallbackImage}
      srcSet={`${isLoaded ? src : fallbackImage} 480w, ${
        isLoaded ? src : fallbackImage
      } 800w, ${isLoaded ? src : fallbackImage} 1200w`}
      alt={alt}
      className={inView ? "image-pop" : ""}
    />
  );
};

export default FadeImage;
