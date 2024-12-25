import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { ImageSlider } from "./";

import "../css/components/CategoryCard.css";

const CategoryCard = React.memo(({ to, title, imagesUrl = [], ...rest }) => {
  const [isHovering, setIsHovering] = useState(false);

  const [cardRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Link
      to={to}
      ref={cardRef}
      className={`category-card ${inView ? "category-visible" : ""}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...rest}
    >
      <ImageSlider
        images={imagesUrl}
        className="slider-background"
        hover={isHovering}
        animationDuration={5}
      />
      <span>{title}</span>
    </Link>
  );
});

export default CategoryCard;
