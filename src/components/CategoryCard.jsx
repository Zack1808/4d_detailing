import React from "react";
import { Link } from "react-router-dom";

import "../css/components/CategoryCard.css";

const CategoryCard = React.memo(({ to, title, imageUrl }) => {
  return (
    <Link
      to={to}
      className="category-card"
      style={{ "--_category-background": `url(${imageUrl})` }}
    >
      <span>{title}</span>
    </Link>
  );
});

export default CategoryCard;
