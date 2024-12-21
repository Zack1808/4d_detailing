import React, { useMemo } from "react";

import "../css/components/CommentDisplay.css";

const CommentDisplay = React.memo(({ rating, text, author }) => {
  const renderStars = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? "" : "star-outline"}`} />
    ));
  }, [rating]);

  return (
    <div className="comment-display">
      <div className="stars">{renderStars}</div>
      <blockquote>
        <p>{text}</p>
        <footer>
          - <cite>{author}</cite>
        </footer>
      </blockquote>
    </div>
  );
});

export default CommentDisplay;
