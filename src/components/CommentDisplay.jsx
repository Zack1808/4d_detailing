import React, { useRef, useEffect, useState } from "react";

import { StarSelect } from "./";

import "../css/components/CommentDisplay.css";

const CommentDisplay = React.memo(
  ({ stars, comment, user, index = -1, handleSelect, limitedHeight }) => {
    const [isOverflowing, setIsOverflowing] = useState(false);

    const paragraphRef = useRef();

    useEffect(() => {
      paragraphRef.current.scrollHeight > paragraphRef.current.clientHeight &&
        setIsOverflowing(true);
    }, [paragraphRef.current]);

    const handleClick = () => {
      handleSelect && index > -1 && handleSelect(index);
    };

    return (
      <div className="comment-display" onClick={handleClick}>
        <StarSelect starSelectedCount={stars} />
        <blockquote>
          <p
            className={`${limitedHeight ? "limited" : ""} ${
              isOverflowing ? "elipsis" : ""
            }`}
            ref={paragraphRef}
          >
            {comment}
          </p>
          <footer>
            - <cite>{user}</cite>
          </footer>
        </blockquote>
      </div>
    );
  }
);

export default CommentDisplay;
