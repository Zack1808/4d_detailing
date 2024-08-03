import { FaRegStar, FaStar } from "react-icons/fa";

import "../css/components/CommentDisplay.css";

const CommentDisplay = ({ comment = " comment", user = "user", stars = 5 }) => {
  const renderStars = () => {
    let starItems = new Array();
    for (let i = 1; i <= 5; i++) {
      i <= stars
        ? starItems.push(<FaStar key={i} className="star" />)
        : starItems.push(<FaRegStar key={i} className="star" />);
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
