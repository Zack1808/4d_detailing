import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea: React.FC<TextareaProps> = ({ className, ...rest }) => {
  return (
    <textarea
      className={`flex gap-4 items-center bg-dark/10 dark:bg-light/10 justify-between w-full p-3 outline-none border-b-2 border-transparent focus:border-dark dark:focus:border-light rounded-xs font-normal h-52 resize-none transition-all transition-1000 placeholder:text-gray-dark dark:placeholder:text-gray-light ${className}`}
      {...rest}
    ></textarea>
  );
};

export default Textarea;
