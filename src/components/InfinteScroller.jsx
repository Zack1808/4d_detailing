import { useRef, useEffect, Children } from "react";

import "../css/components/InfiniteScroller.css";

const InfinteScroller = ({ children }) => {
  const childrenArray = Children.toArray(children);

  const scrollRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !scrollRef.current
    )
      return;

    scrollRef.current.setAttribute("data-animated", true);
  }, []);

  return (
    <div className="infinite-scrooler-container" ref={scrollRef}>
      <ul className="infinte-scroller-content" ref={contentRef}>
        {children.map((child, index) => (
          <li key={index}>{child}</li>
        ))}
        {children.map((child, index) => (
          <li key={index} className="scroller-hidden" aria-hidden>
            {child}
          </li>
        ))}
        {children.map((child, index) => (
          <li key={index} className="scroller-hidden" aria-hidden>
            {child}
          </li>
        ))}
        {children.map((child, index) => (
          <li key={index} className="scroller-hidden" aria-hidden>
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfinteScroller;
