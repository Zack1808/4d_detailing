import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

const Container = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, className, ...rest }, ref) => (
    <section
      ref={ref}
      className={cn("flex w-full justify-center px-5 py-9 md:py-15", className)}
      {...rest}
    >
      <div className="flex w-full flex-col items-start gap-5 md:max-w-[1700px]">
        {children}
      </div>
    </section>
  ),
);

Container.displayName = "Container";

export default Container;
