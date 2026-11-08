import type { TextareaHTMLAttributes } from "react";

import { fieldClasses } from "./fieldStyles";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

const Textarea = ({ invalid, className, ...rest }: TextareaProps) => (
  <textarea
    className={fieldClasses(invalid, `h-52 resize-none ${className ?? ""}`)}
    {...rest}
  />
);

export default Textarea;
