import { Link } from "react-router-dom";

import "../css/components/CategoryCard.css";

const CategoryCard = ({
  imageUrl = "",
  to = "/",
  smallTitle,
  bigTitle = "bigTitle",
}) => {
  return (
    <Link
      to={to}
      className="category-card-container"
      style={{ "--_backgroundImage": `url(${imageUrl})` }}
    >
      {smallTitle && <p>{smallTitle}</p>}
      <h4>{bigTitle}</h4>
    </Link>
  );
};

export default CategoryCard;
