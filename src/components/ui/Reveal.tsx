import type { CSSProperties, ReactNode } from "react";

import { useInView } from "../../hooks/useInView";
import { cn } from "../../utils/cn";

const VARIANTS = {
  up: ["opacity-0 translate-y-6", "opacity-100 translate-y-0"],
  left: ["opacity-0 -translate-x-6", "opacity-100 translate-x-0"],
  right: ["opacity-0 translate-x-6", "opacity-100 translate-x-0"],
  fade: ["opacity-0", "opacity-100"],
} as const;

type RevealProps = {
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  transitionFrom?: string;
  transitionTo?: string;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  delay?: number;
};

const Reveal = ({
  children,
  variant = "up",
  transitionFrom,
  transitionTo,
  className,
  style,
  threshold = 0.15,
  delay = 0,
}: RevealProps) => {
  const { ref, isVisible, isInitiallyVisible } = useInView(threshold);

  const [from, to] = VARIANTS[variant];

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transitionDelay: isInitiallyVisible ? `${delay}ms` : "100ms",
      }}
      className={cn(
        "transition-[opacity,translate] duration-1000 ease-out motion-reduce:transition-opacity!",
        isVisible ? (transitionTo ?? to) : (transitionFrom ?? from),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Reveal;
