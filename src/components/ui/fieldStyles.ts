import { cn } from "../../utils/cn";

export const FIELD_BASE =
  "w-full rounded-xs border-b-2 bg-dark/5 p-3 font-light text-dark outline-none transition-colors duration-200 placeholder:text-gray-light dark:bg-light/5 dark:text-light";

const INVALID_BORDER = "border-red-600 dark:border-red-400";

export const fieldBorder = (invalid?: boolean) =>
  invalid
    ? INVALID_BORDER
    : "border-transparent focus:border-dark dark:focus:border-light";

export const fieldWrapperBorder = (invalid?: boolean) =>
  invalid
    ? INVALID_BORDER
    : "border-transparent focus-within:border-dark dark:focus-within:border-light";

export const fieldClasses = (invalid?: boolean, className?: string) =>
  cn(FIELD_BASE, fieldBorder(invalid), className);

export const POPOVER_PANEL =
  "w-full rounded-xs border border-dark/20 bg-panel dark:border-light/20 dark:bg-panel-dark";
