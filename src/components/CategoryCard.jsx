import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { useStore } from "../context/storeContext";

import "../css/components/CategoryCard.css";

const CategoryCard = React.memo(
  ({ to, title, imageUrl, fallbackImage, ...rest }) => {
    const [cardRef, inView] = useInView({
      threshold: 0.2,
      triggerOnce: true,
    });

    const { loadedCache } = useStore();

    const isLoaded = loadedCache[imageUrl];

    return (
      <Link
        to={to}
        ref={cardRef}
        className={`category-card ${inView ? "category-visible" : ""}`}
        {...rest}
      >
        <img
          loading="lazy"
          src={isLoaded ? imageUrl : fallbackImage}
          alt="Catergory card"
        />
        <h4>{title}</h4>
      </Link>
    );
  },
);

export default CategoryCard;
