import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ImageSlider } from "./";

import "../css/components/CategoryCard.css";

const CategoryCard = React.memo(({ to, title, imagesUrl = [] }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      to={to}
      className="category-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
