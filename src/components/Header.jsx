import React from "react";
import "../css/components/Header.css";

const Header = React.memo(({ title = "Title" }) => {
  return (
    <header className="header-container">
      <div className="header-content">
        <h1>{title}</h1>
      </div>
    </header>
  );
});

export default Header;
