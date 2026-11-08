import type { InputHTMLAttributes } from "react";

import { fieldClasses } from "./fieldStyles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

const Input = ({ invalid, className, ...rest }: InputProps) => (
  <input className={fieldClasses(invalid, className)} {...rest} />
);

export default Input;
