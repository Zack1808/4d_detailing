import React, {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  useState,
  lazy,
  Suspense,
} from "react";
import { Link, type LinkProps } from "react-router-dom";

const Tesseract = lazy(
  () => import("@features/site/components/animated/Tessaract"),
);
const Wheel = lazy(() => import("@features/site/components/animated/Wheel"));

import { useData } from "@features/catalog/context/DataContext";

type BaseButtonProps = {
  variant: "primary" | "secondary" | "none";
  loading?: boolean;
};

type RegularButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

type LinkButtonProps = BaseButtonProps & LinkProps;

type AnchorButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = RegularButtonProps | LinkButtonProps | AnchorButtonProps;

const BASE_CLASSES =
  "py-3 px-4 flex rounded-xs items-center gap-2 transition max-w-fit disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-400 disabled:pointer-events-none font-medium cursor-pointer";

const VARIANT_CLASSES = {
  primary:
    "border border-dark dark:border-light bg-dark dark:bg-light text-light dark:text-dark hover:border-gray-semidark hover:bg-gray-semidark dark:hover:border-gray-400 dark:hover:bg-gray-400",
  secondary:
    "border border-dark dark:border-light text-dark dark:text-light hover:border-gray-semidark dark:hover:border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-semidark",
  none: "text-dark dark:text-light",
} as const;

const buttonClasses = (
  variant: BaseButtonProps["variant"],
  className: string,
) =>
  `${BASE_CLASSES} ${VARIANT_CLASSES[variant || "none"]} ${className}`.trim();

const Button: React.FC<ButtonProps> = ({
  variant = "none",
  children,
  className = "",
  loading,
  ...rest
}) => {
  const { isDark } = useData();

  const [selectLoader] = useState<number>(() => {
    const randomIndex = Math.floor(Math.random() * 2);
    return randomIndex;
  });

  const renderLoader = () => {
    if (!loading) return null;
    return (
      <Suspense fallback={null}>
        {selectLoader === 0 && (
          <Tesseract size={25} isDark={!isDark} speed={3} thickness={15} />
        )}
        {selectLoader === 1 && <Wheel size={25} speed={2} isDark={!isDark} />}
      </Suspense>
    );
  };

  const classNames = buttonClasses(variant, className);

  if ("to" in rest)
    return (
      <Link className={classNames} {...rest}>
        {children} {renderLoader()}
      </Link>
    );

  if ("href" in rest)
    return (
      <a className={classNames} {...rest}>
        {children} {renderLoader()}
      </a>
    );

  return (
    <button className={classNames} {...(rest as RegularButtonProps)}>
      {children} {renderLoader()}
    </button>
  );
};

export default Button;
