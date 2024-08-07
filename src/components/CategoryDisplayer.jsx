import { useLocation } from "react-router-dom";
import { Button } from "./";

import "../css/components/CategoryDisplayer.css";

const CategoryDisplayer = ({ categories, activeIndex, setActiveIndex }) => {
  const location = useLocation().pathname;

  return (
    <div className="category-displayer-container">
      <ul className="category-displayer-btns">
        {categories.map((category, index) => (
          <li
            key={`${category.title}${index}`}
            className={activeIndex === index ? "active" : ""}
          >
            <Button
              to={`${location}?${category.title.replace(/ /g, "-")}`}
              onClick={() => {
                setActiveIndex(index);
              }}
            >
              {category.title}
            </Button>
          </li>
        ))}
      </ul>
      <div className="category-displayer-content">
        {categories.map((category, index) => (
          <div
            className={`category-content ${
              activeIndex === index ? "active" : ""
            }`}
            key={`${index}${category.title}`}
          >
            <div className="category-text">
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </div>
            <img src={category.imgUrl} alt={category.title} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryDisplayer;
