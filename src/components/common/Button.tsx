import React, {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { Link, type LinkProps } from "react-router-dom";

type BaseButtonProps = {
  variant: "primary" | "secondary" | "none";
};

type RegularButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

type LinkButtonProps = BaseButtonProps & LinkProps;

type AnchorButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = RegularButtonProps | LinkButtonProps | AnchorButtonProps;

const BASE_CLASSES =
  "py-3 px-4 flex rounded-xs items-center gap-2 transition max-w-fit text-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-400 disabled:pointer-events-none font-semibold";

const VARIANT_CLASSES = {
  primary:
    "border border-dark bg-dark text-light hover:border-gray-semidark hover:bg-gray-semidark ",
  secondary:
    "border border-dark text-dark hover:border-gray-semidark hover:bg-gray-200",
  none: "text-dark",
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
  ...rest
}) => {
  const classNames = buttonClasses(variant, className);

  if ("to" in rest)
    return (
      <Link className={classNames} {...rest}>
        {children}
      </Link>
    );

  if ("href" in rest)
    return (
      <a className={classNames} {...rest}>
        {children}
      </a>
    );

  return (
    <button className={classNames} {...(rest as RegularButtonProps)}>
      {children}
    </button>
  );
};

export default Button;
