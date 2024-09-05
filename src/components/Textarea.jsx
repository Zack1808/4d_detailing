import React from "react";

import "../css/components/Textarea.css";

const Textarea = React.memo(({ label, placeholder, ...rest }) => {
  return (
    <div className="textarea-container">
      {label && (
        <label htmlFor={rest.id}>
          {label} {rest.required && "*"}
        </label>
      )}
      <textarea {...rest} placeholder={placeholder} />
    </div>
  );
});

export default Textarea;
