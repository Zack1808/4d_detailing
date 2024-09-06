import React from "react";

import "../css/components/Input.css";

const Input = React.memo(({ label, placeholder, type, ...rest }) => {
  return (
    <div className="input-container">
      <input type={type} {...rest} placeholder={placeholder} />
      {label && (
        <label htmlFor={rest.id}>
          {label} {rest.required && "*"}
        </label>
      )}
    </div>
  );
});

export default Input;
