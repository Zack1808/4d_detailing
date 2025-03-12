import React from "react";

import { StarSelect } from "./";

import "../css/components/CommentDisplay.css";

const CommentDisplay = React.memo(
  ({ stars, comment, user, index = -1, handleSelect }) => {
    const handleClick = () => {
      handleSelect && index > -1 && handleSelect(index);
    };

    return (
      <div className="comment-display" onClick={handleClick}>
        <StarSelect starSelectedCount={stars} />
        <blockquote>
          <p>{comment}</p>
          <footer>
            - <cite>{user}</cite>
          </footer>
        </blockquote>
      </div>
    );
  }
);

export default CommentDisplay;
