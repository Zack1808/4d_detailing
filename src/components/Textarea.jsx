import React from "react";

import "../css/components/Textarea.css";

const Textarea = React.memo(({ label, placeholder, ...rest }) => {
  return (
    <div className="textarea-container">
      <textarea {...rest} placeholder={placeholder} />
      {label && (
        <label htmlFor={rest.id}>
          {label} {rest.required && "*"}
        </label>
      )}
    </div>
  );
});

export default Textarea;
