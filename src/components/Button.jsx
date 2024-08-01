import { Link } from "react-router-dom";

import "../css/components/Button.css";

const Button = ({ children, primary, secondary, className, to, ...rest }) => {
  if (to)
    return (
      <Link
        to={to}
        className={`btn ${primary ? "primary" : ""} ${
          secondary ? "secondary" : ""
        } ${className}`}
        {...rest}
      >
        {children}
      </Link>
    );

  return (
    <button
      className={`btn ${primary ? "primary" : ""} ${
        secondary ? "secondary" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
