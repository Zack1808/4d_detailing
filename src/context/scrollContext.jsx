import { createContext, useContext, useRef, useEffect } from "react";

const ScrollContext = createContext();

export const useScrollPosition = () => {
  return useContext(ScrollContext);
};

export const ScrollProvider = ({ children }) => {
  const containerRef = useRef(null);

  const scrollTo = (scrollPosition) => {
    if (containerRef.current) {
      const scroll = containerRef.current.scrollTop + scrollPosition;

      containerRef.current.scrollTo({
        top: scroll,
        behavior: "smooth",
      });
    }
  };

  const resetScroll = () => {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollTop * -1,
    });
  };

  return (
    <ScrollContext.Provider value={{ containerRef, scrollTo, resetScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};
