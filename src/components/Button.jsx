import React from "react";
import { Link } from "react-router-dom";

import "../css/components/Button.css";

const Button = ({ children, primary, secondary, link }) => {
  if (link)
    return (
      <Link
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
      className={`${primary && "primary-btn"} ${
        secondary && "secondary-btn"
      } btn`}
    >
      {children}
    </button>
  );
};

export default Button;
