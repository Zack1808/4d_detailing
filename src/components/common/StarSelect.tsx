import React, { useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

import Button from "./Button";

type StarSelectProps = {
  count: number;
  setCount: (value: number) => void;
  id?: string;
};

const StarSelect: React.FC<StarSelectProps> = ({ count, setCount, id }) => {
  const [hoverCount, setHoverCount] = useState<number>(0);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    window.innerWidth < 768,
  );

  const displayCount =
    !isSmallScreen && hoverCount > count ? hoverCount : count;

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    updateScreenSize();

    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <div onMouseLeave={() => setHoverCount(0)} className="flex" id={id || ""}>
      {Array.from({ length: 5 }).map((_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= displayCount;

        return (
          <Button
            variant="none"
            key={`star-${starNumber}`}
            onClick={() => setCount(starNumber)}
            onMouseEnter={() => setHoverCount(starNumber)}
            className="text-3xl md:p-6! p-3!"
          >
            {isFilled ? <FaStar /> : <FaRegStar />}
          </Button>
        );
      })}
    </div>
  );
};

export default StarSelect;
