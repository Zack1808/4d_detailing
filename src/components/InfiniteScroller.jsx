import { useRef, useEffect, Children, useMemo } from "react";

import "../css/components/InfiniteScroller.css";

const InfiniteScroller = ({ children }) => {
  const scrollRef = useRef(null);

  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !scrollRef.current
    )
      return;

    scrollRef.current.setAttribute("data-animated", true);
  }, []);

  return (
    <div className="infinite-scrooler" ref={scrollRef}>
      <ul className="infinte-scroller-content">
        {childrenArray
          .concat(childrenArray, childrenArray, childrenArray)
          .map((child, index) => (
            <li
              key={index}
              className={index >= childrenArray.length ? "scroller-hidden" : ""}
              aria-hidden={index >= childrenArray.length ? "true" : "false"}
            >
              {child}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default InfiniteScroller;
