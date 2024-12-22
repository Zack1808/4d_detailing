import React, { useMemo } from "react";

import "../css/components/CommentDisplay.css";

const CommentDisplay = React.memo(({ stars, comment, user }) => {
  const renderStars = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < stars ? "" : "star-outline"}`} />
    ));
  }, [stars]);

  return (
    <div className="comment-display">
      <div className="stars">{renderStars}</div>
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
