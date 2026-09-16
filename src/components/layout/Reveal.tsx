import React from "react";

import { useInView } from "../../hooks/useInView";

type RevealProps = {
  children: React.ReactNode;
  transitionFrom?: string;
  transitionTo?: string;
  className?: string;
  threshold?: number;
  style?: React.CSSProperties;
};

const Reveal: React.FC<RevealProps> = ({
  children,
  transitionFrom = "opacity-0 translate-y-6",
  transitionTo = "opacity-100 translate-y-0",
  className = "",
  threshold = 0.15,
  style,
}) => {
  const { ref, isVisibile } = useInView(threshold);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisibile ? transitionTo : transitionFrom} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Reveal;
