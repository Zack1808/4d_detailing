import { createContext, useContext, useRef, useEffect } from "react";

const ScrollContext = createContext();

export const useScrollPosition = () => {
  return useContext(ScrollContext);
};

export const ScrollProvider = ({ children }) => {
  const containerRef = useRef(null);

  const scrollTo = (scrollPosition) => {
    if (containerRef.current)
      containerRef.current.scrollTo({
        top: scrollPosition,
        behaviour: "smooth",
      });
  };

  return (
    <ScrollContext.Provider value={{ containerRef, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
};
