import React from "react";

import "../css/components/Header.css";

const Header = React.memo(({ title = "title", bgImage }) => {
  return (
    <div className="header" style={{ "--bg-image": `url(${bgImage})` }}>
      <div className="header-content">
        <h1>{title}</h1>
      </div>
    </div>
  );
});

export default Header;
