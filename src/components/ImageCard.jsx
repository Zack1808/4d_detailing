import React from "react";

import "../css/components/ImageCard.css";

const ImageCard = React.memo(({ title, image, ...rest }) => {
  return (
    <button
      {...rest}
      className="image-card-container"
      style={{ "--bgImage": `url(${image})` }}
    >
      <h4>{title}</h4>
    </button>
  );
});

export default ImageCard;
