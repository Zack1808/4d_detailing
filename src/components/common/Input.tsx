import React, { type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  className = "",
  disabled = false,
  ...rest
}) => {
  return (
    <input
      className={`flex gap-4 items-center bg-dark/10 dark:bg-light/10 justify-between flex-1 p-3 outline-none border-b-2 border-transparent focus:border-dark dark:focus:border-light rounded-xs font-normal placeholder:text-gray-dark dark:placeholder:text-gray-light text-dark dark:text-light transition-all transition-1000 ${className}`}
      disabled={disabled}
      {...rest}
    />
  );
};

export default Input;
