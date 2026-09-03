import React from "react";

const Hero: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className = "",
  ...rest
}) => {
  const sectionClasses =
    `w-full min-h-svh flex justify-center items-center bg-linear-to-b from-transparent from-70% to-light dark:to-dark  pt-40!  ${className}`.trim();

  return (
    <section className={sectionClasses} {...rest}>
      <article className="w-full max-w-[1700px] flex items-start justify-between gap-5 p-5 flex-col">
        {children}
      </article>
    </section>
  );
};

export default Hero;
