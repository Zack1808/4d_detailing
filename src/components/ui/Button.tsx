import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Link, type LinkProps } from "react-router-dom";

import Loader from "./Loader";

import { cn } from "../../utils/cn";

type Variant = "primary" | "secondary" | "none" | "link";

type Common = {
  variant?: Variant;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Common> & {
    to?: undefined;
    href?: undefined;
  };

type ButtonAsRouterLink = Common &
  Omit<LinkProps, keyof Common> & { href?: undefined };

type ButtonAsAnchor = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Common> & {
    href: string;
    to?: undefined;
  };

type ButtonProps = ButtonAsButton | ButtonAsRouterLink | ButtonAsAnchor;

const BASE =
  "flex max-w-fit cursor-pointer items-center gap-2 rounded-xs font-medium transition";

const VARIANTS: Record<Variant, string> = {
  primary:
    "px-4 py-3 border border-dark bg-dark text-light hover:border-gray-semidark hover:bg-gray-semidark dark:border-light dark:bg-light dark:text-dark dark:hover:border-gray-400 dark:hover:bg-gray-400",
  secondary:
    "px-4 py-3 border border-dark hover:border-gray-semidark hover:bg-gray-200 dark:border-light dark:hover:border-gray-200 dark:hover:bg-gray-semidark",
  none: "px-4 py-3",
  link: "py-3 hover:underline underline-offset-4",
};

const DISABLED =
  "disabled:pointer-events-none disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400";

const Button = ({
  variant = "none",
  loading = false,
  className,
  children,
  ...rest
}: ButtonProps) => {
  const classes = cn(BASE, VARIANTS[variant], !loading && DISABLED, className);

  const content = (
    <>
      {children}
      {loading && <Loader size="sm" inverted={variant === "primary"} />}
    </>
  );

  if (rest.to !== undefined) {
    return (
      <Link className={classes} {...(rest as Omit<LinkProps, "className">)}>
        {content}
      </Link>
    );
  }

  if (rest.href !== undefined) {
    return (
      <a
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  const {
    disabled,
    type = "button",
    ...buttonProps
  } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      className={cn(classes, loading && "pointer-events-none")}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      type={type}
      {...buttonProps}
    >
      {content}
    </button>
  );
};

export default Button;
