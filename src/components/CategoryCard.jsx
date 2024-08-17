import React from "react";
import { Link } from "react-router-dom";

import "../css/components/CategoryCard.css";

const CategoryCard = React.memo(
  ({ imageUrl = "", to = "/", smallTitle, bigTitle = "bigTitle" }) => {
    return (
      <Link
        to={to}
        className="category-card-container"
        style={{ "--_backgroundImage": `url(${imageUrl})` }}
        aria-label={`Poveznica na ${smallTitle ? smallTitle : ""} ${bigTitle}`}
      >
        {smallTitle && <p>{smallTitle}</p>}
        <span>{bigTitle}</span>
      </Link>
    );
  }
);

export default CategoryCard;
