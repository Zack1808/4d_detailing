import type { CSSProperties, ReactNode } from "react";

import { cn } from "../../utils/cn";

type RevealProps = {
  children: ReactNode;
  variant?: "up" | "left" | "right" | "fade";
  className?: string;
  style?: CSSProperties;
  delay?: number;
  intro?: boolean;
};

const Reveal = ({
  children,
  variant = "up",
  className,
  style,
  delay = 0,
  intro = false,
}: RevealProps) => (
  <div
    data-reveal={variant}
    data-reveal-delay={intro ? undefined : delay}
    style={
      intro
        ? ({ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties)
        : style
    }
    className={cn(intro ? "reveal-intro" : "reveal", className)}
  >
    {children}
  </div>
);

export default Reveal;
