import { FaRegStar, FaStar } from "react-icons/fa";

import "../css/components/CommentDisplay.css";

const CommentDisplay = ({ comment = " comment", user = "user", stars = 5 }) => {
  const renderStars = () => {
    let starItems = new Array();
    for (let i = 1; i <= 5; i++) {
      i <= stars
        ? starItems.push(<div className="star-full" key={i} />)
        : starItems.push(<div className="star-outline" key={i} />);
    }
    return starItems;
  };

  return (
    <div className="comment-display-container">
      <div className="star-display">{renderStars()}</div>
      <blockquote>
        <p>{comment}</p>
        <footer>
          - <cite>{user}</cite>
        </footer>
      </blockquote>
    </div>
  );
};

export default CommentDisplay;
