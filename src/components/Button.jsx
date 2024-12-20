import React from "react";
import { Link } from "react-router-dom";

import "../css/components/Button.css";

const Button = ({ children, primary, secondary, link, ...rest }) => {
  if (link)
    return (
      <Link
        {...rest}
        className={`${primary && "primary-btn"} ${
          secondary && "secondary-btn"
        } btn`}
        to={link}
      >
        {children}
      </Link>
    );

  return (
    <button
      {...rest}
      className={`${primary && "primary-btn"} ${
        secondary && "secondary-btn"
      } btn`}
    >
      {children}
    </button>
  );
};

export default Button;
