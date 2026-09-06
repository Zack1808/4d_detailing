import React from "react";

const Container = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...rest }, ref) => {
      const sectionClassName =
        `w-full px-5 flex justify-center items-center py-9 md:py-15 ${className}`.trim();

      return (
        <section ref={ref} className={sectionClassName} {...rest}>
          <article className="w-full md:max-w-[1700px] flex flex-col gap-5 items-start">
            {children}
          </article>
        </section>
      );
    },
  ),
);

export default Container;
