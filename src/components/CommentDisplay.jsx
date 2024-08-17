import React, { useMemo } from "react";

import "../css/components/CommentDisplay.css";

const CommentDisplay = React.memo(
  ({ comment = " comment", user = "user", stars = 5 }) => {
    const renderStars = useMemo(() => {
      return Array.from({ length: 5 }, (_, i) => (
        <div className={`star ${i < stars ? "" : "star-outline"}`} key={i} />
      ));
    }, [stars]);

    return (
      <div className="comment-display-container">
        <div className="star-display" aria-label={`Recenzija ${stars} od 5`}>
          {renderStars}
        </div>
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
