import React, {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  useState,
} from "react";
import { Link, type LinkProps } from "react-router-dom";

import Tesseract from "../animated/Tessaract";
import Wheel from "../animated/Wheel";
import Polisher from "../animated/Polisher";

import { useData } from "../../context/DataContext";

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

  const loaders = [
    <Tesseract size={25} isDark={!isDark} speed={3} thickness={15} />,
    <Wheel size={25} speed={2} isDark={!isDark} />,
    <Polisher size={50} speed={7} isDark={!isDark} className=" max-h-min" />,
  ];

  const [selectLoader] = useState<number>(() => {
    const randomIndex = Math.floor(Math.random() * loaders.length);
    return randomIndex;
  });

  const classNames = buttonClasses(variant, className);

  if ("to" in rest)
    return (
      <Link className={classNames} {...rest}>
        {children} {loading && loaders[selectLoader]}
      </Link>
    );

  if ("href" in rest)
    return (
      <a className={classNames} {...rest}>
        {children} {loading && loaders[selectLoader]}
      </a>
    );

  return (
    <button className={classNames} {...(rest as RegularButtonProps)}>
      {children} {loading && loaders[selectLoader]}
    </button>
  );
};

export default Button;
