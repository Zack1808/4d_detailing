import React from "react";

import { StarSelect } from "./";

import "../css/components/CommentDisplay.css";

const CommentDisplay = React.memo(({ stars, comment, user }) => {
  return (
    <div className="comment-display">
      <StarSelect starSelectedCount={stars} />
      <blockquote>
        <p>{comment}</p>
        <footer>
          - <cite>{user}</cite>
        </footer>
      </blockquote>
    </div>
  );
});

export default CommentDisplay;
