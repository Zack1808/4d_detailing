import React, { useState } from "react";

import { Button } from "./";

import "../css/components/CategoryDisplayer.css";

const CategoryDisplayer = React.memo(({ categories }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="category-displayer-container">
      <ul className="category-displayer-btns">
        {categories.map((category, index) => (
          <li
            key={`${category.title}${index}`}
            className={activeIndex === index ? "active" : ""}
          >
            <Button
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
            <p>{category.description}</p>
            <img src={category.imgUrl} alt={category.title} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default CategoryDisplayer;
