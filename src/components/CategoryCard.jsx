import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import "../css/components/CategoryCard.css";

const CategoryCard = React.memo(({ to, title, imageUrl, ...rest }) => {
  const [cardRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <Link
      to={to}
      ref={cardRef}
      className={`category-card ${inView ? "category-visible" : ""}`}
      {...rest}
    >
      <img src={imageUrl} alt="Catergory card" />
      <h4>{title}</h4>
    </Link>
  );
});

export default CategoryCard;
