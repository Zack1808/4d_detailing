import React from "react";

const Hero: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className = "",
  ...rest
}) => {
  const sectionClasses =
    `w-full h-svh flex justify-center items-center bg-linear-to-b md:from-transparent md:dark:from-transparent from-light/80 dark:from-dark/80 from-70% to-light dark:to-dark pt-40!  ${className}`.trim();

  return (
    <section className={sectionClasses} {...rest}>
      <article className="w-full max-w-[1700px] flex items-start justify-between gap-5 p-5 flex-col">
        {children}
      </article>
    </section>
  );
};

export default Hero;
