import { type HTMLAttributes, useEffect, useRef } from "react";

import { cn } from "../../utils/cn";

const Hero = ({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLElement>) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let lastWidth = 0;
    const measure = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      const height = window.visualViewport?.height ?? window.innerHeight;
      section.style.minHeight = `${Math.round(height)}px`;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "flex min-h-svh w-full items-center justify-center bg-linear-to-b from-light/80 from-70% to-light md:from-transparent dark:from-dark/80 dark:to-dark md:dark:from-transparent",
        className,
      )}
      {...rest}
    >
      <div className="flex w-full max-w-[1700px] flex-col items-start justify-between gap-5 p-5">
        {children}
      </div>
    </section>
  );
};

export default Hero;
