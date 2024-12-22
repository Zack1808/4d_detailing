import React from "react";

import "../css/components/StarSelect.css";

const StarSelect = ({ starSelected, starSelectedCount, label }) => {
  return (
    <>
      {label && <label>{label}</label>}
      <div className={`stars ${label ? "scale" : ""}`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`star ${i < starSelectedCount ? "" : "star-outline"} `}
            onClick={() => starSelected(i + 1)}
          />
        ))}
      </div>
    </>
  );
};

export default StarSelect;
