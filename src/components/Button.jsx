import React from "react";
import { Link } from "react-router-dom";

import "../css/components/Button.css";

const Button = React.memo(
  ({ children, primary, secondary, className = "", to, ...rest }) => {
    const buttonClasses = `btn ${primary ? "primary" : ""} ${
      secondary ? "secondary" : ""
    }  ${className}`.trim();

    if (to)
      return (
        <Link to={to} className={buttonClasses} {...rest}>
          {children}
        </Link>
      );

    return (
      <button className={buttonClasses} {...rest}>
        {children}
      </button>
    );
  }
);

export default Button;
