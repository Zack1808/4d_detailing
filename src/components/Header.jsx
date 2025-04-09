import React from "react";

import { useStore } from "../context/storeContext";

import "../css/components/Header.css";

const Header = React.memo(({ title = "title", bgImage, fallbackImage }) => {
  const { loadedCache } = useStore();

  const isLoaded = loadedCache[bgImage];

  return (
    <div
      className="header"
      style={{
        "--bg-image": isLoaded ? `url(${bgImage})` : `url(${fallbackImage})`,
      }}
    >
      <div className="header-content">
        <h1>{title}</h1>
      </div>
    </div>
  );
});

export default Header;
