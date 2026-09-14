import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea: React.FC<TextareaProps> = ({ className, ...rest }) => {
  return (
    <textarea
      className={`flex gap-4 items-center bg-dark/10 dark:bg-light/10 justify-between w-full p-3 outline-none border-b-2 border-transparent focus:border-dark dark:focus:border-light rounded-xs font-normal h-52 resize-none placeholder:text-gray-light text-dark dark:text-light transition-all transition-1000 ${className}`}
      {...rest}
    ></textarea>
  );
};

export default Textarea;
