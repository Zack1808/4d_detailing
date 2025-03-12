import { Children, useMemo, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

import "../css/components/InfiniteScroller.css";

const InfiniteScroller = ({ children }) => {
  const [currScroll, setCurrScroll] = useState(2);
  const [transition, setTransition] = useState("0.35s ease-in-out");

  const [commentRef1, inView1] = useInView({
    threshold: 1,
  });
  const [commentRef2, inView2] = useInView({
    threshold: 1,
  });

  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  const style = {
    transform: `translateX(calc(-${100 * currScroll}%))`,
    transition,
  };

  const handleNext = () => {
    setCurrScroll((prevState) => prevState + 1);
    setTransition("0.35s ease-in-out");
  };

  const handlePrevious = () => {
    setCurrScroll((prevState) => prevState - 1);
    setTransition("0.35s ease-in-out");
  };

  useEffect(() => {
    if (inView1) {
      setTransition("0s");
      setCurrScroll(childrenArray.length);
    }
  }, [inView1]);

  useEffect(() => {
    if (inView2) {
      setTransition("0s");
      setCurrScroll(2);
    }
  }, [inView2]);

  return (
    <div className="infinite-scrooler">
      <button className="comment-prev" onClick={handlePrevious}>
        <FaChevronLeft />
      </button>
      <ul className="infinte-scroller-content">
        <li style={style} ref={commentRef1}>
          {childrenArray[childrenArray.length - 2]}
        </li>
        <li style={style}>{childrenArray[childrenArray.length - 1]}</li>
        {childrenArray.map((child, index) => (
          <li style={style} key={index}>
            {child}
          </li>
        ))}
        <li style={style}>{childrenArray[0]}</li>
        <li style={style} ref={commentRef2}>
          {childrenArray[1]}
        </li>
      </ul>
      <button className="comment-next" onClick={handleNext}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default InfiniteScroller;
